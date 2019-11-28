jest.setTimeout(60000);


const api = require('../backend/index');
const skills = require('../backend/data/handlers/skills');

beforeAll(async (done) => {
    await api.data.init();
    done();
});


describe('Testing Utility functions', () => {

    it('Test Handle Wrapper', async () => {

        const test = async () => {
            return new Promise((resolve => {
                setTimeout(() => {
                    resolve("resolved")
                }, 2000);
            }));
        };

        expect(await api.data.util.handleWrapper(test)).toBe("resolved")
    });

    it('Tests Res Wrapper', async () => {

        const resp = (await api.data.util.resWrapper(async () => {
            return await api.data.members.getAll();
        }));

        expect(resp.success).toBe(true);
        // Check that members were returned
        expect(resp.body.length).toBeGreaterThan(1);
    });

    it('Tests retrieving ID or creating new document', async () => {

        const resp = await api.data.util.replaceBodyWithId([{
            name: 'MongoDB',
            category: 'Software'
        }], skills);

        // Check that the string returned is ID, 24 char
        expect(resp.length).toBe(24);
    });

    it('Tests retrieving IDs for multiple document bodies', async () => {

        const resp = await api.data.util.replaceBodiesWithIdsArray([{
            name: 'Javascript',
            category: 'Software'
        }], skills);

        // Check if array contains ids
        expect(resp[0].length).toBe(24);
    })


});

afterAll(() => {
    api.data.close();
});




