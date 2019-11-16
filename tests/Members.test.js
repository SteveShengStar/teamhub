import {
    skills
} from '../backend/data/index';

import app from '../backend/index' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

import {
    killApp,
    findPort,
    launchApp,
    fetchViaHTTP,
    renderViaHTTP,
    nextBuild,
    nextStart,
    File,
} from 'next-test-utils'


describe('ValidationError', () => {

    test('Testing to see if Jest works', () => {
        expect(7).toBe(7)

    });

    it('should render page', async () => {
        const html = await renderViaHTTP(appPort, '/')
        expect(html).toMatch(/API - support/)
    })

    test('Gets the test endpoint', async done => {
        // Sends GET Request to /test endpoint
        const res = await request.get('/members')

        // ...
        done()
    })

    // describe('ValidationError.constructor', () => {
    //
    //     test('Testing to see if Jest works', () => {
    //         expect(1).toBe(2)
    //     });
    //
    // });
});