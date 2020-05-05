const mysql = require('mysql');

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

data.connected = false;

data.initIfNotStarted = async () => {
    if (!data.connected) {
        await data.init();
    }
};

data.init = async () => {
    data.mysql = mysql.createConnection(config.db);
    mysql.connect();
    console.log(`Connected to: ${config.url}`);
};

data.close = async () => {
    data.connected = false;
    mysql.end();
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
