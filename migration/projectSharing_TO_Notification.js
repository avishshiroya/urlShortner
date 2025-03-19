const mongoose = require("mongoose");

// MongoDB Connection
const MONGO_URI = "mongodb+srv://myTruckBoss:Trucking2024!@cluster0.rg9xflz.mongodb.net/myTruckBoss";
// const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:07T7lBLs3b4TEO8c@cluster0.wrfql.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

const ProjectSharingSchema = new mongoose.Schema({
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

const projectSharingSchema = mongoose.model("projectsharing", ProjectSharingSchema);
const notificationSchema = new mongoose.Schema({
    type: String,
    status: String,
    senderUserId: String,
    senderUserName: String,
    senderUserRole: String,
    senderUserOrganizationId: String,
    senderUserOrganizationName: String,
    senderUserOrganizationImage: String,
    receiverUserId: String,
    receiverUserName: String,
    receiverUserRole: String,
    receiverUserMobileNumber: String,
    receiverUserOrganizationId: String,
    receiverUserOrganizationName: String,
    receiverUserOrganizationImage: String,
    organizationMemberId: String,
    projectSharingId: String,
    projectId: String,
    projectName: String,
    message: {
        en: String,
        es: String,
        fr: String,
    },
    isActionable: Boolean,
    createdAt: { type: Number, default: () => new Date().getTime() },
    updatedAt: { type: Number, default: () => new Date().getTime() }
})
const Notification = mongoose.model("notifications", notificationSchema);
const MigrationSchema = new mongoose.Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Migration = mongoose.model("Migration", MigrationSchema);
const migrationName = "Project_Sharing_TO_Notification_Data";


async function migrateData() {
    try {
        const migrationRecord = await Migration.findOne({ migrationName }).exec();
        if (migrationRecord) {
            console.log("Migration has already been executed.");
            return;
        }
        await new Migration({ migrationName }).save();
        const oldData = await Notification.find({ type: "project_sharing", status: "Requested" })

        let i = 0;
        for (const doc of oldData) {

            const projectSharing = await projectSharingSchema.findOne({ projectId: doc.projectId, organizationId: doc.receiverUserOrganizationId })
            if (!projectSharing) {
                continue;
            }
            console.log(i++,projectSharing["_id"]);
            await Notification.findByIdAndUpdate(doc["_id"], { projectSharingId: String(projectSharing["_id"]) })
        };
        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration error:", error);
    } finally {
        mongoose.connection.close();
    }
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
