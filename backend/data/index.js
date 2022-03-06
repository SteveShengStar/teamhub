const mongoose = require('mongoose');

let config = {};

config.url = process.env.MONGO_URL;

const data = {};

data.connected = false;

data.initIfNotStarted = async () => {
    if (!data.connected) {
        await data.init();
    }
};

data.init = async () => {
    if (!config.url) {
        throw new Error('No URL found in config.');
    }

    console.log(`Disconnecting from db just in case!`);
    await mongoose.disconnect();
    data.connected = false;

    await mongoose.connect(config.url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    data.connected = true;

    console.log(`Connected to: ${config.url}`);
};

data.close = async () => {
    await mongoose.disconnect();
    data.connected = false;
};

data.util = require('./handlers/util');
data.members = require('./handlers/members');
data.skills = require('./handlers/skills');
data.memberTypes = require('./handlers/memberTypes');
data.subteams = require('./handlers/subteams');
data.projects = require('./handlers/projects');
data.auth = require('./handlers/auth');
data.filters = require('./handlers/filters');
data.task = require('./handlers/task');
data.calendar = require('./handlers/calendar')

module.exports = data;
