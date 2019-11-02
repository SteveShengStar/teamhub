const MemberType = require('../schema/MemberType');

const memberType = {};

memberType.getAll = async () => {
    return (await MemberType.find({}).exec());
};

memberType.search = async (body) => {
    return (await MemberType.find(body).exec());
};

memberType.findOrCreate = async (body) => {
    return (await MemberType.findOneAndUpdate(body, body, { upsert: true, useFindAndModify: false }));
};

module.exports = memberType;