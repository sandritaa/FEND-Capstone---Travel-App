const supertest = require('supertest');

describe('Testing that the server returns the page', () => {
  test('Testing tthe index.html on the getRoute', async () => {
      const webapp = await supertest('http://localhost:3000').get('/getRoute');
      expect(webapp.statusCode).toBe(200);
  });
});