import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../repositories/CreateUserRepository';
import { CreateUserDto } from '../../presentation/dtos/CreateUser.dto';
import { VerifyUserRepository } from '../repositories/VerifyUserRepository';
import { EncriptAdapter } from '../../../../shared/encripter.adapter';
import { User } from '../../domain/entities/User';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('EncriptAdapter')
    private readonly encriptAdapter: EncriptAdapter,
    @Inject('CreateUserRepository')
    private readonly createUserRepository: CreateUserRepository,
    @Inject('VerifyUserRepository')
    private readonly verifyUserRepository: VerifyUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<string> {
    const user = await this.verifyUserRepository.verify({ email: data.email });
    if (user) throw new Error('User already exists');

    const hashPassword = await this.encriptAdapter.encript(data.password);
    const userToCreate = new User({
      name: data.name,
      email: data.email,
      password: hashPassword,
    });
    return await this.createUserRepository.create(userToCreate);
  }
}
