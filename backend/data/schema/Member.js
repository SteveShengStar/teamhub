const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const Member_Stream = new Schema({
    isCoop: {
        type: Boolean,
        required: true
    },
    onStream: {
        type: Boolean,
        required: true
    },
    coopStream: {
        type: Map,
        of: Boolean
    },
    currentSchoolTerm: {
        type: String,
        required: true
    }
});

const Member_TermSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        required: true,
        enum: ['Fall', 'Winter', 'Spring']
    },
});

const Member_ProjectSchema = new Schema({
    project: {
        type: String,
        required: true
    },
    description: {
        type: [String]
    }
});

const Member_CoopExpSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: new Schema({
        city: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    }),
    term: Member_TermSchema
});

const Member_NameSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    display: {
        type: String
    },
});

const Member_Birthday = new Schema({
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    }
});

const Member_Link = new Schema({
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});


const MemberSchema = new Schema({
    name: {
        type: Member_NameSchema,
        required: true,
    },
    program: {
        type: String
    },
    bio: {
        type: String
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'Interest'
    }],
    joined: {
        type: Member_TermSchema,
    },
    coopExp: {
        type: [Member_CoopExpSchema],
    },
    memberType: {
        type: Schema.Types.ObjectId,
        ref: 'MemberType'
    },
    subteam: {
        type: [Schema.Types.ObjectId],
        ref: 'Subteam',
    },
    projects: {
        type: [Member_ProjectSchema]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    stream: {
        type: Member_Stream
    },
    imageUrl: {
        type: String
    },
    age: {
        type: Number,
    },
    birthday: {
        type: Member_Birthday
    },
    links: {
        type: [Member_Link]
    },
    token: {
        type: String,
        select: false
    },
    tokenExpiry: {
        type: Number,
        select: false
    }
});

MemberSchema.plugin(uniqueValidator);

let Member;
try {
    Member = mongoose.connection.model('Member');
} catch (e) {
    Member = mongoose.model('Member', MemberSchema);
}

module.exports = Member;