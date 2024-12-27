import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { inviteStatusEnum } from 'src/constant/invite-status';

export type OrgMemberDocument = OrganizationMember & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

class AccessPermission {
    @Prop({ default: false })
    project: boolean;

    @Prop({ default: true })
    group: boolean;

    @Prop({ default: true })
    cost: boolean;

    @Prop({ default: true })
    truck: boolean;

    @Prop({ default: true })
    hauler: boolean;
}

@Schema()
export class OrganizationMember {
    _id: mongoose.Types.ObjectId;

    @Prop()
    userId: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    countryCode: string;

    @Prop()
    countryCodeEmoji: string;

    @Prop()
    organizationId: string;

    @Prop()
    organizationName: string;

    // @Prop()
    // invitedUserId : string

    @Prop({ default: inviteStatusEnum.Requested })
    status: inviteStatusEnum;

    @Prop()
    mobileNumber: string;

    @Prop()
    role: string;

    @Prop()
    organizationImage: string;

    @Prop()
    permission: AccessPermission

    @Prop({ default: 0 })
    joinedDate: number

    @Prop()
    subscriptionId: string;

    @Prop()
    subscriptionIsCancel: boolean;

    @Prop()
    subscriptionIsExpire: boolean;

    @Prop({ default: 0 })
    subscriptionCancelDate: number;

    @Prop()
    isSubscribe: boolean;

    @Prop({ type: Boolean, default: true })
    isFreeTrial: boolean;

    @Prop({ type: Boolean, default: false })
    isFreeTrialEnd: boolean;

    @Prop({ default: 0 })
    freeTrialEnd: number;

    @Prop()
    planType: string

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const OrgMemberSchema = SchemaFactory.createForClass(OrganizationMember);

