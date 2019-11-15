const data = require('../index');

const testBody = {
    name: 'TeamHub',
    subteam: ['Software']
};

data.init();
data.projects.findOrCreate(testBody);