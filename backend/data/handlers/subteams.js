const Subteam = require('../schema/Subteam');

const subteam = {};

subteam.getAll = async () => {
    return (await Subteam.find({}).exec());
};

subteam.search = async (body) => {
    return (await Subteam.find(body).exec());
};

subteam.findOrCreate = async (body) => {
    return (await Subteam.findOneAndUpdate(body, body, { upsert: true, useFindAndModify: false }));
};

module.exports = subteam;