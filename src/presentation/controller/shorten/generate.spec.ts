import { CreateShortenLinkModel } from '../../../domain/models/shorten/create-shortenlink';
import { CreateShortenLink } from '../../../domain/usecases/shorten/create-shortenlink';
import { InvalidParamError, MissingParamError } from '../../errors';
import { serverError } from '../../helpers/http-responses';
import { UrlValidator } from '../../protocols/url-validator';
import { GenerateBitlinkController } from './generate';

const makeCreateShortenLink = (): CreateShortenLink => {
  class CreateShortenLinkStub implements CreateShortenLink {
    async execute(data: CreateShortenLinkModel): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          archived: true,
          custom_bitlinks: [],
          deeplinks: [],
          custom_id: 'valid_custom_id',
          link: 'valid_link',
          long_url: 'valid_long_url',
          references: {},
          tags: [],
          created_at: new Date(),
        }),
      );
    }
  }
  return new CreateShortenLinkStub();
};

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
  const createShortenLinkStub = makeCreateShortenLink();
  const sut = new GenerateBitlinkController(
    urlValidatorStub,
    createShortenLinkStub,
  );
  return {
    sut,
    urlValidatorStub,
    createShortenLinkStub,
  };
};

interface SutTypes {
  sut: GenerateBitlinkController;
  urlValidatorStub: UrlValidator;
  createShortenLinkStub: CreateShortenLink;
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

  it('should call UrlValidator with correct long url', async () => {
    const { sut, urlValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        long_url: 'any_url',
      },
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_url');
  });

  it('should return 500 if GenerateBitlinkController throws', async () => {
    const { sut, createShortenLinkStub } = makeSut();
    jest.spyOn(createShortenLinkStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        long_url: 'any_url',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(serverError());
  });
});
