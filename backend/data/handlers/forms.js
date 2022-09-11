const FormSection = require('../schema/FormSection');
const Form = require('../schema/Form');
const util = require('./util');
const mongoose = require('mongoose');
const { members } = require('..');

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
 * Add a new form.
 * 
 * @param {Object} formData: form metadata.
 */
forms.createForm = async (formData) => {
    return util.handleWrapper(async () => {
        formData.sections = formData.sections.map(s => {
            return { 
                ...s,
                section: new mongoose.Types.ObjectId(s.section._id),
            }
        });
        // TODO: this should be in a transaction.
        this.updateFormSections(formData.sections);
        return await Form.create(formData);
    });
}

/**
 * Update a form's metadata.
 * 
 * @param {Object} formData: new metadata for the form.
 */
forms.updateFormMetadata = async (formId, formData) => {
    return util.handleWrapper(async () => {
        // TODO: this should be in a transaction.
        this.updateFormSections(formData.sections);

        // Disassociate form sections that were deleted from this form.
        const existingSections = (await FormSection.find()).map(section => section.name);
        formData.sections = formData.sections.filter(s => existingSections.includes(s.section.name));
        return await Form.updateOne({_id: formId}, formData);
    });
}

/**
 * Create form sections/questions that don't already exist
 * Modify form sections/questions that exist (upsert)
 * 
 * @param {Array[Object]} sections: details about the form sections/question to add.
 */
forms.updateFormSections = async (sections) => {
    return util.handleWrapper(async () => {
        const dbPayload = sections.map(section => {
            return {
                updateOne: {
                    filter: { name: section.name },
                    update: {
                        $set: section,
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

module.exports = forms;