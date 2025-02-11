import { Test, TestingModule } from '@nestjs/testing';
import { ContractorHaulerRelationshipService } from './contractor-hauler-relationship.service';

describe('ContractorHaulerRelationshipService', () => {
  let service: ContractorHaulerRelationshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractorHaulerRelationshipService],
    }).compile();

    service = module.get<ContractorHaulerRelationshipService>(ContractorHaulerRelationshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
