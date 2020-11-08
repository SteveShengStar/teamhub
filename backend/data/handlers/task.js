const Task = require('../schema/Task');
const Member = require('../schema/Member');
const util = require('./util');

const task = {};
var ObjectID = require('mongodb').ObjectID;

/**
 * Return all tasks stored in the database.
 */
task.get = async (userId) => {
    return util.handleWrapper(async () => {
        const query = Member.find({_id: new ObjectID(userId)})
                            .select("tasks")
                            .populate("tasks");

        return (await query.exec());
    });
};


/**
 * body: the filter to apply when retrieving task records from the database 
 * 
 * Return only the tasks that satisfy the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
task.add = async (body) => {
    return util.handleWrapper(async () => {
        return (await Task.create(body));
    });
};

module.exports = task;