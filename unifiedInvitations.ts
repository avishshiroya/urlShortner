import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// export type InvitationDocument = Invitation & Document;

// function customTimestamp(): number {
//     return new Date().getTime();
// }

// export enum InvitationType {
//     USER_INVITE = 'USER_INVITE',
//     CONTRACTOR_HAULER = 'CONTRACTOR_HAULER',
//     PROJECT_SHARING = 'PROJECT_SHARING'
// }

// export enum InvitationStatus {
//     Requested = 'Requested',
//     Accepted = 'Accepted',
//     Rejected = 'Rejected',
//     Deactivated = 'Deactivated'
// }



// @Schema()
// export class Invitation {
//     _id: mongoose.Types.ObjectId;

//     @Prop({ required: true, type: string })
//     invitationType: InvitationType;

//     @Prop({ required: true, type: string,  default: InvitationStatus.Requested })
//     status: InvitationStatus;

//     // Sender User Information
//     @Prop()
//     senderUserId: string;

//     @Prop()
//     senderUserName: string;

//     @Prop()
//     senderUserRole: string;

//     @Prop({ default: "" })
//     senderUserImage: string;

//     @Prop()
//     senderOrganizationId: string;

//     @Prop()
//     senderOrganizationName: string;

//     @Prop()
//     senderOrganizationImage: string;

//     // Receiver User Information
//     @Prop({ default: "" })
//     receiverUserId: string;

//     @Prop({ default: "" })
//     receiverUserName: string;

//     @Prop({ default: "" })
//     receiverUserRole: string;

//     @Prop()
//     receiverOrganizationId: string;

//     @Prop()
//     receiverOrganizationName: string;

//     //  details for USER_INVITE type
//     @Prop()
//     firstName: string;

//     @Prop()
//     lastName: string;

//     @Prop()
//     role: string;

//     @Prop()
//     mobilenumber: string;

//     @Prop()
//     email: string;

//     @Prop()
//     planType: string;

//     @Prop({ default: 0 })
//     joinedDate: number;

//     @Prop()
//     countryCode: string;

//     @Prop()
//     countryCodeEmoji: string;


//     // Contractor-Hauler needed fields
//     @Prop()
//     relationshipId: string;

//     // Project sharing need fields
//     @Prop()
//     projectId: string;


//     @Prop({ default: customTimestamp })
//     createdAt: number;

//     @Prop({ default: customTimestamp })
//     updatedAt: number;
// }

// export const InvitationSchema = SchemaFactory.createForClass(Invitation);
export enum InvitationType {
    USER_INVITE = 'USER_INVITE',
    CONTRACTOR_HAULER = 'CONTRACTOR_HAULER',
    PROJECT_SHARING = 'PROJECT_SHARING'
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
    senderId: string

    @Prop()
    senderName: string

    @Prop()
    senderRole: string

    @Prop()
    senderImage: string

    @Prop()
    senderOrganizationId: string

    @Prop()
    senderOrganizationName: string

    @Prop()
    senderOrganizationImage: string


    //reciever detail
    @Prop({ default: "" })
    recieverId: string

    @Prop({ default: "" })
    recieverName: string

    @Prop()
    recieverMobileNumber: string

    @Prop({ default: "" })
    recieverOrganizationId: string

    @Prop({ default: "" })
    recieverOrganizationName: string

    @Prop({ default: "" })
    recieverOrganizationImage: string


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

    @Prop()
    createdAt: number
    @Prop()
    updatedAt: number
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);



const data = {
    type: InvitationType.CONTRACTOR_HAULER,
    status: InvitationStatus.Requested,
    senderId:,
    senderName:,
    senderRole:,
    senderImage:,
    senderOrganizationId:,
    senderOrganizationName:,
    senderOrganizationImage:,
    recieverId:,
    recieverName:,
    recieverMobileNumber:,
    recieverImage:,
    recieverOrganizationId:,
    recieverOrganizationName:,
    recieverOrganizationImage:,
    relationshipId:,
    message:,
    isActionable:true,
}