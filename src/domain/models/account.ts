import { Account } from '../entities/Account';

export type AccountModel = Omit<Account, 'id'>;
