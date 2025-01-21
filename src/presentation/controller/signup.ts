import { HttpRequest } from '../protocols/request';
import { HttpResponse } from '../protocols/response';
import { MissingParamError } from '../errors/missing-param.error';
import { InvalidParamError } from '../errors/invalid-param.error';
import { badRequest } from '../helpers/http-responses';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';

export class SignupController implements Controller {
  constructor(private readonly emailValiator: EmailValidator) {}

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

      const isValid = this.emailValiator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Internal server error'),
      };
    }
  }
}
