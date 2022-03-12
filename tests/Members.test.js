jest.setTimeout(15000);

const data = require('../backend/data/index');
const Member = require('../backend/data/schema/Member');
const UserDetails = require('../backend/data/schema/UserDetails');

const addTestMember = async (testData) => {
    return data.util.resWrapper(async () => {
        return await data.members.add(testData);
    });
};

// Drop member before / after running a test
const dropTestMember = async (testData) => {
    console.log("Cleaning up test data");

    // Drop the corresponding UserDetails record first.
    let {miscDetails} = testData;
    if (miscDetails) {
        await UserDetails.deleteMany({'_id' : miscDetails._id});
    }

    // Then, drop the Member record.
    return await Member.deleteMany({ '_id': testData._id });
};

const parseBoolean = (str) => {
    return str && str.toLowerCase() === 'true';
}

const verifyArrayWithNameProp = (actualArray, expectedArray) => {
    expect(actualArray.map(e => e.name)).toStrictEqual(expectedArray);
}

/**
 * Verify that 'obj' does not have certain keys specified in 'props' array.
 */
const verifyKeysNotInObject = (obj, props) => {
    let keysNotInObject;
    if (!obj || !props) {
        keysNotInObject = true;
    } else {
        const objKeys = Object.keys(obj.toJSON());
        keysNotInObject = props.every(p => !objKeys.includes(p));
    }

    expect(keysNotInObject).toBe(true);    
}


beforeAll(async () => {
    await data.initIfNotStarted();
});

