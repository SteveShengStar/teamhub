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
members.getAll = async (fields) => {
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
                query.populate('subteams');
            }
            if (fields['projects']) {
                query.populate('projects');
            }
            return (await query.exec());
        } else {
            return (await (Member.find({})
                .populate('skills')
                .populate('interests')
                .populate('memberType')
                .populate('subteams')
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
members.search = async (body, fields, showToken = false) => {
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
                query.populate('subteams');
            }
            if (fields['projects']) {
                query.populate('projects');
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
                    .populate('subteams')
                    .populate('projects')
                    .select('+token')
                    .exec());
            } else {
                res = await (Member.find(body)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteams')
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

members.add = async (memberBody) => {
    return util.handleWrapper(async () => {
        memberBody = await replaceBodyWithIds(memberBody);
        return await Member.create(memberBody);
    });
};

members.delete = async (body) => {
    return util.handleWrapper(async () => {
        return (await Member.deleteMany(body).exec());
    });
};

members.updateMember = async (filter, body) => {
    return util.handleWrapper(async () => {
        body = await replaceBodyWithIds(body);
        console.log("Body in the Update Member: ");
        console.log(body);
        return (await Member.update(filter, body).exec());
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