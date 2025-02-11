import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";


class ManageUserData {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    role: string

    @ApiProperty()
    mobileNumber: string

    @ApiProperty()
    countryCode: string

    @ApiProperty()
    countryCodeEmoji: string

    @ApiProperty()
    email: string

    @ApiProperty()
    profileImage: string

}
class CreateProjectsharingAccess {
    @ApiProperty({ default: false })
    cost: boolean
}

export class CreateProjectsharingDto {

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
export class CreateProjectDto {
    @ApiProperty()
    projectId: string

    @ApiProperty()
    projectName: string

    @ApiProperty()
    zipCode: string

    @ApiProperty()
    country: string

    @ApiProperty()
    state: string

    @ApiProperty({ type: [ManageUserData] })
    projectMember?: [ManageUserData]

    @ApiProperty({ type: [CreateProjectsharingDto] })
    contractors?: [CreateProjectsharingDto]

    @ApiProperty({ type: [CreateProjectsharingDto] })
    haulers?: [CreateProjectsharingDto]

}

export class FilterProjectDto {

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

export class ValidateProjectIdDto {
    @ApiProperty({ required: false })
    @IsOptional()
    id: string;

    @ApiProperty()
    projectId: string;
}

export class FilterProjectMemberDto {
    @ApiProperty({ required: true })
    projectId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    search: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    page: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    limit: number;
}
export class ManageUserDto {
    @ApiProperty({ type: [ManageUserData] })
    userData: Array<ManageUserData>

    @ApiProperty()
    projectId: string

    @ApiProperty()
    userIds: Array<string>

    @ApiProperty()
    isDataCreate: boolean
}

export class PaginationDto{

    @ApiProperty({required:true})
    page:string

    @ApiProperty({required:true})
    limit:string
}