describe('Testing Add Member', () => {
    it('Add Member data to Member Schema', async () => {
        const memberData = {
            'name': {
                'first': 'TestUser1010',
                'last': 'TestUser1010',
            },
            'program': 'Software Engineering',
            'bio': 'Hello, this is my bio',
            'skills': [
                'MongoDB',
                'C++'
            ],
            'interests': [
                'Database',
                'OOP',
                'Recursion'
            ],
            'memberType': 'Newbie',
            'subteams': [
                'Software'
            ],
            'projects': ['TeamHub', 'Website'],
            'email': 'testuser1010@testing.ca',
            'imageUrl': 'www.google.com',
            'links': [
                {
                    'type': 'GitHub',
                    'link': 'https://github.com/robobob'
                }
            ],
            'token': 'test-token-123',
            'tokenExpiry': "8998999",
        };

        // Add the new member
        let resp = await addTestMember(memberData);
        expect(resp.success).toBe(true);

        // Find the member that was just created
        let memberSummary = await data.members.search({
            '_id': resp.body._id
        });

        // Test that all member data was stored correctly
        memberSummary = memberSummary[0];
        expect(memberSummary.name.first).toBe(memberData.name.first);
        expect(memberSummary.name.last).toBe(memberData.name.last);
        expect(memberSummary.bio).toBe(memberData.bio);
        expect(memberSummary.email).toBe(memberData.email);
        expect(memberSummary.imageUrl).toBe(memberData.imageUrl);
        expect(memberSummary.memberType.name).toBe(memberData.memberType);
        expect(memberSummary.program).toBe(memberData.program);
        verifyArrayWithNameProp(memberSummary.interests, memberData.interests);
        verifyArrayWithNameProp(memberSummary.projects, memberData.projects);
        verifyArrayWithNameProp(memberSummary.skills, memberData.skills);
        verifyArrayWithNameProp(memberSummary.subteams, memberData.subteams);
        expect(memberSummary.token).toBeUndefined();
        expect(typeof memberSummary.tokenExpiry).toBe('number');

        // Ensure that an empty record was added to UserDetails collection as well.
        const {miscDetails} = memberSummary;
        expect(miscDetails).toBeTruthy();
        let memberDetails = await UserDetails.findOne({_id: miscDetails}).exec();
        expect(memberDetails).toBeTruthy();
        expect(typeof memberDetails).toBe('object');

        verifyKeysNotInObject(memberDetails, Object.keys(memberData));

        // Cleanup all test data.
        await dropTestMember(memberSummary);
    });

    it('Add Member data with Miscellaneous details.', async () => {
        const memberData = {
            'name': {
                'first': 'TestUser9494',
                'last': 'TestUser3214',
            },
            'email': 'terry.chow@waterloop-domain.ca'
        }
        const miscDetails = {
            phone: "4169834591",
            personalEmail: "terry.chow@gmail.com",
            studentId: "98074685",
            termStatus: "Co-op term, working on Waterloop remotely",
            nextTermActivity: "Yes, I will continue on the team remotely and can come to campus if needed/possible",
            nextTermRole: "Transfer to another sub-team (please specify)",
            nextSchoolTerm: "1B Study",
            termComments: "We should take more detailed meeting notes.",
            desiredWork: "Next term, I would like to do more hands-on development work with the BMS.",
            designCentreSafety: "false",
            whmis: "true",
            machineShop: "false",
        }

        // Test adding the member
        let resp = await addTestMember({...memberData, ...miscDetails});
        expect(resp.success).toBe(true);

        // Find the member that was just created
        let memberSummary = await data.members.search({
            'email': 'terry.chow@waterloop-domain.ca'
        });

        // Test that all member data was stored correctly
        memberSummary = memberSummary[0];
        expect(memberSummary.name.first).toBe(memberData.name.first);
        expect(memberSummary.name.last).toBe(memberData.name.last);
        expect(memberSummary.email).toBe(memberData.email);

        let memberDetails = await UserDetails.findOne({_id: memberSummary.miscDetails}).exec();
        expect(memberDetails.phone).toBe(parseInt(miscDetails.phone));
        expect(memberDetails.personalEmail).toBe(miscDetails.personalEmail);
        expect(memberDetails.studentId).toBe(parseInt(miscDetails.studentId));
        expect(memberDetails.termStatus).toBe(miscDetails.termStatus);
        expect(memberDetails.nextSchoolTerm).toBe(miscDetails.nextSchoolTerm);
        expect(memberDetails.nextTermRole).toBe(miscDetails.nextTermRole);
        expect(memberDetails.nextTermActivity).toBe(miscDetails.nextTermActivity);
        expect(memberDetails.termComments).toBe(miscDetails.termComments);
        expect(memberDetails.desiredWork).toBe(miscDetails.desiredWork);
        expect(memberDetails.designCentreSafety).toBe(parseBoolean(miscDetails.designCentreSafety));
        expect(memberDetails.whmis).toBe(parseBoolean(miscDetails.whmis));
        expect(memberDetails.machineShop).toBe(parseBoolean(miscDetails.machineShop));

        verifyKeysNotInObject(memberSummary, Object.keys(miscDetails));
        verifyKeysNotInObject(memberDetails, Object.keys(memberData));

        // Clean up test data
        await dropTestMember(memberSummary);
    });
});


describe('Testing Delete Member', () => {
    it('Test Delete User', async () => {
        const memberData = {
            'name': {
                'first': 'TestUser2',
                'last': 'TestUser2',
            },
            'email': 'testuser2@testing.ca'
        };

        let resp = await data.members.add(memberData);
        let id = resp._id;
        let {miscDetails} = resp;

        resp = await data.util.resWrapper(async () => {
            return await data.members.delete({ 'email': 'testuser2@testing.ca' });
        });
        expect(resp.success).toBe(true);

        // Try finding the inserted user
        let memberSummary = await data.members.search({
            '_id': id
        });
        let memberDetails = await UserDetails.findOne({'_id': miscDetails});

        // Ensure member is deleted
        expect(memberSummary).toStrictEqual([]);
        expect(memberDetails).toBeFalsy();
    });

    it('Test Delete User with details stored in the UserDetails DB. Collection', async () => {
        const memberData = {
            'name': {
                'first': 'TestUser2',
                'last': 'TestUser2',
            },
            'email': 'testuser2@testing.ca',
            'personalEmail': "terry.chow@gmail.com",
            'studentId': "98074685",
            'termStatus': "Co-op term, working on Waterloop remotely",
        };

        let resp = await data.members.add(memberData);
        let id = resp._id;
        let {miscDetails} = resp;

        resp = await data.util.resWrapper(async () => {
            return await data.members.delete({ 'name.first': 'TestUser2' });
        });
        expect(resp.success).toBe(true);

        // Try finding the inserted user
        let memberSummary = await data.members.search({
            '_id': id
        });
        let memberDetails = await UserDetails.findOne({'_id': miscDetails});

        // Ensure member is deleted
        expect(memberSummary).toStrictEqual([]);
        expect(memberDetails).toBeFalsy();
    });
});


