const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const MemberTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

MemberTypeSchema.plugin(uniqueValidator);

const MemberType = mongoose.model('MemberType', MemberTypeSchema);

module.exports = MemberType;