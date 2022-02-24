const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    phone: {
        type: Number,
        // required: true
    },
    personalEmail: {
        type: String,
        // required: true
    },
    studentId: {
        type: Number,
        // required: true
    },
    termStatus: {
        type: String,
        // required: true
    },
    nextTermActivity: {
        type: String,
        // required: true
    },
    nextTermRole: {
        type: String,
        // required: true
    },
    termComments: {
        type: String,
        required: false
    },
    nextTermWork: {
        type: String,
        required: false
    },
    designCentreSafety: {
        type: Boolean,
        // required: true
    },
    whimis: {
        type: Boolean,
        // required: true
    },
    machineShop: {
        type: Boolean,
        // required: true
    }
});

let UserDetails;
try {
    UserDetails = mongoose.connection.model('UserDetails');
} catch (e) {
    UserDetails = mongoose.model('UserDetails', UserDetailsSchema);
}

module.exports = UserDetails;