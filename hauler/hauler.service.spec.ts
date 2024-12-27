import { Test, TestingModule } from '@nestjs/testing';
import { HaulerService } from './hauler.service';

describe('HaulerService', () => {
  let service: HaulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HaulerService],
    }).compile();

    service = module.get<HaulerService>(HaulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
