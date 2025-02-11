const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const mongoURI = "mongodb+srv://avishshiroyacrawlapps:QUekVO5GkkHjar25@cluster0.jqeuo.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", async function () {
  console.log("Connected to MongoDB");

  // relationship schema
  const relationshipSchema = new mongoose.Schema({
    relationshipType: { type: String },
    initiatorId: { type: String, default: null },
    initiatorFirstName: { type: String, default: null },
    initiatorLastName: { type: String, default: null },
    initiatorMobileNumber: String,
    initiatorEmail: { type: String, default: null },
    initiatorOrganizationId: { type: String, default: null },
    initiatorOrganizationName: String,
    initiatorOrganizationUniqueId: { type: String, default: null },
    initiatorOrganizationImage: { type: String, default: null },
    initiatorCountryCode: String,
    initiatorCountryCodeEmoji: String,
    initiatorRole: String,
    recipientId: { type: String, default: null },
    recipientFirstName: { type: String, default: null },
    recipientLastName: { type: String, default: null },
    recipientMobileNumber: String,
    recipientEmail: { type: String, default: null },
    recipientOrganizationId: { type: String, default: null },
    recipientOrganizationName: String,
    recipientOrganizationImage: String,
    recipientOrganizationUniqueId: { type: String, default: null },
    recipientCountryCode: String,
    recipientCountryCodeEmoji: String,
    recipientRole: String,
    status: { type: String, default: "Accepted" },
    joinedDate: Number,
    deletedBy: String,
    createdBy: String,
    createdAt: { type: Number, default: () => new Date().getTime() },
    updatedAt: { type: Number, default: () => new Date().getTime() }
  })
  const Relationship = mongoose.model("organizationrelationships", relationshipSchema);

  // hauler schema
  const haulerSchema = new mongoose.Schema({
    userId: String,
    haulerName: String,
    haulerEmail: String,
    haulerMobileNumber: String,
    haulerCountryCode: String,
    haulerCountryCodeEmoji: String,
    organizationId: String,
    isDelete: Boolean,
    updatedAt: { type: Number, default: () => new Date().getTime() },
    createdAt: { type: Number, default: () => new Date().getTime() }
  })
  const Hauler = mongoose.model("haulers", haulerSchema);

  //organization schema
  const OrganizationSchema = new Schema({
    userId: String,
    organizationImage: String,
    organizationName: String,
    role: String,
    uniqueId: String,
    createdAt: { type: Number, default: () => new Date().getTime() },
    updatedAt: { type: Number, default: () => new Date().getTime() },
  });
  const Organization = mongoose.model("organizations", OrganizationSchema);

  // user Schema
  const UserSchema = new Schema({
    email: { type: String, unique: true },
    mobileNumber: String,
    countryCode: String,
    countryCodeEmoji: String,
    firstName: String,
    lastName: String,
    profileImage: String,
    role: { type: String, default: null },
    language: String,
    organizations: [{
      organizationId: String,
      organizationName: { type: String, default: null },
      organizationImage: { type: String, default: null },
      role: { type: String, default: 'Owner' },
      permission: {},
      isSubscribe: { type: Boolean, default: false },
      subscriptionIsCancel: { type: Boolean, default: false },
      subscriptionIsExpire: { type: Boolean, default: false },
      subscriptionCancelDate: { type: Number, default: 0 },
    }],
    contractorSubscription: {
      isCancel: Boolean,
      isExpire: Boolean,
      isFreeTrial: Boolean,
      isFreeTrialEnd: Boolean,
      freeTrialEnd: Number,
      isSubscribe: Boolean,
      subscriptionCancelDate: Number,
      autoRenew: Boolean,
      totalRemainingUsers: Number,
      totalUsers: Number,
      organizationId: String,
      organizationName: String,
      organizationImage: String,
      organizationUniqueCode: String,
      planType: String,
    },
    haulerSubscription: {
      isCancel: Boolean,
      isExpire: Boolean,
      isFreeTrial: Boolean,
      isFreeTrialEnd: Boolean,
      freeTrialEnd: Number,
      isSubscribe: Boolean,
      subscriptionCancelDate: Number,
      autoRenew: Boolean,
      totalRemainingUsers: Number,
      totalUsers: Number,
      organizationId: String,
      organizationName: String,
      organizationImage: String,
      organizationUniqueCode: String,
      planType: String,
    },
    autoRenew: { type: Boolean, default: true },
    isExpire: { type: Boolean, default: false },
    organizationImage: String,
    organizationName: String,
    organizationId: String,
    currentOrganizationName: String,
    currentOrganizationRole: { type: String, default: null },
    currentOrganizationId: String,
    otp: String,
    otpExpired: { type: Date },
    subscriptionCancelDate: { type: Number, default: 0 },
    costMeasurement: String,
    joinUsers: [{ type: String }],
    isSubscribe: { type: Boolean, default: false },
    currentOrganizationIsSubscribe: { type: Boolean, default: false },
    totalUsers: { type: Number, default: 0 },
    totalRemainingUsers: { type: Number, default: 0 },
    islogin: { type: Boolean, default: false },
    isFreeTrial: { type: Boolean, default: true },
    isCancel: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    timezoneName: String,
    timezoneShortName: String,
    planType: String,
    stripeCustomerId: String,
    createdAt: { type: Number, default: () => new Date().getTime() },
    updatedAt: { type: Number, default: () => new Date().getTime() },
  })
  const User = mongoose.model("users", UserSchema);
  // Define the Migration schema and model
  const MigrationSchema = new Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
  });
  const Migration = mongoose.model("Migration", MigrationSchema);
  const migrationName = "migrate_hauler_schema_to_contractor_hauler_relationship";

  // function for the split the the hauler name
  function splitName(name) {
    if (!name.includes(' ')) {
      return {
        firstName: name,
        secondName: null
      };
    }
    const firstSpace = name.indexOf(' ');
    const firstName = name.substring(0, firstSpace);
    const secondName = name.substring(firstSpace + 1);
    return {
      firstName,
      secondName
    };
  }
  async function migrateHaulerData() {
    try {
      // const migrationRecord = await Migration.findOne({ migrationName }).exec();
      // if (migrationRecord) {
      //     console.log("Migration has already been executed.");
      //     return;
      // }
      // await new Migration({ migrationName }).save();

      const haulerData = await Hauler.find({ isDelete: false });
      let promise = []
      for (let index = 0; index < haulerData.length; index++) {
        const hauler = haulerData[index];
        const organizationData = await Organization.findById(hauler["organizationId"]);
        const contractorData = await User.findById(organizationData?.userId)
        if (organizationData && contractorData) {
          const haulerNames = splitName(hauler["haulerName"])
          const newRelationshipData = {
            relationshipType: "Contractor_Hauler",
            initiatorId: String(contractorData["_id"]),
            initiatorFirstName: contractorData["firstName"],
            initiatorLastName: contractorData["lastName"],
            initiatorMobileNumber: contractorData["mobileNumber"],
            initiatorEmail: contractorData["email"],
            initiatorOrganizationId: String(organizationData["_id"]),
            initiatorOrganizationName: organizationData["organizationName"],
            initiatorOrganizationUniqueId: organizationData["uniqueId"],
            initiatorOrganizationImage: organizationData["organizationImage"],
            initiatorCountryCode: contractorData["countryCode"] || null,
            initiatorCountryCodeEmoji: contractorData["countryCodeEmoji"] || null,
            initiatorRole: "Contractor",
            recipientId: null,
            recipientFirstName: haulerNames["firstName"] || null,
            recipientLastName: haulerNames["secondName"] || null,
            recipientMobileNumber: hauler["haulerMobileNumber"],
            recipientEmail: hauler["haulerEmail"] || null,
            recipientOrganizationId: null,
            recipientOrganizationName: null,
            recipientOrganizationUniqueId: null,
            recipientOrganizationImage: null,
            recipientCountryCode: hauler["haulerCountryCode"] || null,
            recipientCountryCodeEmoji: hauler["haulerCountryCodeEmoji"] || null,
            recipientRole: "Hauler",
            status: hauler["isDelete"] ? "Deleted" : "Accepted",
            joinedDate: hauler["createdAt"],
            deletedBy: hauler["isDelete"] ? hauler["userId"] : null,
            createdBy: hauler["userId"],
          }
          // console.log(newRelationshipData)
          console.log("Data Created  ",index)
          await Relationship.create(newRelationshipData)
        } else {
          console.log("organization not found !!");
        }
      }
      // await Promise.all(promise).then(() => {
      //     console.log(`data successfully saved in relationship Table`);
      // });
    } catch (error) {
      console.log("Error Occured:-", error);
    } finally {
      console.log("data migrated successfully!!");
      mongoose.connection.close();
    }

  };
  // console.log(splitName("test"))
  // Run the migration
  migrateHaulerData();
});


// ------------- DATA After Migrate --------------
// {
//   contractorId: '66c40fcfd43409d944d91a46',
//   contractorFirstName: 'Jiyaa',
//   contractorLastName: 'Sinha',
//   contractorMobileNumber: '99680075480',
//   contractorEmail: 'jiyaa123@gmail.com',
//   contractorOrganizationId: '66c41075cff5ba33c6bf3ce1',
//   contractorOrganizationName: 'Jiya’s Organization',
//   contractorOrganizationUniqueId: '5RANW1M93MVWVP',
//   contractorCountryCode: '+91',
//   contractorCountryCodeEmoji: null,
//   haulerId: null,
//   haulerFirstName: 'Hauler',
//   haulerLastName: '5',
//   haulerMobileNumber: '9968532758',
//   haulerEmail: null,
//   haulerOrganizationId: null,
//   haulerOrganizationName: null,
//   haulerOrganizationUniqueId: null,
//   haulerCountryCode: '+91',
//   haulerCountryCodeEmoji: 'https://flagcdn.com/w160/in.png',
//   status: 'Accepted',
//   joinedDate: 1724134344745,
//   deletedBy: null,
//   createdBy: '66c40fcfd43409d944d91a46'
// }
