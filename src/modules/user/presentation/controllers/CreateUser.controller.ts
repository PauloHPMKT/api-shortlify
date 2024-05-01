import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async handle(@Body() data: CreateUserDto) {
    return await this.createUserUseCase.execute(data);
  }
}
