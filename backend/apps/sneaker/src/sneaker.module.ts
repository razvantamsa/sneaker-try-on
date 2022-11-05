import { join } from 'path';
import { AdminUserEntity } from 'nestjs-admin';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { SneakerModel } from './models/sneaker.model';
import { BrandModel } from './models/brand.model';

import { SneakerService } from './services/sneaker.service';
import { BrandService } from './services/brand.service';

import { SneakerController } from './controllers/sneaker.controller';
import { BrandController } from './controllers/brand.controller';

import { SneakerResolver } from './resolver/sneaker.resolver';
import { BrandResolver } from './resolver/brand.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([SneakerModel]),
    TypeOrmModule.forFeature([BrandModel]),
    ClientsModule.register([
      { name: 'SNEAKERS', transport: Transport.TCP, options: { port: 3002 } },
    ]),
    ClientsModule.register([
      { name: 'BRANDS', transport: Transport.TCP, options: { port: 3002 } },
    ]),
    GraphQLModule.forRoot({
      cors: {
        origin: ['http://localhost:3002'],
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
        keepAlive: 3002,
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

  controllers: [SneakerController, BrandController],
  providers: [
    SneakerService,
    SneakerResolver,
    BrandService,
    BrandResolver,
    Logger,
  ],
})
export class SneakerModule {}
