import { ConfigService } from 'nestjs-xion/config';
import { ErrorFilter } from 'nestjs-xion/error';
import { StandardResponseInterceptor } from 'nestjs-xion/interceptor';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '#app/app.module';
import Config from '#configs';

import type { AppConfig } from '#configs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { port, host } = app.get(ConfigService).get(Config.App) as AppConfig;

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new StandardResponseInterceptor());

  await app.listen(port, host);
}

bootstrap().catch((error) => {
  throw error;
});
