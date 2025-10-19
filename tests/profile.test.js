const request = require('supertest');
const app = require('../src/app');

describe('Profile Endpoint', () => {
  it('should return profile data with correct structure', async () => {
    const response = await request(app)
      .get('/me')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).toHaveProperty('name');
    expect(response.body.user).toHaveProperty('stack');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('fact');
    
    // Validate timestamp format (ISO 8601)
    expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    
    // Validate fact is a string
    expect(typeof response.body.fact).toBe('string');
    expect(response.body.fact.length).toBeGreaterThan(0);
  });

  it('should have dynamic timestamp', async () => {
    const response1 = await request(app).get('/me');
    await new Promise(resolve => setTimeout(resolve, 100));
    const response2 = await request(app).get('/me');

    expect(response1.body.timestamp).not.toBe(response2.body.timestamp);
  });

  it('should return correct content type', async () => {
    const response = await request(app).get('/me');
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});