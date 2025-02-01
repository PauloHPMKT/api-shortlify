import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-responses';
import { HttpRequest, HttpResponse } from '../../protocols';

export class ShortenLinkController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.shortUrl) {
      return badRequest(new MissingParamError('shortUrl'));
    }
  }
}
