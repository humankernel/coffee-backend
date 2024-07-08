import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    create: jest.fn((dto) => ({ id: Date.now(), ...dto })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      name: 'John',
    };

    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });
  });

  it('should update a user', async () => {
    const dto = {
      name: 'John',
    };

    expect(await controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });
  });
});
