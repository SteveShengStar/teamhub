const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema(
    {
        phoneNumber: {
            type: Number,
        },
        personalEmail: {
            type: String,
        },
        studentId: {
            type: Number,
        },
        termStatus: {
            type: String,
        },
        nextTermActivity: {
            type: String,
        },
        nextTermRole: {
            type: String,
        },
        nextSchoolTerm: {
            type: String,
            required: false,
        },
        termComments: {
            type: String,
            required: false,
        },
        desiredWork: {
            type: String,
            required: false,
        },
        designCentreSafety: {
            type: Boolean,
        },
        whmis: {
            type: Boolean,
        },
        machineShop: {
            type: Boolean,
        },
    },
    { strict: false }
);

let UserDetails;
try {
    UserDetails = mongoose.connection.model('UserDetails');
} catch (e) {
    UserDetails = mongoose.model('UserDetails', UserDetailsSchema);
}

module.exports = UserDetails;
