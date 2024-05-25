import { Controller, Get, Param } from '@nestjs/common';
import { FindUserByEmailService } from '../../application/useCases/FindUserByEmail.service';

@Controller()
export class FindUserByEmailController {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailService,
  ) {}

  @Get('users/:email')
  async handle(@Param('email') email: string) {
    return await this.findUserByEmailUseCase.execute(email);
  }
}
