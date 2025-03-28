const mongoose = require("mongoose");

// MongoDB Connection
// const MONGO_URI = "mongodb+srv://myTruckBoss:Trucking2024!@cluster0.rg9xflz.mongodb.net/myTruckBoss";
const MONGO_URI = "mongodb+srv://avishshiroyacrawlapps:07T7lBLs3b4TEO8c@cluster0.wrfql.mongodb.net/myTruckBoss?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));

const Timecard = new mongoose.Schema({
    totalClockInTruck: Number,
    totalClockOutTruck: Number,
    totalTruck:Number
});
const clockOut = new mongoose.Schema({
    isClockOut: Boolean,
    timecardId: String
});

const timecardSchema = mongoose.model("timecards", Timecard);
const clockoutSchema = mongoose.model("clockouts", clockOut);
const MigrationSchema = new mongoose.Schema({
    migrationName: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const Migration = mongoose.model("Migration", MigrationSchema);
const migrationName = "Timecard_Truck_Count";


async function migrateData() {
    try {
        // const migrationRecord = await Migration.findOne({ migrationName }).exec();
        // if (migrationRecord) {
        //     console.log("Migration has already been executed.");
        //     return;
        // }
        // await new Migration({ migrationName }).save();
        const timecards = await timecardSchema.find({});
        for (let timecard of timecards) {
            const totalClockInTruck = await clockoutSchema.countDocuments({ timecardId: String(timecard._id), isClockOut: false });
            const totalClockOutTruck = await clockoutSchema.countDocuments({ timecardId: String(timecard._id), isClockOut: true });
            await timecardSchema.findByIdAndUpdate(timecard._id,{totalClockInTruck,totalClockOutTruck,totalTruck:totalClockInTruck+totalClockOutTruck})
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

run();
