import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ContractorHaulerRelationshipService } from './contractor-hauler-relationship.service';
import { CreateContractorHaulerRelationshipDto, FilterRelationshipDto, PaginationDto, ValidateRecieverNameDto } from './dto/create-contractor-hauler-relationship.dto';
import { UpdateContractorHaulerRelationshipDto } from './dto/update-contractor-hauler-relationship.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { SubscriptionGuard } from 'src/auth/lib/subscription-check.guard';


@ApiTags('contractor-hauler-relationship')
@UseGuards(JwtAuthGuard)
// @UseGuards(SubscriptionGuard)
@Controller('contractor-hauler-relationship')
export class ContractorHaulerRelationshipController {
  constructor(private readonly contractorHaulerRelationshipService: ContractorHaulerRelationshipService) { }


  @ApiOperation({ summary: 'Creating Hauler details using API' })
  @Post('create')
  createHauler(
    @Req() request,
    @Body() createRelationshipDto: CreateContractorHaulerRelationshipDto,
    @I18n() i18n: I18nContext
  ) {
    return this.contractorHaulerRelationshipService.create(request, createRelationshipDto, i18n);
  }

  @ApiOperation({ summary: 'Find all Hauler details based on requirement using API' })
  @Get('find-all')
  findAll(
    @Req() request,
    @Query() filterRelationshipDto: FilterRelationshipDto,
    @I18n() i18n: I18nContext
  ) {
    return this.contractorHaulerRelationshipService.findAll(request, filterRelationshipDto, i18n);
  }

  @ApiOperation({ summary: 'Find one Hauler details using API' })
  @Get('find-one')
  findOne(
    @Req() request,
    @Query('id') id: string,
    @Query() paginationDto: PaginationDto,
    @I18n() i18n: I18nContext
  ) {
    return this.contractorHaulerRelationshipService.findOne(request, id, paginationDto, i18n);
  }

  @ApiOperation({ summary: 'Update Hauler details using API' })
  @Patch('update-one')
  update(
    @Req() request,
    @Query('id') id: string,
    @Body() updateContractorHaulerRelationshipDto: UpdateContractorHaulerRelationshipDto,
    @I18n() i18n: I18nContext
  ) {
    return this.contractorHaulerRelationshipService.update(request, id, updateContractorHaulerRelationshipDto, i18n);
  }

  @ApiOperation({ summary: 'Delete Hauler details using API' })
  @Delete('remove')
  remove(
    @Req() request,
    @Query('id') id: string,
    @I18n() i18n: I18nContext
  ) {
    return this.contractorHaulerRelationshipService.remove(request, id, i18n);
  }

  @ApiOperation({ summary: 'Validate haulerName using API' })
  @Get('check-haulerName')
  validateHaulerName(
    @Req() request,
    @Query() validateRecieverNameDto: ValidateRecieverNameDto,
    @I18n() i18n: I18nContext) {
    return this.contractorHaulerRelationshipService.validateHaulerName(request, validateRecieverNameDto, i18n);
  }

  @ApiOperation({ summary: 'Change status of relationship using API' })
  @Get('activate-deactivate-relationship')
  changeStatus(
    @Req() request,
    @Query('id') id:string,
    @I18n() i18n: I18nContext) {
    return this.contractorHaulerRelationshipService.activeDeActiveRelationship(request, id, i18n);
  }
}
