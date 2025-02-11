import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsharingService } from './projectsharing.service';

describe('ProjectsharingService', () => {
  let service: ProjectsharingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsharingService],
    }).compile();

    service = module.get<ProjectsharingService>(ProjectsharingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
