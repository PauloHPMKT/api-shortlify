import { User } from '../../domain/entities/User';

export interface VerifyUserRepository {
  verify(data: Partial<User>): Promise<boolean>;
}
