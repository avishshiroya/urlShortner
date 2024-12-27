import { PartialType } from '@nestjs/swagger';
import { CreateHaulerDto } from './create-hauler.dto';

export class UpdateHaulerDto extends PartialType(CreateHaulerDto) {}
