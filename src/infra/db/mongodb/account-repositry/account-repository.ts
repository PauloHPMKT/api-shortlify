import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { Account } from '../../../../domain/entities/Account';
import { AccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AccountModel): Promise<Account> {
    const childCollection = MongoHelper.getCollection('accounts');
    const { insertedId } = await childCollection.insertOne(accountData);
    const child = await childCollection.findOne({ _id: insertedId });

    return MongoHelper.map(child);
  }
}
