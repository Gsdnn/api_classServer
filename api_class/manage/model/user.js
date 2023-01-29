const mongoose = require("mongoose")
const joi = require('@hapi/joi')
const config = require("../config")
const jwt = require('jsonwebtoken')
joi.objectId =require("joi-objectid")(joi)

const userValidator =(data)=>{
    const schema = joi.object({
        email:joi.string().email().trim().lowercase().min(6).max(20).required(),
        name:joi.string().min(4).max(10).required(),
        password:joi.string().pattern(/^[a-zA-Z0-9]{6,1000}$/).required(),
        _id:joi.objectId(),
        following:joi.array().items(joi.object().keys({
            type:joi.objectId()
        })).message({
            "array.base":"following必须为数组"
        }),
        avatar_url:joi.string().message({
            "string.base":"图像地址必须为字符串"
        }),
        gender:joi.any().valid("male","female").default("male").message({
            "any.only":'传入的值无效'
        }),
        headline:joi.string().max(100).min(3),
        location:joi.array().items(joi.string()).message({
            "array.base":"location 必须是数组"
        }),
        business:joi.string().message({
            "string.base":'business必须为String类型'
        }),
        employments:joi.array().items(
            joi.object().keys({
                company:joi.string(),
                job:joi.string()
            })
        ),
        educations:joi.array().items(joi.object().keys({
            school:joi.string(),
            major:joi.string(),
            diploma:joi.number().valid(1,2,3,4,5),
            entrance_year:joi.number(),
            grations_year:joi.number()

        }).message({
            "array.base":"传入数据必须为数组",
            "any.only":'只能从12345中填入'
        })),

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
        type:[{type:String}],
        select:false
    },
    business:{
        type:String,
        select:false
    },
    employments:{
        type:[{
            company:{type:String},
            job:{type:String}
        }],
        select:false
    },
    educations:{
        type:[{
            school:{type:String},
            major:{type:String},
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
    }
    
})

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id:this._id
    },config.secret,{expiresIn:'3h'})
}

const User = mongoose.model("User",userSchema)

module.exports ={User,userValidator}