const Member = require('./schema/Member');

const members = {};

members.getAll = async () => {
    return (await Member.find({}).exec());
};

members.getMember = async (memberId) => {
    return (await Member.findById(memberId).exec());
};

members.addMember = async (memberBody) => {
    return (await Member.create(memberBody));
};

module.exports = members;