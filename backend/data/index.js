const mongoose = require('mongoose');

const env = process.env.NODE_ENV;

let config = require('./config.json');
if(env === 'testing') {
    // Different connection string required for unit tests
    config = require('./config.tests.json');
}

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

    console.log(`Connected to: ${config.url}`);
};

data.close = async () => {
    await mongoose.disconnect();
};

data.util = require('./handlers/util');
data.members = require('./handlers/members');
data.skills = require('./handlers/skills');
data.memberTypes = require('./handlers/memberTypes');
data.subteams = require('./handlers/subteams');
data.projects = require('./handlers/projects');
data.auth = require('./handlers/auth');

module.exports = data;