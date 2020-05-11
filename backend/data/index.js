const db = require('./db');

let config = {};

if (process.env.TEAMHUB_ENV === 'testing') {
    // Different connection string required for unit tests
    config = require('./config.tests.json');
} else if (process.env.TEAMHUB_ENV === 'production') {
    config = require('./config.json');
} else {
    config = require('./config.json');
}

const data = {};

data.initIfNotStarted = async () => {
    if (!db.connected) {
        await db.init(config.db);
    }
};

data.init = async () => {
    await db.init(config.db);
};

data.close = async () => {
    await db.close();
};

data.util = require('./handlers/util');
data.members = require('./handlers/members');
data.skills = require('./handlers/skills');
data.memberTypes = require('./handlers/memberTypes');
data.subteams = require('./handlers/subteams');
data.projects = require('./handlers/projects');
data.auth = require('./handlers/auth');
data.filters = require('./handlers/filters');

module.exports = data;
