const mongoose = require('mongoose');
const devLogger = require('./winston');
const printLogger = require('../middlewares/winstonLogger');

const connectDB = async()=>{
    try {
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        printLogger('info','DB Connected')
        console.log("DB Connected");
    } catch (error) {
        printLogger('error',error.message)
        console.log(error.message);
    }
}

module.exports = connectDB