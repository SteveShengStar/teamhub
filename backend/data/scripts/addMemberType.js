const data = require('../index');

const testBody = {
    name: 'Alum'
};

data.init();
data.memberTypes.findOrCreate(testBody);