
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

@Schema()
export class Project {
    _id: mongoose.Types.ObjectId;

    @Prop()
    projectId: string;

    @Prop()
    projectName: string

    @Prop()
    zipCode: string

    @Prop()
    country: string

    @Prop()
    state: string

    @Prop()
    userId: string

    @Prop()
    organizationId: string

    @Prop([{ type: String }])
    sharedWith: [string]

    @Prop({ default: false })
    isDelete: boolean

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);

