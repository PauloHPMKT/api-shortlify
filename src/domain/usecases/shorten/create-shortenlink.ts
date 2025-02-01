import { CreateShortenLinkModel } from '../../models/shorten/create-shortenlink';

export interface CreateShortenLink {
  execute(url: CreateShortenLinkModel): Promise<any>;
}
