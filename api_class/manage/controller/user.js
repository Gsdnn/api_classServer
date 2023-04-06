const { User } = require("../model/user")
const { Topic }= require("../model/topics")
const bcrypt = require('bcrypt')
const ObjectId = require("mongoose/lib/types/objectid")

exports.register =async(req,res,next)=>{
    try{
        let {email,password,name} =req.validator
        let user = await User.findOne({email})
        console.log(user)
        if(user){ 
            return res.send({
                code:400,
                msg:"已被注册，请重新输入",
                data:{email}
            })
        }
        //加密密码
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt)
        //创建user实例
        users = new User({
            name,
            email,
            password,
        })
        //保存数据到数据库
        await users.save()
        res.send({
            code:200,
            message:'注册成功'
        })
        
       
    }catch(err){
        next(err)
    }
}
//获取用户列表
exports.getuser = async(req,res,next)=>{
   try {
    let userList = await User.find()
    if(!userList) return res.status(400).json({
        code:400,
        msg:'用户列表不存在'
    }) 
    res.status(200).json({
        code:200,
        msg:"用户列表获取成功",
        data:{userList}
      })
   } catch (error) {
    next(error)
   }
}
//获取指定用户
exports.getspicuser =async(req,res,next)=>{
    try{
        const id = req.params.id
        const {filter = " "} = req.query
        const filterStr = filter.split(";").map(v=>v=`+${v}`).join(" ")
        console.log("filterStr",filterStr)
       const user =  await User.findById(id.toString()).select(filterStr)

        if(!user){
            return res.send('用户不存在')
        }
      res.status(200).json({
        code:200,
        msg:"用户查询成功",
        data:{user}
      })
    }catch(err){
        next(err)
    }
}
//修改指定用户
exports.edituser =async(req,res,next)=>{
    try{
        const body  =req.body
        const id = req.params.id
        const data = await User.findByIdAndUpdate({_id:id.toString()},body)
        console.log(data)
        if(!data)return res.send("修改失败")
        res.send({
            code:200,
            msg:"修改成功",
            data:{body}
        })

    }catch(err){
        next(err)
    }
}
//删除指定用户
exports.delectuser =async(req,res,next)=>{
    try{
       const id = req.userData._id
       const data = await User.findByIdAndDelete({_id:id.toString()})
       if(!data)return res.send("删除失败")
       res.send({
           code:200,
           msg:"删除成功",
       })

    }catch(err){
        next(err)
    }
}
//获取关注列表
exports.listFollowing =async(req,res,next)=>{
    let userId = req.params.id
    const user = await User.findById(userId.toString()).select("+following").populate("following")
    if(!user) return res.send({code:400,message:'获取关注列表失败'})
    res.send({
        status:200,
        message:'获取关注列表成功',
        data:user
    })
}
//取消关注
exports.unfollow = async(req,res)=>{
    const userId =req.userData._id
    const user = await User.findById(userId.toString()).select("+following")
    const index = user.following.map(id=>id.toString()).indexOf(req.params.id)
    if(index != -1){
        user.following.splice(index,1)
        await user.save()
        res.send({
            code:200,
            msg:'取消关注成功'
        })
    }else{
        res.send({
            code:400,
            msg:'取消关注失败'
        })
    }

}
//关注
exports.confimFollowing = async(req,res)=>{
    const userId =req.userData._id
   const user = await User.findById(userId.toString()).select("+following")
   if(user.following.includes(req.params.id)){
    console.log(user.following.includes(req.params.id))
    return res.send('您已关注')
   }
   user.following.push(req.params.id)
   await user.save()
    res.send("关注成功")
}


//关注话题
exports.confimFollowingTop = async(req,res)=>{
    const userId =req.userData._id//拿到用户id
    const topicId = req.params.id//拿到话题id
    const user = await User.findById(userId).select("+followingTop")
    const topic = await Topic.findById(topicId).select("+fansList")
    if(user.followingTop.includes(topicId)){
     console.log(user.followingTop.includes(topicId))
     return res.send('您已关注')
    }
    user.followingTop.push(topicId)
    topic.fansList.push(userId)
    await user.save()
    await topic.save()
     res.send("关注成功")
}

//取消话题关注
exports.unfollowTop = async(req,res)=>{
    const userId =req.userData._id
    const topicId = req.params.id//拿到话题id
    const user = await User.findById(userId.toString()).select("+followingTop")
    const topic = await Topic.findById(topicId).select("+fansList")
    console.log(topic)
    const indexFans = topic.fansList.indexOf(userId)
    console.log(indexFans)
    const index = user.followingTop.map(id=>id).indexOf(topicId)//判断followingTop中是否存在topicId
    console.log(index)

    if(index != -1 && indexFans!=-1){
        user.followingTop.splice(index,1)
        topic.fansList.splice(indexFans,1)
        await user.save()
        // await topic.save()
        res.send({
            code:200,
            msg:'取消关注成功'
        })
    }else{
        res.send({
            code:400,
            msg:'取消关注失败'
        })
    }

}