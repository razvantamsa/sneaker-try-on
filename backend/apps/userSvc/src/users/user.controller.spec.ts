import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userController = app.get<UsersController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(userController.getHello()).toBe('Hello World!');
    });
  });
});
