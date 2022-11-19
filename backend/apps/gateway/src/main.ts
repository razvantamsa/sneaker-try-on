import { graphqlUploadExpress } from 'graphql-upload';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.use(cookieParser());
  // app.use(rawBodyMiddleware());

  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.getHttpAdapter().getInstance().set('etag', false);

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
