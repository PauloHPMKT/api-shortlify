import request from 'supertest';
import app from '../config/app';

describe('Shorten Routes', () => {
  it('should return 200 on success', async () => {
    await request(app)
      .post('/api/shorten')
      .send({
        long_url: 'http://example.com',
      })
      .expect(200);
  });
});
