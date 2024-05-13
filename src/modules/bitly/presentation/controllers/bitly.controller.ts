import { Body, Controller, Post } from '@nestjs/common';
import { BitlyService } from '../../application/services/bitly.service';
import { IsPublic } from 'src/modules/auth/presentation/decorators/is-public.decorator';

@Controller('bitly')
export class BitlyController {
  constructor(private readonly bitlyService: BitlyService) {}

  @Post()
  @IsPublic()
  async handle(@Body() data: any) {
    console.log(data);
    return await this.bitlyService.execute(data);
  }
}
