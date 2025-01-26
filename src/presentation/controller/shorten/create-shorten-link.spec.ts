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
        accountId: 'any_account_id',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('originalUrl'));
  });

  it('should return 400 if no accountId is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        originalUrl: 'any_url',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('accountId'));
  });

  it('should return 400 if accountId is empty', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        originalUrl: 'any_url',
        accountId: '',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('accountId'));
  });

  it('should return 400 if accountId is null', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        originalUrl: 'any_url',
        accountId: null,
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('accountId'));
  });

  it('should return 400 if accountId is undefined', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        originalUrl: 'any_url',
        accountId: undefined,
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('accountId'));
  });
});
