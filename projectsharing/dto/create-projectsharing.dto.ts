import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

class CreateProjectsharingAccess {
    @ApiProperty({default:false})
    cost: boolean
}

export class CreateProjectsharingDto {
    @ApiProperty()
    projectId: string;

    @ApiProperty()
    userId?: string
    
    @ApiProperty()
    userFirstName?: string

    @ApiProperty()
    userLastName?: string

    @ApiProperty()
    organizationId?: string

    @ApiProperty()
    organizationName?: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    mobileNumber?: string

    @ApiProperty()
    countryCode?: string

    @ApiProperty()
    countryCodeEmoji?: string

    @ApiProperty()
    role?: string

    @ApiProperty()
    access: CreateProjectsharingAccess
}

export class FilterProjectSharingDto {
    @ApiProperty({ required: true })
    projectId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    search: string

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit: number;
}
export class RemoveProjectSharingDto{
    @ApiProperty({required:true})
    projectSharingIds:string[]
}

export class FindAllTickets{
    @ApiProperty({required:true})
    projectId:string

    @ApiProperty({required:true})
    limit:number

    @ApiProperty({required:true})
    page:number
}

export class RevokeSharingDto{

    @ApiProperty({required:true})
    projectId:string

    @ApiProperty({required:true})
    userOrganizationId:string
}

export class PaginationDto{

    @ApiProperty({required:true})
    page:number

    @ApiProperty({required:true})
    limit:number
}

export class FilterUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    hauler: string;

    @ApiProperty({ required: false })
    @IsOptional()
    search: string;

    @ApiProperty({required:false})
    @IsOptional()
    relationshipType:string;
}

