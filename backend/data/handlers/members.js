const mongoose = require('mongoose');

const Member = require('../schema/Member');
const UserDetails = require('../schema/UserDetails');
const skills = require('./skills');
const interests = require('./interests');
const memberTypes = require('./memberTypes');
const projects = require('./projects');
const subteams = require('./subteams');
const util = require('./util');
const _ = require('lodash');

const db = mongoose.connection;

const members = {};

/**
 * Return all members and their associated information.
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
 * Returns all members (and their associated information) that match the filter criteria specified in input params
 * 
 * @param {Object} filter: selection criteria for selecting members to return (ie. {email: 'steven.x@waterloop.ca'} return the member with 'steven.x@waterloop.ca' as email)
 * @param {Object} fields: specifies which fields to return
 * @param {boolean} showToken: whether or not to return the access token and expiry date of token
 * @param {boolean} returnSubteamTaskList: whether or not to return the tasks that should be completed by the member(s)
 * 
 */
members.search = async (filter, fields, showToken = false, returnSubteamTaskList = false) => {
    return util.handleWrapper(async () => {
        const searchByDisplayName = filter ? filter.displayName : null;
        if (searchByDisplayName) {
            delete filter.displayName;
        }
        if (fields) {
            const query = Member.find(filter).select(fields);
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
                res = await (Member.find(filter)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteams', returnSubteamTaskList ? '' : '-tasks')
                    .populate('projects')
                    .select('+token')
                    .exec());
            } else {
                res = await (Member.find(filter)
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
 * @param {Object} filter: selection criteria for selecting which members to give the new task to
 * @param {Object} newTask: details describing the new task
 */
members.assignTaskToAllMembers = async (filter, newTask) => {
    return util.handleWrapper(async () => {
        return await Member.updateMany( filter, { $push: { tasks: newTask }} );
    });
}

/**
 * Add a new user to the database
 * 
 * @param {Object} userPayload:    the new user's details
 */
members.add = async (userPayload) => {
    return util.handleWrapper(async () => {
        // Get fields stored in the Member collection.
        const userSummaryFields = Object.keys(Member.schema.paths);
        // Get fields stored in the UserDetails collection.
        const userDetailFields = Object.keys(UserDetails.schema.paths);
        // Extract only the fields relevant to the Member collection.
        let userSummary = _.omit(_.pick(userPayload, userSummaryFields), "_id");
        // Extract only the fields relevant to the UserDetails collection.
        let userDetails = _.omit(_.pick(userPayload, userDetailFields), "_id");

        const session = await db.startSession();
        const response = await session.withTransaction(async () => {
            const userDetailsResponse = await UserDetails.create(userDetails).session(session);
            userSummary.miscDetails = userDetailsResponse._id;
            userSummary = await replacePayloadWithIds(userSummary);
            const res = await Member.create(userSummary).session(session);
            return res;
        });
        session.endSession();
        return response;
    });
};

/**
 * Delete members from the database
 * 
 * @param {Object} filter: details about which member(s) to delete
 */
members.delete = async (filter) => {
    return util.handleWrapper(async () => {
        const userDetailRecordsToDelete = (await Member.find(filter).exec()).map(r => r.miscDetails);
        const session = await db.startSession();
        const res = await session.withTransaction(async () => {
            const deletedRecords = await Member.deleteMany(filter).session(session).exec();
            if (userDetailRecordsToDelete.length > 0) {
                await UserDetails.deleteMany({_id: {$in: userDetailRecordsToDelete}}).session(session).exec();
            }
            return deletedRecords;
        });
        session.endSession();
        return res;
    });
};

/**
 * Update data for a single member only
 * 
 * @param {filter}: Details about which member/user-record to update
 * @param {payload}: The new info. for the member
 */
members.updateMember = async (filter, payload) => {
    // Get fields stored in the Member collection.
    const memberFields = Object.keys(Member.schema.paths);
    // Get fields stored in the UserDetails collection.
    const userDetailFields = Object.keys(UserDetails.schema.paths);
    // Extract only the fields relevant to the Member collection.
    let memberSummary = _.omit(_.pick(payload, memberFields), "_id");
    // Extract only the fields relevant to the UserDetails collection.
    let memberDetails = _.omit(_.pick(payload, userDetailFields), "_id");

    return util.handleWrapper(async () => {
        const session = await db.startSession();
        const res = await session.withTransaction(async () => {
            if (!_.isEmpty(memberSummary)) {
                memberSummary = await replacePayloadWithIds(memberSummary);
                await Member.updateOne(filter, memberSummary).session(session).exec();
            } 
            if (!_.isEmpty(memberDetails)) {
                const records = await Member.find(filter).select(["miscDetails"]).session(session).exec();
                if (records?.length > 0) {
                    const {miscDetails: memberDetailsId} = records[0];
                    await UserDetails.updateOne({_id: memberDetailsId}, memberDetails).session(session).exec();
                }
            }
        });
        session.endSession();
        return res;
    });
};

/**
 * Update data for all members
 */
members.updateAllMembers = async (payload) => {
    return util.handleWrapper(async () => {
        payload = await replacePayloadWithIds(payload);
        return (await Member.updateMany({}, payload).exec());
    });
};

/**
 * Update the status of a task for a single member
 * 
 * @param {Object} filter: Selection criteria for the member to update 
    Example) {  _id: req.query.id, 
                "tasks": { "$elemMatch": { "_id": req.body.taskId } }
             }
 * @param {Object} payload: The new status of the task          
    Exapmle) { "tasks.$.status": req.body.status }
 */
members.updateTaskStatus = async (filter, payload) => {
    return util.handleWrapper(async () => {
        return (await Member.updateOne(filter, {"$set" : payload}, { runValidators: true }).exec());
    });
};

const replacePayloadWithIds = async (payload) => {
    if (payload.interests) {
        if (Array.isArray(payload.interests)) {
            payload.interests = await util.replaceNamesWithIdsArray(payload.interests, interests);
        } else {
            throw Error('interests field must be empty or an array.');
        }
    }

    if (payload.skills) {
        if (Array.isArray(payload.skills)) {
            payload.skills = await util.replaceNamesWithIdsArray(payload.skills, skills);
        } else {
            throw Error('skills field must be empty or an array.');
        }
    }

    if (payload.subteams) {
        if (Array.isArray(payload.subteams)) {
            payload.subteams = await util.replaceNamesWithIdsArray(payload.subteams, subteams);
        } else {
            throw Error('subteams field must be empty or an array.');
        }
    }

    payload.memberType ? payload.memberType = await util.replaceNameWithId(payload.memberType, memberTypes) : null;

    if (payload.projects) {
        if (Array.isArray(payload.projects)) {
            for (let i = 0; i < payload.projects.length; i++) {
                payload.projects[i] = await util.replaceNameWithId(payload.projects[i], projects);
            }
        } else {
            throw Error('projects field must be empty or an array.');
        }
    }

    return payload;
};

module.exports = members;