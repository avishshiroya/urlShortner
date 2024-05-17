const express = require('express');
const printLogger = require('../middlewares/winstonLogger');
const router = express.Router();

router.post("/",async(req,res)=>{
    const {date} = req.body
    printLogger("info",`redireact to ${process.env.HOST}logs/log-${date}.log`)

    res.redirect(process.env.HOST+`logs/log-${date}.log`)
})
router.get("/",async(req,res)=>{
    printLogger("info","Go On Log File get")
    res.render("Log")
})



module.exports = router