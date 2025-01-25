import { AccountModel } from '../../domain/models/account';

export interface VerifyAccountRepository {
  get: (value: string) => Promise<boolean>;
}
