import { Account } from '../../../domain/entities/Account';
import { AddAccountModel } from '../../../domain/models/add-account';
import { AddAccount } from '../../../domain/usecases/add-account';
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<Account> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
        shortenLinks: [],
        avatar: null,
        isActive: true,
        createdAt: new Date(),
      }),
    );
  }
}
