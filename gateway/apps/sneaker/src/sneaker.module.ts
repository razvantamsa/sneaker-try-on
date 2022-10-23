import { Module } from '@nestjs/common';
import { SneakerController } from './sneaker.controller';
import { SneakerService } from './sneaker.service';

@Module({
  imports: [],
  controllers: [SneakerController],
  providers: [SneakerService],
})
export class SneakerModule {}
