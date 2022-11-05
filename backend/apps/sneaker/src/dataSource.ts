import { DataSource } from 'typeorm';

export const SneakerDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['dist/models/*.js'],
  migrations: ['dist/migrations/*.js'],
});
