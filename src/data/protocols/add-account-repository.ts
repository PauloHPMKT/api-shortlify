import { Account } from '../../domain/entities/Account';
import { AccountModel } from '../../domain/models/account';

export interface AddAccountRepository {
  add(accountData: AccountModel): Promise<Account>;
}
