const Member = require('./schema/Member');

const members = {};

members.getAll = async () => {
    return (await Member.find({}).exec());
}

module.exports = members;