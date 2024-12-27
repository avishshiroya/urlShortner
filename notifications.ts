const notification = {
    senderId: String,
    senderName: String,
    senderImage: String,
    senderOrganizationId: String,
    senderOrganizationName: String,
    senderMobile: String,
    recieverId: String,
    recieverName: String,
    recieverImage: String,
    recieverOrganizationId: String,
    recieverOrganizationName: String,
    recieverMobile: String,
    message: String,
}
const actualNotification = {
    senderId: "6634c04c0991c5bc59bda303",
    senderName: "ABC",
    senderOrganizationId: "6634c1140991c5bc59c0c093",
    senderOrganizationName: "FedX",
    senderOrganizationImage: "https://hihand-images.s3.us-east-2.amazonaws.com/organizationImage/1714734010088-327400170-image_picker_EAD9F195-6CC4-458D-8C6E-31E2652E29C9-58600-000000750BB3467C.jpg",
    recieverId: "6634c0040991c5bc59bc81fb",
    recieverName: "XYZ",
    recieverOrganizationImage: "",
    recieverOrganizationId: "665012a4822bdc6e3e6b6add",
    recieverOrganizationName: "nsn",
    message: "You are invited in FedX organization",
}


const Invitations = {
    senderUserId: String,
    senderUserName: String,
    senderUserRole: String,
    status: ["Requested", "Accepted", "Rejected", "Deactivated"],
    senderOrganizationId: String,
    senderOrganizationImage: String,
    senderOrganizationName: String,
    recieverUserId: String,
    recieverUserName: String,
    recieverUserRole: String,
    recieverOrganizationId: String,
    recieverOrganizationImage: String,
    recieverOrganizationName: String,
    message: String,
    recieverFirstName: String,
    recieverLastName: String,
    recieverEmail: String,
    recieverMobileNumber: String,
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type BulletinDocument = Bulletin & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

class message {
    @Prop()
    en: string | null;

    @Prop()
    fr: string | null;

    @Prop()
    es: string | null;
}

@Schema()
export class Bulletin {
    _id: mongoose.Types.ObjectId;

    @Prop()
    senderUserId: string;

    @Prop({ default: "" })
    receiverUserId: string;

    @Prop()
    organizationName: string;

    @Prop()
    organizationId: string;

    @Prop({ default: "" })
    senderImage: string

    @Prop({ type: message })
    message: message

    @Prop()
    mobileNumber: string;

    @Prop({ default: false })
    isRead: boolean;

    @Prop({ default: customTimestamp })
    createdAt: number;

    @Prop({ default: customTimestamp })
    updatedAt: number;
}
export const BulletinSchema = SchemaFactory.createForClass(Bulletin);