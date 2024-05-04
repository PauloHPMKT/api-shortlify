import { Provider } from '@nestjs/common';
import { UsersMongooseRepository } from '../../../database/repositories/UsersMongooseRepository';
import { EncriptAdapter } from '../../../../shared/encripter.adapter';

export const userProvider = (): Provider[] => [
  {
    provide: 'EncriptAdapter',
    useClass: EncriptAdapter,
  },
  {
    provide: 'CreateUserRepository',
    useClass: UsersMongooseRepository,
  },
  {
    provide: 'VerifyUserRepository',
    useClass: UsersMongooseRepository,
  },
  {
    provide: 'FindUserByEmailRepository',
    useClass: UsersMongooseRepository,
  },
];
