import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProjectMemberDocument = ProjectMember & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

export enum ProjectMemberStatusEnum {
    Active = 'Active',
    DeActive = 'DeActive',
}

@Schema()
export class ProjectMember {
    _id: mongoose.Types.ObjectId;

    @Prop()
    projectId: string;

    @Prop()
    projectUniqueId: string;

    @Prop({ trim: true })
    projectName: string;

    @Prop()
    projectCreatedBy: string;

    @Prop()
    organizationId: string

    @Prop()
    userId: string;

    @Prop({ type: String, trim: true })
    firstName: string

    @Prop({ type: String, trim: true })
    lastName: string

    @Prop({ type: String })
    role: string

    @Prop({ type: String, trim: true })
    mobileNumber: string

    @Prop({ type: String, trim: true })
    countryCode: string

    @Prop({ type: String, trim: true })
    countryCodeEmoji: string

    @Prop({ type: String, default: "" })
    email: string

    @Prop({ type: String, default: "" })
    profileImage: string

    @Prop({ default: ProjectMemberStatusEnum.Active })
    status: ProjectMemberStatusEnum;

    @Prop()
    projectSharingId:string

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);