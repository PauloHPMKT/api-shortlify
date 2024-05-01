import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main.ts');

async function bootstrap() {
  const port = 3009;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(port).then(() => {
    logger.log(`[API_SHOTLIFY] Server is running on http://localhost:${port}`);
  });
}
bootstrap();
