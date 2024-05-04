import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/useCases/CreateUserUseCase';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async handle(@Body() data: CreateUserDto) {
    const { name, email, password } = data;
    try {
      return await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
