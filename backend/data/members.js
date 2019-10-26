const Member = require('./schema/Member');

const members = {};

members.getAll = () => {
    Member.find({}, (err, res) => {
        return res;
    });
}

module.exports = members;