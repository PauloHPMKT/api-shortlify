import { Inject } from '@nestjs/common';
import { FindUserByEmailRepository } from '../../infra/repositories/FindUserByEmailRepository';
import { User } from '../../domain/entities/User';

export class FindUserByEmailUseCase {
  constructor(
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async execute(email: string): Promise<User> {
    return await this.findUserByEmailRepository.findByEmail(email);
  }
}
