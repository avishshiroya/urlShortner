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
// const ProjectSchema = new mongoose.Schema({
//     projectId: String,
//     projectName: String,
//     zipCode: String,
//     country: String,
//     state: String,
//     location: {
//         type: String,
//         coordinates: [Number]
//     },
//     address: String,
//     userId: String,
//     organizationId: String,
//     isDelete: Boolean,
//     createdAt: Number,
//     updatedAt: Number,
// });

// const projectSchema = mongoose.model("projects", ProjectSchema);
const MigrationSchema = new mongoose.Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Migration = mongoose.model("Migration", MigrationSchema);
const migrationName = "Project_Sharing_Data";


async function migrateData() {
    try {
        // const migrationRecord = await Migration.findOne({ migrationName }).exec();
        // if (migrationRecord) {
        //     console.log("Migration has already been executed.");
        //     return;
        // }
        // await new Migration({ migrationName }).save();
        const oldData = await projectSharingSchema.find()
        // const oldData = await projectSharingSchema.find({ nodes: { $exists: true } }).limit(5)


        for (const doc of oldData) {
            const { projectId, projectUniqueId, projectName, status } = doc;
            // const project = await projectSchema.findById(projectId).lean()
            // projectData.push(project)

            const sharedWith = []
            for (let i = 0; i < oldData.length; i++) {
                if (oldData[i].parentOrganizationId == doc.organizationId && projectId == oldData[i]["projectId"] && (oldData[i]["status"] == "Accepted" || oldData[i]["status"] == "Requested")) {
                    sharedWith.push({
                        organizationId: oldData[i].organizationId,
                        organizationName: oldData[i].organizationName,
                        organizationImage: oldData[i].organizationImage,
                        role: oldData[i].userRole,
                        relationshipId: oldData[i].relationshipId
                    })
                }
            }
            console.log(sharedWith);
            await projectSharingSchema.findByIdAndUpdate(doc["_id"],{sharedWith:sharedWith})

        };
        // console.log(transformedData);
        // console.log("Project ==== Project-=-=---= Project-=--- Project----- Project-----Project=== Project-=== Project-=-Project ---");
        // console.log(projectData);
        // await newProjectSharingSchema.insertMany(transformedData);
        // await projectSchema.insertMany(transformedData);
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
