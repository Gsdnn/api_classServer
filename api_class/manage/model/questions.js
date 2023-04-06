const mongoose = require("mongoose")
const joi = require('@hapi/joi')

joi.objectId =require("joi-objectid")(joi)


const questionsSchema = new mongoose.Schema({
    _v:{
        type:Number,
        select:false //是否显示
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    questioner:{ 
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        select:false
    },
    topicList:{ //问题下的话题
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}],
        select:false
    },
    answerList:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }],
        select:false
    }
})

const  questionValidator=(data)=>{
    const schema = joi.object({
        title:joi.string().required(),
        description:joi.string().required( ),
        questioner:joi.objectId(),
        topicList:joi.any() //json传数据
        // topicList:joi.objectId()
    })
    return schema.validate(data)
}

const Questions = mongoose.model("Questions",questionsSchema) 


module.exports ={
    //导出话题模型
    Questions,
    //导出话题解构
    questionValidator
}