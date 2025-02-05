export interface SetCacheRepository {
  set(key: string, value: string): Promise<void>;
}
