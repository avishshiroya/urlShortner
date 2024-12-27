import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class CreateHaulerDto {

    @ApiProperty()
    uniqueCode?: string

    // @ApiProperty()
    // haulerName?: string;

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


export class FilterHaulerDto {
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

export class ValidateHaulerNameDto {
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