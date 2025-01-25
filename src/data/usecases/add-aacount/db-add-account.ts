import { Account } from '../../../domain/entities/Account';
import { AddAccountModel } from '../../../domain/models/add-account';
import { AddAccount } from '../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = new Account({
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword,
    });

    return await this.addAccountRepository.add(account);
  }
}
