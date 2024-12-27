import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Hauler, HaulerDocument } from './entities/hauler.entity';
import { TruckType, TruckTypeDocument } from 'src/truck-type/entities/truck-type.entity';
import { PayRate, PayRateDocument } from 'src/pay-rate/entities/pay-rate.entity';
import { Truck, TruckDocument } from 'src/truck/entities/truck.entity';
import { ContractorHaulerRelationship, ContractorHaulerRelationshipDocument } from './entities/contractorHaulerRelationship.entity';
import { Organization, OrganizationDocument } from 'src/organization/entities/organization.entity';

@Injectable()
export class HaulerService {
  constructor(
    @InjectModel(Hauler.name) private haulerModel: Model<HaulerDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(TruckType.name) private TruckTypeModel: Model<TruckTypeDocument>,
    @InjectModel(PayRate.name) private payRateModel: Model<PayRateDocument>,
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
    @InjectModel(ContractorHaulerRelationship.name) private contractorHaulerRelationshipModel: Model<ContractorHaulerRelationshipDocument>,
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    private jwtService: JwtService,
  ) { }

  async create(request, createHaulerDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const invitorOrganization = await this.organizationModel.findById(new Types.ObjectId(user.currentOrganizationId))
    const invitorOrganizationOwner = await this.userModel.findById(new Types.ObjectId(invitorOrganization.userId))
    if (createHaulerDto.uniqueCode) {
      const existingRecieverOrg = await this.organizationModel.findOne({ uniqueId: createHaulerDto.uniqueCode })
      console.log("existinfRecieverOrg == ", existingRecieverOrg)
      if (!existingRecieverOrg) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.InvalidUniqueCode', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingRelationShip = await this.contractorHaulerRelationshipModel.findOne({
        contractorOrganizationId: invitorOrganization.role == "Contractor" ? String(invitorOrganization._id) : String(existingRecieverOrg._id),
        haulerOrganizationId: invitorOrganization.role == "Hauler" ? String(invitorOrganization._id) : String(existingRecieverOrg._id)
      })


      // const existingHauler = await this.haulerModel.findOne({
      //   haulerName: createHaulerDto.haulerName,
      //   organizationId: user.currentOrganizationId,
      //   isDelete: false
      // });

