const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    bio: { type: String },
    skills: { type: [String] },
    roles: { type: [String] },
    email: { type: String, required: true, unique: true },
});

MemberSchema.plugin(uniqueValidator)

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;