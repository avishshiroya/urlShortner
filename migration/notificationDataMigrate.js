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
    const notificationSchema = new mongoose.Schema({
        type: String,
        status: String,
        //old data schema
        organizationId: String,
        organizationName: String,
        organizationImage: String,
        firstName: String,
        lastName: String,
        role: String,
        mobileNumber: String,
        planType: String,
        planType: String,
        receiverUserEmail: String,
        joinedDate: Number,
        renewalDate: Number,
        countryCode: String,
        access: {
            project: Boolean,
            group: Boolean,
            cost: Boolean,
            truck: Boolean,
            hauler: Boolean
        },

        //new Data
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
    //organization Member
    const OrgMemberSchema = new Schema({
        userId: String,
        firstName: String,
        lastName: String,
        email: String,
        mobileNumber: String,
        countryCode: String,
        countryCodeEmoji: String,
        organizationId: String,
        organizationName: String,
        organizationImage: String,
        role: String,
        status: String,
        permission: {
            project: { type: Boolean, default: false },
            group: { type: Boolean, default: true },
            user: { type: Boolean, default: true },
            truckType: { type: Boolean, default: true },
            payRate: { type: Boolean, default: true },
            cost: { type: Boolean, default: true },
            truck: { type: Boolean, default: true },
            hauler: { type: Boolean, default: true },
        },
        joinedDate: { type: Number, default: 0 },
        subscriptionId: String,
        subscriptionIsCancel: Boolean,
        subscriptionIsExpire: Boolean,
        subscriptionCancelDate: { type: Number, default: 0 },
        isSubscribe: Boolean,
        isFreeTrial: Boolean,
        freeTrailEnd: Number,
        isFreeTrailEnd: Boolean,
        planType: String,
        createdAt: { type: Number, default: () => new Date().getTime() },
        updatedAt: { type: Number, default: () => new Date().getTime() },
    });
    const OrgMember = mongoose.model("organizationmembers", OrgMemberSchema);


    // Define the Migration schema and model
    const MigrationSchema = new Schema({
        migrationName: { type: String, unique: true },
        createdAt: { type: Date, default: Date.now },
    });
    const Migration = mongoose.model("Migration", MigrationSchema);
    const migrationName = "migrate_notification_data";

    async function migrateNotificationData() {
        try {
            const migrationRecord = await Migration.findOne({ migrationName }).exec();
            if (migrationRecord) {
                console.log("Migration has already been executed.");
                return;
            }
            await new Migration({ migrationName }).save();

            const notificationData = await Notification.find({ isActionable: { $exists: false } });

            const promises = notificationData.map(async (notification) => {
                const senderOrganizationData = await Organization.findById(notification?.organizationId);
                const senderData = await User.findById(senderOrganizationData?.userId).select("_id firstName lastName role").exec();
                const receiverData = await User.findOne({ mobileNumber: notification?.mobileNumber }).select("_id firstName lastName role").exec();
                const receiverOrganizationData = await Organization.findOne({ userId: String(receiverData?._id) });
                const orgMember = await OrgMember.findOne({
                    $or: [{ userId: notification?.receiverUserId }, { mobileNumber: notification?.mobileNumber }],
                    organizationId: notification?.organizationId
                }).select("_id");

                if (senderOrganizationData && senderData && orgMember) {
                    const newNotificationData = {
                        type: "user_invite",
                        status: notification?.status,
                        senderUserId: String(senderData._id),
                        senderUserRole: "Contractor_Owner",
                        senderUserName: `${senderData.firstName} ${senderData.lastName}`,
                        senderUserOrganizationId: String(senderOrganizationData._id),
                        senderUserOrganizationName: senderOrganizationData.organizationName,
                        senderUserOrganizationImage: senderOrganizationData.organizationImage,
                        receiverUserId: receiverData ? String(receiverData._id) : null,
                        receiverUserRole: "Contractor_Owner",
                        receiverUserName: receiverData?.firstName ? `${receiverData.firstName} ${receiverData.lastName}` : `${notification.firstName} ${notification.lastName}`,
                        receiverUserMobileNumber: notification?.mobileNumber,
                        receiverUserOrganizationId: receiverOrganizationData ? String(receiverOrganizationData._id) : null,
                        receiverUserOrganizationName: receiverOrganizationData ? receiverOrganizationData.organizationName : null,
                        receiverUserOrganizationImage: receiverOrganizationData ? receiverOrganizationData.organizationImage : null,
                        organizationMemberId: String(orgMember?._id),
                        isActionable: notification?.status === "Requested",
                        message: {
                            en: `You've been invited to join the ${senderOrganizationData.organizationName} organization.`,
                            fr: `Vous avez été invité à rejoindre ${senderOrganizationData.organizationName} l'organisation.`,
                            es: `Has sido invitado a unirte a la ${senderOrganizationData.organizationName} organización.`
                        }
                    };

                    console.log("Processing notification index:", notificationData.indexOf(notification));

                    return Notification.replaceOne({ _id: notification._id }, newNotificationData);
                } else {
                    console.log("Organization not found for notification:", notification._id);
                    return null; 
                }
            });

            // ✅ Run all updates in parallel
            await Promise.all(promises);

            console.log("All notifications updated successfully.");



            // await Promise.all(promise).then(() => {
            //     console.log("notifications updated successfully");
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
    migrateNotificationData();
});

// ----------- Data After Migration ------------

// {
//     type: 'user_invite',
//     status: 'Accepted',
//     senderUserId: '666d93448f19bf89341bfd8f',
//     senderUserRole: 'Contractor',
//     senderUserName: 'Meet1 Ribadiya',
//     senderUserOrganizationId: '666d93778f19bf89341cb653',
//     senderUserOrganizationName: 'Meet Organisations ',
//     senderUserOrganizationImage: 'https://hihand-images.s3.us-east-2.amazonaws.com/organizationImage/8134291720010221678.jpg',
//     receiverUserId: '666d93448f19bf89341bfd8f',
//     receiverUserRole: 'Contractor',
//     receiverUserName: 'Meet1 Ribadiya',
//     receiverUserMobileNumber: '9727576732',
//     receiverUserOrganizationId: '666d93778f19bf89341cb653',
//     receiverUserOrganizationName: 'Meet Organisations ',
//     receiverUserOrganizationImage: 'https://hihand-images.s3.us-east-2.amazonaws.com/organizationImage/8134291720010221678.jpg',
//     organizationMemberId: 'undefined',//organizationMemberID After the run the script of organization member
//     isActionable: false,
//     message: {
//       en: "You've been invited to join the organization.",
//       fr: "Vous avez été invité à rejoindre l'organisation.",
//       es: 'Has sido invitado a unirte a la organización.'
//     }
// }