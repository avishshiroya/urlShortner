const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const shortUrlRoutes = require('./routes/shortUrl')
const logRoutes = require('./routes/log')
const morgan = require('morgan')
const path = require('path')
const logger = require('./middlewares/winstonLogger')
const printLogger = require('./middlewares/winstonLogger')
const {generateRegistrationOptions} = require('@simplewebauthn/server')
require('./cron.js')
const crypto = require('node:crypto')
if(!globalThis.crypto){
    globalThis.crypto = crypto
}
dotenv.config();
connectDB()
const app = express();

//middlewares

app.use(cors());
app.use(bodyParser.json({limit:'15mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(morgan("dev"))
app.use("/url",shortUrlRoutes)
app.use("/log",logRoutes)
app.use('/logs',express.static(__dirname + '/logs'))
//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//Root Route
app.get("/",(req,res)=>{
    printLogger("info","at home page =====")
    res.render('Home')
})
app.post("/webauth",async(req,res)=>{
    const challangePayload= await generateRegistrationOptions({
        rpID:'localhost',
        rpName:'my localhost',
        userName:'avish',
        requireUserVerification: true,
        attestationType:'indirect',
        extensions: { 'credProps': true },
        authenticatorSelection: {
            // Defaults
            residentKey: 'required',
            userVerification: 'required',
            // Optional
            authenticatorAttachment: 'cross-platform',
          },        
    })
    return res.json({challangePayload})
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