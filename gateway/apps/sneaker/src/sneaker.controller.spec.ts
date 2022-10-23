import { Test, TestingModule } from '@nestjs/testing';
import { SneakerController } from './sneaker.controller';
import { SneakerService } from './sneaker.service';

describe('SneakerController', () => {
  let sneakerController: SneakerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SneakerController],
      providers: [SneakerService],
    }).compile();

    sneakerController = app.get<SneakerController>(SneakerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sneakerController.getHello()).toBe('Hello World!');
    });
  });
});
