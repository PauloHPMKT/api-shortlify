import { CreateUserDto } from '../../presentation/dtos/CreateUser.dto';

export interface CreateUserRepository {
  create(data: CreateUserDto): Promise<string>;
}
