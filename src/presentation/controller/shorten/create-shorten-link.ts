import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-responses';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class CreateShortenLinkController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['originalUrl', 'accountId'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
