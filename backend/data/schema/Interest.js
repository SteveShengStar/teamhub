const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const InterestSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
    },
});

InterestSchema.plugin(uniqueValidator);

let Interest;
try {
    Interest = mongoose.connection.model('Interest');
} catch (e) {
    Interest = mongoose.model('Interest', InterestSchema);
}

module.exports = Interest;
