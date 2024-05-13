import { Module } from '@nestjs/common';
import { BitlyController } from './controllers/bitly.controller';
import { HttpModule } from '@nestjs/axios';
import { BitlyService } from '../application/services/bitly.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [BitlyController],
  providers: [BitlyService],
})
export class BitlyModule {}
