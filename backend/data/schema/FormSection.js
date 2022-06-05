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
    category: {
        type: String,
        enum: ["text", "numbers", "phone", "checkbox", "radio", "boolean", "longtext", "menu_single", "menu_multi"],
        required: true
    },
    customizable: {
        type: Boolean,
        description: "readonly means admins cannot edit nor remove this form question. edit means admins can edit this form question's description, error text, selectable options, but cannot remove this question from the form. delete means admins can remove this form question from the form.",
        enum: ["readonly", "edit", "delete"]
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