import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectsharingDto, FindAllTickets, RemoveProjectSharingDto } from './dto/create-projectsharing.dto';
import { UpdateProjectsharingDto } from './dto/update-projectsharing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectSharing, projectSharingDocument, projectSharingStatus, } from './entities/projectsharing.entity';
import { Model, PipelineStage, Types } from 'mongoose';
import { Organization, OrganizationDocument } from 'src/organization/entities/organization.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Project, ProjectDocument } from 'src/project/entities/project.entity';
import { inviteStatusEnum } from 'src/constant/invite-status';
import { ClockOut, ClockOutDocument } from 'src/clock-out/entities/clock-out.entity';
import { ProjectMember, ProjectMemberDocument, ProjectMemberStatusEnum } from 'src/project/entities/project-member.entity';
import { InvitationType, Notification, NotificationDocument } from 'src/notification/entities/notification.entity';
import { ClockIn, ClockInDocument } from 'src/clock-in/entities/clock-in.entity';
import { OrganizationRelationship, OrganizationRelationshipDocument, RelationshipType } from 'src/organization-relationship/entities/organization-relationship.entity';

@Injectable()
export class ProjectsharingService {
  constructor(
    @InjectModel(ProjectSharing.name) private projectSharingModel: Model<projectSharingDocument>,
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(ClockOut.name) private clockoutModel: Model<ClockOutDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(ClockIn.name) private clockinModel: Model<ClockInDocument>,
    @InjectModel(ProjectMember.name) private projectMemberModel: Model<ProjectMemberDocument>,
    @InjectModel(OrganizationRelationship.name) private organizationRelationshipModel: Model<OrganizationRelationshipDocument>
  ) { }

