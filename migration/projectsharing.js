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
    nodes: Array,
    sharingHistory: Array,
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

const projectSharingSchema = mongoose.model("projectsharing", ProjectSharingSchema);
const newProjectSharingSchema = mongoose.model("newprojectsharings", NewProjectSharingSchema);
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
        const migrationRecord = await Migration.findOne({ migrationName }).exec();
        if (migrationRecord) {
            console.log("Migration has already been executed.");
            return;
        }
        await new Migration({ migrationName }).save();
        const oldData = await projectSharingSchema.find(
            {
                _id: {
                    $nin: [
                        new mongoose.Types.ObjectId("67c6160359facc115c63090b"),
                        new mongoose.Types.ObjectId("67c628ed59facc115c6310f2"),
                        new mongoose.Types.ObjectId("67c72310e8ec5e1e590a295f"),
                        new mongoose.Types.ObjectId("67c743b3e8ec5e1e590a2fe0"),
                        new mongoose.Types.ObjectId("67c74c7ae8ec5e1e590a36ea"),
                        new mongoose.Types.ObjectId("67cb0f0c53e0c087efa3e1da"),
                        new mongoose.Types.ObjectId("67cb17af53e0c087efa3e607"),
                        new mongoose.Types.ObjectId("67d04629208efe6c43909d46"),
                        new mongoose.Types.ObjectId("67d1ad8bf369682a816c7072"),
                        new mongoose.Types.ObjectId("67d87cf4b79041f7c971508a"),
                        new mongoose.Types.ObjectId("67d87d0fb79041f7c97150ad"),
                    ]
                }
            }
        )
        // const oldData = await projectSharingSchema.find({ nodes: { $exists: true } }).limit(5)

        let transformedData = [];
        let projectData = [];

        for (const doc of oldData) {
            const { projectId, projectUniqueId, projectName, status, nodes } = doc;
            // const project = await projectSchema.findById(projectId).lean()
            // projectData.push(project)
            nodes.forEach((node) => {
                let sharedByData = null;

                const sharedEntry = nodes.find(
                    (entry) => entry.organizationId === node.parentOrganizationId
                );

                if (sharedEntry) {
                    sharedByData = {
                        organizationId: sharedEntry.organizationId,
                        organizationName: sharedEntry.organizationName,
                        organizationImage: sharedEntry.organizationImage,
                        role: sharedEntry.userRole,
                    };
                }
                const sharedWith = []
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].parentOrganizationId == node.organizationId && (nodes[i]["status"] == "Accepted" || nodes[i]["status"] == "Requested")) {
                        sharedWith.push({
                            organizationId: nodes[i].organizationId,
                            organizationName: nodes[i].organizationName,
                            organizationImage: nodes[i].organizationImage,
                            role: nodes[i].userRole,
                            relationshipId: nodes[i].relationshipId
                        })
                    }
                }

                transformedData.push({
                    _id: node._id,
                    projectId,
                    projectUniqueId,
                    projectName,
                    userId: node.userId,
                    userName: node.userName,
                    userRole: node.userRole,
                    organizationId: node.organizationId,
                    organizationName: node.organizationName,
                    organizationImage: node.organizationImage || null,
                    email: node.email,
                    mobileNumber: node.mobileNumber,
                    countryCode: node.countryCode,
                    countryCodeEmoji: node.countryCodeEmoji || null,
                    parentId: node.parentId,
                    parentName: node.parentName,
                    parentOrganizationId: node.parentOrganizationId,
                    parentOrganizationName: node.parentOrganizationName,
                    relationshipId: node.relationshipId,
                    level: node.level,
                    path: node.path,
                    access: node.access,
                    sharedWith: sharedWith || [],
                    sharedBy: sharedByData,
                    status: node.status,
                    projectStatus: status,
                    isManual: node.isManual || false,
                    createdAt: node.createdAt,
                    updatedAt: node.updatedAt,
                    grantedAt: node.grantedAt,
                    deactivatedAt: node.deactivatedAt || 0,
                    deactivatedBy: node.deactivatedBy || null,
                    revokedAt: node.revokedAt || 0,
                    revokedBy: node.revokedBy || null,
                });
            });
        };
        console.log(transformedData);
        console.log("Project ==== Project-=-=---= Project-=--- Project----- Project-----Project=== Project-=== Project-=-Project ---");
        // console.log(projectData);
        await newProjectSharingSchema.insertMany(transformedData);
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
