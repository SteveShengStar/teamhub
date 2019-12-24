const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String
    }
});

SkillSchema.plugin(uniqueValidator);
let Skill;
try {
    Skill = mongoose.connection.model('Skill');
} catch (e) {
    Skill = mongoose.model('Skill', SkillSchema);
}
module.exports = Skill;