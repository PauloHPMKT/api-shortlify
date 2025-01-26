import { MissingParamError } from '../../errors';
import { CreateShortenLinkController } from './create-shorten-link';

const makeSut = (): CreateShortenLinkController => {
  return new CreateShortenLinkController();
};

describe('CreateShortenLinkController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no url is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        originalUrl: '',
        accountId: 'any_account_id',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('originalUrl'));
  });
});
