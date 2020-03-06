const Member = require('../schema/Member');
const Project = require('../schema/Project');
const Subteam = require('../schema/Subteam');
const Interest = require('../schema/Interest');
const Skill = require('../schema/Skill');
const util = require('./util');

const filters = {};

filters.getAll = async () => {
    return util.handleWrapper(async () => {
        return {
            'Programs': await new Promise((resolve, reject) => {
                Member.find().distinct('program', (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            }),
            'Roles': [],
            'Years': ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'],
            'Skills': await Skill.find({}).exec(),
            'Interests': await Interest.find({}).exec(),
            'Subteams': await Subteam.find({}).exec(),
            'Projects': await Project.find({}).exec()
        };
    });
};

module.exports = filters;
