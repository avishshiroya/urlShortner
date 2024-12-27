import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

class subscriptionPropertiy {
    @Prop({ type: Boolean, default: false })
    isCancel: boolean;

    @Prop({ type: Boolean, default: false })
    isExpire: boolean;

    @Prop({ type: Boolean, default: true })
    isFreeTrial: boolean;

    @Prop({ type: Boolean, default: false })
    isFreeTrialEnd: boolean;

    @Prop({ default: 0 })
    freeTrialEnd: number;

    @Prop({ type: Boolean, default: false })
    isSubscribe: boolean;

    @Prop({ type: Number, default: 0 })
    subscriptionCancelDate: number;

    @Prop({ default: true })
    autoRenew: boolean;

    @Prop()
    totalRemainingUsers: number;

    @Prop()
    totalUsers: number

    @Prop()
    organizationId: string;

    @Prop()
    organizationName: string;

    @Prop()
    organizationImage: string;

    @Prop()
    organizationUniqueCode: string;

    @Prop()
    planType: string;
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

    @Prop({ default: null })
    role: string;

    @Prop()
    language: string;

    @Prop({
        isCancel: Boolean,
        isExpire: Boolean,
        isFreeTrial: Boolean,
        isFreeTrialEnd: Boolean,
        freeTrialEnd: Number,
        isSubscribe: Boolean,
        subscriptionCancelDate: Number,
        autoRenew: Boolean,
        totalRemainingUsers: Number,
        totalUsers: Number,
        organizationId: String,
        organizationName: String,
        organizationImage: String,
        organizationUniqueCode: String,
        planType: String,
    })
    contractorSubscription: subscriptionPropertiy

    @Prop({
            isCancel: Boolean,
            isExpire: Boolean,
            isFreeTrial: Boolean,
            isFreeTrialEnd: Boolean,
            freeTrialEnd: Number,
            isSubscribe: Boolean,
            subscriptionCancelDate: Number,
            autoRenew: Boolean,
            totalRemainingUsers: Number,
            totalUsers: Number,
            organizationId: String,
            organizationName: String,
            organizationImage: String,
            organizationUniqueCode: String,
            planType: String,
    })
    haulerSubscription: subscriptionPropertiy


    @Prop()
    currentOrganizationName: string;

    @Prop({ default: null })
    currentOrganizationRole: string;

    @Prop()
    currentOrganizationId: string;

    @Prop()
    otp: string

    @Prop()
    otpExpired: Date;

    @Prop()
    costMeasurement: string


    @Prop({ default: false })
    currentOrganizationIsSubscribe: boolean

    @Prop({ default: false })
    islogin: boolean;

    @Prop({ default: false })
    isDelete: boolean;

    @Prop()
    timezoneName: string

    @Prop()
    timezoneShortName: string

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop()
    stripeCustomerId: string

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
