import { MissingParamError } from '../../errors';
import { HttpRequest, HttpResponse } from '../../protocols';

export class ShortenLinkController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return {
        statusCode: 400,
        body: new MissingParamError('url'),
      };
    }
  }
}
