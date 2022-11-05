import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ImageProcessingModule } from './image-processing/image-processing.module';
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
    ImageProcessingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
