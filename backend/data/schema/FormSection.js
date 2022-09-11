const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const FormSectionSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true
    },
    display: {
        type: String,
        required: true,
    },
    placeholderText: {
        type: String,
        required: false,
    },
    errorText: {
        type: String,
        description: 'Custom error message shown when user answers this question wrong.',
        required: false,
    },
    description: { // TODO: set a character limit later.
        type: String,
        description: 'Help text to display to the user.',
        required: false,
    },
    options: { // TODO: set a character limit later.
        type: [String],
        description: 'Possible options (for checkbox questions, dropdown menus, etc.) the user can select.',
        required: false,
    },
    maxLength: {
        type: Number,
        description: "Maximum character limit for answers to this form question.",
        required: false
    },
    type: {
        type: String,
        enum: ["text", "numbers", "phone", "checkbox", "radio", "boolean", "longtext", "menu_single", "menu_multi"],
        required: true
    },
    customizable: {
        type: String,
        description: "delete means the section can be deleted. edit means the section can be edited, but not deleted.",
        enum: ["edit", "delete"]
    }
});

FormSectionSchema.plugin(uniqueValidator);

let FormSection;
try {
    FormSection = mongoose.connection.model('FormSection');
} catch (e) {
    FormSection = mongoose.model('FormSection', FormSectionSchema);
}
module.exports = FormSection;