import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-responses';
import { HttpRequest, HttpResponse } from '../../protocols';
import { UrlValidator } from '../../protocols/url-validator';

export class GenerateBitlinkController {
  constructor(private readonly urlValidator: UrlValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { long_url } = httpRequest.body;

    if (!long_url) {
      return badRequest(new MissingParamError('long_url'));
    }
    const isUrlValid = this.urlValidator.isValid(long_url);
    if (!isUrlValid) {
      return badRequest(new InvalidParamError('long_url'));
    }
  }
}
