const {Questions} = require('../model/questions')
const { Topic } = require('../model/topics')
const { User } = require('../model/user')
const {Answer} = require('../model/answer')

//回答问题
exports.postAnswer = async(req,res)=>{
    const userId = req.userData._id
    const body = req.body
    answer = new Answer({
        ...body,
        answerer:userId
    })
    const data = await answer.save()
   if(data){
     const question = await Questions.findById({_id:body.questionId.toString()}).select("+answerList")
     const user = await User.findById({_id:userId}).select("+answerList")
    user.answerList.push(data._id)
     question.answerList.push(data._id)
     await question.save()
     await user.save()
     res.send({
        code:200,
        msg:'添加答案成功'
     })
   }else{
    res.send({
        code:400,
        msg:'添加答案失败'
    })
   }
}
//修改答案
exports.editAnswer = async(req,res)=>{
    const body = req.body
    const params =req.params.id
    const answer = await Answer.findByIdAndUpdate({_id:params},body)
    if(answer){
        res.send({
            code:200,
            msg:'修改答案成功'
         })
       }else{
        res.send({
            code:400,
            msg:'修改答案失败'
        })
       }
}

//删除答案
exports.delectAnswer = async(req,res)=>{
    const answerId= req.params.id
    const answer = await Answer.findByIdAndDelete(answerId)
    if(answer){
        res.send({
            code:200,
            msg:'删除答案成功'
         })
       }else{
        res.send({
            code:400,
            msg:'删除答案失败'
        })
       }
}

//答案点赞和踩

exports.isFollowing = async(req,res)=>{
    const Id = req.query.id
    const result = req.query.result
    const zan = await Answer.findById(Id).select('+likeList')
    if(result==0){
        zan.likeList++
       await zan.save()
       res.status(200).json("赞")
    }else{
        zan.unLikeList++
        await zan.save()
        res.status(400).json("踩")
    }
}