const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/app');

describe('GET /test?test=hello', () => {
    it('should get hello world', async () => {
        const res = await request(app).get('/test?test=hello').set('Accept', 'application/json');
        expect(res.status).to.equal(200);
    });
});
