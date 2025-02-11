import { Test, TestingModule } from '@nestjs/testing';
import { ContractorHaulerRelationshipController } from './contractor-hauler-relationship.controller';
import { ContractorHaulerRelationshipService } from './contractor-hauler-relationship.service';

describe('ContractorHaulerRelationshipController', () => {
  let controller: ContractorHaulerRelationshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractorHaulerRelationshipController],
      providers: [ContractorHaulerRelationshipService],
    }).compile();

    controller = module.get<ContractorHaulerRelationshipController>(ContractorHaulerRelationshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
