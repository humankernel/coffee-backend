import { Test, TestingModule } from '@nestjs/testing';
import { QsController } from './qs.controller';
import { QsService } from './qs.service';

describe('QsController', () => {
  let controller: QsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QsController],
      providers: [QsService],
    }).compile();

    controller = module.get<QsController>(QsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
