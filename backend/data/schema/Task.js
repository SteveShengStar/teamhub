const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const DocumentLinksSchema  = new Schema({
    displayTitle: String,
    url: String
});

const TaskSchema  = new Schema({
    title: String,
    description: {
        type: String,
        required: true 
    },
    searchBarPlaceholderTexts: [String],
    documentLinks: [DocumentLinksSchema],
    subteams: [{
        type: Schema.Types.ObjectId,
        ref: 'Subteam',
    }],
    status: {
        type: String,
        required: true,
        enum: ["urgent", "pending", "done"]
    }
});

TaskSchema.plugin(uniqueValidator);

let Task;
try {
    Task = mongoose.connection.model('Task');
} catch (e) {
    Task = mongoose.model('Task', TaskSchema);
}

module.exports = Task;