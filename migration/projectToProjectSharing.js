const mongoose = require("mongoose");

// MongoDB Connection
const MONGO_URI = "mongodb+srv://myTruckBoss:Trucking2024!@cluster0.rg9xflz.mongodb.net/myTruckBoss";
// const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:07T7lBLs3b4TEO8c@cluster0.wrfql.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

const ProjectSchema = new mongoose.Schema({
    projectId: String,
    projectName: String,
    zipCode: String,
    country: String,
    state: String,
    location: {
        type: String,
        coordinates: [Number]
    },
    address: String,
    userId: String,
    organizationId: String,
    isDelete: Boolean,
    createdAt: Number,
    updatedAt: Number,
});

const projectSchema = mongoose.model("projects", ProjectSchema);

const NewProjectSharingSchema = new mongoose.Schema({
    projectId: String,
    projectUniqueId: String,
    projectName: String,
    userId: String,
    userName: String,
    userRole: String,
    organizationId: String,
    organizationName: String,
    organizationImage: String,
    email: String,
    mobileNumber: String,
    countryCode: String,
    countryCodeEmoji: String,
    parentId: String,
    parentName: String,
    parentOrganizationId: String,
    parentOrganizationName: String,
    relationshipId: String,
    level: Number,
    path: [String],
    access: Object,
    sharedWith: Array,
    sharedBy: Object,
    status: String,
    projectStatus: String,
    isManual: Boolean,
    createdAt: Number,
    updatedAt: Number,
    grantedAt: Number,
    deactivatedAt: Number,
    deactivatedBy: String,
    revokedAt: Number,
    revokedBy: String,
});

const projectSharingSchema = mongoose.model("projectsharing", NewProjectSharingSchema);
const OrganizationSchema = new mongoose.Schema({
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
const UserSchema = new mongoose.Schema({
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

const MigrationSchema = new mongoose.Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Migration = mongoose.model("Migration", MigrationSchema);
const migrationName = "Project_To_Project_Sharing_Data";

async function migrateData() {
    // const migrationRecord = await Migration.findOne({ migrationName }).exec();
    // if (migrationRecord) {
    //     console.log("Migration has already been executed.");
    //     return;
    // }
    // await new Migration({ migrationName }).save();
    const projectShared = []
    const findAllProject = await projectSchema.find({}).limit(10);
    for (let project of findAllProject) {
        const isInProjectSharing = await projectSharingSchema.findOne({ projectId: new mongoose.Types.ObjectId(project["_id"]) });
        if (isInProjectSharing) {
            continue;
        }
        console.log(project);
        const organization = await Organization.findById(project["organizationId"]);
        if (!organization) {
            console.log("Organization not found");
            continue;
        }
        const user = await User.findById(organization["userId"]);
        if (!user) {
            console.log("User not found");
            continue;
        }
        const projectSharing = {
            projectId: project["_id"],
            projectUniqueId: project["projectId"],
            projectName: project["projectName"],
            userId: user["_id"],
            userName: `${user.firstName} ${user.lastName}`,
            userRole: organization["role"],
            organizationId: organization["_id"],
            organizationName: organization["organizationName"],
            organizationImage: organization["organizationImage"] || null,
            email: user.email,
            mobileNumber: user.mobileNumber,
            countryCode: user.countryCode,
            countryCodeEmoji: user.countryCodeEmoji || null,
            parentId: null,
            parentName: null,
            parentOrganizationId: null,
            parentOrganizationName: null,
            relationshipId: null,
            level: 0,
            path: [organization["_id"]],
            access: organization["role"] == "Contractor" ? { cost: true } : null,
            sharedWith: [],
            sharedBy: null,
            status: "Accepted",
            projectStatus: project["isDelete"] == true ? "Accepted" : "Deactivated",
            isManual: true,
            createdAt: project["createdAt"],
            updatedAt: project["updatedAt"],
            grantedAt: project["createdAt"],
            deactivatedAt: 0,
            deactivatedBy: null,
            revokedAt: 0,
            revokedBy: null,
        }
        projectShared.push(projectSharing)
    }
    console.log(projectShared);
}

async function run() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        await migrateData();  // Ensure migration runs only after connection is successful
    } catch (error) {
        console.error("MongoDB connection error:", error);
    } finally {
        mongoose.connection.close();
    }
}

run();