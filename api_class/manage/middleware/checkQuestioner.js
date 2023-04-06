const {Questions} = require('../model/questions')

module.exports = async(req,res,next)=>{
    const question = await Questions.findById(req.params.id.toString()).select('+questioner')
    console.log(question.questioner,req.userData._id)
    if(question.questioner != req.userData._id){ //！==的类型必须一样
       return res.send({
            code:400,
            msg:'您不是问题的创建用户无权修改',
        })
    }
    next()
}