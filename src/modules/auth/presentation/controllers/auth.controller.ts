import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { IsPublic } from '../decorators/is-public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequest } from '../models/auth.request';
import { CurrentUser } from '../decorators/currentuser.decorator';
import { User } from 'src/modules/user/domain/entities/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
