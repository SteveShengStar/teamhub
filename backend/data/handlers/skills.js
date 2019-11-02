const Skill = require('../schema/Skill');

const skills = {};

skills.getAll = async () => {
    return (await Skill.find({}).exec());
};

skills.search = async (body) => {
    return (await Skill.find(body).exec());
};

skills.findOrCreate = async (body) => {
    return (await Skill.findOneAndUpdate(body, body, { upsert: true, useFindAndModify: false }));
};

module.exports = skills;