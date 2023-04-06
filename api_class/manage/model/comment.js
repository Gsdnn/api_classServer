const mongoose = require("mongoose")
const joi = require('@hapi/joi')
joi.objectId =require("joi-objectid")(joi)

const commentScheam = new mongoose.Schema({
    _v:{
        type:Number,
        select:false //是否显示
    },
    content:{
        type:String,
        require:true
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Questions",
        require:true
    },
    answerId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Answer",
        require:true
    },
    commentaer:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        require:true,
        select:false
    },
    correlationComment:{
         type:mongoose.Schema.Types.ObjectId,ref:"Comment",
         select:false
    }

},{timestamps:true})

const  commentValidator=(data)=>{
    const schema = joi.object({
        content:joi.string().required(),
        questionId:joi.objectId(),
        answerId:joi.objectId(),
        correlationComment:joi.objectId(),
        // topicList:joi.objectId()
    })
    return schema.validate(data)
}

const Comment = mongoose.model("Comment",commentScheam) 


module.exports ={
    //导出评论模型
    Comment,
    //导出话题解构
    commentValidator
}