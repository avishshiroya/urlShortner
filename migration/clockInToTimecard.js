const mongoose = require("mongoose");

// MongoDB Connection
// const MONGO_URI = "mongodb+srv://myTruckBoss:Trucking2024!@cluster0.rg9xflz.mongodb.net/myTruckBoss";
const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:07T7lBLs3b4TEO8c@cluster0.wrfql.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

const TimecardSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userRole: String,
    organizationId: String,
    organizationUniqueId: String,
    organizationName: String,
    projectId: String,
    projectUniqueId: String,
    projectName: String,
    groupId: String,
    groupUniqueId: String,
    groupName: String,
    costId: String,
    costUniqueId: String,
    costName: String,
    costUnitBudget: Number,
    costMeasurement: String,
    uniqueId: Number,
    description: String,
    paymentUnit: String,
    totalLoad: Number,
    totalTruck: Number,
    totalClockInTruck: Number,
    totalClockOutTruck: Number,
    totalHour: Number,
    totalQuantity: Number,
    totalBudget: Number,
    totalCost: Number,
    isDelete: Boolean,
    manuallyEnteredLoad: Boolean,
    createdAt: Number,
    updatedAt: Number,
});

const ClockInSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userRole: String,
    organizationId: String,
    organizationName: String,
    groupId: String,
    costId: String,
    projectId: String,
    description: String,
    costAccount: String,
    timecardId: Number,
    costAccountName: String,
    costUnitBudget: Number,
    costMeasurement: String,
    group: String,
    groupName: String,
    project: String,
    projectName: String,
    clockinTime: Number,
    totalTruck: Number,
    paymentUnit: String,
    truckDetail: [
        {
            truckId: String,
            truckType: String,
            haulerName: String,
            haulerId: String,
            truck: String,
            isClockOut: Boolean,
            clockInTime: Number,
            loadCount: Number,
            timeAdjustment: Number,
            truckDriverTicket: String,
            additionalDocuments: String,
            notes: String,
            truckDriverTicketImage: String,
        },
    ],
    truckType: String,
    createdAt: Number,
    updatedAt: Number,
});
const ClockOutSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    timecardId: String,
    timecard: Number,
    userRole: String,
    organizationId: String,
    organizationName: String,
    clockinId: String,
    projectId: String,
    truckId: String,
    haulerId: String,
    truckType: String,
    totalCost: Number,
    gainOrLoss: Number,
    groupId: String,
    costId: String,
    costAccount: String,
    costAccountName: String,
    group: String,
    groupName: String,
    project: String,
    projectName: String,
    loadCount: Number,
    truckDriverTicket: String,
    truckDriverTicketImage: String,
    truckImage: String,
    timeAdjustment: Number,
    additionalDocument: String,
    notes: String,
    clockOutTime: Number,
    clockInTime: Number,
    haulerName: String,
    haulerOrganizationName: String,
    truck: String,
    ticketType: String,
    totalTime: Number,
    charge: Number,
    timeCardDate: Number,
    costUnitBudget: Number,
    costMeasurement: String,
    paymentUnit: String,
    manuallyEnteredLoad: Boolean,
    quantity: Number,
    totalLoad: Number,
    totalQuantity: Number,
    isClockOut: Boolean,
    createdAt: Number,
    updatedAt: Number,
});
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
const Timecard = mongoose.model("timecards", TimecardSchema);
const ClockIn = mongoose.model("clockins", ClockInSchema);
const ClockOut = mongoose.model("clockouts", ClockOutSchema);
const MigrationSchema = new mongoose.Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Migration = mongoose.model("Migration", MigrationSchema);
const migrationName = "ClockIn_TO_Timecard_Migration";


async function migrateData() {
    try {
        // const migrationRecord = await Migration.findOne({ migrationName }).exec();
        // if (migrationRecord) {
        //     console.log("Migration has already been executed.");
        //     return;
        // }
        // await new Migration({ migrationName }).save();
        const timecards = await ClockIn.find({ _id: mongoose.Types.ObjectId("667b9837cf80ad0e055f9cae") }).limit(2);
        for (let timecard of timecards) {
            let totalLoad = 0;
            const organization = await Organization.findById(timecard["organizationId"])
            const timecardDetails = await DataOfTimecard(timecard);
            timecardDetails["organizationUniqueId"] = organization["uniqueId"]
            totalLoad = ticket["totalLoad"]
            for (truck of timecard["truckDetail"]) {
                if (truck?.isClockOut) {
                    const ticket = await ClockOut.findOne({ truckId: truck["truckId"], clockinId: timecard["_id"] }).sort({ manuallyEnteredLoad: -1 }).select("_id manuallyEnteredLoad");
                    if (ticket["manuallyEnteredLoad"]) {
                        totalLoad = ticket["totalLoad"]
                    }
                } else {
                    console.log("clockIN -> truckId ", truck["truck"]);
                }
            }
        }
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
const DataOfTimecard = async (data) => {
    const totalClockInTruck = data["truckDetail"].reduce(
        (sum, { isClockOut }) => sum + !isClockOut ? 1 : 0,
        0,
    )
    let uniqueId;
    const timecardUniqueId = await Timecard.findOne({ organizationId: data["organizationId"] }).sort({ _id: -1 }).select("uniqueId");
    if (timecardUniqueId) {
        uniqueId = Number(timecardUniqueId["uniqueId"]) + 1;
    } else {
        uniqueId = 1001;
    }
    return {
        userId: data["userId"],
        userName: data["userName"],
        userRole: data["userName"],
        organizationId: data["organizationId"],
        organizationUniqueId: data[""],//find later organization uniqueId
        organizationName: data["organizationName"],
        projectId: data["projectId"],
        projectUniqueId: data["project"],
        projectName: data["projectName"],
        groupId: data["groupId"],
        groupUniqueId: data["group"],
        groupName: data["groupName"],
        costId: data["costId"],
        costUniqueId: data["costAccount"],
        costName: data["costAccountName"],
        costUnitBudget: data["costUnitBudget"],
        costMeasurement: data["costMeasurement"],
        uniqueId: uniqueId, // timecard not have unqiue Id
        description: data["description"],
        paymentUnit: data["paymentUnit"],
        totalLoad: 0,
        totalTruck: data["truckDetail"]?.length,
        totalClockInTruck: totalClockInTruck,
        totalClockOutTruck: data["truckDetail"]?.length - totalClockInTruck,
        isDelete: false,
        manuallyEnteredLoad: false,
        createdAt: data["createdAt"],
        updatedAt: data["updatedAt"],
    }
}

run();
