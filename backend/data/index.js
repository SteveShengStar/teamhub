const mongoose = require('mongoose');
const config = require('./config.json');
const Member = require('./schema/Member');

const data = {};

data.init = async () => {
    if (!config.url) {
        throw new Error('No URL found in config.');
    }
    await mongoose.connect(config.url, { useNewUrlParser: true });
    console.log("Connected!");
}

data.init();

Member.create({
    first_name: "Testfirst",
    last_name: "Testlast",
    bio: "This is a test bio.",
    skills: ["Test Skill 1", "Test Skill 2", "Test Skill 3"],
    roles: ["Test Role 1", "Test Role 2"],
    email: "testemail@waterloop.ca",
})

module.exports = data;