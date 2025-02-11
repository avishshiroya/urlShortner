import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { inviteStatusEnum } from 'src/constant/invite-status';

export type ContractorHaulerRelationshipDocument = ContractorHaulerRelationship & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

@Schema()
export class ContractorHaulerRelationship {
    _id: mongoose.Types.ObjectId;

    @Prop({default:null})
    contractorId: string;

    @Prop({default:null})
    contractorFirstName: string

    @Prop({default:null})
    contractorLastName: string

    @Prop()
    contractorMobileNumber: string

    @Prop({default:null})
    contractorEmail: string

    @Prop({default:null})
    contractorOrganizationId: string

    @Prop()
    contractorOrganizationName: string

    @Prop({default:null})
    contractorOrganizationUniqueId: string

    @Prop()
    contractorCountryCode: String

    @Prop()
    contractorCountryCodeEmoji: String

    @Prop({default:null})
    haulerId: string;

    @Prop({default:null})
    haulerFirstName: string

    @Prop({default:null})
    haulerLastName: string

    @Prop()
    haulerMobileNumber: string

    @Prop({default:null})
    haulerEmail: string

    @Prop({default:null})
    haulerOrganizationId: string

    @Prop()
    haulerOrganizationName: string

    @Prop({default:null})
    haulerOrganizationUniqueId: string

    @Prop()
    haulerCountryCode: String

    @Prop()
    haulerCountryCodeEmoji: String

    @Prop({ default: inviteStatusEnum.Requested })
    status: inviteStatusEnum

    @Prop({ default: 0 })
    joinedDate: number

    @Prop({default:null})
    deletedBy:string

    @Prop({default:null})
    createdBy:string

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ContractorHaulerRelationshipSchema = SchemaFactory.createForClass(ContractorHaulerRelationship);

