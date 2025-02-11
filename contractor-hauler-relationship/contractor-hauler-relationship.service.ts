import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Hauler, HaulerDocument } from '../hauler/entities/hauler.entity';
import { TruckType, TruckTypeDocument } from 'src/truck-type/entities/truck-type.entity';
import { PayRate, PayRateDocument } from 'src/pay-rate/entities/pay-rate.entity';
import { Truck, TruckDocument } from 'src/truck/entities/truck.entity';
import { ContractorHaulerRelationship, ContractorHaulerRelationshipDocument } from './entities/contractor-hauler-relationship.entity';
import { Organization, OrganizationDocument } from 'src/organization/entities/organization.entity';
import { InvitationType, Notification, NotificationDocument } from 'src/notification/entities/notification.entity';
import { inviteStatusEnum } from 'src/constant/invite-status';
import { OrgMemberDocument, OrganizationMember } from 'src/organization/entities/orgMember.entitys';
import { log } from 'console';

@Injectable()
export class ContractorHaulerRelationshipService {
  constructor(
    @InjectModel(Hauler.name) private haulerModel: Model<HaulerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(TruckType.name) private TruckTypeModel: Model<TruckTypeDocument>,
    @InjectModel(PayRate.name) private payRateModel: Model<PayRateDocument>,
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
    @InjectModel(ContractorHaulerRelationship.name) private contractorHaulerRelationshipModel: Model<ContractorHaulerRelationshipDocument>,
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    @InjectModel(OrganizationMember.name) private organizationMemberModel: Model<OrgMemberDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private jwtService: JwtService,
  ) { }

