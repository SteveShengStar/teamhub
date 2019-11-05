const Project = require('../schema/Project');
const subteams = require('./subteams');
const util = require('./util');

const projects = {};

projects.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await (Project.find({}).exec()));
    });

};

projects.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Project.find(body).exec()));
    });

};

projects.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        body.subteams = (await (util.replaceNamesWithIdsArray(body.subteams, subteams)));
        return (await util.findOrCreate(Project, body));
    });

};

module.exports = projects;