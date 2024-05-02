import { randomBytes } from 'node:crypto';
import { UserModel } from '../models/user.model';

export class User {
  public readonly _id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar: string;
  public is_active?: boolean;
  public created_at?: Date;

  constructor(props: UserModel.toCreate, _id?: string) {
    Object.assign(this, props);
    this.avatar = this.avatar ?? null;
    this.is_active = this.is_active || true;
    this.created_at = this.created_at || new Date();
    this._id = _id || randomBytes(12).toString('hex');
  }
}
