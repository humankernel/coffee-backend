import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findOneBy: jest.fn().mockImplementation((dto) => Promise.resolve(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const dto = { username: 'john', password: '1234' };

    expect(await service.create(dto)).toEqual({
      ...dto,
      id: expect.any(Number),
      password: expect.any(String),
    });
  });
});
