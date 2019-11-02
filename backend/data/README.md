# Format for Data
```json
{
    "name": {
        type: Member_NameSchema,
        required: true,
    },
    bio: {
        type: String
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    joined: {
        type: Member_TermSchema,
        required: true
    },
    coopExp: {
        type: [Member_CoopExpSchema],
        required: true
    },
    memberType: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MemberType'
    },
    subteam: {
        type: Schema.Types.ObjectId,
        ref: 'Subteam',
        require: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    stream: {
        type: Member_Stream
    },
    picture: {
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
    }
}
```