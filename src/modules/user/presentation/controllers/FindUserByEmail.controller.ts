import { Controller, Get, Param } from '@nestjs/common';
import { FindUserByEmailUseCase } from '../../application/useCases/FindUserByEmailUseCase';

@Controller()
export class FindUserByEmailController {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  @Get('users/:email')
  async handle(@Param('email') email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }
}