  async create(request, createRelationshipDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const { uniqueCode, organizationName, firstName, lastName, mobileNumber, email, countryCode, countryCodeEmoji } = createRelationshipDto;

    if (user["role"] === "Contractor") {
      let orgMember = await this.organizationMemberModel.findOne(
        { organizationId: user["currentOrganizationId"], userId: user["_id"] }
      )

      if (!orgMember && !orgMember["permission"]["hauler"]) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t(" you don't have permission to create this!! ", { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const invitorOrganization = await this.organizationModel.findById(user.currentOrganizationId);
    const invitorOrganizationOwner: any = await this.userModel.findById(
      invitorOrganization.userId,
      { _id: 1, firstName: 1, lastName: 1, email: 1, mobileNumber: 1, countryCode: 1, countryCodeEmoji: 1 });

    if (uniqueCode) {
      const recieverOrganization = await this.organizationModel.findOne({ uniqueId: createRelationshipDto.uniqueCode })
      const isInvalidCode = !recieverOrganization || (recieverOrganization.role === invitorOrganization.role);

      if (isInvalidCode) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.InvalidUniqueCode', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }

      const contractorOrganizationId = invitorOrganization.role == "Contractor" ? String(invitorOrganization._id) : String(recieverOrganization._id);
      const haulerOrganizationId = invitorOrganization.role == "Hauler" ? String(invitorOrganization._id) : String(recieverOrganization._id);

      const existingRelationShip = await this.contractorHaulerRelationshipModel.findOne({
        contractorOrganizationId: contractorOrganizationId,
        haulerOrganizationId: haulerOrganizationId,
        status: { $in: [inviteStatusEnum.Accepted, inviteStatusEnum.Requested] }
      })

      if (existingRelationShip) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.RelationshipAlreadyExists', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }

      const recieverOrganizationOwner = await this.userModel.findById(
        recieverOrganization.userId,
        { _id: 1, firstName: 1, lastName: 1, mobileNumber: 1, email: 1, countryCode: 1, countryCodeEmoji: 1 });

      let contractorHaulerRelationshipData = this.createContractorHaulerRelationship({
        inviter: { ...invitorOrganizationOwner.toObject(), uniqueCode: invitorOrganization["uniqueId"], organizationId: invitorOrganization["_id"], organizationName: invitorOrganization["organizationName"], role: invitorOrganization["role"] },
        reciever: { ...recieverOrganizationOwner.toObject(), uniqueCode: recieverOrganization["uniqueId"], organizationId: recieverOrganization["_id"], organizationName: recieverOrganization["organizationName"], role: recieverOrganization["role"] }
        // createRelationshipDto: { recieverOrganizationOwner, ...recieverOrganization },
        // userId
      })

      const contractorHaulerRelationship = new this.contractorHaulerRelationshipModel(contractorHaulerRelationshipData)
      await contractorHaulerRelationship.save();
      let recieverDisplayName = invitorOrganization.organizationName
      const invitationMessageEn = await i18n.t('message.ConnectionUser', {
        name: recieverDisplayName,
        lang: 'English'
      });
      const invitationMessageFr = await i18n.t('message.ConnectionUser', {
        name: recieverDisplayName,
        lang: 'French'
      });
      const invitationMessageEs = await i18n.t('message.ConnectionUser', {
        name: recieverDisplayName,
        lang: 'Spanish'
      });
      const modifiedInvitationMessageEn = invitationMessageEn.replace('{name}', recieverDisplayName);
      const modifiedInvitationMessageFr = invitationMessageFr.replace('{name}', recieverDisplayName);
      const modifiedInvitationMessageEs = invitationMessageEs.replace('{name}', recieverDisplayName);
      const createInvitation = await this.notificationModel.create({
        type: InvitationType.ORGANIZATION_RELATIONS,
        status: inviteStatusEnum.Requested,
        senderUserId: userId,
        senderUserName: user.firstName + " " + user.lastName,
        senderUserRole: user.currentOrganizationRole,
        senderUserOrganizationId: String(invitorOrganization._id),
        senderUserOrganizationName: invitorOrganization.organizationName,
        senderUserOrganizationImage: invitorOrganization.organizationImage,
        receiverUserId: String(recieverOrganizationOwner._id),
        receiverUserName: recieverOrganizationOwner.firstName + " " + recieverOrganizationOwner.lastName,
        receiverUserRole: recieverOrganization.role+"_"+"Owner",
        receiverUserMobileNumber: recieverOrganizationOwner.mobileNumber,
        receiverUserOrganizationId: String(recieverOrganization._id),
        receiverUserOrganizationName: recieverOrganization.organizationName,
        receiverUserOrganizationImage: recieverOrganization.organizationImage,
        relationshipId: String(contractorHaulerRelationship._id),
        message: {
          en: modifiedInvitationMessageEn,
          fr: modifiedInvitationMessageFr,
          es: modifiedInvitationMessageEs
        },
        isActionable: true,
      })
      await createInvitation.save()
      return {
        status: HttpStatus.CREATED,
        message: await i18n.t('message.RelationshipEstablished', { lang: user.language }),
        data: contractorHaulerRelationship,
      };
    }

    let checkExistingRelationShipQuery: Record<any, any>;
    if (invitorOrganization.role === "Hauler") {
      checkExistingRelationShipQuery = {
        haulerOrganizationId: String(invitorOrganization._id),
        contractorMobileNumber: mobileNumber
      }
    } else if (invitorOrganization.role === "Contractor") {
      checkExistingRelationShipQuery = {
        contractorOrganizationId: String(invitorOrganization._id),
        haulerMobileNumber: mobileNumber
      }
    }

    const checkExistingRelationShip = await this.contractorHaulerRelationshipModel.findOne(checkExistingRelationShipQuery);

    if (checkExistingRelationShip) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.RelationshipAlreadyExists', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    let contractorHaulerRelationshipData = this.createContractorHaulerRelationship({
      inviter: { ...invitorOrganizationOwner.toObject(), uniqueCode: invitorOrganization["uniqueId"], organizationId: invitorOrganization["_id"], organizationName: invitorOrganization["organizationName"], role: invitorOrganization["role"] },
      reciever: { ...createRelationshipDto }
    })
    contractorHaulerRelationshipData["status"] = inviteStatusEnum.Accepted;
    contractorHaulerRelationshipData["joinedDate"] = new Date().getTime();
    const contractorHaulerRelationship = await this.contractorHaulerRelationshipModel.create(contractorHaulerRelationshipData);

    return {
      status: HttpStatus.CREATED,
      message: await i18n.t('message.RelationshipEstablished', { lang: user.language }),
      data: contractorHaulerRelationship,
    };
  }

  async validateHaulerName(request, validateHaulerNameDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId)

    const haulerNameRegex = new RegExp(`^${validateHaulerNameDto.haulerName}$`, 'i');

    let query = {
      haulerName: haulerNameRegex,
      organizationId: user.currentOrganizationId,
      isDelete: false
    };

    // If validateHaulerNameDto.id is provided, exclude it from the query
    if (validateHaulerNameDto.id) {
      query['_id'] = { $ne: validateHaulerNameDto.id };
    }

    let existingHaulerName = await this.haulerModel.findOne(query);

    if (existingHaulerName) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.HaulerNameExists', { lang: user.language }),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.haulerNameIsValid', { lang: user.language }),
    };
  }

  async findAll(request, filterHaulerDto, i18n) {
    const userId = request.user.id;
    const user = await this.userModel.findById(userId);
    const organizationId = user.currentOrganizationId;
    const skip = (filterHaulerDto.page - 1) * filterHaulerDto.limit;


    const baseMatch: Record<string, any> = {
      deletedBy: null,
      [user.role === "Contractor" ? "contractorOrganizationId" : "haulerOrganizationId"]: organizationId
    };


    if (filterHaulerDto.search) {
      const searchRegex = new RegExp(filterHaulerDto.search, 'i');
      const searchFields = user.role === "Contractor"
        ? ["haulerFirstName", "haulerLastName", "haulerOrganizationName"]
        : ["contractorFirstName", "contractorLastName", "contractorOrganizationName"];

      baseMatch["$or"] = searchFields.map(field => ({ [field]: searchRegex }));
    }

    const getProjectionFields = () => {
      const prefix = user.role === "Contractor" ? "hauler" : "contractor";
      if (filterHaulerDto.hauler === 'true') {
        return {
          [`${prefix}Id`]: 1,
          [`${prefix}FirstName`]: 1,
          [`${prefix}LastName`]: 1
        };
      }
      return {
        [`${prefix}Id`]: 1,
        [`${prefix}FirstName`]: 1,
        [`${prefix}LastName`]: 1,
        [`${prefix}OrganizationName`]: 1,
        [`${prefix}Email`]: 1,
        joinedDate: 1,
        status: 1
      };
    };

    const pipeline: PipelineStage[] = [
      // Match stage
      { $match: baseMatch },

      // Add isEditable field
      {
        $addFields: {
          isEditable: {
            $cond: {
              if: {
                $or: [
                  { $eq: ["$contractorId", null] },
                  { $eq: ["$haulerId", null] }
                ]
              },
              then: true,
              else: false
            }
          }
        }
      },

      // Sort stage
      { $sort: { order: 1 } },

      // Skip stage
      { $skip: skip },

      // Limit stage (get one extra for next page check)
      { $limit: filterHaulerDto.limit + 1 },

      // Project stage
      {
        $project: {
          ...getProjectionFields(),
          isEditable: 1
        }
      },

    ];

    const data = await this.contractorHaulerRelationshipModel.aggregate(pipeline);

    // Check if there's a next page
    const isNextPageAvailable = data.length > filterHaulerDto.limit;
    if (isNextPageAvailable) {
      data.pop();
    }

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.FindData', { lang: user.language }),
      isNextPageAvailable,
      data
    };

  }

  async findOne(request, id, paginationDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId)
    if (user.role == "Contrcator") {
      const [data, payRates, trucks] = await Promise.all([
        this.contractorHaulerRelationshipModel.findOne({ contractorOrganizationId: user.currentOrganizationId, haulerId: id }),
        this.payRateModel.find({ haulerId: id, isDelete: false })
          .sort({ createdAt: -1 })
          .skip((paginationDto.payRatePage - 1) * paginationDto.payRateLimit)
          .limit(paginationDto.payRateLimit + 1),
        this.truckModel.find({ haulerId: id, isDelete: false })
          .sort({ updatedAt: -1 })
          .skip((paginationDto.truckPage - 1) * paginationDto.truckLimit)
          .limit(paginationDto.truckLimit + 1)
      ]);

      const payRateNextPageAvailable = payRates.length > paginationDto.payRateLimit;
      const truckNextPageAvailable = trucks.length > paginationDto.truckLimit;

      if (payRateNextPageAvailable) {
        payRates.pop();
      }

      if (truckNextPageAvailable) {
        trucks.pop();
      }

      return {
        status: HttpStatus.OK,
        message: await i18n.t('message.FindData', { lang: user.language }),
        truckNextPageAvailable,
        payRateNextPageAvailable,
        data,
        payRates: payRates || [],
        trucks: trucks || []
      };
    } else if (user.role == "Hauler") {
      const data = this.contractorHaulerRelationshipModel.findOne({ haulerOrganizationId: user.currentOrganizationId, contractorId: id }) // add the custome in the project
      return {
        status: HttpStatus.OK,
        message: await i18n.t('message.FindData', { lang: user.language }),
        data,
      };
    }
  }


  async update(request, id, UpdateContractorHaulerRelationshipDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    // const existingHauler = await this.haulerModel.findOne({
    //   haulerName: UpdateContractorHaulerRelationshipDto.haulerName,
    //   organizationId: user.currentOrganizationId,
    //   isDelete: false,
    //   _id: { $ne: id }
    // });
    const existingRelationShip = await this.contractorHaulerRelationshipModel.findById(id)

    if (!existingRelationShip || (user.role === "Hauler" && existingRelationShip.contractorId !== null) || (user.role === "Contractor" && existingRelationShip.haulerId !== null)) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.NotFoundData', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userPrefix = user.role == "Contractor" ? "contractor" : "hauler";
    const prefix = user.role == "Contractor" ? "hauler" : "contractor";

    const queries = {
      _id: { $ne: existingRelationShip["_id"] },
      [`${userPrefix}OrganizationId`]: user.currentOrganizationId,
      $or: [{ [`${prefix}OrganizationName`]: UpdateContractorHaulerRelationshipDto.organizationName },
      { [`${prefix}MobileNumber`]: UpdateContractorHaulerRelationshipDto.mobileNumber }],
      deletedBy: null,
    }

    const orgAndMobileExists = await this.contractorHaulerRelationshipModel.findOne(queries)

    if (orgAndMobileExists) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.AlreadyExistsRelationship', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST);
    }

    const updatedData = {};
    updatedData[`${prefix}OrganizationName`] = UpdateContractorHaulerRelationshipDto["organizationName"]
    updatedData[`${prefix}Email`] = UpdateContractorHaulerRelationshipDto["email"]
    updatedData[`${prefix}MobileNumber`] = UpdateContractorHaulerRelationshipDto["mobileNumber"]
    updatedData[`${prefix}FirstName`] = UpdateContractorHaulerRelationshipDto["firstName"]
    updatedData[`${prefix}LastName`] = UpdateContractorHaulerRelationshipDto["lastName"]
    updatedData[`${prefix}CountryCode`] = UpdateContractorHaulerRelationshipDto["countryCode"]
    updatedData[`${prefix}CountryCodeEmoji`] = UpdateContractorHaulerRelationshipDto["countryCodeEmoji"]

    const data = await this.contractorHaulerRelationshipModel.findByIdAndUpdate(id, updatedData, { new: true });
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.UpdateData', { lang: user.language }),
      data: data
    }
  }

  async remove(request, id, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);
    const isExistRelationship = await this.contractorHaulerRelationshipModel.findById(id);
    if (!isExistRelationship) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: await i18n.t('message.NotFoundData', { lang: user.language }),
      },
        HttpStatus.NOT_FOUND,);
    }
    if (isExistRelationship.status == inviteStatusEnum.Requested) {
      const isNotification = await this.notificationModel.findOneAndDelete({ relationshipId: isExistRelationship["_id"].toString(), status: inviteStatusEnum.Requested });
      await isExistRelationship.deleteOne()
    } else {
      if (isExistRelationship.status !== inviteStatusEnum.Deactivated) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.CannotDeleteActivateRelation', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST);
      }
      const updateRelationship = await this.contractorHaulerRelationshipModel.findOneAndUpdate({ _id: id, status: inviteStatusEnum.Deactivated }, { deletedBy: userId }, { new: true });
      if (!updateRelationship) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: await i18n.t('message.NotFoundData', { lang: user.language }),
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (user.role === "Contractor") {
        const [updatedData] = await Promise.all([
          this.payRateModel.updateMany(
            { haulerId: updateRelationship.haulerId, isDelete: false },
            { $set: { isDelete: true } }
          ),
          this.truckModel.updateMany(
            { haulerId: updateRelationship.haulerId, isDelete: false },
            { $set: { isDelete: true } }
          )
        ]);
        if (!updatedData) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              message: await i18n.t('message.NotFoundData', { lang: user.language }),
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.removeRelationship', { lang: user.language }),
    }
  }

  async activeDeActiveRelationship(request, id, i18n) {
    const userId = request["user"]["id"]
    const user = await this.userModel.findById(userId);
    const currentOrganization = await this.organizationModel.findById(user.currentOrganizationId)
    const isRelationship = await this.contractorHaulerRelationshipModel.findById(id)

    if (!isRelationship) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: await i18n.t('message.NotFoundData', { lang: user.language }),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isStatus = isRelationship.status === inviteStatusEnum.Deactivated ? inviteStatusEnum.Accepted : inviteStatusEnum.Deactivated;
    const updatedData = await this.contractorHaulerRelationshipModel.findByIdAndUpdate(id, {
      status: isStatus,
      updatedAt: new Date()
    }, { new: true })
    if (!updatedData) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: await i18n.t('message.NotFoundData', { lang: user.language }),
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (updatedData.contractorOrganizationId != null && updatedData.haulerOrganizationId != null) {
      const messageEn = await i18n.t('message.RelationshipActivateDeactivate', { args: { sender: currentOrganization["organizationName"], status: isStatus == inviteStatusEnum.Accepted ? "Activated" : "Deactivated" }, lang: 'English' })
      const messageFr = await i18n.t('message.RelationshipActivateDeactivate', { args: { sender: currentOrganization["organizationName"], status: isStatus == inviteStatusEnum.Accepted ? "Activated" : "Deactivated" }, lang: 'French' })
      const messageEs = await i18n.t('message.RelationshipActivateDeactivate', { args: { sender: currentOrganization["organizationName"], status: isStatus == inviteStatusEnum.Accepted ? "Activated" : "Deactivated" }, lang: 'Spanish' })
      const receiver = user.role == "Contractor" ? "hauler" : "contractor";
      const recieverOrganization = await this.organizationModel.findById(updatedData[`${receiver}OrganizationId`])
      const createNotification = {
        type: InvitationType.DEFAULT_NOTIFICATION,
        senderUserId: userId,
        senderUserName: user.firstName + " " + user.lastName,
        senderUserRole: user.currentOrganizationRole,
        senderOrganizationId: user.currentOrganizationId,
        senderUserOrganizationName: currentOrganization["organizationName"],
        senderUserOrganizationImage: currentOrganization["organizationImage"],
        receiverUserId: recieverOrganization["userId"],
        receiverUserName: updatedData[`${receiver}FirstName`] + " " + updatedData[`${receiver}LastName`],
        receiverUserRole: recieverOrganization["role"]+"_"+"Owner",
        receiverUserMobileNumber: updatedData[`${receiver}MobileNumber`],
        receiverOrganizationId: recieverOrganization["_id"],
        receiverUserOrganizationName: recieverOrganization["organizationName"],
        receiverUserOrganizationImage: recieverOrganization["organizationImage"],
        message: {
          en: messageEn,
          fr: messageFr,
          es: messageEs
        }
      }
      await this.notificationModel.create(createNotification)
    }
    return {
      status: HttpStatus.OK,
      message: await i18n.t(isStatus === inviteStatusEnum.Deactivated ? 'message.DeActiveRelationship' : 'message.ActiveRelationship', { lang: user.language }),
    }
  }


  createContractorHaulerRelationship({
    inviter,
    reciever
  }) {
    const isContractor = inviter["role"] === "Contractor";
    const contractor = isContractor ? inviter : reciever;
    const hauler = isContractor ? reciever : inviter;
    return {
      contractorId: contractor?.["_id"],
      contractorFirstName: contractor?.["firstName"],
      contractorLastName: contractor?.["lastName"],
      contractorMobileNumber: contractor["mobileNumber"],
      contractorEmail: contractor?.["email"],
      contractorOrganizationId: contractor?.["organizationId"],
      contractorOrganizationName: contractor["organizationName"],
      contractorOrganizationUniqueId: contractor?.["uniqueCode"],
      contractorCountryCode: contractor["countryCode"],
      contractorCountryCodeEmoji: contractor["countryCodeEmoji"],

      haulerId: hauler?.["_id"],
      haulerFirstName: hauler?.["firstName"],
      haulerLastName: hauler?.["lastName"],
      haulerMobileNumber: hauler["mobileNumber"],
      haulerEmail: hauler?.["email"],
      haulerOrganizationId: hauler?.["organizationId"],
      haulerOrganizationName: hauler["organizationName"],
      haulerOrganizationUniqueId: hauler?.["uniqueCode"],
      haulerCountryCode: hauler["countryCode"],
      haulerCountryCodeEmoji: hauler["countryCodeEmoji"],
    };
  }
}
