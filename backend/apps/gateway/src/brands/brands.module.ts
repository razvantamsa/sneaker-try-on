import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { BrandsResolver } from './brands.resolver';

@Module({
  imports: [ConfigModule],
  providers: [
    BrandsResolver,
    Logger,
    {
      provide: 'BRANDS',
      useFactory: (configService: ConfigService) => {
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get('BRAND_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['BRANDS'],
})
export class BrandsModule {}
