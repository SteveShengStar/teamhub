import data from '../backend/data/index';

describe('Testing Members functions', () => {

    // afterAll(done => {
    //     // Closing the DB connection allows Jest to exit successfully.
    //     mongoose.connection.close()
    //     done()
    // })

    it('Testing to see if Jest works', () => {
        expect(7).toBe(7)
    });

    it('Tests fetching all members', async () => {
        console.log(await data.util.resWrapper(async () => {
            return await data.members.getAll();
        }));
    })






    // it('Gets a list of members', async (done) => {
    //     const response = await request(server).get('/api/members');
    //
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.success).toBe(true);
    //
    //     done()
    // });
    //
    // it('Gets a list of members', async () => {
    //     const testID = "5dbe69a2ae4a666a47273383";
    //     const response = await request(server).get(`/api/members/${testID}/info`);
    //
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.success).toBe(true);
    // });


    // https://zellwk.com/blog/jest-and-mongoose/
    // For testing the add / drop routes

});