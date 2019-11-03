const MemberType = require('../schema/MemberType');
const util = require('./util');

const memberType = {};

memberType.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await MemberType.find({}).exec());
    });
};


memberType.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await MemberType.find(body).exec());
    });
};

memberType.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(MemberType, body));
    });
};

module.exports = memberType;