const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const FormSectionDetails = new Schema({
    section: {
        type: Schema.Types.ObjectId,
        ref: 'FormSection',
        required: true
    },
    position: {
        type: Number,
        required: true
    }
});

const FormSchema = new Schema({ 
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    sections: [{
        type: FormSectionDetails
    }],
    createdDate: {
        type: String,
        required: false, // TODO: make this true later.
    },
    lastEdited: {
        type: String,
        required: false,
    }
});

FormSchema.plugin(uniqueValidator);

let Form;
try {
    Form = mongoose.connection.model('Form');
} catch (e) {
    Form = mongoose.model('Form', FormSchema);
}
module.exports = Form;