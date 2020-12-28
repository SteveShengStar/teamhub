const Subteam = require('../schema/Subteam');
const util = require('./util');

const subteam = {};

/**
 * Return all subteams stored in the database.
 */
subteam.getAll = async () => {
    return util.handleWrapper(async () => {
        return (await Subteam.find({}).exec());
    });
};

/**
 * body: the filter to apply when retrieving subteam records from the database 
 * fields: fields to return
 * 
 * Return only the subteams that satisfy the filter criteria (body)
 */
subteam.search = async (body, fields = {}) => {
    return util.handleWrapper(async () => {
        return (await (Subteam.find(body).select(fields).exec()));
    });
};

/**
 * body: the filter to apply when retrieving subteam records from the database 
 * 
 * Return only the subteam that satisfy the filter criteria (body).
 * If no such records exist, then create a new database entry.
 */
subteam.findOrCreate = async (body) => {
    return util.handleWrapper(async () => {
        return (await util.findOrCreate(Subteam, body));
    });
};

/**
 * Make certain Subteams reference the new task that was created
 * 
 * subteams: the IDs of subteams that will reference the new task
 * newTask: the new task's ID
 */
subteam.addTaskReference = async (subteams, newTaskID) => {
    return util.handleWrapper(async () => {
        return (await Subteam.updateMany( {_id: {$in: subteams}}, { $push: { tasks: newTaskID }} ));
    });
};

/**
 * From the Subteam collection/table, remove references to specified task records
 * 
 * subteams: the IDs of subteams from which we want to remove the task references
 * taskIds: IDs of tasks we want to delete
 */
subteam.deleteTaskReference = async (subteams, taskIds) => {
    if (!subteams) {
        return util.handleWrapper(async () => {
            return (await Subteam.updateMany( {}, {$pull: {tasks: {$in: taskIds} }} ));
        });
    }
    return util.handleWrapper(async () => {
        return (await Subteam.updateMany( {_id: {$in: subteams}}, {$pull: {tasks: {$in: taskIds} }} ));
    });
};


module.exports = subteam;