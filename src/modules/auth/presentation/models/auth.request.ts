import { Request } from 'express';
import { User } from 'src/modules/user/domain/entities/User';

export interface AuthRequest extends Request {
  user: User;
}
