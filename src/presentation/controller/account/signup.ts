import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
} from '../../protocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, created, serverError } from '../../helpers/http-responses';
import { AddAccount } from '../../../domain/usecases/account/add-account';

export class SignupController implements Controller {
  constructor(
    private readonly emailValiator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body;
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

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValiator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return created(account);
    } catch (error) {
      return serverError();
    }
  }
}
