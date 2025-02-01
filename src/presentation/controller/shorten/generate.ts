import { MissingParamError } from '../../errors';
import { HttpRequest, HttpResponse } from '../../protocols';

export class GenerateBitlinkController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.long_url) {
      return {
        statusCode: 400,
        body: new MissingParamError('long_url'),
      };
    }
  }
}
