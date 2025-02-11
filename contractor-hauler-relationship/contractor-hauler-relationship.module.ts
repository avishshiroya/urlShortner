import { Module } from '@nestjs/common';
import { ContractorHaulerRelationshipService } from './contractor-hauler-relationship.service';
import { ContractorHaulerRelationshipController } from './contractor-hauler-relationship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hauler, HaulerSchema } from 'src/hauler/entities/hauler.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { TruckType, TruckTypeSchema } from 'src/truck-type/entities/truck-type.entity';
import { PayRate, PayRateSchema } from 'src/pay-rate/entities/pay-rate.entity';
import { Truck, TruckSchema } from 'src/truck/entities/truck.entity';
import { ContractorHaulerRelationship, ContractorHaulerRelationshipSchema } from './entities/contractor-hauler-relationship.entity';
import { Organization, OrganizationSchema } from 'src/organization/entities/organization.entity';
import { JwtService } from '@nestjs/jwt';
import { Notification, NotificationSchema } from 'src/notification/entities/notification.entity';
import { OrgMemberSchema, OrganizationMember } from 'src/organization/entities/orgMember.entitys';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hauler.name, schema: HaulerSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TruckType.name, schema: TruckTypeSchema }]),
    MongooseModule.forFeature([{ name: PayRate.name, schema: PayRateSchema }]),
    MongooseModule.forFeature([{ name: Truck.name, schema: TruckSchema }]),
    MongooseModule.forFeature([{ name: ContractorHaulerRelationship.name, schema: ContractorHaulerRelationshipSchema }]),
    MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: OrganizationMember.name, schema: OrgMemberSchema }]),
  ],
  controllers: [ContractorHaulerRelationshipController],
  providers: [ContractorHaulerRelationshipService,JwtService],
})
export class ContractorHaulerRelationshipModule {}
