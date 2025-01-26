import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-responses';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class CreateShortenLinkController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.originalUrl) {
      return badRequest(new MissingParamError('originalUrl'));
    }

    if (!httpRequest.body.accountId) {
      return badRequest(new MissingParamError('accountId'));
    }
  }
}
