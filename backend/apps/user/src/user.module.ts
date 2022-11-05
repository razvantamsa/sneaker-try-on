import { join } from 'path';
import { AdminUserEntity } from 'nestjs-admin';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { UserModel } from './models/user.model';

import { UserController } from './controllers/user.controller';

import { UserService } from './services/user.service';

import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserModel]),
    ClientsModule.register([
      { name: 'USERS', transport: Transport.TCP, options: { port: 3001 } },
    ]),
    GraphQLModule.forRoot({
      cors: {
        origin: ['http://localhost:3001'],
        credentials: true,
        allowedHeaders: ['Set-Cookie'],
        exposedHeaders: ['Set-Cookie'],
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      uploads: false,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 3001,
      },
      directiveResolvers: {},
      context: async ({ req, connection, res }) => {
        // subscriptions
        if (connection) {
          return {
            req: {
              headers: {
                authorization: connection.context.authorization,
              },
            },
            res: connection.context,
          };
        }
        // queries and mutations
        return { req, res };
      },
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        logging: configService.get('DEBUG', 'false') === 'true',
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        extra:
          configService.get('DB_USE_SSL', 'false') === 'true'
            ? { ssl: { rejectUnauthorized: false } }
            : {},
        entities: ['dist/**/*.model.js', AdminUserEntity],
        migrations: ['dist/migrations/*.js'],
        migrationsRun:
          configService.get('DB_RUN_MIGRATIONS', 'true') === 'true',
        synchronize: false,
        bigNumberStrings: false,
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),

    // add module for each microservice -> dispatch
  ],

  controllers: [UserController],
  providers: [UserService, UserResolver, Logger],
})
export class UserModule {}
