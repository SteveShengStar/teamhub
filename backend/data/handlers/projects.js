const Project = require('../schema/Project');
const subteams = require('./subteams');
const util = require('./util');

const projects = {};

projects.getAll = async () => {
    return (await Project.find({}).exec());
};

projects.search = async (body) => {
    return (await Project.find(body).exec());
};

projects.findOrCreate = async (body) => {
    body.subteams = (await util.replaceNamesWithIdsArray(body.subteams, subteams));
    return (await Project.findOneAndUpdate(body, body, { upsert: true, useFindAndModify: false }));
};

module.exports = projects;