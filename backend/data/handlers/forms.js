const FormSection = require('../schema/FormSection');
const Form = require('../schema/Form');
const util = require('./util');
const mongoose = require('mongoose');

const forms = {};

/**
 * Update a form's metadata.
 * 
 * @param {} formId: ID of the form.
 * @param {Object} formData: new metadata for the form.
 */
forms.fetchFormData = async (formId) => {
    return util.handleWrapper(async () => {
        return await Form.find({_id: formId})
            .select(['title', 'description', 'sections'])
            .populate('sections');
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
                section: new mongoose.Types.ObjectId(s.section),
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
        return await Form.updateOne({_id: formId}, formData);
    });
}

/**
 * Add multiple form questions/sections.
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