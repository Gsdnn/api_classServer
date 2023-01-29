
exports.upload = (req,res,next)=>{
    try {
        console.log(req.file);  
        res.send({
            code:200,
            msg:'上传成功',
            url:`http://127.0.0.1:3000/uploads/${req.file.originalname}`
        })
    } catch (error) {
        next(error)
    }
} 