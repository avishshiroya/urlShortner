import { PartialType } from '@nestjs/swagger';
import { CreateProjectsharingDto } from './create-projectsharing.dto';

export class UpdateProjectsharingDto extends PartialType(CreateProjectsharingDto) {}
