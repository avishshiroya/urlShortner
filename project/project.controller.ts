import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, ValidateProjectIdDto, FilterProjectDto, ManageUserDto, FilterProjectMemberDto, PaginationDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { SubscriptionGuard } from 'src/auth/lib/subscription-check.guard';


@ApiTags('Project')
@UseGuards(JwtAuthGuard)
// @UseGuards(SubscriptionGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }


  @ApiOperation({ summary: 'Creating project details using API' })
  // @ApiBody({ type: CreateProjectDto })
  @Post('create')
  create(
    @Req() request,
    @Body() createProjectDto: CreateProjectDto,
    @I18n() i18n: I18nContext

  ) {
    return this.projectService.create(request, createProjectDto, i18n);
  }
  @ApiOperation({ summary: 'Creating project sharing details using API' })
  // @ApiBody({ type: CreateProjectDto })
  @Post('create-projectsharing')
  createProject(
    @Req() request,
    @Body() createProjectDto: CreateProjectDto,
    @I18n() i18n: I18nContext

  ) {
    return this.projectService.createProject(request, createProjectDto, i18n);
  }

  @ApiOperation({ summary: 'Find all project details based on requirement using API' })
  @Get('find-all')
  findAll(
    @Req() request,
    @Query() filterProjectDto: FilterProjectDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.findAll(request, filterProjectDto, i18n);
  }

  @ApiOperation({ summary: 'Find one project details using API' })
  @Get('find-one')
  findOne(
    @Req() request,
    @Query('id') id: string,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.findOne(request, id, i18n);
  }

  @ApiOperation({ summary: 'Update project details using API' })
  @Patch('update-one')
  update(
    @Req() request,
    @Query('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @I18n() i18n: I18nContext

  ) {
    return this.projectService.update(request, id, updateProjectDto, i18n);
  }

  @ApiOperation({ summary: 'Delete project details using API' })
  @Delete('remove')
  remove(
    @Req() request,
    @Query('id') id: string,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.remove(request, id, i18n);
  }

  @ApiOperation({ summary: 'Validate ProjectId using API' })
  @Get('check-projectId')
  validateProjectId(
    @Req() request,
    @Query() ValidateProjectIdDto: ValidateProjectIdDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.validateProjectId(request, ValidateProjectIdDto, i18n);
  }

  @ApiOperation({ summary: 'Auto populate ProjectId using API' })
  @Get('auto-populate-projectId')
  autoPopulateId(
    @Req() request,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.autoPopulateId(request, i18n);
  }

  @ApiOperation({ summary: 'Creating project member details using API' })
  @Post('create-member')
  manageUser(
    @Req() request: Request,
    @Body() manageUserDto: ManageUserDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.manageMember(request, manageUserDto, i18n);
  }

  @ApiOperation({ summary: 'Find all member details based on project using API' })
  @Get('member')
  findMember(
    @Req() request: Request,
    @Query() filterProjectMemberDto: FilterProjectMemberDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.findMember(request, filterProjectMemberDto, i18n);
  }

  @ApiOperation({ summary: 'Delete project member details using API' })
  @Delete('remove-member')
  removeMember(
    @Req() request: Request,
    @Query('id') id: string,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.removeMember(request, id, i18n);
  }
  @ApiOperation({ summary: 'Find project listing for contractor' })
  @UseGuards(JwtAuthGuard)
  @Get('/find')
  getAllContractorProjects(
    @Req() request,
    @Query() paginationDto: PaginationDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.getAllProjects(request, paginationDto, i18n)
  }


  @ApiOperation({ summary: 'Find project listing for hauler' })
  @UseGuards(JwtAuthGuard)
  @Get('/hauler-driver')
  getAllHaulerProjects(
    @Req() request,
    @Query() paginationDto: PaginationDto,
    @I18n() i18n: I18nContext
  ) {
    return this.projectService.getAllHaulerDriverProjects(request, paginationDto, i18n)
  }
}

