const skills = require('../backend/data/handlers/skills');
const util = require('../backend/data/handlers/util');

describe('ValidationError', () => {


    it('Tests if Jest works', () => {
        expect(0).toBe(0)
    });

    // it('Returns the IDs of documents', () => {
    //
    //     const testBody = [{
    //         name: 'MongoDB',
    //         category: 'Software'
    //     }];
    //
    //     util.resWrapper(async () => {
    //         expect(await util.replaceNamesWithIdsArray(testBody, skills)).toBe("Something")
    //     });
    //
    // });


    // it('Gets a list of members', async (done) => {
    //     const response = await request(server).get('/api/members');
    //
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.success).toBe(true);
    //
    //     done()
    // });


});