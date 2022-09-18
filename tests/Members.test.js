global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

jest.setTimeout(15000);

const data = require('../backend/data/index');
const Member = require('../backend/data/schema/Member');
const UserDetails = require('../backend/data/schema/UserDetails');
const _ = require('lodash');

const parseBoolean = (str) => {
    return str && str.toLowerCase() === 'true';
};

const verifyArrayWithNameProp = (actualArray, expectedArray) => {
    expect(actualArray.map((e) => e.name)).toStrictEqual(expectedArray);
};

/**
 * Verify that 'obj' does not have certain keys specified in 'props' array.
 */
const verifyKeysNotInObject = (obj, props) => {
    let keysNotInObject;
    if (!obj || !props) {
        keysNotInObject = true;
    } else {
        const objKeys = Object.keys(obj.toJSON());
        keysNotInObject = props.every((p) => !objKeys.includes(p));
    }

    expect(keysNotInObject).toBe(true);
};

const addTestMember = async (testData) => {
    const memberFields = Object.keys(Member.schema.paths);
    let userSummary = _.omit(_.pick(testData, memberFields), '_id');
    let userDetails = _.omit(testData, [...memberFields, '_id']);

    const userDetailsResponse = await UserDetails.create(userDetails);
    userSummary.miscDetails = userDetailsResponse._id;
    userSummary = await data.members.replacePayloadWithIds(userSummary);
    return await Member.create(userSummary);
};

beforeAll(async () => {
    await data.initIfNotStarted();
});

afterAll(() => {
    data.close();
});

afterEach(async () => {
    await Member.deleteMany({});
    await UserDetails.deleteMany({});
});

describe('Testing Add Member', () => {
    it('Add Member data to Member Schema', async () => {
        const memberData = {
            name: {
                first: 'TestUser1010',
                last: 'TestUser1010',
            },
            program: 'Software Engineering',
            bio: 'Hello, this is my bio',
            skills: ['MongoDB', 'C++'],
            interests: ['Database', 'OOP', 'Recursion'],
            memberType: 'Newbie',
            subteams: ['Software'],
            projects: ['TeamHub', 'Website'],
            email: 'testuser1010@testing.ca',
            imageUrl: 'www.google.com',
            links: [
                {
                    type: 'GitHub',
                    link: 'https://github.com/robobob',
                },
            ],
            token: 'test-token-123',
            tokenExpiry: '8998999',
        };

        // Add a new member
        let res = await data.util.resWrapper(async () => {
            return await data.members.add(memberData);
        });
        expect(res.success).toBe(true);

        // Find the member that was just created
        let memberSummary = await data.members.search({
            _id: res.body._id,
        });

        // Test that the member data was stored/inserted correctly
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
        expect(memberSummary.miscDetails).toBeTruthy();
        const memberDetails = await UserDetails.findOne({
            _id: memberSummary.miscDetails,
        }).exec();
        expect(memberDetails).toBeTruthy();
        expect(typeof memberDetails).toBe('object');
        verifyKeysNotInObject(memberDetails, Object.keys(memberData));
    });

    it('Add Member data with Miscellaneous details.', async () => {
        const memberData = {
            name: {
                first: 'TestUser9494',
                last: 'TestUser3214',
            },
            email: 'terry.chow@waterloop-domain.ca',
        };
        const miscDetails = {
            phone: '4169834591',
            personalEmail: 'terry.chow@gmail.com',
            studentId: '98074685',
            termStatus: 'Co-op term, working on Waterloop remotely',
            nextTermActivity:
                'Yes, I will continue on the team remotely and can come to campus if needed/possible',
            nextTermRole: 'Transfer to another sub-team (please specify)',
            nextSchoolTerm: '1B Study',
            termComments: 'We should take more detailed meeting notes.',
            desiredWork:
                'Next term, I would like to do more hands-on development work with the BMS.',
            designCentreSafety: 'false',
            whmis: 'true',
            machineShop: 'false',
        };

        // Test adding a new member
        const res = await data.util.resWrapper(async () => {
            return await data.members.add({ ...memberData, ...miscDetails });
        });
        expect(res.success).toBe(true);

        // Find the member that was just created
        let memberSummary = await data.members.search({
            email: 'terry.chow@waterloop-domain.ca',
        });

        // Verify that all the member data was stored/inserted correctly
        memberSummary = memberSummary[0];
        expect(memberSummary.name.first).toBe(memberData.name.first);
        expect(memberSummary.name.last).toBe(memberData.name.last);
        expect(memberSummary.email).toBe(memberData.email);

        let memberDetails = await UserDetails.findOne({
            _id: memberSummary.miscDetails,
        }).exec();
        expect(memberDetails.phone).toBe(parseInt(miscDetails.phone));
        expect(memberDetails.personalEmail).toBe(miscDetails.personalEmail);
        expect(memberDetails.studentId).toBe(parseInt(miscDetails.studentId));
        expect(memberDetails.termStatus).toBe(miscDetails.termStatus);
        expect(memberDetails.nextSchoolTerm).toBe(miscDetails.nextSchoolTerm);
        expect(memberDetails.nextTermRole).toBe(miscDetails.nextTermRole);
        expect(memberDetails.nextTermActivity).toBe(
            miscDetails.nextTermActivity
        );
        expect(memberDetails.termComments).toBe(miscDetails.termComments);
        expect(memberDetails.desiredWork).toBe(miscDetails.desiredWork);
        expect(memberDetails.designCentreSafety).toBe(
            parseBoolean(miscDetails.designCentreSafety)
        );
        expect(memberDetails.whmis).toBe(parseBoolean(miscDetails.whmis));
        expect(memberDetails.machineShop).toBe(
            parseBoolean(miscDetails.machineShop)
        );

        verifyKeysNotInObject(memberSummary, Object.keys(miscDetails));
        verifyKeysNotInObject(memberDetails, Object.keys(memberData));
    });
});

