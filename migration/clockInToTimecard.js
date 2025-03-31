
const mongoose = require("mongoose");

// MongoDB Connection
// const MONGO_URI = "mongodb+srv://myTruckBoss:Trucking2024!@cluster0.rg9xflz.mongodb.net/myTruckBoss";
// const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:07T7lBLs3b4TEO8c@cluster0.wrfql.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:QUekVO5GkkHjar25@cluster0.jqeuo.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
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
const TruckSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    haulerName: String,
    haulerId: String,
    haulerOrganizationId: String,
    haulerOrganizationName: String,
    contractorId: String,
    contractorName: String,
    contractorOrganizationId: String,
    contractorOrganizationName: String,
    truckId: String,
    payRate: {
        payRateId: String,
        payRateDescription: String,
        charge: Number,
        chargeType: String
    },
    truckTypeId: String,
    truckType: String,
    capacity: Number,
    capacityType: String,
    organizationId: String,
    licencePlateNumber: String,
    licencePlateImage: String,
    relationshipId: String,
    isAssigned: Boolean,
    status: String,
    isDelete: Boolean,
    createdAt: Number,
    updatedAt: Number,
})
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
const Timecard = mongoose.model("timecards", TimecardSchema);
const ClockIn = mongoose.model("clockins", ClockInSchema);
const ClockOut = mongoose.model("clockouts", ClockOutSchema);
const Truck = mongoose.model("trucks", TruckSchema);
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

        // Find all timecards
        const timecards = await ClockIn.find({ _id: new mongoose.Types.ObjectId("667b9837cf80ad0e055f9cae") })

        for (let timecard of timecards) {
            //Create New Timecard Data
            const timecardDetails = await DataOfTimecard(timecard);

            const clockOutTickets = await ClockOut.find({ clockinId: String(timecard["_id"]) });

            var totalQuantity = 0;
            var manuallyEnteredLoad = 0;
            var totalHour = 0;
            var totalLoad = 0;
            var totalCost = 0;
            var manualTotalQuantity = 0;
            var totalBudget = 0
            // sum of all needed totals
            for (let clockOutTicket of clockOutTickets) {
                totalQuantity += clockOutTicket["quantity"]
                manualTotalQuantity = clockOutTicket["totalQuantity"]
                if (clockOutTicket["manuallyEnteredLoad"]) {
                    manuallyEnteredLoad = clockOutTicket["totalLoad"]
                }
                totalLoad = totalLoad
                totalHour += clockOutTicket["totalTime"]
                totalCost += clockOutTicket["totalTime"] * clockOutTicket["charge"]
                totalBudget += clockOutTicket["quantity"] * clockOutTicket["costUnitBudget"];
            }
            //update timecard details
            timecardDetails["totalLoad"] = manuallyEnteredLoad > 0 ? manuallyEnteredLoad : totalLoad;
            timecardDetails["manuallyEnteredLoad"] = manuallyEnteredLoad > 0;
            timecardDetails["totalQuantity"] = manualTotalQuantity > 0 ? manualTotalQuantity : totalQuantity;
            timecardDetails["totalHour"] = totalHour;
            timecardDetails["totalCost"] = Number(totalCost.toFixed(2));
            timecardDetails["totalBudget"] = totalBudget;

            //save timecard data
            const newTimecard = await Timecard.create(timecardDetails)
            console.log("Timecard save ======= ===== ======= ======= ===== ");

            for (truck of timecard["truckDetail"]) {
                const truckDetail = await Truck.findById(truck["truckId"])
                if (!truck?.isClockOut) {
                    //create clockInData for the tickets
                    const clockinTicket = {
                        userId: newTimecard["userId"],
                        userName: newTimecard["userName"],
                        timecardId: String(newTimecard["_id"]),
                        timecard: newTimecard["uniqueId"],
                        userRole: newTimecard["userRole"],
                        organizationId: newTimecard["organizationId"],
                        organizationName: newTimecard["organizationName"],
                        projectId: newTimecard["projectId"],
                        truckId: truck["truck"],
                        truckType: truck["truckType"],
                        groupId: newTimecard["groupId"],
                        costId: newTimecard["costId"],
                        costAccount: newTimecard["costUniqueId"],
                        costAccountName: newTimecard["costName"],
                        group: newTimecard["groupUniqueId"],
                        groupName: newTimecard["groupName"],
                        project: newTimecard["projectUniqueId"],
                        projectName: newTimecard["projectName"],
                        loadCount: truck["loadCount"],
                        truckImage: truckDetail["licencePlateImage"],
                        timeAdjustment: truck["timeAdjustment"],
                        additionalDocument: truck["additionalDocuments"],
                        notes: truck["notes"],
                        clockOutTime: 0,
                        clockInTime: truck["clockInTime"],
                        haulerName: truck["haulerName"],
                        haulerOrganizationName: "",
                        truck: truck["truck"],
                        ticketType: "INFORMAL",
                        totalTime: 0,
                        charge: 0,
                        timeCardDate: newTimecard["createdAt"],
                        costUnitBudget: newTimecard["costUnitBudget"],
                        costMeasurement: newTimecard["costMeasurement"],
                        paymentUnit: newTimecard["paymentUnit"],
                        manuallyEnteredLoad: false,
                        quantity: truck["loadCount"] * newTimecard["paymentUnit"],
                        totalLoad: 0,
                        totalQuantity: 0,
                        isClockOut: false,
                        createdAt: newTimecard["createdAt"],
                        updatedAt: newTimecard["updatedAt"],
                    }
                    //save ticket datas
                    await ClockOut.create(clockinTicket);

                }
                else {
                    // update clockout ticket data with changing timecard details
                    const clockout = await ClockOut.findOne({ clockinId: String(timecard["_id"]), truckId: truck["truckId"] })
                    if (clockout) {
                        await ClockOut.findByIdAndUpdate(clockout["_id"],
                            {
                                timecardId: String(newTimecard["_id"]), timecard: newTimecard["uniqueId"], ticketType: "INFORMAL",
                                truckImage: truckDetail["licencePlateImage"], userRole: generateRole(clockout["userRole"])
                            }
                        )
                    }
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
    const organization = await Organization.findById(data["organizationId"])

    let uniqueId = data["timecardId"];
    if (!uniqueId) {
        uniqueId = await generateUniqueId(data["organizationId"]);
    } else {
        const timecardUniqueId = await Timecard.findOne({ organizationId: data["organizationId"], uniqueId }).sort({ _id: -1 }).select("uniqueId");
        if (timecardUniqueId) {
            uniqueId = await generateUniqueId(data["organizationId"]);
        }
    }
    return {
        userId: data["userId"],
        userName: data["userName"],
        userRole: generateRole(data["userRole"]),
        organizationId: data["organizationId"],
        organizationUniqueId: organization["uniqueId"],
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
        uniqueId: uniqueId,
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
//generate role
const generateRole = (role) => {
    if (!role) return "Contractor_Owner"
    if (role.toLowerCase() == "owner") {
        return "Contractor_Owner"
    } else if (role.toLowerCase() == "admin") {
        return "Contractor_Admin"
    } else if (role.toLowerCase() == "truckboss") {
        return "Contractor_TruckBoss"
    } else {
        return role
    }
}
//generate new uniqueId of timecard
const generateUniqueId = async (organizationId) => {
    const timecardUniqueId = await Timecard.findOne({ organizationId }).sort({ _id: -1 }).select("uniqueId");
    if (timecardUniqueId) {
        return Number(timecardUniqueId["uniqueId"]) + 1;
    } else {
        return 1001;
    }
}
run();
