jest.setTimeout(30000)

const express = require('express');
const bodyParser = require('body-parser');

const api = require('../backend/index');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use('/api', api);

const request = require('supertest');

beforeAll(async (done) => {
    await api.data.init();
    done();
});


describe('API Integration Testing', () => {

    // afterAll(done => {
    //     // Closing the DB connection allows Jest to exit successfully.
    //     mongoose.connection.close()
    //     done()
    // })

    it('Testing to see if Jest works', () => {
        expect(7).toBe(7)
    });


    it('Gets a list of members', async (done) => {
        const response = await request(server).get('/api/members');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done()

    });

    it('Get info on a member', async (done) => {
        const testID = "5dbe69a2ae4a666a47273383";
        const response = await request(server).get(`/api/members/${testID}/info`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        done()
    });

    // https://zellwk.com/blog/jest-and-mongoose/
    // For testing the add / drop routes

});

afterAll(() => {
    api.data.close();
})
