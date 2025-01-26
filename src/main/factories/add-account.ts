import { SignupController } from '../../presentation/controller/account/signup';
import { Controller } from '../../presentation/protocols/controller';
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter';
import { makeDbAddAccountFactory } from './db-add-account';

export const makeSignupControllerFactory = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const addAccountUseCase = makeDbAddAccountFactory();

  return new SignupController(emailValidator, addAccountUseCase);
};
