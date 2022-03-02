const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    phone: {
        type: Number
    },
    personalEmail: {
        type: String
    },
    studentId: {
        type: Number
    },
    termStatus: {
        type: String
    },
    nextTermActivity: {
        type: String
    },
    nextTermRole: {
        type: String
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
        type: Boolean
    },
    whimis: {
        type: Boolean
    },
    machineShop: {
        type: Boolean
    }
});

let UserDetails;
try {
    UserDetails = mongoose.connection.model('UserDetails');
} catch (e) {
    UserDetails = mongoose.model('UserDetails', UserDetailsSchema);
}

module.exports = UserDetails;