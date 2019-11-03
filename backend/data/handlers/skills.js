const Skill = require('../schema/Skill');
const util = require('./util');

const skills = {};

skills.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await (Skill.find({}).exec()));
    });
    
};

skills.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Skill.find(body).exec()));
    });
    
};

skills.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Skill, body));
    });
    
};

module.exports = skills;