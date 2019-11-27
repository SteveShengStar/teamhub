jest.setTimeout(60000);

const api = require('../backend/index');
const Member = require('../backend/data/schema/Member')

beforeAll(async (done) => {
    await api.data.init();
    done();
});

// Needs to Be valid JSON
const testMemberData = {
    "name": {
        "first": "TestUser1010",
        "last": "TestUser1010",
        "display": "TestUser1010"
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
    "email": "testuser1010@testing.ca",
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


const setupMember = () => {
    // Boiler plate for adding the member to the DB each time

};

// Drop member before / after running a test
const dropMember = async () => {
    return await Member.deleteMany({ "name.first": "TestUser1010" });
};




describe('Testing Members functions', () => {

    it('Tests Adding Member', async () => {

        // Ensure the test user is deleted first
        let resp = await dropMember();
        expect(resp.ok).toBe(1);

        resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.add(testMemberData);
        });

        expect(resp.success).toBe(true);

        // Find the member that was just created
        resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.search({
                    "_id": resp.body._id
            });
        });

        // Ensures member now exists, response contains name and email
        expect(resp.body[0].email).toBeTruthy();
        expect(resp.body[0].name).toBeTruthy();

        await dropMember();

    });

    it('Tests updating a members data', async () => {

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.updateMember({_id: '5dd1df5bc08e041f7d7b83f1'}, {"email": "user1011@testing.ca"});
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
            return await api.data.members.delete({_id: '5dd1df5bc08e041f7d7b83f1'});
        });

        expect(resp.success).toBe(true);
    });

});

afterAll(() => {
    api.data.close();
});




