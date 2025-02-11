import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type OrganizationDocument = Organization & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

@Schema()
export class Organization {
    _id: mongoose.Types.ObjectId;

    @Prop()
    userId: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    email: string;

    @Prop()
    organizationImage: string;

    @Prop()
    role:string 
    
    @Prop()
    uniqueId:string

    @Prop()
    userName: string;

    @Prop()
    adminUserCount: number;

    @Prop()
    truckBossUserCount: number;

    @Prop()
    subcriptionPeriod: string;

    @Prop()
    organizationName: string;

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const OrganizationSchema = SchemaFactory.createForClass(Organization);
