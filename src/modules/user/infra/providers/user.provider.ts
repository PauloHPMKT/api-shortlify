import { Provider } from '@nestjs/common';
import { UsersMongooseRepository } from '../../../database/repositories/UsersMongooseRepository';

export const userProvider = (): Provider[] => [
  {
    provide: 'CreateUserRepository',
    useClass: UsersMongooseRepository,
  },
];
