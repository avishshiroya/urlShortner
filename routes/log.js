const express = require('express');
const router = express.Router();

router.post("/",async(req,res)=>{
    const {date} = req.body
    res.redirect(process.env.HOST+`logs/log-${date}.log`)
})
router.get("/",async(req,res)=>{
    res.render("Log")
})



module.exports = router