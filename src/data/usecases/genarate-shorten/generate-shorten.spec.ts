import { ShortenLink } from '../../protocols/shortenlink';
import { GenerateShortenLinkUseCase } from './generate-shorten';

const makeShortenLink = (): ShortenLink => {
  class ShortenLinkServiceStub implements ShortenLink {
    async shorten(url: string): Promise<any> {
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
          created_at: new Date('2025-02-02T00:00:00.000Z'),
        }),
      );
    }
  }
  return new ShortenLinkServiceStub();
};

const makeSut = (): SutTypes => {
  const shortenLinkServiceStub = makeShortenLink();
  const sut = new GenerateShortenLinkUseCase(shortenLinkServiceStub);
  return {
    sut,
    shortenLinkServiceStub,
  };
};

interface SutTypes {
  shortenLinkServiceStub: ShortenLink;
  sut: GenerateShortenLinkUseCase;
}

describe('GenerateShorten', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return a shorten link data', async () => {
    const { sut, shortenLinkServiceStub } = makeSut();
    const shortenData = {
      id: 'valid_id',
      archived: true,
      custom_bitlinks: [],
      deeplinks: [],
      custom_id: 'valid_custom_id',
      link: 'valid_link',
      long_url: 'valid_long_url',
      references: {},
      tags: [],
      created_at: new Date('2025-02-02'),
    };
    jest
      .spyOn(shortenLinkServiceStub, 'shorten')
      .mockReturnValueOnce(new Promise((resolve) => resolve(shortenData)));
    const response = await sut.execute({ long_url: 'any_url' });
    expect(response).toEqual({
      id: 'valid_id',
      archived: true,
      custom_bitlinks: [],
      deeplinks: [],
      custom_id: 'valid_custom_id',
      link: 'valid_link',
      long_url: 'valid_long_url',
      references: {},
      tags: [],
      created_at: new Date('2025-02-02'),
    });
  });
});
