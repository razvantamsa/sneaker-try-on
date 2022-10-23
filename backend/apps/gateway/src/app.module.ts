import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // GraphQL structure of the gateway
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    // add module for each microservice -> dispatch
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
