const Subteam = require('../schema/Subteam');
const util = require('./util');

const subteam = {};

subteam.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Subteam.find({}).exec());
    });

};

subteam.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Subteam.find(body).exec()));
    });

};

subteam.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Subteam, body));
    });
};

module.exports = subteam;