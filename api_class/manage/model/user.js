const mongoose = require("mongoose")
const joi = require('@hapi/joi')
const config = require("../config")
const jwt = require('jsonwebtoken')
const Joi = require("@hapi/joi")
joi.objectId =require("joi-objectid")(joi)

const userValidator =(data)=>{
    const schema = joi.object({
        email:joi.string().email().trim().lowercase().min(6).max(20).required(),
        name:joi.string().min(4).max(10).required(),
        password:joi.string().pattern(/^[a-zA-Z0-9]{6,1000}$/).required(),
        _id:joi.objectId(),
        following:joi.array().items(joi.object().keys({
            type:joi.objectId()
        })),
        avatar_url:joi.string(),
        gender:joi.any().valid("male","female").default("male"),
        headline:joi.string().max(100).min(3),
        location:joi.array().items(joi.objectId()).error(new Error('location类型为数组')),
        business:joi.objectId().error(new Error('business必须为String类型')),
        employments:joi.array().items(
            joi.object().keys({
                company:joi.objectId(),
                job:joi.objectId()
            })
        ),
        educations:joi.array().items(joi.object().keys({
            school:joi.objectId(),
            major:joi.objectId(), 
            diploma:joi.number().valid(1,2,3,4,5),
            entrance_year:joi.number(),
            grations_year:joi.number()

        }).error(new Error("传入的数据必须为数组，而且自能选择12345"))),
        
        followingTop:joi.array().items(joi.object().keys({ //用户关注的话题
            type:joi.objectId()
        })).error(new Error('followingTop必须为数组类型')),

    })

    return schema.validate(data)
}

const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
       
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100,
        select:false //请求的时候不展示
    },
    _v:{
        type:Number,
        select:false
    },
    avatar_url:{
        type:String,
        select:false
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:"male",
        require:true
    },
    headline:{
        type:String,
        // maxlength:100,
        select:false
    },
    location:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}],
        select:false
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,ref:"Topic",
        select:false
    },
    employments:{
        type:[{
            company:{type:mongoose.Schema.Types.ObjectId,ref:"Topic"},
            job:{  type:mongoose.Schema.Types.ObjectId,ref:"Topic"}
        }],
        select:false
    },
    educations:{
        type:[{
            school:{ type:mongoose.Schema.Types.ObjectId,ref:"Topic"},
            major:{type:mongoose.Schema.Types.ObjectId,ref:"Topic"},
            diploma:{type:Number,enum:[1,2,3,4,5]},
            entrance_year:{type:String},
            grations_year:{type:Number}
        }],
        select:false
    },
    following:{
        type:[{
            type:mongoose.Schema.Types.ObjectId, //根据id关联到表
            ref:"User"
        }],
        select:false
    },
    followingTop:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Topic'
        }],
        select:false
    },
    questionList:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Questions'
        }],
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

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id:this._id
    },config.secret,{expiresIn:'3h'})
}

const User = mongoose.model("User",userSchema)

module.exports ={User,userValidator}