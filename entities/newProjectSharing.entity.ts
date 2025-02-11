

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// Enums
export enum ProjectType {
  CONTRACTOR = 'contractor',
  HAULER = 'hauler'
}


export enum ShareStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REVOKED = 'revoked'
}

export enum OrganizationRole {
  CONTRACTOR = 'contractor',
  HAULER = 'hauler'
}

// Interfaces
interface AccessRights {
  cost:boolean;
  inviteUsers:boolean;
}

interface childOrgItems {
  parentUserId: string,
  parentUserName: string,
  parentOrganizationId: string,
  parentOrganizationName: string,
  childUserId: string,
  childUserName: string,
  childOrganizationId: string,
  childOrganizationName: string,
  primaryUser: boolean
}

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
    currentTime: () => new Date().getTime()
  }
})
export class ProjectSharing extends Document {
  @Prop({ required: true, index: true })
  projectId: string;

  @Prop()
  projectName: string;

  // Access rights configuration
  @Prop({
    type: {
      cost: { type: Boolean, default: false },
      inviteUsers: { type: Boolean, default: false },
    }

  })
  access: AccessRights;

  // level
  @Prop()
  level:number
  
  // User granting access
  @Prop({ required: true, index: true })
  grantedByUserId: string;

  @Prop()
  grantedByUserName: string;

  @Prop({ required: true, index: true })
  grantedByOrganizationId: string;

  @Prop()
  grantedByOrganizationName: string;

  @Prop({ required: true, index: true })
  grantedByOrganizationRole: string;

  // User receiving access
  @Prop({ required: true, index: true })
  receiverOrganizationId: string;

  @Prop()
  receiverOrganizationName: string;

  @Prop({ required: true, type: String, enum: OrganizationRole })
  receiverOrganizationRole: OrganizationRole;

  // Organization receiving access
  @Prop({ required: true, index: true })
  receiverUserId: string;

  @Prop()
  receiverUserName: string;

  // Sharing chain for hierarchy tracking
  @Prop([{
    parentUserId: String,
    parentUserName: String,
    parentOrganizationId: String,
    parentOrganizationName: String,
    childUserId: String,
    childUserName: String,
    childOrganizationId: String,
    childOrganizationName: String,
    primaryUser: Boolean
  }])
  childOrgs: childOrgItems[];

  @Prop({ type: String, enum: ShareStatus, default: ShareStatus.PENDING })
  status: ShareStatus;

  @Prop({ type: Number })
  revokedAt?: number;

  @Prop({ type: Number })
  grantedAt?: number;

  @Prop({ default: () => new Date().getTime() })
  createdAt: number;

  @Prop({ default: () => new Date().getTime() })
  updatedAt: number;
}

export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);
