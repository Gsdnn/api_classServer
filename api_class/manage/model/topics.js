const mongoose = require("mongoose")
const joi = require('@hapi/joi')
const config = require("../config")
const jwt = require('jsonwebtoken')
joi.objectId =require("joi-objectid")(joi)


const topicSchema = new mongoose.Schema({
    _v:{
        type:Number,
        select:false //是否显示
    },
    name:{
        type:String,
        required:true
    },
    avatar_url:{
        type:String 
    },
    introduction:{
        type:String, 
        maxlength:300,
        select:false
    },
    fansList:{ //关注话题的用户
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        select:false
    },
    underQuestions:{ //问题下关联的话题
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}],
        select:false
    },
    answerList:{ //问题答案
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Answer"}],
        select:false
    }
})

const  topicValidator=(data)=>{
    const schema = joi.object({
        name:joi.string().required(),
        avatar_url:joi.string(),
        introduction:joi.string().max(300).error(new Error("最大字数不超过300字"))
    })
    return schema.validate(data)
}

const Topic = mongoose.model("Topic",topicSchema) 


module.exports ={
    //导出话题模型
    Topic,
    //导出话题解构
    topicValidator
}