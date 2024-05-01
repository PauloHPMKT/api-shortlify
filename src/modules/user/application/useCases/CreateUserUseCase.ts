import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../../infra/repositories/CreateUserRepository';
import { CreateUserDto } from '../../presentation/dtos/CreateUser.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<string> {
    return await this.createUserRepository.create(data);
  }
}
