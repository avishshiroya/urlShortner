import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { inviteStatusEnum } from 'src/constant/invite-status';

export type NotificationDocument = Notification & Document;

function customTimestamp(): number {
    return new Date().getTime();
}
export enum InvitationType {
    USER_INVITE = 'user_invite',
    CONTRACTOR_HAULER = 'contractor_hauler',
    PROJECT_SHARING = 'project_sharing',
    // DEFAULT_NOTIFICATION = 'DEFAULT_NOTIFICATION'
}

export enum InvitationStatus {
    Requested = 'Requested',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Deactivated = 'Deactivated'
}

class Message {
    en: string | null
    fr: string | null
    es: string | null
}

@Schema()
export class Notification {
    @Prop()
    type: InvitationType

    @Prop()
    status: InvitationStatus

    //sender Detail
    @Prop()
    senderUserId: string

    @Prop()
    senderUserName: string

    @Prop()
    senderUserRole: string

    @Prop()
    senderUserOrganizationId: string

    @Prop()
    senderUserOrganizationName: string

    @Prop()
    senderUserOrganizationImage: string


    //reciever detail
    @Prop({ default: "" })
    recieverUserId: string

    @Prop({ default: "" })
    recieverUserName: string

    @Prop()
    recieverUserRole: string

    @Prop()
    recieverUserMobileNumber: string

    @Prop({ default: "" })
    recieverUserOrganizationId: string

    @Prop({ default: "" })
    recieverUserOrganizationName: string

    @Prop({ default: "" })
    recieverUserOrganizationImage: string


    //for the User_Invite
    @Prop()
    organizationMemberId: string


    // for contractor hauler relationship
    @Prop()
    relationshipId: string


    // for projectSharing
    @Prop()
    projectSharingId: string

    @Prop()
    projectId: string

    @Prop()
    projectName: string


    @Prop()
    message: Message

    //is message is actionable
    @Prop({ default: false })
    isActionable: boolean

    @Prop({ default: customTimestamp })
    createdAt: number

    @Prop({ default: customTimestamp })
    updatedAt: number
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
