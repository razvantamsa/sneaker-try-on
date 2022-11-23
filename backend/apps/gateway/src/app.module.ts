import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { UsersModule } from './users/users.module';
import { SneakersModule } from './sneakers/sneakers.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // GraphQL structure of the gateway
    GraphQLModule.forRoot({
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
        allowedHeaders: ['Set-Cookie'],
        exposedHeaders: ['Set-Cookie'],
      },
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      uploads: false,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',
      },
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 3000,
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

    // add module for each microservice -> dispatch
    UsersModule,
    SneakersModule,
    BrandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
