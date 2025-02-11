import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import { ProjectsharingService } from './projectsharing.service';
import { CreateProjectsharingDto, FilterProjectSharingDto, FilterUserDto, FindAllTickets, PaginationDto, RemoveProjectSharingDto, RevokeSharingDto } from './dto/create-projectsharing.dto';
import { UpdateProjectsharingDto } from './dto/update-projectsharing.dto';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';


@ApiTags("projectsharing")
@Controller('projectsharing')
@UseGuards(JwtAuthGuard)
export class ProjectsharingController {
  constructor(private readonly projectsharingService: ProjectsharingService) { }

  @ApiOperation({ summary: "share the project with hauler and contractor" })
  @Post("")
  create(@Req() request: Request, @Body() createProjectsharingDto: CreateProjectsharingDto[], @I18n() i18n: I18nContext) {
    return this.projectsharingService.create(request, createProjectsharingDto, i18n);
  }

  @ApiOperation({ summary: 'Find all user details based on requirement using API' })
  @Get('/relationship')
  getAll(
    @Req() request,
    @Query() filerUser: FilterUserDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectsharingService.getAll(request, filerUser, i18n);
  }

  @ApiOperation({ summary: 'find the child of the user' })
  @Get("member-list")
  findAllUsers(@Req() request: Request, @Query() findUsersDto: FindAllTickets, @I18n() i18n: I18nContext) {
    return this.projectsharingService.findAllUsers(request, findUsersDto, i18n);
  }

  @ApiOperation({ summary: 'find all tickets for the hauler' })
  @Get('hauler/tickets')
  findAllTickets(@Req() request: Request, @Query() findAllTickets: FindAllTickets, @I18n() i18n: I18nContext) {
    return this.projectsharingService.findAllTickets(request, findAllTickets, i18n);
  }
  @ApiOperation({ summary: 'find tickets for contractor' })
  @Get('contractor/tickets')
  ContractorTickets(@Req() request: Request, @Query() findAllTickets: FindAllTickets, @I18n() i18n: I18nContext) {
    return this.projectsharingService.contractorTickets(request, findAllTickets, i18n);
  }
  @ApiOperation({ summary: 'find timecard for contractor' })
  @Get('contractor/timecard')
  contractorTimeCards(@Req() request: Request, @Query() findAllTickets: FindAllTickets, @I18n() i18n: I18nContext) {
    return this.projectsharingService.contractorTimecard(request, findAllTickets, i18n);
  }

  @ApiOperation({ summary: "Project list which is shared with Me" })
  @Get('share-project')
  projectSharedWithMe(@Req() request: Request, @Query() paginationDto: PaginationDto, @I18n() i18n: I18nContext) {
    return this.projectsharingService.projectSharedWithMe(request, paginationDto, i18n)
  }

  @ApiOperation({ summary: "revoke the organization" })
  @Put('revoke')
  sharingRevoke(@Req() request: Request, @Query() revokeSharingDto: RevokeSharingDto, @I18n() i18n: I18nContext) {
    return this.projectsharingService.revoke(request, revokeSharingDto, i18n);
  }

  @ApiOperation({ summary: "Activate and deactivate organization" })
  @Put('active-deactive')
  changeStatus(@Req() request: Request, @Query('id') id: string, @I18n() i18n: I18nContext) {
    return this.projectsharingService.changeStatus(request, id, i18n)
  }
}
