const Project = require('../schema/Project');
const util = require('./util');

const projects = {};

/**
 * Return all projects stored in the database.
 */
projects.getAll = async () => {
    return util.handleWrapper(async () => {
        return await Project.find({}).exec();
    });
};

/**
 * body: the filter to apply when retrieving project records from the database
 *
 * Return only the projects that satisfy the filter criteria (body)
 */
projects.search = async (body) => {
    return util.handleWrapper(async () => {
        return await Project.find(body).exec();
    });
};

/**
 * body: the filter to apply when retrieving project records from the database
 *
 * Return only the projects that satisfy the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
projects.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return await util.findOrCreate(Project, body);
    });
};

module.exports = projects;
