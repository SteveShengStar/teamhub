jest.setTimeout(40000);

const api = require('../backend/index');

beforeAll(async (done) => {
    await api.data.init();
    done();
});

const testMemberData = {
    name: {
        first: 'Test',
        last: 'User',
        display: 'Test User'
    },
    bio: 'This is my bio.',
    skills: ['MongoDB'],
    joined: {
        year: 2019,
        season: 'Fall'
    },
    coopExp: [],
    memberType: 'Newbie',
    subteam: 'Software',
    project: {
        name: 'TeamHub',
        subteams: ['Software']
    },
    email: 'test@testing.test',
    stream: {
        isCoop: true,
        onStream: true,
        coopStream: 1,
        currentSchoolTerm: '1A'
    },
    age: 18,
    birthday: {
        month: 4,
        day: 10
    },
    links: [
        {
            type: 'GitHub',
            link: 'https://github.com/mchlp'
        }
    ]
};


describe('Testing Members functions', () => {

    it('Test Adding Member', async () => {

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.add(testMemberData);
        });

        console.log(resp)

        expect(resp.success).toBe(true);
    });

    it('Searching a Member', async () => {

        const searchData = {
            "query": {
                "name": {
                    "first": "Michael"
                }
            }
        };

        const resp = await api.data.util.resWrapper(async () => {
            return await api.data.members.search(searchData);
        });

        expect(resp.success).toBe(true);
    });


});

afterAll(() => {
    api.data.close();
});




