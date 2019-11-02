const Member = require('../schema/Member');
const skills = require('./skills');
const interests = require('./interests');
const memberTypes = require('./memberTypes');
const projects = require('./projects');
const subteams = require('./subteams');
const util = require('./util');

const members = {};

members.getAll = async () => {
    return (await Member.find({})
        .populate('skills')
        .populate('interests')
        .populate('memberType')
        .populate('subteam')
        .populate('project')
        .exec());
};

members.search = async (body) => {
    return (await Member.find(body).exec());
};

members.add = async (memberBody) => {
    memberBody.interests = await util.replaceNamesWithIdsArray(memberBody.interests, interests);
    memberBody.skills = await util.replaceNamesWithIdsArray(memberBody.skills, skills);
    memberBody.memberType = await util.replaceNameWithId(memberBody.memberType, memberTypes);
    memberBody.subteam = await util.replaceNameWithId(memberBody.subteam, subteams);
    memberBody.project = await util.replaceBodyWithId(memberBody.project, projects);
    return (await Member.create(memberBody));
};

module.exports = members;