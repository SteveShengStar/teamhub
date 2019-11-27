jest.setTimeout(30000);

const api = require('../backend/index');
const Member = require('../backend/data/schema/Member');

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


// TODO: potential conflict when many tests running at once, potentially adding 2 members before they're deleted


// Boiler plate for adding the member to the DB before test
const addTestMember = async () => {

    return await api.data.util.resWrapper(async () => {
        return await api.data.members.add(testMemberData);
    });

};

// Drop member before / after running a test
const dropTestMember = async () => {
    return await Member.deleteMany({"name.first": "TestUser1010"});
};


describe('Testing Members functions', () => {

    it('Tests Adding Member', async () => {

        // Ensure the test user is deleted first
        let resp = await dropTestMember();
        expect(resp.ok).toBe(1);

        // Test adding the member
        resp = await addTestMember();
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

        await dropTestMember();

    });

    it('Tests deleting a members data', async () => {

        let resp = await addTestMember();
        let id = resp.body._id;

        resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.delete({_id: id});
        });
        expect(resp.success).toBe(true);

        // Try finding the inserted user
        resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.search({
                "_id": id
            });
        });

        // Ensures member deleted
        expect(resp.body).toStrictEqual([]);

    });

});


describe('Updating and Searching Members', () => {

    it('Tests updating a members data', async () => {

        // TODO: create member and update with ID
        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.updateMember({_id: '5dd1df5bc08e041f7d7b83f1'}, {"email": "user1011@testing.ca"});
        });


        expect(resp.success).toBe(true);
    });

    it('Tests searching a Member', async () => {

        await addTestMember();

        const searchData = {
            "name.first": "TestUser1010"
        };

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.search(searchData);
        });

        console.log(resp);

        expect(resp.success).toBe(true);

        await dropTestMember();
    });


});

afterAll(() => {
    api.data.close();
});




