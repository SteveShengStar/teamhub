const mongoose = require('mongoose');
const config = require('./config.json');

const data = {};

data.init = async () => {
    if (!config.url) {
        throw new Error('No URL found in config.');
    }
    await mongoose.connect(config.url, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Connected!');
};

data.util = require('./handlers/util');
data.members = require('./handlers/members');
data.skills = require('./handlers/skills');
data.memberTypes = require('./handlers/memberTypes');
data.subteams = require('./handlers/subteams');
data.projects = require('./handlers/projects');

module.exports = data;