const Interest = require('../schema/Interest');
const util = require('./util');

const interests = {};


/**
 * Return all interests stored in the database.
 */
interests.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Interest.find({}).exec());
    });
};

/**
 * body: the filter criteria for selecting particular "interests"
 * 
 * Return all interests that meet the filter criteria (body)
 */
interests.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await Interest.find(body).exec());
    });
};

/**
 * body: the filter criteria for selecting particular "interests"
 * 
 * Return all interests that meet the filter criteria (body).
 * If no such record exists, then create a new database entry.
 */
interests.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Interest, body));
    });
};

module.exports = interests;