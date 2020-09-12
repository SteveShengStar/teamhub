const Skill = require('../schema/Skill');
const util = require('./util');

const skills = {};

/**
 * Return all skills stored in the database.
 */
skills.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await (Skill.find({}).exec()));
    });
    
};


/**
 * body: the filter to apply when retrieving skill records from the database 
 * 
 * Return only the skills that satisfy the filter criteria (body)
 */
skills.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Skill.find(body).exec()));
    });
    
};

/**
 * body: the filter to apply when retrieving skill records from the database 
 * 
 * Return only the skills that satisfy the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
skills.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Skill, body));
    });
    
};

module.exports = skills;