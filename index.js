const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const shortUrlRoutes = require('./routes/shortUrl')

dotenv.config();
connectDB()
const app = express();

//middlewares

app.use(cors());
app.use(bodyParser.json({limit:'15mb'}));
app.use(cookieParser())
app.use("/url",shortUrlRoutes)


//Root Route
app.get("/",(req,res)=>{
    res.status(200).json({
        status:'success',
        message:"Root Route Calling SuccessFully",
        data:[]
    })
})

const PORT = process.env.PORT || 1111
app.listen(PORT,(err)=>{
    if(err){
        console.log("PORT Cannot Connected");
    }else{
        //connectDB
        console.log("PORT Connected");
    }
})