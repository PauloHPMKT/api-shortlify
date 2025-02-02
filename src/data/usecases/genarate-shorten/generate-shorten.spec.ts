import { GenerateShortenLinkUseCase } from './generate-shorten';

const makeSut = (): GenerateShortenLinkUseCase => {
  return new GenerateShortenLinkUseCase();
};

describe('GenerateShorten', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
