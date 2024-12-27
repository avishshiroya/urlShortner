import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

@Schema()
export class User {
    _id: mongoose.Types.ObjectId;

    @Prop({ unique: true })
    email: string;

    @Prop()
    mobileNumber: string;

    @Prop()
    countryCode: string;

    @Prop()
    countryCodeEmoji: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    profileImage: string;

    @Prop({ default: "Owner" })
    role: string;

    @Prop()
    language: string;

    @Prop([
        {
            organizationId: String,
            organizationName: String,
            organizationImage: String,
            role: String,
            permission: Object,
            isSubscribe: Boolean,
            subscriptionIsCancel: Boolean,
            subscriptionIsExpire: Boolean,
            subscriptionCancelDate: Number,
        },
    ])
    organizations: Array<{
        organizationId: string,
        organizationName: string | null;
        organizationImage: string | null;
        role: string | 'Owner';
        permission: any;
        isSubscribe: boolean | false;
        subscriptionIsCancel: boolean | false;
        subscriptionIsExpire: boolean | false;
        subscriptionCancelDate: number | 0;
    }>;

    @Prop({ default: true })
    autoRenew: boolean;

    @Prop({ default: false })
    isExpire: boolean

    @Prop()
    organizationImage: string;

    @Prop()
    organizationName: string;

    @Prop()
    organizationId: string;

    @Prop()
    currentOrganizationName: string;

    @Prop({ default: "Owner" })
    currentOrganizationRole: string;

    @Prop()
    currentOrganizationId: string;

    @Prop()
    otp: string

    @Prop()
    otpExpired: Date;

    @Prop({ default: 0 })
    subscriptionCancelDate: number;

    @Prop()
    costMeasurement: string

    @Prop()
    joinUsers: Array<string>;

    @Prop({ default: false })
    isSubscribe: boolean;

    @Prop({ default: false })
    currentOrganizationIsSubscribe: boolean

    @Prop({ default: 0 })
    totalUsers: number;

    @Prop({ default: 0 })
    totalRemainingUsers: number;

    @Prop({ default: false })
    islogin: boolean;

    @Prop({ default: true })
    isFreeTrial: boolean;

    @Prop({ default: false })
    isCancel: boolean

    @Prop({ default: false })
    isDelete: boolean;

    @Prop()
    timezoneName:string
    
    @Prop()
    timezoneShortName:string
    
    @Prop()
    planType: string;

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop()
    stripeCustomerId: string

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
