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

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;