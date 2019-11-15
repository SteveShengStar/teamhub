const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SubteamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

SubteamSchema.plugin(uniqueValidator);

const Subteam = mongoose.model('Subteam', SubteamSchema);

module.exports = Subteam;