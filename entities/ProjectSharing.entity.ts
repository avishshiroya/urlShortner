import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProjectSharingDocument = ProjectSharing & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

@Schema()
export class ProjectSharing {
    _id: mongoose.Types.ObjectId;

    @Prop()
    projectId: string;

    @Prop()
    projectName: string;

    @Prop({
        costAccount : Boolean,
        unitBudget : Boolean,
        paymentOfUnit : Boolean
    })
    access: {
        costAccount : boolean,
        unitBudget : boolean,
        paymentOfUnit : boolean
    }

    @Prop()
    userId: string;

    @Prop()
    userName: string;

    @Prop()
    userRole: string;

    @Prop()
    organizationId: string;

    @Prop()
    organizationName: string;

    @Prop()
    organizationRole: string;

    @Prop()
    accessUserId: string;

    @Prop()
    accessUserName: string;

    @Prop()
    accessOrganizationId: string;

    @Prop()
    accessOrganizationName: string;

    @Prop()
    accessOrganizationRole: string;

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);
