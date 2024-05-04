import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserController } from './controllers/CreateUser.controller';
import { CreateUserUseCase } from '../application/useCases/CreateUserUseCase';
import { userProvider } from '../infra/providers/user.provider';
import { makeUserProvider } from '../infra/providers/user-db.provider';
import { FindUserByEmailUseCase } from '../application/useCases/FindUserByEmailUseCase';
import { FindUserByEmailController } from './controllers/FindUserByEmail.controller';

const providers: Provider[] = [
  CreateUserUseCase,
  FindUserByEmailUseCase,
  ...makeUserProvider(),
  ...userProvider(),
];

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, FindUserByEmailController],
  providers,
})
export class UserModule {}
