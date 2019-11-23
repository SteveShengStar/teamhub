jest.setTimeout(60000);

const api = require('../backend/index');

beforeAll(async (done) => {
    await api.data.init();
    done();
});

// Needs to Be valid JSON
const testMemberData = {
    "_id": "5dd1df5bc08e041f7d7b83f1",
    "name": {
        "first": "User1010",
        "last": "User1010",
        "display": "User1010"
    },
    "skills": [
        "MongoDB"
    ],
    "interests": [
        "Database"
    ],
    "joined": {
        "year": 2019,
        "season": "Fall"
    },
    "coopExp": [],
    "memberType": "Newbie",
    "subteam": "Software",
    "project": {
        "name": "TeamHub",
        "subteams": [
            "Software"
        ]
    },
    "email": "user1010@testing.ca",
    "stream": {
        "isCoop": true,
        "onStream": true,
        "coopStream": 1,
        "currentSchoolTerm": "1A"
    },
    "age": 15,
    "birthday": {
        "month": 5,
        "day": 12
    },
    "links": [
        {
            "type": "GitHub",
            "link": "https://github.com/robobob"
        }
    ]
};


describe('Testing Members functions', () => {

    it('Test Adding Member', async () => {

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.add(testMemberData);
        });

        expect(resp.success).toBe(true);
    });

    it('Tests updating a members data', async () => {

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.updateMember({ _id: '5dd1df5bc08e041f7d7b83f1' }, {"email": "user1011@testing.ca"});
        });

        expect(resp.success).toBe(true);
    });

    it('Tests searching a Member', async () => {

        const searchData = {
            "query": {
                "name": {
                    "first": "User1010"
                }
            }
        };

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.search(searchData);
        });

        expect(resp.success).toBe(true);
    });

    it('Tests deleting a members data', async () => {

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.delete({ _id: '5dd1df5bc08e041f7d7b83f1'});
        });

        expect(resp.success).toBe(true);
    });

});

afterAll(() => {
    api.data.close();
});




