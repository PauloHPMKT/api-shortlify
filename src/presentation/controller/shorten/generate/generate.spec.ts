import { MissingParamError } from '../../../errors';
import { GenerateBitlinkController } from './generate';

const makeSut = (): GenerateBitlinkController => {
  return new GenerateBitlinkController();
};

describe('GenerateBitlinkController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no long_url is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        long_url: '',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('long_url'));
  });
});
