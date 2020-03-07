const Member = require('../schema/Member');
const skills = require('./skills');
const interests = require('./interests');
const memberTypes = require('./memberTypes');
const projects = require('./projects');
const subteams = require('./subteams');
const util = require('./util');

const members = {};

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
            if (fields['subteam']) {
                query.populate('subteam');
            }
            if (fields['project']) {
                query.populate('project');
            }
            return (await query.exec());
        } else {
            return (await (Member.find({})
                .populate('skills')
                .populate('interests')
                .populate('memberType')
                .populate('subteam')
                .populate('project')
                .exec()));
        }
    });
};


members.search = async (body, fields, showToken = false) => {
    return util.handleWrapper(async () => {
        const searchByDisplayName = body.displayName;
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
            if (fields['subteam']) {
                query.populate('subteam');
            }
            if (fields['project']) {
                query.populate('project');
            }
            if (showToken) {
                query.select('+token');
            }
            return (await query.exec());
        } else {
            let res;
            if (showToken) {
                res = await (Member.find(body)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteam')
                    .populate('project')
                    .select('+token')
                    .exec());
            } else {
                res = await (Member.find(body)
                    .populate('skills')
                    .populate('interests')
                    .populate('memberType')
                    .populate('subteam')
                    .populate('project')
                    .exec());
            }
            if (searchByDisplayName) {
                res = res.name.filter(function (name) {
                    return name.display === searchByDisplayName;
                }).pop();
            }
            return res;
        }
    });
};

members.add = async (memberBody) => {
    return util.handleWrapper(async () => {
        memberBody.interests = await util.replaceNamesWithIdsArray(memberBody.interests, interests);
        memberBody.skills = await util.replaceNamesWithIdsArray(memberBody.skills, skills);
        memberBody.memberType = await util.replaceNameWithId(memberBody.memberType, memberTypes);
        memberBody.subteams = await util.replaceNamesWithIdsArray(memberBody.subteams, subteams);
        if (memberBody.projects) {
            for (let i = 0; i < memberBody.projects.length; i++) {
                memberBody.projects[i].project = await util.replaceNameWithId(memberBody.projects[i].project, projects);
            }
        }
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
        body.interests ? body.interests = await util.replaceNamesWithIdsArray(body.interests, interests) : null;
        body.skills ? body.skills = await util.replaceNamesWithIdsArray(body.skills, skills) : null;
        body.memberType ? body.memberType = await util.replaceNameWithId(body.memberType, memberTypes) : null;
        body.subteams ? body.subteams = await util.replaceNamesWithIdsArray(body.subteams, subteams) : null;
        if (body.projects) {
            for (let i = 0; i < body.projects.length; i++) {
                body.projects[i].project = await util.replaceNameWithId(body.projects[i].project, projects);
            }
        }
        return (await Member.update(filter, body).exec());
    });
};

module.exports = members;