import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

import rawBodyMiddleware from "./common/raw.middleware";
import { graphqlUploadExpress } from "graphql-upload";

// TODO: read origins from env

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: ["http://localhost:8080", , "http://localhost:3000", "http://localhost:3001"],
      credentials: true
    }
  });
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.use(rawBodyMiddleware());

  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.getHttpAdapter().getInstance().set("etag", false);

  await app.listen(process.env.PORT || 3000);
}

// eslint-disable-next-line no-void
void bootstrap();
