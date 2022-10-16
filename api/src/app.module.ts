import { join } from "path";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DefaultAdminModule, AdminUserEntity } from "nestjs-admin";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { TerminusModule } from "@nestjs/terminus";
import { ScheduleModule } from "@nestjs/schedule";
import { ApolloDriver } from "@nestjs/apollo";

import { allowedOnboarding, allowedUserKind } from "./constants";

import { UsersModule } from "./users/users.module";
import { UsersResolver } from "./users/users.resolver";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TerminusModule,
    UsersModule,
    DefaultAdminModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      cors: {
        origin: ["http://localhost:8080", "http://localhost:3000", "http://localhost:3001"],
        credentials: true,
        allowedHeaders: ["Set-Cookie"],
        exposedHeaders: ["Set-Cookie"]
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      uploads: false,
      buildSchemaOptions: {
        numberScalarMode: "integer",
        dateScalarMode: "timestamp"
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 3002
      },
      directiveResolvers: {
        Onboarding: allowedOnboarding,
        UserKind: allowedUserKind
      },
      context: async ({ req, connection, res }) => {
        // subscriptions
        if (connection) {
          return {
            req: {
              headers: {
                authorization: connection.context.authorization
              }
            },
            res: connection.context
          };
        }
        // queries and mutations
        return { req, res };
      },
      sortSchema: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // logging: configService.get("DEBUG", "false") === "true",
        type: "postgres",
        url: configService.get("DATABASE_URL"),
        extra: configService.get("DB_USE_SSL", "false") === "true" ? { ssl: { rejectUnauthorized: false } } : {},
        entities: ["dist/**/*.model.js", AdminUserEntity],
        migrations: ["dist/migrations/*.js"],
        migrationsRun: configService.get("DB_RUN_MIGRATIONS", "true") === "true",
        synchronize: false,
        bigNumberStrings: false,
        dropSchema: false
      }),
      inject: [ConfigService]
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("MAIL_HOST"),
          port: configService.get("MAIL_PORT"),
          secure: configService.get("MAIL_SECURE") === "true",
          auth: {
            user: configService.get("MAIL_USER"),
            pass: configService.get("MAIL_PASS")
          }
        },
        defaults: {
          from: configService.get("MAIL_DEFAULT_CONTACT")
        },
        template: {
          dir: process.cwd() + "/src/templates/",
          adapter: new EjsAdapter(),
          options: {
            strict: false
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [UsersResolver],
  controllers: []
})
export class AppModule {}
