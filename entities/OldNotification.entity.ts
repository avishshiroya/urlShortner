import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { inviteStatusEnum } from 'src/constant/invite-status';

export type NotificationDocument = Notification & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

class Access {
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
export class Notification {
    _id: mongoose.Types.ObjectId;

    @Prop()
    senderUserId: string;

    @Prop()
    senderUserName: string;

    @Prop({ default: inviteStatusEnum.Requested })
    status: inviteStatusEnum;

    @Prop()
    organizationId: string;

    @Prop()
    organizationName: string;

    @Prop()
    organizationImage: string;

    @Prop({ default: "" })
    receiverUserId: string;

    @Prop({ default: "" })
    receiverUserImage: string;

    @Prop()
    firstName: string;

    // @Prop()
    // subscription: string;

    // @Prop({ default: 0 })
    // subscriptionDuration: number;

    @Prop()
    lastName: string;

    @Prop({ default: 'TruckBoss' })
    role: string;

    @Prop()
    mobileNumber: string;

    @Prop()
    planType: string

    @Prop({ default: "" })
    receiverUserEmail: string

    @Prop({ default: 0 })
    joinedDate: number

    @Prop()
    countryCode: string;

    @Prop()
    countryCodeEmoji: string;

    @Prop({ type: Access })
    access: Access;

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);



