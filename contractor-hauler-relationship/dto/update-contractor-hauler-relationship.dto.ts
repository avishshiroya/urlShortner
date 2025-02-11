import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContractorHaulerRelationshipDto } from './create-contractor-hauler-relationship.dto';

export class UpdateContractorHaulerRelationshipDto {

    @ApiProperty()
    organizationName?:string

    @ApiProperty()
    firstName?:string

    @ApiProperty()
    lastName?:string

    @ApiProperty()
    mobileNumber?:string

    @ApiProperty()
    email?:string

    @ApiProperty()
    countryCode?: string;
    
    @ApiProperty()
    countryCodeEmoji?: string;
}
