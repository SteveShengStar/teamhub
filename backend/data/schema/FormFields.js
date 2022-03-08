const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

/**
 * MongoDB collection for Form Sections (each section asks a question which the user must fill in and answer)
 */
const FormFieldsSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true
    },
    display: {
        type: String,
        required: true,
    },
    description: { // TODO: set a character limit later.
        type: String,
        required: false,
    },
    possibleValues: { // TODO: set a character limit later.
        type: Array[String],
        required: false,
    },
    category: {
        type: String,
        enum: ["textbox", "checkbox", "radio", "longtext", "multisel", "menu"],
        default: "textbox"
    },
    required: {
        type: Boolean,
        default: false
    },
});

FormFieldsSchema.plugin(uniqueValidator);

let FormFields;
try {
    FormFields = mongoose.connection.model('FormFields');
} catch (e) {
    FormFields = mongoose.model('FormFields', FormFieldsSchema);
}
module.exports = FormFields;