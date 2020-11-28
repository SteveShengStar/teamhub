const Member = require('../schema/Member');
const skills = require('./skills');
const interests = require('./interests');
const memberTypes = require('./memberTypes');
const projects = require('./projects');
const subteams = require('./subteams');
const util = require('./util');

const members = {};

/**
 * Return all members (and their associated information) from the database.
 */
members.getAll = async (fields, returnSubteamTaskList = false) => {
    return util.handleWrapper(async () => {
        if (fields) {
            const query = Member.find({}).select(fields);
            if (fields['skills']) {
                query.populate('skills');
            }
            if (fields['interests']) {
                query.populate('interests');
            }
            if (fields['memberType']) {
                query.populate('memberType');
            }
            if (fields['subteams']) {
                query.populate('subteams', returnSubteamTaskList ? '' : '-tasks');
            }
            if (fields['projects']) {
                query.populate('projects');
            }
            return (await query.exec());
        } else {
            if (!returnSubteamTaskList) {
                return (await (Member.find({})
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteams', returnSubteamTaskList ? '' : '-tasks')
                    .populate('projects')
                    .exec()));
            }
            return (await (Member.find({})
                .populate('skills')
                .populate('interests')
                .populate('memberType')
                .populate('subteams', returnSubteamTaskList ? '' : '-tasks')
                .populate('projects')
                .exec()));
        }
    });
};

/** 
 * Input arguments
 * body: Filters (ie. specific subteam, specific name, specific email) used to select certain member(s)
 * 
 * Return all members (and their associated information) that match the criteria specified in body.
 */
members.search = async (body, fields, showToken = false, returnSubteamTaskList = false) => {
    return util.handleWrapper(async () => {
        const searchByDisplayName = body ? body.displayName : null;
        if (searchByDisplayName) {
            delete body.displayName;
        }
        if (fields) {
            const query = Member.find(body).select(fields);
            if (fields['skills']) {
                query.populate('skills');
            }
            if (fields['interests']) {
                query.populate('interests');
            }
            if (fields['memberType']) {
                query.populate('memberType');
            }
            if (fields['subteams']) {
                query.populate('subteams', returnSubteamTaskList ? '' : '-tasks');
            }
            if (fields['projects']) {
                query.populate('projects');
            }
            if (fields['tasks']) {
                query.populate('tasks');
            }
            if (showToken) {
                query.select('+token');
            }
            let res = (await query.exec());
            if (searchByDisplayName) {
                res = res.filter(function (entry) {
                    return entry.name.display === searchByDisplayName;
                }).pop();
            }
            return res;
        } else {
            let res;
            if (showToken) {
                res = await (Member.find(body)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteams', returnSubteamTaskList ? '' : '-tasks')
                    .populate('projects')
                    .select('+token')
                    .exec());
            } else {
                res = await (Member.find(body)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteams', returnSubteamTaskList ? '' : '-tasks')
                    .populate('projects')
                    .exec());
            }
            if (searchByDisplayName) {
                res = res.filter(function (entry) {
                    return entry.name.display === searchByDisplayName;
                }).pop();
            }
            return res;
        }
    });
};

/**
 * Assign a task to all members
 * 
 * filter: selection criteria for the member to assign the task to
 * body: the details describing the new task
 */
members.assignTaskToAllMembers = async (filter, newTask) => {
    return util.handleWrapper(async () => {
        return await Member.updateMany( filter, { $push: { tasks: newTask }} );
    });
}

/**
 * Add a new member to the database
 * 
 * memberBody: details describing the new member
 */
members.add = async (memberBody) => {
    return util.handleWrapper(async () => {
        memberBody = await replaceBodyWithIds(memberBody);
        return await Member.create(memberBody);
    });
};

/**
 * Delete members from the database
 * 
 * body: details that describe the members to be deleted
 */
members.delete = async (body) => {
    return util.handleWrapper(async () => {
        return (await Member.deleteMany(body).exec());
    });
};

/**
 * Update data for a single member only
 */
members.updateMember = async (filter, body, options) => {
    if (options) {
        return util.handleWrapper(async () => {
            body = await replaceBodyWithIds(body);
            console.log("Body")
            console.log(body);
            console.log("Filter")
            console.log(filter);
            return (await Member.updateOne(filter, body, options).exec());
        });
    } else {
        return util.handleWrapper(async () => {
            body = await replaceBodyWithIds(body);
            console.log("Body")
            console.log(body);
            console.log("Filter")
            console.log(filter);
            return (await Member.updateOne(filter, body).exec());
        });
    }
};

/**
 * Update the status of a task for a single member
 * 
 * filter: selection criteria for the record to update -- Example) { _id: req.query.id, 
 *                                                                   "tasks": {
                                                                        "$elemMatch": {
                                                                            "_id": req.body.taskId
                                                                        }
                                                                    }}, 
 * body: contains the new status of the task           -- Exapmle) {"tasks.$.status": req.body.status}
 */
members.updateTaskStatus = async (filter, body) => {
    return util.handleWrapper(async () => {
        return (await Member.updateOne(filter, {"$set" : body}, { runValidators: true }).exec());
    });
};

const replaceBodyWithIds = async (body) => {
    if (body.interests) {
        if (Array.isArray(body.interests)) {
            body.interests = await util.replaceNamesWithIdsArray(body.interests, interests);
        } else {
            throw Error('interests field must be empty or an array.');
        }
    }

    if (body.skills) {
        if (Array.isArray(body.skills)) {
            body.skills = await util.replaceNamesWithIdsArray(body.skills, skills);
        } else {
            throw Error('skills field must be empty or an array.');
        }
    }

    if (body.subteams) {
        if (Array.isArray(body.subteams)) {
            body.subteams = await util.replaceNamesWithIdsArray(body.subteams, subteams);
        } else {
            throw Error('subteams field must be empty or an array.');
        }
    }

    body.memberType ? body.memberType = await util.replaceNameWithId(body.memberType, memberTypes) : null;

    if (body.projects) {
        if (Array.isArray(body.projects)) {
            for (let i = 0; i < body.projects.length; i++) {
                body.projects[i] = await util.replaceNameWithId(body.projects[i], projects);
            }
        } else {
            throw Error('projects field must be empty or an array.');
        }
    }

    return body;
};

module.exports = members;