describe('Testing Update Member', () => {
    it('Test updating a member\'s data', async () => {
        const memberData = {
            'name': {
                'first': 'Jenny',
                'last': 'Shrinavasan',
            },
            'email': 'jenny.shrin@testing.ca',
            'projects': ['TeamHub', 'Website'],
        };
        let resp = await addTestMember(memberData);
        let {miscDetails} = resp;

        resp = await data.util.resWrapper(async () => {
            return await data.members.updateMember(
                { 'email': 'jenny.shrin@testing.ca' }, 
                { 'name': {'first': 'Cherry'} , 'email': 'cherry.shrin@testing.ca', 'projects': [], 'subteams': ['Electrical'] }
            );
        });
        expect(resp.success).toBe(true);

        // Check to see if info. was updated
        let memberSummary = await data.members.search({
            'email': 'cherry.shrin@testing.ca'
        });

        expect(memberSummary[0].name.first).toBe('Cherry');
        expect(memberSummary[0].name.last).toBeFalsy();
        verifyArrayWithNameProp(memberSummary[0].subteams, ['Electrical']);
        verifyArrayWithNameProp(memberSummary[0].projects, []);

        let memberDetails = await UserDetails.findOne({'_id': miscDetails});
        verifyKeysNotInObject(memberDetails, Object.keys(['name', 'email', 'projects', 'subteams']));

        // Clean up the test data.
        await dropTestMember(memberSummary[0]);
    });

    it('Test updating a member\'s data with misc. details stored in the UserDetails DB. Collection', async () => {
        const memberData = {
            'name': {
                'first': 'Jenny',
                'last': 'Shrinavasan',
            },
            'email': 'jenny.shrin@testing.ca',
            'projects': ['TeamHub', 'Website'],
            'studentId': "98074685",
            'termStatus': "Co-op term, working on Waterloop remotely",
            'designCentreSafety': "false",
        };
        await addTestMember(memberData);

        let resp = await data.util.resWrapper(async () => {
            return await data.members.updateMember(
                { 'email': 'jenny.shrin@testing.ca' }, 
                {
                    'name': {'first': 'Jenny', 'last': 'Sivayoganathan'} , 
                    'projects': ['BMS', 'TeamHub', 'LIM'], 
                    'studentId': "68934112",
                    'termStatus': "Not active on Waterloop this term",
                    'designCentreSafety': "true",
                    'nextTermRole': 'Want to become a co-op',
                    'whmis': "true",
                }
            );
        });
        expect(resp.success).toBe(true);

        // Check to see if info. was updated
        let memberSummary = await data.members.search({
            'email': 'jenny.shrin@testing.ca'
        });
        expect(memberSummary[0].name.first).toBe('Jenny');
        expect(memberSummary[0].name.last).toBe('Sivayoganathan');
        expect(memberSummary[0].email).toBe('jenny.shrin@testing.ca');
        verifyArrayWithNameProp(memberSummary[0].projects, ['BMS', 'TeamHub', 'LIM']);

        let memberDetails = await UserDetails.findOne({_id: memberSummary[0].miscDetails});
        expect(memberDetails.studentId).toBe(68934112);
        expect(memberDetails.termStatus).toBe("Not active on Waterloop this term");
        expect(memberDetails.designCentreSafety).toBe(true);
        expect(memberDetails.nextTermRole).toBe('Want to become a co-op');
        expect(memberDetails.whmis).toBe(true);

        verifyKeysNotInObject(memberSummary[0], Object.keys(['studentId', 'termStatus', 'designCentreSafety', 'nextTermRole', 'whmis']));
        verifyKeysNotInObject(memberDetails, Object.keys(['name', 'email', 'projects']));

        // Clean up the test data.
        await dropTestMember(memberSummary[0]);
    });
});

afterAll(() => {
    data.close();
});