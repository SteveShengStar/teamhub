const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subteams: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subteam',
    }],
});

ProjectSchema.plugin(uniqueValidator);

let Project;
try {
    Project = mongoose.connection.model('Project');
} catch (e) {
    Project = mongoose.model('Project', ProjectSchema);
}

module.exports = Project;