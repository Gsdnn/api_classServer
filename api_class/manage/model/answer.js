const mongoose = require("mongoose")
const joi = require('@hapi/joi')
const Joi = require("@hapi/joi")
joi.objectId =require("joi-objectid")(joi)


//一个问题对应多个答案,一个用户对应多个问题和答案
const answerSchema = new mongoose.Schema({
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
    answerer:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        select:false,
        require:true
    },
    likeList:{
        type:Number,
        default:0
    },
    unLikeList:{
        type:Number,
        default:0
    }
})
const  answerValidator=(data)=>{
    const schema = joi.object({
        content:joi.string().required(),
        // answerer:joi.objectId().require(),
        questionId:joi.objectId().required(),
    })
    return schema.validate(data)
}


const Answer = mongoose.model("Answer",answerSchema) 

module.exports ={
    //导出答案模型
    Answer,
    //导出答案解构
    answerValidator,
}
