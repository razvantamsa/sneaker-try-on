import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { SneakersResolver } from './sneakers.resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    SneakersResolver,
    Logger,
    {
      provide: 'SNEAKERS',
      useFactory: (configService: ConfigService) => {
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get('SNEAKER_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['SNEAKERS'],
})
export class SneakersModule {}
