import { Test, TestingModule } from '@nestjs/testing';
import { HaulerController } from './hauler.controller';
import { HaulerService } from './hauler.service';

describe('HaulerController', () => {
  let controller: HaulerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HaulerController],
      providers: [HaulerService],
    }).compile();

    controller = module.get<HaulerController>(HaulerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
