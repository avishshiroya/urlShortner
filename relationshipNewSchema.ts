// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
// import { inviteStatusEnum } from 'src/constant/invite-status';

// export type BusinessRelationshipDocument = BusinessRelationship & Document;

// export enum RelationshipType {
//     CONTRACTOR_HAULER = 'CONTRACTOR_HAULER',
//     CONTRACTOR_CONTRACTOR = 'CONTRACTOR_CONTRACTOR',
//     HAULER_HAULER = 'HAULER_HAULER'
// }

// function customTimestamp(): number {
//     return new Date().getTime();
// }

// @Schema()
// export class BusinessRelationship {
//     _id: mongoose.Types.ObjectId;

//     @Prop({ required: true })
//     relationshipType: RelationshipType;

//     // Initiator details
//     @Prop({default:null})
//     initiatorId: string;

//     @Prop({default:null})
//     initiatorFirstName: string;

//     @Prop({default:null})
//     initiatorLastName: string;

//     @Prop()
//     initiatorMobileNumber: string;

//     @Prop({default:null})
//     initiatorEmail: string;

//     @Prop({default:null})
//     initiatorOrganizationId: string;

//     @Prop()
//     initiatorOrganizationName: string;

//     @Prop({default:null})
//     initiatorOrganizationUniqueId: string;

//     @Prop()
//     initiatorCountryCode: String;

//     @Prop()
//     initiatorCountryCodeEmoji: String;

//     @Prop({ required: true })
//     initiatorType: 'CONTRACTOR' | 'HAULER';

//     // Recipient details
//     @Prop({default:null})
//     recipientId: string;

//     @Prop({default:null})
//     recipientFirstName: string;

//     @Prop({default:null})
//     recipientLastName: string;

//     @Prop()
//     recipientMobileNumber: string;

//     @Prop({default:null})
//     recipientEmail: string;

//     @Prop({default:null})
//     recipientOrganizationId: string;

//     @Prop()
//     recipientOrganizationName: string;

//     @Prop({default:null})
//     recipientOrganizationUniqueId: string;

//     @Prop()
//     recipientCountryCode: String;

//     @Prop()
//     recipientCountryCodeEmoji: String;

//     @Prop({ required: true })
//     recipientType: 'CONTRACTOR' | 'HAULER';

//     @Prop({ default: inviteStatusEnum.Requested })
//     status: inviteStatusEnum;

//     @Prop({ default: 0 })
//     joinedDate: number;

//     @Prop({default:null})
//     deletedBy: string;

//     @Prop({default:null})
//     createdBy: string;

//     @Prop({ default: customTimestamp })
//     createdAt: number;

//     @Prop({ default: customTimestamp })
//     updatedAt: number;
// }

// export const BusinessRelationshipSchema = SchemaFactory.createForClass(BusinessRelationship);

// // Add indexes to improve query performance
// BusinessRelationshipSchema.index({ initiatorId: 1, recipientId: 1, relationshipType: 1 }, { unique: true });
// BusinessRelationshipSchema.index({ initiatorOrganizationId: 1 });
// BusinessRelationshipSchema.index({ recipientOrganizationId: 1 });
// BusinessRelationshipSchema.index({ status: 1 });

// // Query helper method to find all relationships for a user
// export async function findAllRelationships(
//     this: mongoose.Model<BusinessRelationshipDocument>,
//     userId: string
// ): Promise<BusinessRelationshipDocument[]> {
//     return this.find({
//         $or: [
//             { initiatorId: userId },
//             { recipientId: userId }
//         ]
//     });
// }

// // Transform method to get the other party's details
// export function getOtherPartyDetails(relationship: BusinessRelationship, userId: string) {
//     if (relationship.initiatorId === userId) {
//         return {
//             id: relationship.recipientId,
//             firstName: relationship.recipientFirstName,
//             lastName: relationship.recipientLastName,
//             email: relationship.recipientEmail,
//             mobileNumber: relationship.recipientMobileNumber,
//             organizationId: relationship.recipientOrganizationId,
//             organizationName: relationship.recipientOrganizationName,
//             organizationUniqueId: relationship.recipientOrganizationUniqueId,
//             countryCode: relationship.recipientCountryCode,
//             countryCodeEmoji: relationship.recipientCountryCodeEmoji,
//             type: relationship.recipientType,
//             role: 'recipient'
//         };
//     } else {
//         return {
//             id: relationship.initiatorId,
//             firstName: relationship.initiatorFirstName,
//             lastName: relationship.initiatorLastName,
//             email: relationship.initiatorEmail,
//             mobileNumber: relationship.initiatorMobileNumber,
//             organizationId: relationship.initiatorOrganizationId,
//             organizationName: relationship.initiatorOrganizationName,
//             organizationUniqueId: relationship.initiatorOrganizationUniqueId,
//             countryCode: relationship.initiatorCountryCode,
//             countryCodeEmoji: relationship.initiatorCountryCodeEmoji,
//             type: relationship.initiatorType,
//             role: 'initiator'
//         };
//     }
// }

// // Add methods to schema
// BusinessRelationshipSchema.statics.findAllRelationships = findAllRelationships;
// BusinessRelationshipSchema.methods.getOtherPartyDetails = function(userId: string) {
//     return getOtherPartyDetails(this, userId);
// };
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectSharing, ShareStatus, OrganizationRole } from './project-sharing.schema';

@Injectable()
export class ProjectSharingService {
  constructor(
    @InjectModel(ProjectSharing.name)
    private projectSharingModel: Model<ProjectSharing>,
  ) {}

