import { DbAddAccount } from '../../data/usecases/add-aacount/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repositry/account-repository';

export const makeDbAddAccountFactory = (): DbAddAccount => {
  const salt = 12;
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const verifyAccountRepository = new AccountMongoRepository();

  return new DbAddAccount(
    encrypter,
    addAccountRepository,
    verifyAccountRepository,
  );
};
