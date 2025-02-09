import { Link } from '../../../domain/entities/shorten/Link';
import { SetCacheRepository } from '../../protocols/shorten/set-cache-repository';
import { ShortenLink } from '../../protocols/shorten/shortenlink';
import { GenerateShortenLinkUseCase } from './generate-shorten';

const makeCacheShortenLink = (): SetCacheRepository => {
  class SetCacheRepositoryStub implements SetCacheRepository {
    async set(key: string, value: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new SetCacheRepositoryStub();
};

const makeShortenLink = (): ShortenLink => {
  class ShortenLinkServiceStub implements ShortenLink {
    async shorten(url: string): Promise<Link> {
      return new Promise((resolve) =>
        resolve({
          link: 'valid_link',
          long_url: 'valid_long_url',
          custom_id: 'valid_custom_id',
          references: {
            group: 'valid_group',
          },
          archived: false,
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
  const setCacheRepositoryStub = makeCacheShortenLink();
  const sut = new GenerateShortenLinkUseCase(
    shortenLinkServiceStub,
    setCacheRepositoryStub,
  );
  return {
    sut,
    shortenLinkServiceStub,
    setCacheRepositoryStub,
  };
};

interface SutTypes {
  shortenLinkServiceStub: ShortenLink;
  setCacheRepositoryStub: SetCacheRepository;
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
      link: 'valid_link',
      long_url: 'valid_long_url',
      custom_id: 'valid_custom_id',
      references: {
        group: 'valid_group',
      },
      archived: false,
      tags: [],
      created_at: new Date('2025-02-02'),
    };
    jest
      .spyOn(shortenLinkServiceStub, 'shorten')
      .mockReturnValueOnce(new Promise((resolve) => resolve(shortenData)));
    const response = await sut.execute({ long_url: 'any_url' });
    expect(response).toEqual({
      link: 'valid_link',
      long_url: 'valid_long_url',
      custom_id: 'valid_custom_id',
      references: {
        group: 'valid_group',
      },
      archived: false,
      tags: [],
      created_at: new Date('2025-02-02'),
    });
  });

  it('should cache the shorten link data', async () => {
    const { sut, setCacheRepositoryStub } = makeSut();
    const setSpy = jest.spyOn(setCacheRepositoryStub, 'set');
    const shortenLinkDataString = JSON.stringify({
      link: 'valid_link',
      long_url: 'valid_long_url',
      custom_id: 'valid_custom_id',
      references: {
        group: 'valid_group',
      },
      archived: false,
      tags: [],
      created_at: new Date('2025-02-02'),
    });
    await sut.execute({ long_url: 'any_url' });
    expect(setSpy).toHaveBeenCalledWith(
      'shortenLink:valid_long_url',
      shortenLinkDataString,
    );
  });
});
