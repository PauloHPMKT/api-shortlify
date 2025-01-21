import { HttpRequest } from '../http/request';
import { HttpResponse } from '../http/response';
import { MissingParamError } from '../errors/missing-param.error';
import { InvalidParamError } from '../errors/invalid-param.error';

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
          return {
            statusCode: 400,
            body: new MissingParamError(field),
          };
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return {
          statusCode: 400,
          body: new InvalidParamError('passwordConfirmation'),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }
}
