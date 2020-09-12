const Subteam = require('../schema/Subteam');
const util = require('./util');

const subteam = {};

/**
 * Return all subteams stored in the database.
 */
subteam.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Subteam.find({}).exec());
    });

};

/**
 * body: the filter to apply when retrieving subteam records from the database 
 * 
 * Return only the subteams that satisfy the filter criteria (body)
 */
subteam.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Subteam.find(body).exec()));
    });

};

/**
 * body: the filter to apply when retrieving subteam records from the database 
 * 
 * Return only the subteam that satisfy the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
subteam.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Subteam, body));
    });
};

module.exports = subteam;