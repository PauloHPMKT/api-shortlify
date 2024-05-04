import { Module, Provider } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '../application/auth.service';
import { UserModule } from 'src/modules/user/presentation/user.module';
import { makeAuthProvider } from '../infra/providers/auth.provider';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

const providers: Provider[] = [
  ...makeAuthProvider(),
  AuthService,
  LocalStrategy,
  JwtStrategy,
];

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '50d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers,
  exports: providers,
})
export class AuthModule {}
