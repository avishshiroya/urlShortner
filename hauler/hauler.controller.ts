import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { HaulerService } from './hauler.service';
import { CreateHaulerDto, FilterHaulerDto, PaginationDto, ValidateHaulerNameDto } from './dto/create-hauler.dto';
import { UpdateHaulerDto } from './dto/update-hauler.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/auth/lib/jwt-auth.guard';
import { SubscriptionGuard } from 'src/auth/lib/subscription-check.guard';


@ApiTags('Hauler')
@UseGuards(JwtAuthGuard)
// @UseGuards(SubscriptionGuard)
@Controller('hauler')
export class HaulerController {
  constructor(private readonly haulerService: HaulerService) { }


  @ApiOperation({ summary: 'Creating Hauler details using API' })
  @Post('create')
  createHauler(
    @Req() request,
    @Body() createHaulerDto: CreateHaulerDto,
    @I18n() i18n: I18nContext
  ) {
    return this.haulerService.create(request, createHaulerDto, i18n);
  }

  @ApiOperation({ summary: 'Find all Hauler details based on requirement using API' })
  @Get('find-all')
  findAll(
    @Req() request,
    @Query() filterHaulerDto: FilterHaulerDto,
    @I18n() i18n: I18nContext
  ) {
    return this.haulerService.findAll(request, filterHaulerDto, i18n);
  }

  @ApiOperation({ summary: 'Find one Hauler details using API' })
  @Get('find-one')
  findOne(
    @Req() request,
    @Query('id') id: string,
    @Query() paginationDto: PaginationDto,
    @I18n() i18n: I18nContext
  ) {
    return this.haulerService.findOne(request, id, paginationDto, i18n);
  }

  @ApiOperation({ summary: 'Update Hauler details using API' })
  @Patch('update-one')
  update(
    @Req() request,
    @Query('id') id: string,
    @Body() updateHaulerDto: UpdateHaulerDto,
    @I18n() i18n: I18nContext
  ) {
    return this.haulerService.update(request, id, updateHaulerDto, i18n);
  }

  @ApiOperation({ summary: 'Delete Hauler details using API' })
  @Delete('remove')
  remove(
    @Req() request,
    @Query('id') id: string,
    @I18n() i18n: I18nContext
  ) {
    return this.haulerService.remove(request, id, i18n);
  }

  @ApiOperation({ summary: 'Validate haulerName using API' })
  @Get('check-haulerName')
  validateHaulerName(
    @Req() request,
    @Query() validateHaulerNameDto: ValidateHaulerNameDto,
    @I18n() i18n: I18nContext) {
    return this.haulerService.validateHaulerName(request, validateHaulerNameDto, i18n);
  }
}
