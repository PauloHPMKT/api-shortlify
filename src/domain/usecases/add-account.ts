import { Account } from '../entities/account/Account';
import { AddAccountModel } from '../models/add-account';

export interface AddAccount {
  add(data: AddAccountModel): Promise<Account>;
}
