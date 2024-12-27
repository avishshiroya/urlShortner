import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ContractorHaulerRelationshipDocument = ContractorHaulerRelationship & Document;

function customTimestamp(): number {
    return new Date().getTime();
}
export enum ContractorHaulerRelationshipStatus {
    Active = 'Active',
    DeActive = 'DeActive',
}
@Schema()
export class ContractorHaulerRelationship {
    _id: mongoose.Types.ObjectId;

    @Prop()
    contractorId: string;

    @Prop()
    contractorFirstName: string

    @Prop()
    contractorLastName: string

    @Prop()
    contractorMobileNumber: string

    @Prop()
    contractorEmail: string

    @Prop()
    contractorOrganizationId: string

    @Prop()
    contractorOrganizationName: string

    @Prop()
    contractorOrganizationUniqueId: string

    @Prop()
    contractorCountryCode: String

    @Prop()
    contractorCountryCodeEmoji: String

    @Prop()
    haulerId: string;

    @Prop()
    haulerFirstName: string

    @Prop()
    haulerLastName: string

    @Prop()
    haulerMobileNumber: string

    @Prop()
    haulerEmail: string

    @Prop()
    haulerOrganizationId: string

    @Prop()
    haulerOrganizationName: string

    @Prop()
    haulerOrganizationUniqueId: string

    @Prop()
    haulerCountryCode: String

    @Prop()
    haulerCountryCodeEmoji: String

    @Prop()
    status: ContractorHaulerRelationshipStatus

    @Prop({default:false})
    isDelete:Boolean
    
    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ContractorHaulerRelationshipSchema = SchemaFactory.createForClass(ContractorHaulerRelationship);

