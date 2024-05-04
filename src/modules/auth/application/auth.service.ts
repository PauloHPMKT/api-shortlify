import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/User';
import { FindUserByEmailRepository } from 'src/modules/user/infra/repositories/FindUserByEmailRepository';
import { EncriptAdapter } from 'src/shared/encripter.adapter';
import { UserPayload } from '../presentation/models/user.payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../presentation/models/user-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject('EncriptAdapter')
    private readonly encriptAdapter: EncriptAdapter,
    @Inject('FindUserByEmailRepository')
    private readonly findUserByEmail: FindUserByEmailRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.findUserByEmail.findByEmail(email);
    if (user) {
      const compareValidPassword = await this.encriptAdapter.compare(
        password,
        user.password,
      );
      if (compareValidPassword) return user;
    }
    throw new Error('Invalid credentials');
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user._id,
      name: user.name,
      email: user.email,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
      user,
    };
  }
}
