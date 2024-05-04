import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/auth.request';
import { User } from '../../../user/domain/entities/User';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
