import { InvalidParamError, MissingParamError } from '../../errors';
import { UrlValidator } from '../../protocols/url-validator';
import { GenerateBitlinkController } from './generate';

const makeUrlValidator = (): UrlValidator => {
  class UrlValidatorStub implements UrlValidator {
    isValid(url: string): boolean {
      return true;
    }
  }
  return new UrlValidatorStub();
};

const makeSut = (): SutTypes => {
  const urlValidatorStub = makeUrlValidator();
  const sut = new GenerateBitlinkController(urlValidatorStub);
  return {
    sut,
    urlValidatorStub,
  };
};

interface SutTypes {
  sut: GenerateBitlinkController;
  urlValidatorStub: UrlValidator;
}

describe('GenerateBitlinkController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no long_url is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        long_url: '',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('long_url'));
  });

  it('should return 400 if url format is invalid', async () => {
    const { sut, urlValidatorStub } = makeSut();
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        long_url: 'invalid_url',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new InvalidParamError('long_url'));
  });
});
