const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB