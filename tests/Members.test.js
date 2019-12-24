jest.setTimeout(15000);

const data = require('../backend/data/index');
const Member = require('../backend/data/schema/Member');

// Needs to Be valid JSON
const testMemberData1 = {
    'name': {
        'first': 'TestUser1010',
        'last': 'TestUser1010',
        'display': 'TestUser1010'
    },
    'skills': [
        'MongoDB'
    ],
    'interests': [
        'Database'
    ],
    'joined': {
        'year': 2019,
        'season': 'Fall'
    },
    'coopExp': [],
    'memberType': 'Newbie',
    'subteam': 'Software',
    'project': {
        'name': 'TeamHub',
        'subteams': [
            'Software'
        ]
    },
    'email': 'testuser1010@testing.ca',
    'stream': {
        'isCoop': true,
        'onStream': true,
        'coopStream': 1,
        'currentSchoolTerm': '1A'
    },
    'age': 15,
    'birthday': {
        'month': 5,
        'day': 12
    },
    'links': [
        {
            'type': 'GitHub',
            'link': 'https://github.com/robobob'
        }
    ]
};

const testMemberData2 = {
    'name': {
        'first': 'TestUser2',
        'last': 'TestUser2',
        'display': 'TestUser2'
    },
    'email': 'testuser2@testing.ca'
};

const testMemberData3 = {
    'name': {
        'first': 'TestUser3',
        'last': 'TestUser3',
        'display': 'TestUser3'
    },
    'email': 'testuser3@testing.ca'
};


// Adding the member to the DB before test
const addTestMember = async (testData) => {
    return data.util.resWrapper(async () => {
        return await data.members.add(testData);
    });

};

// Drop member before / after running a test
const dropTestMember = async (testData) => {
    return await Member.deleteMany({ 'name.first': testData.name.first });
};


describe('Testing Members functions', () => {

    it('Tests Adding testMemberData1', async (done) => {
        // Test adding the member
        let resp = await addTestMember(testMemberData1);
        expect(resp.success).toBe(true);

        // Find the member that was just created
        resp = await data.util.resWrapper(async () => {
            return await data.members.search({
                '_id': resp.body._id
            });
        });

        // Ensures member now exists, response contains name and email
        expect(resp.body[0].email).toBeTruthy();
        expect(resp.body[0].name).toBeTruthy();

        await dropTestMember(testMemberData1);

        // Callback to wait until first test done executing
        done();

    });

    it('Tests deleting testMemberData2', async (done) => {

        await dropTestMember(testMemberData2);

        let resp = await data.members.add(testMemberData2);
        let id = resp._id;

        resp = await data.util.resWrapper(async () => {
            return await data.members.delete({ '_id': id });
        });
        expect(resp.success).toBe(true);

        // Try finding the inserted user
        resp = await data.util.resWrapper(async () => {
            return await data.members.search({
                '_id': id
            });
        });

        // Ensures member deleted
        expect(resp.body).toStrictEqual([]);

        done();
    });

    it('Tests updating a members data', async () => {

        await addTestMember(testMemberData3);

        let resp = await data.util.resWrapper(async () => {
            return await data.members.updateMember({ 'name.first': 'TestUser3' }, { 'email': 'userupdated@testing.ca' });
        });
        expect(resp.success).toBe(true);

        // Check to see if email updated
        resp = await data.util.resWrapper(async () => {
            return await data.members.search({
                'name.first': 'TestUser3'
            });
        });

        expect(resp.body[0].email).toBe('userupdated@testing.ca');

        await dropTestMember(testMemberData3);
    });

});


afterAll(() => {
    data.close();
});




