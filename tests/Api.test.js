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
            .set('authorization', 'Bearer ab1b7e46460e3fccf77c2473a167e51e375ff4ddebfec272a7697164d2cbf792');

        const json = response.body;

        expect(response.statusCode).toBe(200);
        expect(json.success).toBe(true);
        expect(json.body.length).toBeGreaterThan(1);

        done();
    });

    it('Gets info on a member', async (done) => {
        const testID = '5e6326c7f2692f0008fb1dfc';
        const response = await request(server)
            .get(`/api/members/${testID}/info`)
            .set('authorization', 'Bearer ab1b7e46460e3fccf77c2473a167e51e375ff4ddebfec272a7697164d2cbf792');

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        // Expect info on only one member returned
        expect(response.body.body).toHaveLength(1);
        expect(response.body.body[0].email).toBe('michael.p@waterloop.ca');

        done();
    });

});

afterAll((done) => {
    data.close();
    done();
});
