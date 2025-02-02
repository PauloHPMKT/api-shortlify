import { CreateShortenLinkModel } from '../../../domain/models/shorten/create-shortenlink';
import { CreateShortenLink } from '../../../domain/usecases/shorten/create-shortenlink';
import { ShortenLink } from '../../protocols/shortenlink';

export class GenerateShortenLinkUseCase implements CreateShortenLink {
  constructor(private readonly shortenLinkService: ShortenLink) {}

  async execute(url: CreateShortenLinkModel): Promise<any> {
    const { long_url } = url;
    // encurtar a url
    await this.shortenLinkService.shorten(long_url);

    // criar a entidade

    // salvar no cache

    // retornar a entidade salva
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
