jest.setTimeout(15000);

const data = require('../backend/data/index');

const express = require('express');

const next = require('next');
const nextapp = next({ dev: false, dir: './' });
const handle = nextapp.getRequestHandler();

const request = require('supertest');
let server;

beforeAll(async (done) => {
    await data.init();
    nextapp.prepare().then(() => {
        server = express();
        server.all('*', (req, res) => handle(req, res));
        done();
    });
});


describe('API Integration Testing', () => {
    it('Gets a list of members', async (done) => {
        const response = await request(server).post('/api/members');
        const json = response.body;

        expect(response.statusCode).toBe(200);
        expect(json.success).toBe(true);
        expect(json.body.length).toBeGreaterThan(1);

        done();
    });

    it('Gets info on a member', async (done) => {
        const testID = '5dbe69a2ae4a666a47273383';
        const response = await request(server).get(`/api/members/${testID}/info`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        // Expect info on only one member returned
        expect(response.body.body).toHaveLength(1);

        done();
    });

});

afterAll((done) => {
    data.close();
    done();
});
