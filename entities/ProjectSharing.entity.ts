import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProjectSharingDocument = ProjectSharing & Document;

function customTimestamp(): number {
    return new Date().getTime();
}

// @Schema()
// export class ProjectSharing {
//     _id: mongoose.Types.ObjectId;

//     @Prop()
//     projectId: string;

//     @Prop()
//     projectName: string;

//     @Prop({
//         costAccount : Boolean,
//         unitBudget : Boolean,
//         paymentOfUnit : Boolean
//     })
//     access: {
//         costAccount : boolean,
//         unitBudget : boolean,
//         paymentOfUnit : boolean
//     }

//     @Prop()
//     userId: string;

//     @Prop()
//     userName: string;

//     @Prop()
//     userRole: string;

//     @Prop()
//     organizationId: string;

//     @Prop()
//     organizationName: string;

//     @Prop()
//     organizationRole: string;

//     @Prop()
//     accessUserId: string;

//     @Prop()
//     accessUserName: string;

//     @Prop()
//     accessOrganizationId: string;

//     @Prop()
//     accessOrganizationName: string;

//     @Prop()
//     accessOrganizationRole: string;

//     @Prop({ default: customTimestamp })
//     createdAt: number;

//     @Prop({ default: customTimestamp })
//     updatedAt: number;
// }
// export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);

interface AccessRights {
    costAccount: boolean;
    unitBudget: boolean;
    paymentOfUnit: boolean;
}

// @Schema()
// export class ProjectSharing {
//     _id: mongoose.Types.ObjectId;

//     @Prop({ required: true })
//     projectId: string;

//     @Prop()
//     projectName: string;

//     @Prop({
//         type: {
//             costAccount: Boolean,
//             unitBudget: Boolean,
//             paymentOfUnit: Boolean
//         }
//     })
//     access: AccessRights;

//     // Original user who created the project
//     @Prop({ required: true })
//     rootUserId: string;

//     @Prop()
//     rootUserName: string;

//     // User who granted access
//     @Prop({ required: true })
//     grantedByUserId: string;

//     @Prop()
//     grantedByUserName: string;

//     // User who received access
//     @Prop({ required: true })
//     accessUserId: string;

//     @Prop()
//     accessUserName: string;

//     @Prop({ required: true })
//     organizationId: string;

//     @Prop()
//     organizationName: string;

//     // Array to track sharing hierarchy
//     @Prop([{
//         userId: String,
//         userName: String,
//         grantedAt: Number
//     }])
//     sharingChain: Array<{
//         userId: string;
//         userName: string;
//         grantedAt: number;
//     }>;

//     @Prop({ enum: inviteStatusEnum, default: inviteStatusEnum.Requested })
//     status: inviteStatusEnum;

//     @Prop({ default: () => new Date().getTime() })
//     createdAt: number;

//     @Prop({ default: () => new Date().getTime() })
//     updatedAt: number;
// }

// export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);

// // Add indexes for better query performance
// ProjectSharingSchema.index({ projectId: 1, accessUserId: 1 }, { unique: true });
// ProjectSharingSchema.index({ 'sharingChain.userId': 1 });

interface AccessRights {
    costAccount: boolean;
    unitBudget: boolean;
    paymentOfUnit: boolean;
}

@Schema()
export class ProjectSharing {
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    projectId: string;

    @Prop()
    projectName: string;

    @Prop({
        type: {
            costAccount: Boolean,
            unitBudget: Boolean,
            paymentOfUnit: Boolean
        }
    })
    access: AccessRights;

    // Original user who created the project
    @Prop({ required: true })
    rootUserId: string;

    @Prop()
    rootUserName: string;

    @Prop()
    rootUserRole : string;

    // User who granted access
    @Prop({ required: true })
    grantedByUserId: string;

    @Prop()
    grantedByUserName: string;
    
    @Prop()
    grantedByUserRole: string;

    // User who received access
    @Prop({ required: true })
    accessUserId: string;

    @Prop()
    accessUserName: string;

    @Prop()
    accessUserRole: string;

    @Prop({ required: true })
    organizationId: string;

    @Prop()
    organizationName: string;

    @Prop()
    hierarchyLevel : Number

    @Prop({ enum: inviteStatusEnum, default: inviteStatusEnum.Requested })
    status: inviteStatusEnum;

    @Prop({ default: () => new Date().getTime() })
    createdAt: number;

    @Prop({ default: () => new Date().getTime() })
    updatedAt: number;
}

export const ProjectSharingSchema = SchemaFactory.createForClass(ProjectSharing);

// Add indexes for better query performance
ProjectSharingSchema.index({ projectId: 1, accessUserId: 1 }, { unique: true });
ProjectSharingSchema.index({ 'sharingChain.userId': 1 });


 // this function work for the add theshowableName in the tickets without memoization
  // async addShowableName(data, receiverOrganizationId, receiverUserName, childOrganizations) {
  //   return data.map(record => {
  //     let showableName = "";

  //     // Find matching child organization
  //     const childOrg = childOrganizations.find(
  //       org => org.childOrganizationId === record.organizationId
  //     );

  //     // Determine showableName based on rules
  //     if (record.organizationId === receiverOrganizationId) {
  //       // Rule 1: Requestor's Tickets
  //       showableName = receiverUserName;
  //     } else if (childOrg) {
  //       if (childOrg.primaryUser) {
  //         // Rule 2: Primary User's Tickets
  //         showableName = childOrg.childName;
  //       } else {
  //         // Rule 3: Child Organization's Tickets
  //         showableName = childOrg ? childOrg.parentName : "Unknown";
  //       }
  //     } else {
  //       // Default if no matching rule
  //       showableName = "N/A";
  //     }

  //     // Return the updated record
  //     return { ...record.toObject(), showableName };
  //   });
  // }