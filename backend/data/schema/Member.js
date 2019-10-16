const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    first_name: String,
    last_name: String,
    bio: String,
    skills: [String],
    roles: [],
    email: String,
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;