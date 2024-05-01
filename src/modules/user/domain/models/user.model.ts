import { User } from '../entities/User';

export namespace UserModel {
  export type toCreate = Omit<User, '_id' | 'avatar' | 'created_at'>;
}
