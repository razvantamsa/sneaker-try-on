import { AdminUserEntity } from 'nestjs-admin';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandModel } from './brands/brand.model';

import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    BrandsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([BrandModel]),
    ClientsModule.register([
      { name: 'BRANDS', transport: Transport.TCP, options: { port: 3003 } },
    ]),
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

  providers: [Logger],
})
export class AppModule {}
