import * as bcrypt from 'bcrypt';
import { EncriptPort } from '../modules/user/infra/ports/Encript.port';

export class EncriptAdapter implements EncriptPort {
  async encript(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }
}
