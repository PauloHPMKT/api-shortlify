export interface VerifyAccountRepository {
  get: (value: string) => Promise<boolean>;
}
