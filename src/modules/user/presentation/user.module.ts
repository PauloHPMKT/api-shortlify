import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserController } from './controllers/CreateUser.controller';
import { CreateUserUseCase } from '../application/useCases/CreateUserUseCase';
import { userProvider } from '../infra/providers/user.provider';
import { makeUserProvider } from '../infra/providers/user-db.provider';

const providers: Provider[] = [
  CreateUserUseCase,
  ...makeUserProvider(),
  ...userProvider(),
];

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers,
})
export class UserModule {}
