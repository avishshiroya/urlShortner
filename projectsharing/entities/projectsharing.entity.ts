import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type projectSharingDocument = ProjectSharing & Document;

function customTimestamp(): number {
  return new Date().getTime();
}

class AccessPermission {
  @Prop({ default: false })
  cost: boolean;
}

export enum projectSharingStatus {
  Requested = 'Requested',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Revoked = 'Revoked',
  Deactivated = 'Deactivated',
}


@Schema()
export class ProjectSharing {
  _id: mongoose.Types.ObjectId;

  @Prop()
  projectId: string;

  @Prop()
  projectUniqueId: string;

  @Prop()
  projectName: string;

  @Prop()
  rootUserId: string;

  @Prop()
  rootUserRole: string;

  @Prop([{
    parentId: String,
    parentName: String,
    parentOrganizationId: String,
    parentOrganizationName: String,
    childId: String,
    childName: String,
    childOrganizationId: String,
    childOrganizationName: String,
    projectSharingId: String,
    primaryUser: Boolean
  }])
  childsOrganizations: Array<{
    parentId: string,
    parentName: string,
    parentOrganizationId: string,
    parentOrganizationName: string,
    childId: string,
    childName: string,
    childOrganizationId: string,
    childOrganizationName: string,
    primaryUser: boolean,
    projectSharingId: string
  }>;

  @Prop()
  grantedUserId: string;

  @Prop()
  grantedUserName: string;

  @Prop()
  grantedUserRole: string;

  @Prop()
  grantedUserOrganizationId: string;

  @Prop()
  grantedUserOrganizationName: string;

  @Prop()
  receiverUserId: string;

  @Prop()
  receiverUserName: string;

  @Prop()
  receiverUserRole: string;

  @Prop()
  receiverUserEmail: string;

  @Prop()
  receiverUserMobileNumber: string;
  @Prop()

  receiverUserCountryCode: string;
  @Prop()

  receiverUserCountryCodeEmoji: string;

  @Prop()
  receiverUserOrganizationId: string;

  @Prop()
  receiverUserOrganizationName: string;

  @Prop()
  access: AccessPermission

  @Prop()
  level: number

  @Prop({ default: 0 })
  grantedAt: number

  @Prop({ default: 0 })
  revokedAt: number

  @Prop([{ type: String }])
  sharedBy: [string]

  @Prop([{ type: String }])
  sharedWith: [string]

  @Prop()
  status: projectSharingStatus;

  @Prop({ default: customTimestamp })
  createdAt: number;

  @Prop({ default: customTimestamp })
  updatedAt: number;
}
export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);