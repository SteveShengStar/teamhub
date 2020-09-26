const Task = require('../schema/Task');
const util = require('./util');

const task = {};

/**
 * Return all tasks stored in the database.
 */
task.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Task.find({}).exec());
    });

};

/**
 * body: the filter to apply when retrieving task records from the database 
 * 
 * Return only the tasks that satisfy the filter criteria (body)
 */
task.search = async (body) => {
    return util.handleWrapper(async () => {
        return (await (Task.find(body).exec()));
    });

};

/**
 * body: the filter to apply when retrieving subteam records from the database 
 * 
 * Return only the task that satisfies the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
task.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Task, body));
    });
};

module.exports = task;