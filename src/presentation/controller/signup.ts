import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';
import { MissingParamError } from '../errors/missing-param.error';
import { InvalidParamError } from '../errors/invalid-param.error';
import { badRequest } from '../helpers/http-responses';

export class SignupController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }
}
