jest.setTimeout(40000);


const api = require('../backend/index');
const skills = require('../backend/data/handlers/skills');

beforeAll(async (done) => {
    await api.data.init();
    done();
});


describe('Testing Utility functions', () => {

    it('Test Handle Wrapper ', async () => {

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
        })).success;

        expect(resp).toBe(true);
    });

    it('Tests retrieving ID or creating new document', async () => {

        const resp = await api.data.util.replaceBodyWithId([{
            name: 'MongoDB',
            category: 'Software'
        }], skills);

        // TODO: check for a specific ID returned
        expect(resp).toBeDefined();
    });

    it('Tests retrieving IDs for multiple document bodies', async () => {

        const resp = await api.data.util.replaceBodiesWithIdsArray([{
            name: 'Javascript',
            category: 'Software'
        }], skills);

        expect(resp.length).toBe(1);
    })



    // TODO: Add Tests for find / delete


    // https://zellwk.com/blog/jest-and-mongoose/
    // For testing the add / drop routes

});

afterAll(() => {
    api.data.close();
})