  async getAll(request, filerUserDto, i18n) {
    const userId = request.user.id;
    const user = await this.userModel.findById(userId);
    const organizationId = user.currentOrganizationId;
    const isHauler = filerUserDto["hauler"] === "true";
    const searchText = filerUserDto["search"] || "";

    const relationshipTypes = {
      [RelationshipType.CONTRACTOR_HAULER]: [
        { relationshipType: RelationshipType.CONTRACTOR_HAULER },
        { relationshipType: RelationshipType.HAULER_CONTRACTOR },
      ],
      [RelationshipType.HAULER_CONTRACTOR]: [
        { relationshipType: RelationshipType.CONTRACTOR_HAULER },
        { relationshipType: RelationshipType.HAULER_CONTRACTOR },
      ],
      [RelationshipType.CONTRACTOR_CONTRACTOR]: [
        { relationshipType: RelationshipType.CONTRACTOR_CONTRACTOR },
      ],
      [RelationshipType.HAULER_HAULER]: [
        { relationshipType: RelationshipType.HAULER_HAULER },
      ],
      undefined: [
        { relationshipType: RelationshipType.CONTRACTOR_HAULER },
        { relationshipType: RelationshipType.HAULER_CONTRACTOR },
      ],
    };
    const relationshipTypeArr = relationshipTypes[filerUserDto.relationshipType] || [];


    const projection = isHauler ? {
      _id: 1,
      relationshipType: 1,
      status: 1,
      userId: "$partnerId",
      firstName: "$partnerFirstName",
      lastName: "$partnerLastName",
      role: "$partnerRole",
      organizationName: "$partnerOrganizationName",
      organizationImage: "$partnerOrganizationImage",
    } : {
      _id: 1,
      relationshipType: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      joinedDate: 1,
      isEditable: 1,
      userId: "$partnerId",
      firstName: "$partnerFirstName",
      lastName: "$partnerLastName",
      email: "$partnerEmail",
      mobileNumber: "$partnerMobileNumber",
      role: "$partnerRole",
      organizationId: "$partnerOrganizationId",
      organizationName: "$partnerOrganizationName",
      organizationImage: "$partnerOrganizationImage",
      countryCode: "$partnerCountryCode",
      CountryCodeEmoji: "$partnerCountryCodeEmoji",
    };



    let matchConditions = {
      $and: [
        {
          deletedBy: null
        },
        {
          $or: relationshipTypeArr
        },
        {
          $or: [
            { initiatorOrganizationId: organizationId },
            { recipientOrganizationId: organizationId }
          ]
        },
        {
          $nor: [
            {
              $and: [
                { initiatorOrganizationId: { $ne: organizationId } },
                { status: 'Requested' },
              ],
            },
          ],
        },
        {
          $or: [
            {
              $and: [
                { initiatorOrganizationId: organizationId },
                {
                  $or: [
                    { recipientFirstName: { $regex: searchText, $options: "i" } },
                    { recipientLastName: { $regex: searchText, $options: "i" } },
                    { recipientOrganizationName: { $regex: searchText, $options: "i" } }
                  ]
                }
              ]
            },
            // Search in initiator fields if user is recipient
            {
              $and: [
                { recipientOrganizationId: organizationId },
                {
                  $or: [
                    { initiatorFirstName: { $regex: searchText, $options: "i" } },
                    { initiatorLastName: { $regex: searchText, $options: "i" } },
                    { initiatorOrganizationName: { $regex: searchText, $options: "i" } }
                  ]
                }
              ]
            }
          ]
        },
        { recipientId: { $ne: null } },
        {
          status: { $in: ['Requested', 'Accepted'] },
        }
      ]
    }
    if (filerUserDto["projectId"]) {
      const primaryUsers = await this.projectSharingModel.find({ projectId: filerUserDto["projectId"], grantedUserOrganizationId: user["currentOrganizationId"] });
      if (primaryUsers) {
        const primaryUserIds = primaryUsers.map(user => user.receiverUserOrganizationId);
        matchConditions["$and"].unshift({ $or: [{ initiatorOrganizationId: { $nin: primaryUserIds } }, { recipientOrganizationId: { $nin: primaryUserIds } }] })
      }
    }

    const addFields = {
      isInitiator: { $eq: ["$initiatorOrganizationId", organizationId] },
    };

    const projectFields = {
      _id: 1,
      relationshipType: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      joinedDate: 1,
      isInitiator: 1,
      isEditable: 1,
      partnerId: {
        $cond: { if: "$isInitiator", then: "$recipientId", else: "$initiatorId" },
      },
      partnerFirstName: {
        $cond: { if: "$isInitiator", then: "$recipientFirstName", else: "$initiatorFirstName" },
      },
      partnerLastName: {
        $cond: { if: "$isInitiator", then: "$recipientLastName", else: "$initiatorLastName" },
      },
      partnerEmail: {
        $cond: { if: "$isInitiator", then: "$recipientEmail", else: "$initiatorEmail" },
      },
      partnerMobileNumber: {
        $cond: { if: "$isInitiator", then: "$recipientMobileNumber", else: "$initiatorMobileNumber" },
      },
      partnerRole: {
        $cond: { if: "$isInitiator", then: "$recipientRole", else: "$initiatorRole" },
      },
      partnerOrganizationId: {
        $cond: { if: "$isInitiator", then: "$recipientOrganizationId", else: "$initiatorOrganizationId" },
      },
      partnerOrganizationName: {
        $cond: { if: "$isInitiator", then: "$recipientOrganizationName", else: "$initiatorOrganizationName" },
      },
      partnerOrganizationImage: {
        $cond: { if: "$isInitiator", then: "$recipientOrganizationImage", else: "$initiatorOrganizationImage" },
      },
      partnerOrganizationUniqueId: {
        $cond: { if: "$isInitiator", then: "$recipientOrganizationUniqueId", else: "$initiatorOrganizationUniqueId" },
      },
      partnerCountryCode: {
        $cond: { if: "$isInitiator", then: "$recipientCountryCode", else: "$initiatorCountryCode" },
      },
      partnerCountryCodeEmoji: {
        $cond: { if: "$isInitiator", then: "$recipientCountryCodeEmoji", else: "$initiatorCountryCodeEmoji" },
      },
    };

    const pipeline: PipelineStage[] = [
      { $match: matchConditions },
      { $addFields: addFields },
      {
        $addFields: {
          isEditable: {
            $cond: {
              if: {
                $eq: ["$recipientId", null],
              },
              then: true,
              else: false
            }
          }
        }
      },
      { $sort: { createdAt: -1 } },
      { $project: projectFields },
      { $project: projection },
    ];

    const data = await this.organizationRelationshipModel.aggregate(pipeline);

    return {
      status: HttpStatus.OK,
      message: await i18n.t("message.FindData", { lang: user.language }),
      data
    };
  }


