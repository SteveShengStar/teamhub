const FormSection = require('../schema/FormSection');
const Form = require('../schema/Form');
const util = require('./util');
const { members } = require('..');
const _ = require('lodash');

const forms = {};

/**
 * Fetch Form metadata.
 * 
 * @param {String} formId: ID of the form.
 */
forms.fetchFormData = async (formId) => {
    return util.handleWrapper(async () => {
        return Form.findOne({_id: formId})
            .select(['title', 'description', 'sections'])
            .populate({
                path : 'sections',
                populate : {
                  path : 'section'
                }
            });
    });
}

/**
 * Fetch Form and Waterloop Member's data
 * 
 * @param {String} userId: user ID
 * @param {String} formId: ID of the form
 */
forms.fetchFormAndMemberData = async (userId, formId) => {
    return util.handleWrapper(async () => {
        let response = {};
        response.form = await Form.findOne({_id: formId})
            .select(['title', 'description', 'sections'])
            .populate({
                path : 'sections',
                populate : {
                  path : 'section'
                }
            });
        const selectFields = response.form.sections.map(s => s.section.name);
        response.member = await members.search({_id: userId}, selectFields);
        return response
    });
}

/**
 * Create form sections/questions that don't already exist
 * Modify form sections/questions that exist (upsert)
 * 
 * @param {Array[Object]} sections: details about the form sections/question to add.
 */
forms.updateFormSections = async (sections) => {
    if (!sections || sections.length === 0) {
        return;
    }

    return util.handleWrapper(async () => {
        const dbPayload = sections.map(section => {
            return {
                updateOne: {
                    filter: { name: section.name },
                    update: {
                        $set: _.omit(section, '_id', 'position', 'required', 'section'),
                    },
                    upsert: true
                }
            }
        });
        FormSection.bulkWrite(dbPayload)
            .then(console.log.bind(console, 'BULK update OK'))
            .catch(console.error.bind(console, 'BULK update error'));
        return {};
    });
}

/**
 * Add a new form.
 * 
 * @param {Object} formData: form metadata
 * @param {Object} res: REST Response object
 */
forms.createForm = async (formData, res) => {
    return util.handleWrapper(async () => {
        forms.updateFormSections(formData.sections); // TODO: this should be in a transaction.

        if (formData.sections) {
            const formSectionNamesToIds = await getFormSectionNamesToIds();
            formData.sections = formData.sections
                .map(s => {
                    return {
                        required: s.required,
                        position: s.position,
                        section: formSectionNamesToIds[s.name],
                    }
                });
        }

        try {
            await Form.create(formData);
        } catch (err) {
            console.error(err);
            const { title: titleFieldError, description: descFieldError} = err.errors;

            if (titleFieldError?.kind === 'required' || descFieldError?.kind === 'required') {
                res.statusCode = 400;
                throw new Error("Title and Description cannot be blank.");
            }
            if (titleFieldError?.kind === 'unique') {
                res.statusCode = 400;
                throw new Error("Another form already exists with the title: " + titleFieldError.value + ". Please enter a different title.");
            }
            res.statusCode = 500;
            throw new Error(err);
        }
    });
}

/**
 * Update a form's metadata.
 * 
 * @param {Object} formData: new metadata for the form.
 */
forms.updateFormMetadata = async (formId, formData, res) => {
    return util.handleWrapper(async () => {
        forms.updateFormSections(formData.sections);  // TODO: this should be in a transaction.
        
        if (formData.sections) {
            const formSectionNamesToIds = await getFormSectionNamesToIds();
            const sectionNames = Object.keys(formSectionNamesToIds);
            formData.sections = formData.sections.filter(s => sectionNames.includes(s.name))
                .map(s => {
                    return {
                        required: s.required,
                        position: s.position,
                        section: formSectionNamesToIds[s.name],
                    }
                });
        }

        try {
            await Form.updateOne({_id: formId}, _.omit(formData, '_id'), { runValidators: true });
        } catch (err) {
            console.error(err);
            const { title: titleFieldError, description: descFieldError} = err.errors;

            if (titleFieldError?.kind === 'required' || descFieldError?.kind === 'required') {
                res.statusCode = 400;
                throw new Error("Title and Description cannot be blank.");
            }
            if (titleFieldError?.kind === 'unique') {
                res.statusCode = 400;
                throw new Error("Another form already exists with the title: " + titleFieldError.value + ". Please enter a different title.");
            }
            res.statusCode = 500;
            throw new Error(err);
        }
    });
}

const getFormSectionNamesToIds = async () => {
    const formSections = await FormSection.find();
    const formSectionNamesToIds = {};
    formSections.map(
        s => {
            formSectionNamesToIds[s.name] = s._id;
        }
    );
    return formSectionNamesToIds;
}

module.exports = forms;