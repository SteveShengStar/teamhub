const FormSection = require('../schema/FormSection');
const Form = require('../schema/Form');
const util = require('./util');
const mongoose = require('mongoose');
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
    return util.handleWrapper(async () => {
        console.log('********* raw sections *********')
        console.log(sections)
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
 * @param {Object} formData: form metadata.
 */
forms.createForm = async (formData) => {
    return util.handleWrapper(async () => {
        // TODO: this should be in a transaction.
        forms.updateFormSections(formData.sections);

        console.log('********* formData.sections *********')
        console.log(formData)

        const formSections = await FormSection.find();
        const formSectionNamesByIds = {};
        formSections.map(
            s => {
                formSectionNamesByIds[s.name] = s._id;
            }
        );

        formData.sections = formData.sections
            .map(s => {
                return {
                    required: s.required,
                    position: s.position,
                    section: formSectionNamesByIds[s.name],
                }
            });
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
        forms.updateFormSections(formData.sections);

        const formSections = await FormSection.find();
        const formSectionNamesByIds = {};
        formSections.map(
            s => {
                formSectionNamesByIds[s.name] = s._id;
            }
        );

        // Disassociate form sections that were deleted
        const sectionNames = Object.keys(formSectionNamesByIds);
        formData.sections = formData.sections.filter(s => sectionNames.includes(s.name))
            .map(s => {
                return {
                    required: s.required,
                    position: s.position,
                    section: formSectionNamesByIds[s.name],
                }
            });
        console.log('********* formData.sections *********')
        console.log(formData)
        return await Form.updateOne({_id: formId}, _.omit(formData, '_id'));
    });
}

module.exports = forms;