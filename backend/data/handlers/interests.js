const Interest = require('../schema/Interest');
const util = require('./util');

const interests = {};

interests.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Interest.find({}).exec());
    });
};

interests.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await Interest.find(body).exec());
    });
};

interests.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Interest, body));
    });
};

module.exports = interests;