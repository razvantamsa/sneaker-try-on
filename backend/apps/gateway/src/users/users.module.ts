import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UsersResolver } from './users.resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    UsersResolver,
    Logger,
    {
      provide: 'USERS',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get('USER_PORT'),
            host: 'localhost',
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['USERS'],
})
export class UsersModule {}
