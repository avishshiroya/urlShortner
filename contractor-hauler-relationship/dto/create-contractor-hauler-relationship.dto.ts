import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class CreateContractorHaulerRelationshipDto {

    @ApiProperty()
    uniqueCode?: string

    // @ApiProperty()
    // haulerName?: string;

    @ApiProperty()
    organizationName?:string

    @ApiProperty()
    firstName?:string

    @ApiProperty()
    lastName?:string

    @ApiProperty()
    mobileNumber?: string;

    @ApiProperty()
    countryCode?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    countryCodeEmoji?: string;

}


export class FilterRelationshipDto {
    @ApiProperty({ required: false })
    @IsOptional()
    hauler: string;

    @ApiProperty({ required: false })
    @IsOptional()
    search: string;

    @ApiProperty({ required: false })
    @IsOptional()
    page: number;

    @ApiProperty({ required: false })
    @IsOptional()
    limit: number;

}

export class ValidateRecieverNameDto {
    @ApiProperty({ required: false })
    @IsOptional()
    id: string;

    @ApiProperty()
    haulerName: string;
}

export class PaginationDto {
    @ApiProperty({ required: false })
    @IsOptional()
    truckPage: number;

    @ApiProperty({ required: false })
    @IsOptional()
    truckLimit: number;

    @ApiProperty({ required: false })
    @IsOptional()
    payRatePage: number;

    @ApiProperty({ required: false })
    @IsOptional()
    payRateLimit: number;
}