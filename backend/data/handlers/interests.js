const Interest = require('../schema/Interest');

const interests = {};

interests.getAll = async () => {
    return (await Interest.find({}).exec());
};

interests.search = async (body) => {
    return (await Interest.find(body).exec());
};

interests.findOrCreate = async (body) => {
    return (await Interest.findOneAndUpdate(body, body, { upsert: true, useFindAndModify: false }));
};

module.exports = interests;