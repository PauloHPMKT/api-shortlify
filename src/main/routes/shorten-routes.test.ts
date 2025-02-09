import request from 'supertest';
import app from '../config/app';

describe('Shorten Routes', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id: 'bit.ly/xyz123',
        link: 'https://bit.ly/xyz123',
      }),
    }) as any;
  });

  it('should return 200 on success', async () => {
    await request(app)
      .post('/api/shorten')
      .send({
        long_url: 'http://example.com',
      })
      .expect(200);
  });
});