      if (existingRelationShip) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: await i18n.t('message.HaulerNameExists', { lang: user.language }),
        },
          HttpStatus.BAD_REQUEST,
        );
      }
      const recieverOrganizationOwner = await this.userModel.findById(new Types.ObjectId(existingRecieverOrg.userId))
      // const haulerData = {
      //   haulerName: createHaulerDto.haulerName,
      //   haulerMobileNumber: createHaulerDto.haulerMobileNumber,
      //   haulerEmail: createHaulerDto.haulerEmail || '',
      //   haulerCountryCode: createHaulerDto.haulerCountryCode || '',
      //   haulerCountryCodeEmoji: createHaulerDto.haulerCountryCodeEmoji || '',
      //   userId,
      //   organizationId: user.currentOrganizationId,
      // };

      // const newHauler = new this.haulerModel(haulerData);
      // const createdHauler = await newHauler.save();
      let contractorHaulerRelationshipData = this.createContractorHaulerRelationship({
        user: invitorOrganizationOwner,
        invitorOrganization,
        existingRecieverOrg,
        createHaulerDto: recieverOrganizationOwner,
        userId
      })

      const contractorHaulerRelationship = new this.contractorHaulerRelationshipModel(contractorHaulerRelationshipData)
      await contractorHaulerRelationship.save();


      return {
        status: HttpStatus.CREATED,
        message: await i18n.t('message.HaulerCreate', { lang: user.language }),
        data: contractorHaulerRelationship,
      };
    }

    let checkExistingRelationShipQuery;
    if (invitorOrganization.role === "Hauler") {
      checkExistingRelationShipQuery = {
        haulerOrganizationId: String(invitorOrganization._id),
        contractorrMobileNumber: createHaulerDto.mobileNumber
      }
    } else if (invitorOrganization.role === "Contractor") {
      checkExistingRelationShipQuery = {
        contractorOrganizationId: String(invitorOrganization._id),
        haulerMobileNumber: createHaulerDto.mobileNumber
      }
    }

    const checkExistingRelationShip = await this.contractorHaulerRelationshipModel.findOne(checkExistingRelationShipQuery)
    if (checkExistingRelationShip) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.HaulerNameExists', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    let contractorHaulerRelationshipData = this.createContractorHaulerRelationship({
      user: invitorOrganizationOwner,
      invitorOrganization,
      createHaulerDto,
      existingRecieverOrg: {},
      userId
    })
    // console.log(contractorHaulerRelationshipData)
    const contractorHaulerRelationship = new this.contractorHaulerRelationshipModel(contractorHaulerRelationshipData)
    await contractorHaulerRelationship.save();

    return {
      status: HttpStatus.CREATED,
      message: await i18n.t('message.HaulerCreate', { lang: user.language }),
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

    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const organizationId = user.currentOrganizationId;

    const skip = (filterHaulerDto.page - 1) * filterHaulerDto.limit;
    let filter: Record<string, any>;
    if (user.role == "Owner") {
      filter = { contractorOrganizationId: organizationId, isDelete: false }
    } else {
      filter = { haulerOrganizationId: organizationId, isDelete: false }
    }

    let projection: Record<string, any> = {};

    if (filterHaulerDto.hauler === 'true') {
      projection.haulerName = true;
    }

    if (filterHaulerDto.search) {
      const searchRegex = new RegExp(filterHaulerDto.search, 'i'); // 'i' for case-insensitive search
      if (user.role == "Owner") {
        filter.$or = [
          { haulerFirstName: searchRegex }, { haulerLastName: searchRegex }, { haulerOrganizationName: searchRegex }
        ];
      } else {
        filter.$or = [
          { contractorFirstName: searchRegex }, { contractorLastName: searchRegex }, { contractorOrganizationName: searchRegex }
        ];
      }
    }
    console.log(filter)
    const data = await this.contractorHaulerRelationshipModel
      .find(filter, projection)
      .sort({ order: 1 })
      .skip(skip)
      .limit(filterHaulerDto.limit + 1);
    console.log(data)
    const isNextPageAvailable = data.length > filterHaulerDto.limit;
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

  async findOne(request, id, paginationDto, i18n) {
    const userId = request["user"]["id"];
    const [user, data, payRates, trucks] = await Promise.all([
      this.userModel.findById(userId),
      this.haulerModel.findById(id),
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
  }


  async update(request, id, updateHaulerDto, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const existingHauler = await this.haulerModel.findOne({
      haulerName: updateHaulerDto.haulerName,
      organizationId: user.currentOrganizationId,
      isDelete: false,
      _id: { $ne: id }
    });

    if (existingHauler) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: await i18n.t('message.HaulerNameExists', { lang: user.language }),
      },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.haulerModel.findByIdAndUpdate(id, updateHaulerDto, { new: true });
    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.UpdateData', { lang: user.language }),
      data: data
    }
  }

  async remove(request, id, i18n) {
    const userId = request["user"]["id"];
    const user = await this.userModel.findById(userId);

    const [updatedData] = await Promise.all([
      this.haulerModel.findByIdAndUpdate(id, { isDelete: true }, { new: true }),
      this.payRateModel.updateMany(
        { haulerId: id, isDelete: false },
        { $set: { isDelete: true } }
      ),
      this.truckModel.updateMany(
        { haulerId: id, isDelete: false },
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

    return {
      status: HttpStatus.OK,
      message: await i18n.t('message.DeleteData', { lang: user.language }),
    }
  }
  /**
   * Creates a contractor-hauler relationship with flexible input handling
   * @param {Object} params - Parameters for creating the relationship
   * @param {Object} params.user - User object
   * @param {Object} params.invitorOrganization - Organization of the invitor
   * @param {Object} [params.existingRecieverOrg] - Existing receiver organization (optional)
   * @param {Object} [params.createHaulerDto] - DTO for creating hauler (optional)
   * @param {string} params.userId - ID of the user
   * @returns {Object} Relationship object with contractor and hauler details
   */
  createContractorHaulerRelationship({
    user,
    invitorOrganization,
    existingRecieverOrg,
    createHaulerDto,
    userId
  }) {
    if (!user || !invitorOrganization || (!existingRecieverOrg && !createHaulerDto)) {
      throw new Error('Missing required parameters');
    }

    const safeStringify = (value) => value ? String(value) : '';
    const safeValue = (value) => value || '';

    if (invitorOrganization.role === "Contractor") {
      return {
        contractorId: safeStringify(user._id || userId),
        contractorFirstName: safeValue(user.firstName),
        contractorLastName: safeValue(user.lastName),
        contractorMobileNumber: safeValue(user.mobileNumber),
        contractorEmail: safeValue(user.email),
        contractorOrganizationId: safeStringify(invitorOrganization._id),
        contractorOrganizationName: safeValue(invitorOrganization.organizationName),
        contractorOrganizationUniqueId: safeValue(invitorOrganization.uniqueId),
        contractorCountryCode: safeValue(user.countryCode),
        contractorCountryCodeEmoji: safeValue(user.countryCodeEmoji),

        haulerId: safeStringify(createHaulerDto._id ? createHaulerDto._id : ""),
        haulerFirstName: safeValue(createHaulerDto.firstName || ""),
        haulerLastName: safeValue(createHaulerDto.lastName || ""),
        haulerMobileNumber: safeValue(createHaulerDto.mobileNumber),
        haulerEmail: safeValue(createHaulerDto.email),
        haulerOrganizationId: existingRecieverOrg ? safeStringify(existingRecieverOrg._id) : "",
        haulerOrganizationName: existingRecieverOrg ? safeValue(existingRecieverOrg.organizationName) : "",
        haulerOrganizationUniqueId: existingRecieverOrg ? safeValue(existingRecieverOrg.uniqueId) : "",
        haulerCountryCode: safeValue(createHaulerDto?.countryCode),
        haulerCountryCodeEmoji: safeValue(createHaulerDto?.countryCodeEmoji),
      };
    } else if (invitorOrganization.role === "Hauler") {
      return {
        contractorId: safeStringify(createHaulerDto._id ? createHaulerDto._id : ""),
        contractorFirstName: safeValue(createHaulerDto?.firstName),
        contractorLastName: safeValue(createHaulerDto?.lastName),
        contractorMobileNumber: safeValue(createHaulerDto?.mobileNumber),
        contractorEmail: safeValue(createHaulerDto?.email),
        contractorOrganizationId: existingRecieverOrg ? safeStringify(existingRecieverOrg._id) : "",
        contractorOrganizationName: existingRecieverOrg ? safeValue(existingRecieverOrg.organizationName) : "",
        contractorOrganizationUniqueId: existingRecieverOrg ? safeValue(existingRecieverOrg.uniqueId) : "",
        contractorCountryCode: safeValue(createHaulerDto?.countryCode),
        contractorCountryCodeEmoji: safeValue(createHaulerDto?.countryCodeEmoji),

        haulerId: safeStringify(user._id || userId),
        haulerFirstName: safeValue(user.firstName),
        haulerLastName: safeValue(user.lastName),
        haulerMobileNumber: safeValue(user.mobileNumber),
        haulerEmail: safeValue(user.email),
        haulerOrganizationId: safeStringify(invitorOrganization._id),
        haulerOrganizationName: safeValue(invitorOrganization.organizationName),
        haulerOrganizationUniqueId: safeValue(invitorOrganization.uniqueId),
        haulerCountryCode: safeValue(user.countryCode),
        haulerCountryCodeEmoji: safeValue(user.countryCodeEmoji),
      };
    } else {
      throw new Error('Invalid organization role');
    }
  }
}
