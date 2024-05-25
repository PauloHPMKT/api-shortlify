import { Injectable } from '@nestjs/common';
import { FindUserByEmailUseCase } from 'src/modules/user/application/useCases/FindUserByEmailUseCase';

@Injectable()
export class FindUserByEmailService {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  async execute(email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }
}
