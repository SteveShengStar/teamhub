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

members.deleteMember = async (memberId) => {
    return (await Member.findByIdAndDelete(memberId))
}

members.updateMember = async (memberId, memberBody) => {
    return (await Member.findByIdAndUpdate(memberId, memberBody));  
};

// members.findBy = async (memberId, memberBody) => {
//     return (await Member.find({}));
// }

module.exports = members;