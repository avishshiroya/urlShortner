import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ContractorHaulerRelationshipDocument = ContractorHaulerRelationship & Document;

function customTimestamp(): number {
    return new Date().getTime();
}
export enum ContractorHaulerRelationshipStatus {
    Requested = 'Requested',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Deactivated = 'Deactivated',
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

    @Prop({ default: ContractorHaulerRelationshipStatus.Requested })
    status: ContractorHaulerRelationshipStatus

    @Prop({ default: 0 })
    joinedDate: number

    @Prop()
    deletedBy: string

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ContractorHaulerRelationshipSchema = SchemaFactory.createForClass(ContractorHaulerRelationship);



export class TicketSignatures {
    ticketId: string
    timecardId: string
    projectId: string
    userId: string
    signatures: Array<{
        signature: string
        userId: string
        organizationId: string
        timestamp: number
        status: string
        description: string
    }>
}
export class TicketSignaturesIndi {
    ticketId: string
    timecardId: string
    projectId: string
    userId: string
    ownSignature: string
    ownOrganizationId: string
    ownUserId: string
    ownTimestamp: number
    ownStatus: string
    ownDescription: string
    parentSignature: string
    parentOrganizationId: string
    parentUserId: string
    parentTimestamp: number
    parentStatus: string
    parentDescription: string
}