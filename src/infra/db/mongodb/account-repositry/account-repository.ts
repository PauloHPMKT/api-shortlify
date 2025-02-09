import { AddAccountRepository } from '../../../../data/protocols/account/add-account-repository';
import { VerifyAccountRepository } from '../../../../data/protocols/account/verify-account-repository';
import { Account } from '../../../../domain/entities/account/Account';
import { AccountModel } from '../../../../domain/models/account/account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository
  implements AddAccountRepository, VerifyAccountRepository
{
  async add(accountData: AccountModel): Promise<Account> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const { insertedId } = await accountCollection.insertOne(accountData);
    const child = await accountCollection.findOne({ _id: insertedId });

    return MongoHelper.map(child);
  }

  async get(email: string): Promise<boolean> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account !== null;
  }
}
