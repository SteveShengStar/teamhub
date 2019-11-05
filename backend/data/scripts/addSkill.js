const data = require('../index');

const testBody = {
    name: 'MongoDB',
    category: 'Software'
};

data.init();
data.skills.add(testBody);