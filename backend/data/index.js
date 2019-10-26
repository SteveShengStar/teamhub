const mongoose = require('mongoose');
const config = require('./config.json');

const data = {};

data.init = async () => {
    if (!config.url) {
        throw new Error('No URL found in config.');
    }
    await mongoose.connect(config.url, { useNewUrlParser: true });
    console.log('Connected!');
};

data.members = require('./members');

module.exports = data;