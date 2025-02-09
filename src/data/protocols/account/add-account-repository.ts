import { Account } from '../../../domain/entities/account/Account';
import { AccountModel } from '../../../domain/models/account/account';

export interface AddAccountRepository {
  add(accountData: AccountModel): Promise<Account>;
}
