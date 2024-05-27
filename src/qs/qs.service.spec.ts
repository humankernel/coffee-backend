import { Test, TestingModule } from '@nestjs/testing';
import { QsService } from './qs.service';

describe('QsService', () => {
  let service: QsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QsService],
    }).compile();

    service = module.get<QsService>(QsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
