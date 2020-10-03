const MemberType = require('../schema/MemberType');
const util = require('./util');

const memberType = {};


/**
 * Return all member type records in the database.
 */
memberType.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await MemberType.find({}).exec());
    });
};

/**
 * body: the filter criteria to apply when selecting member type records from the database
 * 
 * Return specific member type records that meet the filter criteria (body)
 */
memberType.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await MemberType.find(body).exec());
    });
};

/**
 * body: the filter criteria to apply when selecting member type records
 * 
 * Return specific member type records that meet the filter criteria (body)
 * If no such records exist, then create a new record in the database
 */
memberType.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(MemberType, body));
    });
};

module.exports = memberType;