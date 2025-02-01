import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-responses';
import { HttpRequest, HttpResponse } from '../../protocols';

export class GenerateBitlinkController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.long_url) {
      return badRequest(new MissingParamError('long_url'));
    }
  }
}
