const data = require('../index');

const testBody = {
    name: 'Exec'
};

data.init();
data.subteam.findOrCreate(testBody);