  async create(request, createProjectsharingDto: CreateProjectsharingDto[], i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const userOrganization = await this.organizationModel.findById(user["currentOrganizationId"]);
    const userInfo = await this.userModel.findById(userOrganization["userId"])
    const project = await this.projectModel.findById(createProjectsharingDto[0].projectId);
    const projectOrganization = await this.organizationModel.findById(project.organizationId);

    const parentLevel = await this.projectSharingModel.findOne(
      {
        receiverUserOrganizationId: user["currentOrganizationId"],
        projectId: String(project["_id"]),
        status: { $ne: projectSharingStatus.Revoked }
      }
    );
    const session = await this.projectSharingModel.startSession();
    session.startTransaction();
    try {
      for (let i = 0; i < createProjectsharingDto.length; i++) {
        let projectSharingData = createProjectsharingDto[i]

        if (user.role == "Contractor") {
          if (parentLevel.grantedUserId !== null && user.role !== projectSharingData["role"]) {
            throw new HttpException("You are not allowed to add this user to this project", HttpStatus.FORBIDDEN);
          }
        }

        if (user.role == "Hauler") {
          if (parentLevel.grantedUserId !== null && user.role !== projectSharingData["role"]) {
            throw new HttpException("You are not allowed to add this user to this project", HttpStatus.FORBIDDEN);
          }
          if (projectSharingData["role"] == "Contractor") {
            const isContractorInProject = await this.projectSharingModel.findOne({ projectId: project["_id"], receiverUserRole: "Contractor" });
            // if one contractor is invited by the hauler owner so the he/she cannot invite another contractor
            if (isContractorInProject) {
              throw new HttpException('Contractor is already in the project', HttpStatus.BAD_REQUEST);
            }
          }
        }

        const isExists = await this.projectSharingModel.findOne(
          {
            receiverUserOrganizationId: projectSharingData["organizationId"],
            projectId: String(project["_id"])
          }
        );
        if (isExists) {
          throw new HttpException('User are already a member of this project', HttpStatus.BAD_REQUEST);
        }

        const projectSharing = {
          projectId: String(project['_id']),
          projectName: project["projectName"],
          projectUniqueId: project["projectId"],
          rootUserId: project["userId"],
          rootUserRole: projectOrganization["role"],
          grantedUserId: String(userInfo["_id"]),
          grantedUserName: `${userInfo["firstName"]} ${userInfo["lastName"]}`,
          grantedUserOrganizationId: user["currentOrganizationId"],
          grantedUserOrganizationName: user["currentOrganizationName"],
          grantedUserRole: user["role"],
          receiverUserId: projectSharingData["userId"],
          receiverUserName: `${projectSharingData["userFirstName"]} ${projectSharingData["userLastName"]}`,
          receiverUserEmail: projectSharingData["email"],
          receiverUserMobileNumber: projectSharingData["mobileNumber"],
          receiverUserCountryCode: projectSharingData["countryCode"],
          receiverUserCountryCodeEmoji: projectSharingData["countryCodeEmoji"],
          receiverUserOrganizationId: projectSharingData["organizationId"],
          receiverUserOrganizationName: projectSharingData["organizationName"],
          receiverUserRole: projectSharingData["role"],
          sharedBy: [user["role"]],
          status: inviteStatusEnum.Requested,
          access: {
            cost: projectSharingData["access"]["cost"],
            inviteUser: projectSharingData["access"]["inviteUser"],
          },
          level: parentLevel ? parentLevel["level"] + 1 : 0, // Increment level if parent exists
        };


        const newRecord = await this.projectSharingModel.create([projectSharing], { session });
        const createdRecord = newRecord[0];

        const receiverOrganization = await this.organizationModel.findById(projectSharingData["organizationId"])
        const messageEn = await i18n.t('message.ProjectSharingInvitation', { args: { projectName: project["projectName"], senderOrganization: user["currentOrganizationName"] }, lang: 'English' })
        const messageFr = await i18n.t('message.ProjectSharingInvitation', { args: { projectName: project["projectName"], senderOrganization: user["currentOrganizationName"] }, lang: 'French' })
        const messageEs = await i18n.t('message.ProjectSharingInvitation', { args: { projectName: project["projectName"], senderOrganization: user["currentOrganizationName"] }, lang: 'Spanish' })
        const createNotification = {
          type: InvitationType.PROJECT_SHARING,
          status: inviteStatusEnum.Requested,
          senderUserId: userId,
          senderUserName: userInfo.firstName + " " + userInfo.lastName,
          senderUserRole: user.currentOrganizationRole,
          senderUserOrganizationId: user.currentOrganizationId,
          senderUserOrganizationName: user.currentOrganizationName,
          senderUserOrganizationImage: projectOrganization.organizationImage,
          receiverUserId: projectSharingData["userId"],
          receiverUserName: `${projectSharingData["userFirstName"]} ${projectSharingData["userLastName"]}`,
          receiverUserRole: projectSharingData["role"] + "_" + "Owner",
          receiverUserMobileNumber: projectSharingData["mobileNumber"],
          receiverUserOrganizationId: projectSharingData["organizationId"],
          receiverUserOrganizationName: projectSharingData["organizationName"],
          receiverUserOrganizationImage: receiverOrganization.organizationImage,
          projectSharingId: String(createdRecord["_id"]),
          projectId: String(project["_id"]),
          projectName: project["projectName"],
          message: {
            en: messageEn,
            fr: messageFr,
            es: messageEs
          },
          isActionable: true
        }
        const notification = await this.notificationModel.create([createNotification], { session });
      }
      await session.commitTransaction();

      return {
        status: HttpStatus.CREATED,
        message: await i18n.t('message.OrganizationJoinedProject', { lang: user.language }),
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findAllUsers(request, findUsersDto, i18n) {
    const userId = request["user"]["id"]
    const user = await this.userModel.findById(userId);

    const allUsers = await this.projectSharingModel.aggregate([
      {
        $match: {
          projectId: findUsersDto["projectId"],
          $or: [
            { receiverUserOrganizationId: user["currentOrganizationId"] },
            { grantedUserOrganizationId: user["currentOrganizationId"] },
          ]
        }
      },
      {
        $addFields: {
          "isSelf": {
            $cond: {
              if: {
                $eq: ["$receiverUserId", userId]
              },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $addFields: {
          "isRevoked": {
            $cond: {
              if: {
                $ne: ["$revokedAt", 0]
              },
              then: true,
              else: false
            }
          }
        }
      }, {
        $project: {
          childsOrganizations: 0
        }
      }
    ])
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: allUsers
    }
  }

  async findAllTickets(request, findAllTickets: FindAllTickets, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const projectId = findAllTickets["projectId"]
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentOrganizationId = user["currentOrganizationId"];
    const { page, limit } = findAllTickets

    if (!projectId) {
      throw new BadRequestException('Project ID is required');
    }
    const projectSharingData = await this.projectSharingModel.findOne({ projectId, receiverUserOrganizationId: currentOrganizationId });
    if (!projectSharingData) {
      throw new NotFoundException('Project not found');
    }
    let dateForTickets = projectSharingData.revokedAt > 0 ? projectSharingData.revokedAt : Date.now()
    // if (projectSharingData.grantedUserOrganizationId !== null && projectSharingData.receiverUserRole == "Contractor") {
    //   const tickets = await this.clockoutModel.find({
    //     projectId,
    //     createdAt: { $lte: dateForTickets }
    //   }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    //   const data = tickets.map((ticket) => { return { ...ticket.toObject(), showableName: projectSharingData.grantedUserName } })
    //   return {
    //     status: HttpStatus.OK,
    //     message: await i18n.t('message.FindData', { lang: user.language }),
    //     data: data
    //   }
    // }
    const organizationsIds = projectSharingData.childsOrganizations.map((data) => { return data.childOrganizationId })
    organizationsIds.push(projectSharingData.receiverUserOrganizationId);
    const tickets = await this.clockoutModel.find({
      projectId,
      organizationId: { $in: organizationsIds },
      createdAt: { $lte: dateForTickets }
    }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)
    const data = this.addShowableName(tickets, projectSharingData.receiverUserOrganizationId, projectSharingData.childsOrganizations)
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: data
    }
  }

  // function with memoization
  async addShowableName(data, receiverOrganizationId, childOrganizations) {
    const organizationCache = new Map();

    return data.map((record) => {
      let showableName = "";

      // Determine showableName based on rules
      if (record.organizationId === receiverOrganizationId) {
        // Rule 1: Requestor's Tickets
        showableName = record["userName"];
      }

      // Check if the organizationId is already cached
      if (!organizationCache.has(record.organizationId)) {
        // Find matching child organization
        const childOrg = childOrganizations.find(
          (org) => org.childOrganizationId === record.organizationId
        );

        // Cache the result for this organizationId
        organizationCache.set(record.organizationId, childOrg);
      }

      // Get the cached organization
      const childOrg = organizationCache.get(record.organizationId);

      // Determine showableName based on rules
      if (childOrg) {
        if (childOrg.primaryUser) {
          // Rule 2: Primary User's Tickets
          showableName = childOrg.childOrganizationName;
        } else {
          // Rule 3: Child Organization's Tickets
          showableName = childOrg.parentOrganizationName || "Unknown";
        }
      } else {
        // Default if no matching rule
        showableName = "N/A";
      }

      // Return the updated record
      return { ...record.toObject(), showableName };
    });
  }

  async contractorTickets(request, findAllTickets: FindAllTickets, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const projectId = findAllTickets["projectId"]
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentOrganizationId = user["currentOrganizationId"];
    const {page, limit }=findAllTickets

    if (!projectId) {
      throw new BadRequestException('Project ID is required');
    }

    const projectSharingData = await this.projectSharingModel.findOne({ projectId, receiverUserOrganizationId: currentOrganizationId });

    if (!projectSharingData) {
      throw new NotFoundException('Project not found');
    }

    let dateForTickets = projectSharingData.status == projectSharingStatus.Deactivated ? projectSharingData.updatedAt : projectSharingData.revokedAt > 0 ? projectSharingData.revokedAt : Date.now()
    let data;
    if (projectSharingData.grantedUserId == null) {
      const organizationsIds = projectSharingData.childsOrganizations.map((data) => { return data.childOrganizationId })

      organizationsIds.push(projectSharingData.receiverUserOrganizationId);

      const tickets = await this.clockoutModel.find({
        projectId,
        organizationId: { $in: organizationsIds },
      }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)

      data = this.addShowableName(tickets, projectSharingData.receiverUserOrganizationId, projectSharingData.childsOrganizations)
    }

    const tickets = await this.clockoutModel.find({
      projectId,
      createdAt: { $lte: dateForTickets },
      timecardId: { $eq: "" }
    }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

    data = tickets.map((ticket) => { return { ...ticket.toObject(), showableName: projectSharingData.grantedUserOrganizationName } })

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: data
    }
  }

  async contractorTimecard(request, findAllTickets: FindAllTickets, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const projectId = findAllTickets["projectId"]
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentOrganizationId = user["currentOrganizationId"];
    const {page , limit}=findAllTickets

    if (!projectId) {
      throw new BadRequestException('Project ID is required');
    }

    const projectSharingData = await this.projectSharingModel.findOne({ projectId, receiverUserOrganizationId: currentOrganizationId });

    if (!projectSharingData) {
      throw new NotFoundException('Project not found');
    }

    let dateForTickets = projectSharingData.status == projectSharingStatus.Deactivated ? projectSharingData.updatedAt : projectSharingData.revokedAt > 0 ? projectSharingData.revokedAt : Date.now()

    const timeCards = await this.clockinModel.find({
      projectId,
      createdAt: { $lte: dateForTickets },
    }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);


    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: timeCards
    }
  }

  async projectSharedWithMe(request, paginationDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    let { page, limit } = paginationDto
    let projects;
    if (user["currentOrganizationRole"] === "Contractor_Owner" || user["currentOrganizationRole"] === "Hauler_Owner") {
      projects = await this.projectSharingModel.find({ grantedUserId: { $ne: null }, receiverUserOrganizationId: user["currentOrganizationId"], receiverUserId: userId, status: { $in: [projectSharingStatus.Accepted, projectSharingStatus.Revoked] } }).select(" -_id projectId projectUniqueId projectName sharedWith sharedBy").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    } else {
      projects = await this.projectMemberModel.aggregate([
        {
          $match: {
            organizationId: user["currentOrganizationId"],
            userId: userId,
            projectSharingId: { $ne: null },
            status: ProjectMemberStatusEnum.Active
          }
        },
        {
          $lookup: {
            from: 'projectsharings',
            localField: 'projectSharingId',
            foreignField: "_id",
            as: "projects"
          }
        },
        {
          $project: {
            projectId: "$projects.projectId",
            projectName: "$projects.projectName",
            projectUniqueId: "$projects.projectUniqueId",
            sharedWith: "$projects.sharedWith",
            sharedBy: "$projects.sharedBy",
            _id: 0
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        }
      ])
    }
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: projects
    }
  }


  async revoke(request, revokeSharingDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const getProjectSharing = await this.projectSharingModel.findOne({ projectId: revokeSharingDto["projectId"], receiverUserOrganizationId: revokeSharingDto["userOrganizationId"] });

    if (!getProjectSharing) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: await i18n.t('message.ProjectSharingNotFound', { lang: user.language }),
      };
    }

    if (getProjectSharing["grantedUserId"] !== userId) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: await i18n.t("you don't have access to remove this user", { lang: user.language }),
      };
    }

