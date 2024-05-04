import { User } from '../../../user/domain/entities/User';

export interface UserToken {
  access_token: string;
  user: User;
}
