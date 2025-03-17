import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './helpers/logger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
