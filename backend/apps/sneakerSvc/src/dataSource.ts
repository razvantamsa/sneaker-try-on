import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const UserDataSource = new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  logging: true,
  entities: ['dist/users/*.model.js'],
  migrations: ['dist/*.js'],
});
