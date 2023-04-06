const {Questions} = require('../model/questions')

module.exports = async(req,res,next)=>{
    const questions = Questions.findById(req.params.id).select("+questioner")
    if(!questions){
        res.send({
            code:400,
            msg:'话题不存在'
        })
    }
    next()
}