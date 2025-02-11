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
        
}


let projectId,userId,limit,page
const pipeline = [
    // Step 1: Match the projectId and userId in the childOrgs array
    {
      $match: {
        projectId: projectId,
        accessUserId: userId
      }
    },
    // Step 2: Unwind childOrgs array for easier processing
    {
      $unwind: "$childOrgs"
    },
    // Step 3: Separate primary child organizations
    {
      $facet: {
        primaryChildren: [
          {
            $match: {
              "childOrgs.parentId": userId
            }
          },
          {
            $group: {
              _id: "$childOrgs.organizationId",
              userId: { $first: "$childOrgs.userId" }
            }
          }
        ],
        restChildren: [
          {
            $match: {
              "childOrgs.userId": { $ne: userId }
            }
          },
          {
            $group: {
              _id: "$childOrgs.parentId",
              children: {
                $push: {
                  childUserId: "$childOrgs.userId"
                }
              }
            }
          }
        ]
      }
    },
    // Step 4: Lookup tickets based on primary child organizations
    {
      $lookup: {
        from: "tickets", // Tickets collection
        let: {
          primaryChildIds: "$primaryChildren._id",
          userId: userId
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$creatorId", "$$userId"] },
                  { $in: ["$creatorId", "$$primaryChildIds"] }
                ]
              }
            }
          },
          { $sort: { createdAt: -1 } }
        ],
        as: "tickets"
      }
    },
    // Step 5: Project required fields for tickets and organization groups
    {
      $project: {
        tickets: {
          $map: {
            input: "$tickets",
            as: "ticket",
            in: {
              _id: "$$ticket._id",
              title: "$$ticket.title",
              description: "$$ticket.description",
              createdAt: "$$ticket.createdAt",
              creatorName: {
                $let: {
                  vars: {
                    primaryChild: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$primaryChildren",
                            as: "child",
                            cond: {
                              $eq: ["$$child._id", "$$ticket.creatorOrganizationId"]
                            }
                          }
                        },
                        0
                      ]
                    }
                  },
                  in: {
                    $ifNull: ["$$primaryChild.userName", "$$ticket.creatorName"]
                  }
                }
              }
            }
          }
        },
        groupedChildren: "$restChildren"
      }
    },
    // Step 6: Add pagination
    {
      $addFields: {
        totalTickets: { $size: "$tickets" }
      }
    },
    {
      $project: {
        tickets: {
          $slice: ["$tickets", (page - 1) * limit, limit]
        },
        groupedChildren: 1,
        totalTickets: 1
      }
    }
  ];
  