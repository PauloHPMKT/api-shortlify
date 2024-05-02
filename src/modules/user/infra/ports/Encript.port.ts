export interface EncriptPort {
  encript(data: string): Promise<string>;
}
