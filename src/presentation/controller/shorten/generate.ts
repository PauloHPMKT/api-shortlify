import { CreateShortenLink } from '../../../domain/usecases/shorten/create-shortenlink';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, ok } from '../../helpers/http-responses';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UrlValidator } from '../../protocols/url-validator';

export class GenerateShortenLinkController implements Controller {
  constructor(
    private readonly urlValidator: UrlValidator,
    private readonly createShortenLink: CreateShortenLink,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { long_url } = httpRequest.body;

      if (!long_url) {
        return badRequest(new MissingParamError('long_url'));
      }

      const isUrlValid = this.urlValidator.isValid(long_url);
      if (!isUrlValid) {
        return badRequest(new InvalidParamError('long_url'));
      }

      const shortenData = await this.createShortenLink.execute({ long_url });
      return ok(shortenData);
    } catch (error) {
      return serverError();
    }
  }
}
