// import { Provider } from '@nestjs/common';
// import { Redis } from 'ioredis';

// export const redisClientFactory = (): Provider[] => [
//   {
//     provide: 'RedisClient',
//     useFactory: () => {
//       // const redisInstance = new Redis({
//       //   host: '172.23.126.233',
//       //   port: 6379,
//       // });

//       // redisInstance.on('connect', () => {
//       //   console.log('Redis connected');
//       // });

//       // redisInstance.on('error', (e) => {
//       //   throw new Error(`Redis connection failed: ${e}`);
//       // });

//       // return redisInstance;
//     },
//     inject: [],
//   },
// ];
