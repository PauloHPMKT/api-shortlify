import { Account } from '../entities/account/Account';

export type AccountModel = Omit<Account, 'id'>;
