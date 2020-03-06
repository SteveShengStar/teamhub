jest.setTimeout(15000);

const data = require('../backend/data/index');

const express = require('express');

const next = require('next');
const nextapp = next({ dev: false, dir: './' });
const handle = nextapp.getRequestHandler();

const request = require('supertest');
let server;

beforeAll(async (done) => {
    nextapp.prepare().then(() => {
        server = express();
        server.all('*', (req, res) => handle(req, res));
        done();
    });
});


describe('API Integration Testing', () => {
    it('Gets a list of members - no auth', async (done) => {
        const response = await request(server)
            .post('/api/members');

        expect(response.statusCode).toBe(401);

        done();
    });

    it('Gets a list of members - wrong auth method', async (done) => {
        const response = await request(server)
            .post('/api/members')
            .set('authorization', 'WrongAuthMethod');

        expect(response.statusCode).toBe(401);

        done();
    });

    it('Gets a list of members - wrong token', async (done) => {
        const response = await request(server)
            .post('/api/members')
            .set('authorization', 'Bearer wrongtoken');

        expect(response.statusCode).toBe(403);
        done();
    });

    it('Gets a list of members', async (done) => {
        const response = await request(server)
            .post('/api/members')
            .set('authorization', 'Bearer 889f9b1302024b5f290abe5ac9f19d2d480fa4ba3ae09e83cc0be1cbb3205da522e5acd9be6c5da229891845a17ff1890fd611962cedb8f4c0200e251a3de642');

        const json = response.body;

        expect(response.statusCode).toBe(200);
        expect(json.success).toBe(true);
        expect(json.body.length).toBeGreaterThan(1);

        done();
    });

    it('Gets info on a member', async (done) => {
        const testID = '5e1a1cdd64b10c0008b03fd6';
        const response = await request(server)
            .get(`/api/members/${testID}/info`)
            .set('authorization', 'Bearer 889f9b1302024b5f290abe5ac9f19d2d480fa4ba3ae09e83cc0be1cbb3205da522e5acd9be6c5da229891845a17ff1890fd611962cedb8f4c0200e251a3de642');

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
