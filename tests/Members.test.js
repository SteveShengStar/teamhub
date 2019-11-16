jest.setTimeout(40000);


const api = require('../backend/index');
const skills = require('../backend/data/handlers/skills');

beforeAll(async (done) => {
    await api.data.init();
    done();
});


describe('Testing Members functions', () => {





});

afterAll(() => {
    api.data.close();
});




