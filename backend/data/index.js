const mongoose = require('mongoose');
const config = require('./config.json');

const data = {};

data.init = () => {
    if (!config.url) {
        throw new Error('No URL found in config.');
    }
    mongoose.connect(config.url, { useNewUrlParser: true });
}

module.exports = data;