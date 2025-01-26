import { CreateShortenLinkController } from './create-shorten-link';

const makeSut = (): CreateShortenLinkController => {
  return new CreateShortenLinkController();
};

describe('CreateShortenLinkController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
