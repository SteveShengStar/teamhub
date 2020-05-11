const util = require('./util');

const filters = {};

filters.getAll = async () => {
    return util.handleWrapper(async () => {
        return {
            'programs': await new Promise((resolve, reject) => {
                Member.find().distinct('program', (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            }),
            'roles': await MemberType.find({}).exec(),
            'years': ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'],
            'skills': await Skill.find({}).exec(),
            'interests': await Interest.find({}).exec(),
            'subteams': await Subteam.find({}).exec(),
            'projects': await Project.find({}).exec()
        };
    });
};

module.exports = filters;
