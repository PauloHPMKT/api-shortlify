import { Link } from '../../entities/shorten/Link';
import { CreateShortenLinkModel } from '../../models/shorten/create-shortenlink';

export interface CreateShortenLink {
  execute(url: CreateShortenLinkModel): Promise<Link>;
}
