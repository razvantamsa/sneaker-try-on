import { Test, TestingModule } from '@nestjs/testing';
import { SneakersController } from './sneakers.controller';
import { SneakersService } from './sneakers.service';

describe('SneakerController', () => {
  let sneakerController: SneakersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SneakersController],
      providers: [SneakersService],
    }).compile();

    sneakerController = app.get<SneakersController>(SneakersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sneakerController.getHello()).toBe('Hello World!');
    });
  });
});
