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
        required: false,
    },
    description: { // TODO: set a character limit later.
        type: String,
        required: false,
    },
    options: { // TODO: set a character limit later.
        type: [String],
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
        type: Boolean,
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