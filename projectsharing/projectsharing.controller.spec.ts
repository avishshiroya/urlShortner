import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsharingController } from './projectsharing.controller';
import { ProjectsharingService } from './projectsharing.service';

describe('ProjectsharingController', () => {
  let controller: ProjectsharingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsharingController],
      providers: [ProjectsharingService],
    }).compile();

    controller = module.get<ProjectsharingController>(ProjectsharingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
