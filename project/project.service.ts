import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Project, ProjectDocument } from './entities/project.entity';
import { ClockIn, ClockInDocument } from 'src/clock-in/entities/clock-in.entity';
import { ClockOut, ClockOutDocument } from 'src/clock-out/entities/clock-out.entity';
import { ProjectMember, ProjectMemberDocument, ProjectMemberStatusEnum } from './entities/project-member.entity';
import { Organization, OrganizationDocument } from 'src/organization/entities/organization.entity';
import { Role, inviteStatusEnum } from 'src/constant/invite-status';
import { ProjectSharing, projectSharingDocument, projectSharingStatus } from 'src/projectsharing/entities/projectsharing.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { InvitationType, Notification, NotificationDocument } from 'src/notification/entities/notification.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(ProjectMember.name) private projectMemberModel: Model<ProjectMemberDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    @InjectModel(ClockOut.name) private clockOutModel: Model<ClockOutDocument>,
    @InjectModel(ClockIn.name) private clockInModel: Model<ClockInDocument>,
    @InjectModel(ProjectSharing.name) private projectSharingModel: Model<projectSharingDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private jwtService: JwtService,
  ) { }

  async create(request, createProjectDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId)

    const existingProject = await this.projectModel.findOne({
      projectId: createProjectDto.projectId,
      organizationId: user.currentOrganizationId,
      isDelete: false
    });

    if (existingProject) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.ProjectIdExists', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }
    const projectData = {
      projectId: createProjectDto.projectId,
      projectName: createProjectDto.projectName,
      country: createProjectDto.country,
      state: createProjectDto.state,
      zipCode: createProjectDto.zipCode,
      userId: userId,
      organizationId: user.currentOrganizationId,
    };

    const newProject = new this.projectModel(projectData);
    const createdProject = await newProject.save();
    const projectSharing = {
      projectId: String(createdProject['_id']),
      projectName: createdProject["projectName"],
      projectUniqueId: createdProject["projectId"],
      rootUserId: createdProject["userId"],
      grantedUserId: null,
      grantedUserName: null,
      grantedUserOrganizationId: null,
      grantedUserOrganizationName: null,
      receiverUserId: userId,
      receiverUserName: `${user["firstName"]} ${user["lastName"]}`,
      receiverUserEmail: user["email"],
      receiverUserMobileNumber: user["mobileNumber"],
      receiverUserCountryCode: user["countryCode"],
      receiverUserCountryCodeEmoji: user["countryCodeEmoji"],
      receiverUserOrganizationId: user["currentOrganizationId"],
      receiverUserOrganizationName: user["currentOrganizationName"],
      status: inviteStatusEnum.Accepted,
      access: {
        cost: true,
        inviteUser: true,
      },
      level: 0, // Increment level if parent exists
    };
    await this.projectSharingModel.create(projectSharing)
    if ([Role.CONTRACTOR_ADMIN, Role.CONTRACTOR_TRUCK_BOSS].includes(user["currentOrganizationRole"])) {
      const projectMemberData = {
        projectId: createdProject["_id"],
        projectUniqueId: createdProject["projectId"],
        projectName: createdProject["projectName"],
        projectCreatedBy: createdProject["userId"],
        organizationId: createdProject["organizationId"],
        userId: user["_id"],
        firstName: user["firstName"],
        lastName: user["lastName"],
        role: user["currentOrganizationRole"],
        mobileNumber: user["mobileNumber"],
        countryCode: user["countryCode"],
        countryCodeEmoji: user["countryCodeEmoji"],
        email: user["email"],
        profileImage: user["profileImage"]
      }

      await this.projectMemberModel.create(projectMemberData);
    }

    return {
      status: HttpStatus.CREATED,
      message: await i18n.t('message.ProjectCreate', { lang: user.language }),
      data: createdProject,
    };

  }
  
  async createProject(request, createProjectDto: CreateProjectDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId)

    const session = await this.projectSharingModel.startSession();
    session.startTransaction();
    try {
      const existingProject = await this.projectModel.findOne({
        projectId: createProjectDto.projectId,
        organizationId: user.currentOrganizationId,
        isDelete: false
      });

      if (existingProject) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.ProjectIdExists', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }
      const projectData = {
        projectId: createProjectDto.projectId,
        projectName: createProjectDto.projectName,
        country: createProjectDto.country,
        state: createProjectDto.state,
        zipCode: createProjectDto.zipCode,
        userId: userId,
        organizationId: user.currentOrganizationId,
      };

      const newProject = new this.projectModel(projectData);
      const createdProject = await newProject.save();
      const projectSharing = {
        projectId: String(createdProject['_id']),
        projectName: createdProject["projectName"],
        projectUniqueId: createdProject["projectId"],
        rootUserId: createdProject["userId"],
        grantedUserId: null,
        grantedUserName: null,
        grantedUserOrganizationId: null,
        grantedUserOrganizationName: null,
        receiverUserId: userId,
        receiverUserName: `${user["firstName"]} ${user["lastName"]}`,
        receiverUserEmail: user["email"],
        receiverUserMobileNumber: user["mobileNumber"],
        receiverUserCountryCode: user["countryCode"],
        receiverUserCountryCodeEmoji: user["countryCodeEmoji"],
        receiverUserOrganizationId: user["currentOrganizationId"],
        receiverUserOrganizationName: user["currentOrganizationName"],
        status: inviteStatusEnum.Accepted,
        access: {
          cost: true,
          inviteUser: true,
        },
        level: 0, // Increment level if parent exists
      };
      await this.projectSharingModel.create(projectSharing)
      if ([Role.CONTRACTOR_ADMIN, Role.CONTRACTOR_TRUCK_BOSS].includes(user["currentOrganizationRole"])) {
        const projectMemberData = {
          projectId: createdProject["_id"],
          projectUniqueId: createdProject["projectId"],
          projectName: createdProject["projectName"],
          projectCreatedBy: createdProject["userId"],
          organizationId: createdProject["organizationId"],
          userId: user["_id"],
          firstName: user["firstName"],
          lastName: user["lastName"],
          role: user["currentOrganizationRole"],
          mobileNumber: user["mobileNumber"],
          countryCode: user["countryCode"],
          countryCodeEmoji: user["countryCodeEmoji"],
          email: user["email"],
          profileImage: user["profileImage"]
        }

        await this.projectMemberModel.create(projectMemberData);
      }
      if (createProjectDto.projectMember?.length > 0) {
        let promise = [];

        const projectData = await this.projectModel.findOne({
          _id: createdProject["_id"],
          organizationId: user["currentOrganizationId"],
        })

        if (!projectData) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: await i18n.t('message.NotFoundData', { lang: user.language }),
          },
            HttpStatus.NOT_FOUND,
          );
        }

        for (let index = 0; index < createProjectDto["projectMember"].length; index++) {
          const element = createProjectDto["projectMember"][index];

          const projectMemberData = {
            projectId: projectData["_id"],
            projectUniqueId: projectData["projectId"],
            projectName: projectData["projectName"],
            projectCreatedBy: projectData["userId"],
            organizationId: projectData["organizationId"],
            userId: element["userId"],
            firstName: element["firstName"],
            lastName: element["lastName"],
            role: element["role"],
            mobileNumber: element["mobileNumber"],
            countryCode: element["countryCode"],
            countryCodeEmoji: element["countryCodeEmoji"],
            email: element["email"],
            profileImage: element["profileImage"]
          }
          promise.push(await this.projectMemberModel.create([projectMemberData], { session }))
        }

        await Promise.all(promise);
      }

      const processInvitations = async (invitees: any[], role: string) => {
        for (const invitee of invitees) {
          // Check if user is already a member
          const isExists = await this.projectSharingModel.findOne({
            receiverUserOrganizationId: invitee.organizationId,
            projectId: String(createdProject._id)
          });

          if (isExists) {
            throw new HttpException('User is already a member of this project', HttpStatus.BAD_REQUEST);
          }

          const projectOrganization = await this.organizationModel.findById(createdProject.organizationId);
          const parentLevel = await this.projectSharingModel.findOne({
            receiverUserOrganizationId: user.currentOrganizationId,
            projectId: String(createdProject._id),
            status: { $ne: projectSharingStatus.Revoked }
          });

          // Create project sharing record
          const projectSharing = {
            projectId: String(createdProject._id),
            projectName: createdProject.projectName,
            projectUniqueId: createdProject.projectId,
            rootUserId: createdProject.userId,
            rootUserRole: projectOrganization.role,
            grantedUserId: userId,
            grantedUserName: `${user.firstName} ${user.lastName}`,
            grantedUserOrganizationId: user.currentOrganizationId,
            grantedUserOrganizationName: user.currentOrganizationName,
            grantedUserRole: user.role,
            receiverUserId: invitee.userId,
            receiverUserName: `${invitee.userFirstName} ${invitee.userLastName}`,
            receiverUserEmail: invitee.email,
            receiverUserMobileNumber: invitee.mobileNumber,
            receiverUserCountryCode: invitee.countryCode,
            receiverUserCountryCodeEmoji: invitee.countryCodeEmoji,
            receiverUserOrganizationId: invitee.organizationId,
            receiverUserOrganizationName: invitee.organizationName,
            receiverUserRole: invitee.role,
            sharedBy: [user.role],
            status: inviteStatusEnum.Requested,
            access: {
              cost: invitee.access.cost,
              inviteUser: invitee.access.inviteUser,
            },
            level: parentLevel ? parentLevel.level + 1 : 0,
          };

          const [createdRecord] = await this.projectSharingModel.create([projectSharing], { session });

          // Create notification
          const receiverOrganization = await this.organizationModel.findById(invitee.organizationId);
          const messages = await Promise.all([
            i18n.t('message.ProjectSharingInvitation', {
              args: {
                projectName: createdProject.projectName,
                senderOrganization: user.currentOrganizationName
              },
              lang: 'English'
            }),
            i18n.t('message.ProjectSharingInvitation', {
              args: {
                projectName: createdProject.projectName,
                senderOrganization: user.currentOrganizationName
              },
              lang: 'French'
            }),
            i18n.t('message.ProjectSharingInvitation', {
              args: {
                projectName: createdProject.projectName,
                senderOrganization: user.currentOrganizationName
              },
              lang: 'Spanish'
            })
          ]);

          const notification = {
            type: InvitationType.PROJECT_SHARING,
            status: inviteStatusEnum.Requested,
            senderUserId: userId,
            senderUserName: `${user.firstName} ${user.lastName}`,
            senderUserRole: user.currentOrganizationRole,
            senderUserOrganizationId: user.currentOrganizationId,
            senderUserOrganizationName: user.currentOrganizationName,
            senderUserOrganizationImage: projectOrganization.organizationImage,
            receiverUserId: invitee.userId,
            receiverUserName: `${invitee.userFirstName} ${invitee.userLastName}`,
            receiverUserRole: `${invitee.role}_Owner`,
            receiverUserMobileNumber: invitee.mobileNumber,
            receiverUserOrganizationId: invitee.organizationId,
            receiverUserOrganizationName: invitee.organizationName,
            receiverUserOrganizationImage: receiverOrganization.organizationImage,
            projectSharingId: String(createdRecord._id),
            projectId: String(createdProject._id),
            projectName: createdProject.projectName,
            message: {
              en: messages[0],
              fr: messages[1],
              es: messages[2]
            },
            isActionable: true
          };

          await this.notificationModel.create([notification], { session });
        }
      };

      // Process contractors
      if (createProjectDto.contractors?.length > 0) {
        if (user.role == "Hauler" && createProjectDto.contractors?.length > 1) {
          throw new Error("Haulers can only invite one contractor in the project");
        }
        await processInvitations(createProjectDto.contractors, 'Contractor');
      }

      // Process haulers
      if (createProjectDto.haulers?.length > 0) {
        await processInvitations(createProjectDto.haulers, 'Hauler');
      }

      await session.commitTransaction()
      return {
        status: HttpStatus.CREATED,
        message: await i18n.t('message.ProjectCreate', { lang: user.language }),
        data: createdProject,
      };

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  }

  async validateProjectId(request, ValidateProjectIdDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId)

    let query = {
      projectId: ValidateProjectIdDto.projectId,
      organizationId: user.currentOrganizationId,
      isDelete: false
    };

    // If ValidateProjectIdDto.id is provided, exclude it from the query
    if (ValidateProjectIdDto.id) {
      query['_id'] = { $ne: ValidateProjectIdDto.id };
    }

    let existingProjectId = await this.projectModel.findOne(query);

    if (existingProjectId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.ProjectIdExists', { lang: user.language }),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.ProjectIdIsValid', { lang: user.language }),
    };
  }

  async findAll(request, filterProjectDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const skip = (filterProjectDto.page - 1) * filterProjectDto.limit;
    let filter: any = { $and: [{ organizationId: user.currentOrganizationId, isDelete: false }] };

    if ([Role.CONTRACTOR_ADMIN, Role.CONTRACTOR_TRUCK_BOSS].includes(user["currentOrganizationRole"])) {
      const projects = await this.projectMemberModel.find({ organizationId: user["currentOrganizationId"], userId: user["id"], status: ProjectMemberStatusEnum.Active }, { projectId: 1 })
      const projectIds = projects.map((project) => new Types.ObjectId(project.projectId));
      filter?.["$and"].push({
        _id: { $in: projectIds }
      })
    }

    if (filterProjectDto.search) {
      const searchRegex = new RegExp(filterProjectDto.search, 'i'); // 'i' for case-insensitive search

      filter.$or = [
        { projectName: searchRegex },
        { projectId: searchRegex },
      ];
    }

    const data = await this.projectModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(filterProjectDto.limit + 1);

    const isNextPageAvailable = data.length > filterProjectDto.limit;
    if (isNextPageAvailable) {
      data.pop();
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      isNextPageAvailable: isNextPageAvailable,
      data: data,
    };
  }

  async autoPopulateId(request, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const lastProject = await this.projectModel.findOne({ organizationId: user.currentOrganizationId })
      .sort({ _id: -1 });

    let newProjectId;
    if (lastProject && lastProject.projectId) {
      const match = lastProject.projectId.match(/(\D*)(\d+)(\D*)/);
      if (match) {
        const prefix = match[1] || '';
        const lastNumber = parseInt(match[2], 10);
        const suffix = match[3] || '';
        const newLastNumber = lastNumber + 1;

        newProjectId = `${prefix}${newLastNumber}${suffix}`;
      } else {
        newProjectId = "#1";
      }
    } else {
      newProjectId = "#1";
    }

    let projectExists = await this.projectModel.exists({ projectId: newProjectId, organizationId: user.currentOrganizationId });
    let increment = 1;
    while (projectExists) {
      newProjectId = newProjectId.replace(/\d+/, (match) => {
        const incrementedNumber = parseInt(match, 10) + increment++;
        return incrementedNumber.toString().padStart(match.length, '0');
      });
      projectExists = await this.projectModel.exists({ projectId: newProjectId, organizationId: user.currentOrganizationId });
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.ProjectIdAutoPopulate', { lang: user.language }),
      projectId: newProjectId.toString()
    };
  }

  async findOne(request, id, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const data = await this.projectModel.findById(id);
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: data
    }
  }

  async update(request, id, updateProjectDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const existingProjectId = await this.projectModel.exists({
      projectId: updateProjectDto.projectId,
      organizationId: user.currentOrganizationId,
      isDelete: false,
      _id: { $ne: id }
    });

    if (existingProjectId) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.ProjectIdExists', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });

    await this.clockInModel.updateMany(
      { projectId: data._id.toString() },
      { $set: { project: updateProjectDto.projectId, projectName: updateProjectDto.projectName } }
    );

    await this.clockOutModel.updateMany(
      { projectId: data._id.toString() },
      { $set: { project: updateProjectDto.projectId, projectName: updateProjectDto.projectName } }
    );

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.UpdateData', { lang: user.language }),
      data: data
    }
  }

  async remove(request, id, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const updatedData = await this.projectModel.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true }
    );

    if (!updatedData) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: await i18n.t('message.NotFoundData', { lang: user.language }),
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.projectMemberModel.deleteMany({
      projectId: id,
      organizationId: user.currentOrganizationId,
    });

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.DeleteData', { lang: user.language }),
    }
  }

  async manageMember(request, manageUserDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    let promise = [];
    const { projectId, userData, userIds } = manageUserDto;

    const projectData = await this.projectModel.findOne({
      _id: new Types.ObjectId(projectId),
      organizationId: user["currentOrganizationId"],
    })

    if (!projectData) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: await i18n.t('message.NotFoundData', { lang: user.language }),
      },
        HttpStatus.NOT_FOUND,
      );
    }

    const project = await this.projectSharingModel.findOne({
      projectId: projectId, receiverUserOrganizationId: user['currentOrganizationId']
    })

    for (let index = 0; index < userData.length; index++) {
      const element = userData[index];
      const existsProjectMemberData = await this.projectMemberModel.findOne({
        projectId: projectId,
        organizationId: user["currentOrganizationId"],
        userId: element["userId"]
      })

      if (!existsProjectMemberData) {
        const projectMemberData = {
          projectId: projectData["_id"],
          projectUniqueId: projectData["projectId"],
          projectName: projectData["projectName"],
          projectCreatedBy: projectData["userId"],
          organizationId: projectData["organizationId"],
          userId: element["userId"],
          firstName: element["firstName"],
          lastName: element["lastName"],
          role: element["role"],
          mobileNumber: element["mobileNumber"],
          countryCode: element["countryCode"],
          countryCodeEmoji: element["countryCodeEmoji"],
          email: element["email"],
          profileImage: element["profileImage"],
          projectSharingId: project?.['grantedUserId'] == null ? null : project['_id'],
        }
        promise.push(await this.projectMemberModel.create(projectMemberData))
      }
    }

    for (let index = 0; index < userIds.length; index++) {
      promise.push(await this.projectMemberModel.findOneAndDelete({ projectId: projectId, userId: userIds[index], organizationId: user["currentOrganizationId"], }))
    }

    await Promise.all(promise);

    if (manageUserDto.isDataCreate) {
      return {
        status: HttpStatus.CREATED,
        message: await i18n.t('message.ProjectCreate', { lang: user.language }),
      };
    } else {
      return {
        status: HttpStatus.OK,
        message: await i18n.t('message.UpdateData', { lang: user.language }),
      };
    }
  }

  async findMember(request, filterProjectMemberDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const { page, limit, projectId, search } = filterProjectMemberDto;
    let filter: Record<string, any> = {
      organizationId: user["currentOrganizationId"],
      projectId: projectId,
      userId: { $ne: userId },
      status: ProjectMemberStatusEnum.Active
    };

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
      ];
    }

    const pipeline: any[] = [
      { $match: filter },
      {
        $project: {
          _id: 1,
          projectCreatedBy: 1,
          userId: 1,
          firstName: 1,
          lastName: 1,
          role: 1,
          mobileNumber: 1,
          countryCode: 1,
          countryCodeEmoji: 1,
          email: 1,
          profileImage: 1,
          createdAt: 1
        }
      }
    ];

    if (page && limit) {
      pipeline.push(
        { $skip: (page - 1) * limit },
        { $limit: limit + 1 }
      );
    }

    const data = await this.projectMemberModel.aggregate(pipeline);

    let isNextPageAvailable = false;

    if (page && limit) {
      isNextPageAvailable = data.length > limit;
      if (isNextPageAvailable) {
        data.pop();
      }
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      isNextPageAvailable,
      data: data,
    }
  }

  async removeMember(request, id, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const projectMemberData = await this.projectMemberModel.findOne({ organizationId: user["currentOrganizationId"], _id: new Types.ObjectId(id) })

    if (!projectMemberData) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: await i18n.t('message.NotFoundData', { lang: user.language }),
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.projectMemberModel.findOneAndDelete({ organizationId: user["currentOrganizationId"], _id: new Types.ObjectId(id) })

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.DeleteData', { lang: user.language }),
    }
  }

  async getAllProjects(request, paginationDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: await i18n.t("message.NotFound", { lang: user.language }),
      };
    }


    let { page, limit } = paginationDto

    let projects;
    if (user['currentOrganizationRole'] == 'Contractor_Owner' || user['currentOrganizationRole'] == 'Hauler_Owner') {
      projects = await this.projectModel.find({ organizationId: user['currentOrganizationId'], userId: userId }).select("_id projectName projectId  sharedWith").skip((page - 1) * limit).limit(limit)
    }
    else {
      projects = await this.projectMemberModel.aggregate([
        {
          $match: {
            organizationId: user["currentOrganizationId"],
            userId: userId,
            projectSharingId: { $eq: null },
            status: ProjectMemberStatusEnum.Active
          }
        },
        {
          $lookup: {
            from: 'projects',
            localField: 'projectId',
            foreignField: "_id",
            as: "projects"
          }
        },
        {
          $project: {
            _id: "$projects._id",
            projectName: "$projects.projectName",
            projectId: "$projects.projectId",
            sharedWith: "$projects.sharedWith",
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

  async getAllHaulerDriverProjects(request, paginationDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    if (!user) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: await i18n.t("message.NotFound", { lang: user.language }),
      };
    }


    let { page, limit } = paginationDto

    const projects = await this.projectMemberModel.find({ organizationId: user['currentOrganizationId'], userId: userId, status: ProjectMemberStatusEnum.Active }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      data: projects
    }
  }
}
