import { Provider } from '@nestjs/common';
import { RedisRepository } from '../repository/redis.repository';
import { RedisService } from './redis.service';

export const redisProvider = (): Provider[] => [
  {
    provide: 'RedisRepository',
    useClass: RedisRepository,
  },
  {
    provide: 'RedisService',
    useValue: RedisService,
  },
];
