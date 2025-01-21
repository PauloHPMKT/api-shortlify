import { Account } from '../entities/Account';
import { AddAccountModel } from '../models/add-account';

export interface AddAccount {
  add(data: AddAccountModel): Promise<Account>;
}
