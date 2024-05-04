import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../modules/user/presentation/user.module';
import { DatabaseModule } from '../modules/database/database.module';
import { AuthModule } from '../modules/auth/presentation/auth.module';
import { EmployeesModule } from '../modules/employees/presentation/employees.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../modules/auth/presentation/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
