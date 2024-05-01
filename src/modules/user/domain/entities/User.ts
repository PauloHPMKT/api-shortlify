import crypto from 'node:crypto';
import { UserModel } from '../models/user.model';

export class User {
  public readonly _id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar: string;
  public is_active: boolean;
  public created_at?: Date;

  constructor(props: UserModel.toCreate, _id?: string) {
    Object.assign(this, props);
    this.generateId(_id);
    this.created_at = this.created_at || new Date();
  }

  private generateId(id: string) {
    if (!id) {
      id = crypto.randomBytes(24).toString('hex');
    }
  }
}
