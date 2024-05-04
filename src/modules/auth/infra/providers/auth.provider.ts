import { Provider } from '@nestjs/common';
import { UsersMongooseRepository } from 'src/modules/database/repositories/UsersMongooseRepository';
import { EncriptAdapter } from 'src/shared/encripter.adapter';

export const makeAuthProvider = (): Provider[] => [
  {
    provide: 'EncriptAdapter',
    useClass: EncriptAdapter,
  },
  {
    provide: 'FindUserByEmailRepository',
    useClass: UsersMongooseRepository,
  },
];
