const path = require('path')

const document= [".doc",".pdf",".docx",".png",".jpeg",".jpg",".mov"]
const userProfile = [".doc",".docx",".pdf",".png"]

const fileUpload = async(file,filepath,type)=>{
        let fileType = path.extname(file.name).toLowerCase();
        var isUpload ;
        if(type == "document"){
            isUpload = document.includes(fileType)
        }else if(type == "userProfile"){
            isUpload = userProfile.includes(fileType)
        } else if(type == "profileImage"){
            isUpload = true;
        }
        
        if(isUpload){
            let docName = Date.now() + "_" + Math.round(Math.random() * 1e9) + path.extname(file.name);
            // await file.mv(filepath + docName);
            let filePath = filepath + docName;
            return filePath;
        }else{
            return null
        }
}

module.exports = fileUpload