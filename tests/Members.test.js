jest.setTimeout(30000);


const api = require('../backend/index');

beforeAll(async (done) => {
    await api.data.init();
    done();
});


describe('Testing Members functions', () => {

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

    it('Tests fetching all members', async () => {

        const resp = (await api.data.util.resWrapper(async () => {
            return await api.data.members.getAll();
        })).success;

        expect(resp).toBe(true);
    })


    // https://zellwk.com/blog/jest-and-mongoose/
    // For testing the add / drop routes

});



afterAll(() => {
    api.data.close();
})