    if (getProjectSharing["status"] == projectSharingStatus.Requested) {
      await getProjectSharing.deleteOne();
      await this.notificationModel.findOneAndDelete({ projectSharingId: getProjectSharing["_id"] })
      return {
        status: HttpStatus.OK,
        message: await i18n.t('message.RevokeSharing', { lang: user.language }),
      }
    }


    const organizationsIds = getProjectSharing.childsOrganizations.map((data) => { return data.childOrganizationId })
    organizationsIds.push(getProjectSharing.receiverUserOrganizationId);
    // console.log(organizationsIds);

    const updateProjectSharing = await this.projectSharingModel.updateMany({ projectId: revokeSharingDto["projectId"], receiverUserOrganizationId: { $in: organizationsIds } }, { revokedAt: Date.now(), status: projectSharingStatus.Revoked }, { new: true })
    // console.log(updateProjectSharing);

    if (!updateProjectSharing) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: await i18n.t('message.Error', { lang: user.language }),
      };
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.RevokeSharing', { lang: user.language }),
    }
  }

  async changeStatus(request, id, i18n) {
    const userId = request["user"]["id"]
    const user = await this.userModel.findById(userId)

    const projectSharingData = await this.projectSharingModel.findById(id)
    if (!projectSharingData) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: await i18n.t('message.NotFoundData', { lang: user.language })
      }, HttpStatus.NOT_FOUND)
    }

    if (projectSharingData.grantedUserId !== userId) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: await i18n.t("you don't have access to change status of this user", { lang: user.language }),
      };
    }

    const organizationsIds = projectSharingData.childsOrganizations.map((data) => { return data.childOrganizationId })
    organizationsIds.push(projectSharingData.receiverUserOrganizationId);

    const newStatus = projectSharingData["status"] === projectSharingStatus.Accepted ? projectSharingStatus.Deactivated : projectSharingStatus.Accepted

    await this.projectSharingModel.updateMany({ projectId: projectSharingData["projectId"], receiverUserOrganizationId: { $in: organizationsIds } }, { status: newStatus })

    const notification = await this.notificationModel.findOne({ projectSharingId: id });

    const notificationStatus = newStatus == projectSharingStatus.Accepted ? "Activate" : "Inactivate"

    const messageEn = await i18n.t('message.ProjectSharingActivateDeactivate', { args: { projectName: projectSharingData["projectName"], senderOrganization: user["currentOrganizationName"], status: notificationStatus }, lang: 'English' })
    const messageFr = await i18n.t('message.ProjectSharingActivateDeactivate', { args: { projectName: projectSharingData["projectName"], senderOrganization: user["currentOrganizationName"], status: notificationStatus }, lang: 'French' })
    const messageEs = await i18n.t('message.ProjectSharingActivateDeactivate', { args: { projectName: projectSharingData["projectName"], senderOrganization: user["currentOrganizationName"], status: notificationStatus }, lang: 'Spanish' })

    let sendNotitication = {
      type: InvitationType.DEFAULT_NOTIFICATION,
      senderUserId: notification['senderUserId'],
      senderUserName: notification['senderUserName'],
      senderUserRole: notification['senderUserRole'],
      senderUserOrganizationId: notification['senderUserOrganizationId'],
      senderUserOrganizationName: notification['senderUserOrganizationName'],
      senderUserOrganizationImage: notification["senderUserOrganizationImage"],
      receiverUserId: notification['receiverUserId'],
      receiverUserName: notification['receiverUserName'],
      receiverUserRole: notification['receiverUserRole'],
      receiverUserOrganizationId: notification['receiverUserOrganizationId'],
      receiverUserOrganizationImage: notification['receiverUserOrganizationImage'],
      receiverUserOrganizationName: notification['receiverUserOrganizationName'],
      message: {
        en: messageEn,
        fr: messageFr,
        es: messageEs
      },
      isActionable: false,
    }
    await this.notificationModel.create(sendNotitication);

    const returnMessage = newStatus === projectSharingStatus.Accepted ? "message.ActivateUser" : "message.DeactivateUser"

    return {
      status: HttpStatus.OK,
      message: await i18n.t(returnMessage, { lang: user.language })
    }

  }
}

