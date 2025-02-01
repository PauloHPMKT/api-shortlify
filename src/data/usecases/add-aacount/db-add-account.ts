import { Account } from '../../../domain/entities/account/Account';
import { AddAccountModel } from '../../../domain/models/account/add-account';
import { AddAccount } from '../../../domain/usecases/account/add-account';
import {
  Encrypter,
  AddAccountRepository,
  VerifyAccountRepository,
} from '../../protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly verifyAccountRepository: VerifyAccountRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<Account> {
    const existAccount = await this.verifyAccountRepository.get(
      accountData.email,
    );
    if (existAccount) {
      throw new Error('Account already exists');
    }

    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = new Account({
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword,
    });

    return await this.addAccountRepository.add(account);
  }
}