describe('Testing Delete Member', () => {
    it('Test Delete User', async () => {
        const memberData = {
            name: {
                first: 'TestUser2',
                last: 'TestUser2',
            },
            email: 'testuser2@testing.ca',
        };

        const { _id: id, miscDetails } = await addTestMember(memberData);
        const res = await data.util.resWrapper(async () => {
            return await data.members.delete({ email: 'testuser2@testing.ca' });
        });
        expect(res.success).toBe(true);

        // Ensure the member was deleted
        const memberSummary = await data.members.search({
            _id: id,
        });
        const memberDetails = await UserDetails.findOne({ _id: miscDetails });
        expect(memberSummary).toStrictEqual([]);
        expect(memberDetails).toBeFalsy();
    });

    it('Test Delete User with details stored in the UserDetails DB. Collection', async () => {
        const memberData = {
            name: {
                first: 'TestUser2',
                last: 'TestUser2',
            },
            email: 'testuser2@testing.ca',
            personalEmail: 'terry.chow@gmail.com',
            studentId: '98074685',
            termStatus: 'Co-op term, working on Waterloop remotely',
        };

        let { _id: id, miscDetails } = await addTestMember(memberData);
        const res = await data.util.resWrapper(async () => {
            return await data.members.delete({ 'name.first': 'TestUser2' });
        });
        expect(res.success).toBe(true);

        // Ensure member was deleted
        let memberSummary = await data.members.search({
            _id: id,
        });
        let memberDetails = await UserDetails.findOne({ _id: miscDetails });
        expect(memberSummary).toStrictEqual([]);
        expect(memberDetails).toBeFalsy();
    });
});

describe('Testing Update Member', () => {
    it("Test updating a member's data", async () => {
        const memberData = {
            name: {
                first: 'Jenny',
                last: 'Shrinavasan',
            },
            email: 'jenny.shrin@testing.ca',
            projects: ['TeamHub', 'Website'],
        };
        let { miscDetails } = await addTestMember(memberData);

        const res = await data.util.resWrapper(async () => {
            return await data.members.updateMember(
                { email: 'jenny.shrin@testing.ca' },
                {
                    name: { first: 'Cherry' },
                    email: 'cherry.shrin@testing.ca',
                    projects: [],
                    subteams: ['Electrical'],
                }
            );
        });
        expect(res.success).toBe(true);

        // Check to see whether the info was updated
        const memberSummary = await data.members.search({
            email: 'cherry.shrin@testing.ca',
        });

        expect(memberSummary[0].name.first).toBe('Cherry');
        expect(memberSummary[0].name.last).toBeFalsy();
        verifyArrayWithNameProp(memberSummary[0].subteams, ['Electrical']);
        verifyArrayWithNameProp(memberSummary[0].projects, []);

        const memberDetails = await UserDetails.findOne({ _id: miscDetails });
        verifyKeysNotInObject(
            memberDetails,
            Object.keys(['name', 'email', 'projects', 'subteams'])
        );
    });

    it("Test updating a member's data with misc. details stored in the UserDetails DB. Collection", async () => {
        const memberData = {
            name: {
                first: 'Jenny',
                last: 'Shrinavasan',
            },
            email: 'jenny.shrin@testing.ca',
            projects: ['TeamHub', 'Website'],
            studentId: '98074685',
            termStatus: 'Co-op term, working on Waterloop remotely',
            designCentreSafety: 'false',
        };
        await addTestMember(memberData);

        const res = await data.util.resWrapper(async () => {
            return await data.members.updateMember(
                { email: 'jenny.shrin@testing.ca' },
                {
                    name: { first: 'Jenny', last: 'Sivayoganathan' },
                    projects: ['BMS', 'TeamHub', 'LIM'],
                    studentId: '68934112',
                    termStatus: 'Not active on Waterloop this term',
                    designCentreSafety: 'true',
                    nextTermRole: 'Want to become a co-op',
                    whmis: 'true',
                }
            );
        });
        expect(res.success).toBe(true);

        // Check to see if info. was updated
        const memberSummary = await data.members.search({
            email: 'jenny.shrin@testing.ca',
        });
        expect(memberSummary[0].name.first).toBe('Jenny');
        expect(memberSummary[0].name.last).toBe('Sivayoganathan');
        expect(memberSummary[0].email).toBe('jenny.shrin@testing.ca');
        verifyArrayWithNameProp(memberSummary[0].projects, [
            'BMS',
            'TeamHub',
            'LIM',
        ]);

        const memberDetails = await UserDetails.findOne({
            _id: memberSummary[0].miscDetails,
        });
        expect(memberDetails.studentId).toBe(68934112);
        expect(memberDetails.termStatus).toBe(
            'Not active on Waterloop this term'
        );
        expect(memberDetails.designCentreSafety).toBe(true);
        expect(memberDetails.nextTermRole).toBe('Want to become a co-op');
        expect(memberDetails.whmis).toBe(true);

        verifyKeysNotInObject(
            memberSummary[0],
            Object.keys([
                'studentId',
                'termStatus',
                'designCentreSafety',
                'nextTermRole',
                'whmis',
            ])
        );
        verifyKeysNotInObject(
            memberDetails,
            Object.keys(['name', 'email', 'projects'])
        );
    });
});
