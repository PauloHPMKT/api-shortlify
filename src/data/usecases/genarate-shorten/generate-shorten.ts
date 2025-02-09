import { Link } from '../../../domain/entities/shorten/Link';
import { CreateShortenLinkModel } from '../../../domain/models/shorten/create-shortenlink';
import { CreateShortenLink } from '../../../domain/usecases/shorten/create-shortenlink';
import { SetCacheRepository } from '../../protocols/shorten/set-cache-repository';
import { ShortenLink } from '../../protocols/shorten/shortenlink';

export class GenerateShortenLinkUseCase implements CreateShortenLink {
  constructor(
    private readonly shortenLinkService: ShortenLink,
    private readonly setCacheRepository: SetCacheRepository,
  ) {}

  async execute(url: CreateShortenLinkModel): Promise<Link> {
    const { long_url } = url;
    const data = await this.shortenLinkService.shorten(long_url);
    const shortenLinkData = new Link(data);

    const shortenLinkDataCache = JSON.stringify(shortenLinkData);
    const key = `shortenLink:${shortenLinkData.long_url}`;
    await this.setCacheRepository.set(key, shortenLinkDataCache);

    return shortenLinkData;
  }
}
