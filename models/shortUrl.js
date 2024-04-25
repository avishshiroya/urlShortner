const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    uniqueId:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true
    },
    clicks:[{
        type:Date
    }]
})

const shortUrlModel = mongoose.model('shortUrl',shortUrlSchema);
module.exports = shortUrlModel