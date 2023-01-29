const express  = require('express')
const path = require('path')
const router = express.Router() 
const multer = require('multer')

const home = require('../controller/upload')
var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart();
//将文件按照指定文件名存储在文件夹中
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/uploads'))
    },//文件存放路径 
    filename:function(req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
})
const upload =multer({storage})
router.post("/",upload.single('file'),home.upload)

module.exports = router