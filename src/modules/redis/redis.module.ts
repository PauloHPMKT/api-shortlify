import { Global, Module, Provider } from '@nestjs/common';
//import { redisClientFactory } from './services/redis-config.provider';
import { RedisService } from './services/redis.service';
import { redisProvider } from './services/redis.provider';
import { Redis } from 'ioredis';

const redisClientFactory = (): Provider => ({
  provide: 'RedisClient',
  useFactory: async () => {
    const client = new Redis({
      host: '172.23.126.233',
      port: 6379,
    });

    client.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });
    return client;
  },
});

const providers: Provider[] = [
  RedisService,
  redisClientFactory(),
  ...redisProvider(),
];

@Global()
@Module({
  imports: [],
  providers,
  exports: providers,
})
export class RedisModule {}
