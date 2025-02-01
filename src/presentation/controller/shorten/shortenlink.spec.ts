import { MissingParamError } from '../../errors';
import { ShortenLinkController } from './shortenlink';

describe('ShortenLinkController', () => {
  it('should be defined', () => {
    const sut = new ShortenLinkController();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no url is provided', async () => {
    const sut = new ShortenLinkController();
    const httpRequest = {
      body: {
        url: '',
        accountId: 'any_account_id',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('url'));
  });
});