  async createProjectSharing(dto: {
    projectId: string;
    projectName: string;
    grantedByUserId: string;
    grantedByUserName: string;
    grantedByOrganizationId: string;
    grantedByOrganizationName: string;
    grantedByOrganizationRole: string;
    receiverUserId: string;
    receiverUserName: string;
    receiverOrganizationId: string;
    receiverOrganizationName: string;
    receiverOrganizationRole: OrganizationRole;
    level: number;
    access: { cost: boolean; inviteUsers: boolean };
  }) {
    try {
      // Check if sharing already exists
      const existingSharing = await this.projectSharingModel.findOne({
        projectId: dto.projectId,
        receiverOrganizationId: dto.receiverOrganizationId,
        receiverUserId: dto.receiverUserId,
      });

      if (existingSharing) {
        throw new Error('Project sharing already exists for this organization and user');
      }

      // Build sharing chain from root to current level
      const sharingChain = await this.buildSharingChain(
        dto.projectId,
        dto.grantedByOrganizationId,
        dto.receiverOrganizationRole
      );

      let childOrgs = [];
      let level = 1; // Default level for root

      if (sharingChain.length > 0) {
        // Copy sharing chain and determine level
        const lastSharing = sharingChain[sharingChain.length - 1];
        childOrgs = [...lastSharing.childOrgs];
        level = lastSharing.level + 1;

        // Update primary user flags based on organization role
        childOrgs = this.updatePrimaryUserFlags(
          childOrgs,
          dto.grantedByOrganizationId,
          dto.receiverOrganizationRole
        );
      }

      // Add new child organization with appropriate primary user flag
      const isPrimaryUser = this.determinePrimaryUser(
        childOrgs,
        dto.receiverOrganizationRole,
        level
      );

      childOrgs.push({
        parentUserId: dto.grantedByUserId,
        parentUserName: dto.grantedByUserName,
        parentOrganizationId: dto.grantedByOrganizationId,
        parentOrganizationName: dto.grantedByOrganizationName,
        childUserId: dto.receiverUserId,
        childUserName: dto.receiverUserName,
        childOrganizationId: dto.receiverOrganizationId,
        childOrganizationName: dto.receiverOrganizationName,
        primaryUser: isPrimaryUser
      });

      // Create new project sharing
      const projectSharing = new this.projectSharingModel({
        ...dto,
        level,
        childOrgs,
        status: ShareStatus.PENDING,
        grantedAt: null,
      });

      const savedSharing = await projectSharing.save();

      // Update child organizations' sharing chains
      await this.updateChildSharingChains(
        dto.projectId,
        dto.receiverOrganizationId,
        childOrgs,
        level
      );

      return savedSharing;
    } catch (error) {
      throw new Error(`Failed to create project sharing: ${error.message}`);
    }
  }

  private async buildSharingChain(
    projectId: string,
    organizationId: string,
    receiverRole: OrganizationRole
  ) {
    const chain = [];
    let currentOrgId = organizationId;

    while (currentOrgId) {
      const sharing = await this.projectSharingModel.findOne({
        projectId,
        receiverOrganizationId: currentOrgId,
      });

      if (!sharing) break;

      chain.push(sharing);
      const parentOrg = sharing.childOrgs.find(org => org.primaryUser);
      currentOrgId = parentOrg ? parentOrg.parentOrganizationId : null;
    }

    return chain.reverse(); // Return from root to current
  }

  private updatePrimaryUserFlags(
    childOrgs: any[],
    parentOrgId: string,
    receiverRole: OrganizationRole
  ) {
    const updatedOrgs = [...childOrgs];

    // If receiver is contractor, only one contractor can be primary
    if (receiverRole === OrganizationRole.CONTRACTOR) {
      const existingPrimaryContractor = updatedOrgs.find(
        org => org.primaryUser && org.childOrganizationRole === OrganizationRole.CONTRACTOR
      );

      if (existingPrimaryContractor) {
        existingPrimaryContractor.primaryUser = false;
      }
    }

    // For haulers, maintain chain of primary users under parent
    updatedOrgs.forEach(org => {
      if (org.parentOrganizationId === parentOrgId) {
        org.primaryUser = true;
      }
    });

    return updatedOrgs;
  }

  private determinePrimaryUser(
    childOrgs: any[],
    receiverRole: OrganizationRole,
    level: number
  ): boolean {
    // For level 1, always primary
    if (level === 1) return true;

    // For contractors, only one can be primary
    if (receiverRole === OrganizationRole.CONTRACTOR) {
      return !childOrgs.some(
        org => org.primaryUser && org.childOrganizationRole === OrganizationRole.CONTRACTOR
      );
    }

    // For haulers, can have multiple primary users at same level
    return true;
  }

  private async updateChildSharingChains(
    projectId: string,
    organizationId: string,
    updatedChildOrgs: any[],
    parentLevel: number
  ) {
    // Find all child sharings
    const childSharings = await this.projectSharingModel.find({
      projectId,
      'childOrgs.parentOrganizationId': organizationId,
    });

    // Update each child's sharing chain and level
    for (const sharing of childSharings) {
      const updatedChain = [...updatedChildOrgs];
      sharing.level = parentLevel + 1;
      sharing.childOrgs = this.updatePrimaryUserFlags(
        updatedChain,
        organizationId,
        sharing.receiverOrganizationRole
      );
      await sharing.save();

      // Recursively update next level
      await this.updateChildSharingChains(
        projectId,
        sharing.receiverOrganizationId,
        sharing.childOrgs,
        sharing.level
      );
    }
  }

  async findTicketsWithPrimaryUsers(projectId: string, organizationId: string) {
    try {
      // Get organization's sharing details and full chain
      const sharingChain = await this.buildSharingChain(
        projectId,
        organizationId,
        null
      );

      if (sharingChain.length === 0) {
        throw new Error('Project sharing not found');
      }

      // Get all descendants
      const allDescendants = await this.projectSharingModel.find({