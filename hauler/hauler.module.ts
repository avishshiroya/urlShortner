import { Module } from '@nestjs/common';
import { HaulerService } from './hauler.service';
import { HaulerController } from './hauler.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Hauler, HaulerSchema } from './entities/hauler.entity';
import { TruckType, TruckTypeSchema } from 'src/truck-type/entities/truck-type.entity';
import { PayRate, PayRateSchema } from 'src/pay-rate/entities/pay-rate.entity';
import { Truck, TruckSchema } from 'src/truck/entities/truck.entity';
import { ContractorHaulerRelationship, ContractorHaulerRelationshipSchema } from './entities/contractorHaulerRelationship.entity';
import { Organization, OrganizationSchema } from 'src/organization/entities/organization.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hauler.name, schema: HaulerSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TruckType.name, schema: TruckTypeSchema }]),
    MongooseModule.forFeature([{ name: PayRate.name, schema: PayRateSchema }]),
    MongooseModule.forFeature([{ name: Truck.name, schema: TruckSchema }]),
    MongooseModule.forFeature([{ name: ContractorHaulerRelationship.name, schema: ContractorHaulerRelationshipSchema }]),
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),

  ],

  controllers: [HaulerController],
  providers: [HaulerService, JwtService],
})
export class HaulerModule { }
