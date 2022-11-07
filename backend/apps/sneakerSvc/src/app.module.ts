import { AdminUserEntity } from 'nestjs-admin';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SneakerModel } from './sneakers/sneaker.model';

import { SneakersModule } from './sneakers/sneakers.module';

@Module({
  imports: [
    SneakersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([SneakerModel]),
    ClientsModule.register([
      { name: 'SNEAKERS', transport: Transport.TCP, options: { port: 3002 } },
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
