export interface VerifyCacheRepository {
  get(key: string): Promise<any>;
}
