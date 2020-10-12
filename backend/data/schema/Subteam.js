const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const task = require('./Task');

const Schema = mongoose.Schema;

const SubteamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }, 
    tasks: {
        type: [task.TaskSchema]
    }
});

SubteamSchema.plugin(uniqueValidator);
let Subteam;
try {
    Subteam = mongoose.connection.model('Subteam');
} catch (e) {
    Subteam = mongoose.model('Subteam', SubteamSchema);
}
module.exports = Subteam;