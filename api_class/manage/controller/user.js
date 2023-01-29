const { User } = require("../model/user")
const bcrypt = require('bcrypt')

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
//获取用户
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
        console.log(filter)
        const filterStr = filter.split(";").map(v=>v=`+${v}`).join(" ")
       const user =  await User.findById(id).select(filterStr)

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
        const data = await User.findByIdAndUpdate({_id:id},body)
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
       const id = req.params.id
       const data = await User.findByIdAndDelete({_id:id})
       if(!data)return res.send("删除失败")
       res.send({
           code:200,
           msg:"删除成功",
       })

    }catch(err){
        next(err)
    }
}
exports.listFollowing =async(req,res,next)=>{
    let userId = req.params.id
    const user = await User.findById(userId).select("+following").populate("following")
    if(!user) return res.send({code:400,message:'获取关注失败'})
    res.send({
        status:200,
        message:'获取成功',
        data:user
    })
}
//取消关注
exports.cancelFollowing = async(req,res,next)=>{
    let userId = req.params.id
    const user = await User.findById(userId).select("+following").populate("following")
    if(user){
        const data = await User.findByIdAndDelete({_id:user.id})
        if(!data)return res.send("取消关注失败")
        res.send({
            code:200,
            msg:"取消关注成功",
        })
    }
   
}
//关注
exports.confimFollowing = async(req,res)=>{
    const userId =req.userData._id
    // console.log(userId)
   const user = await User.findById(userId).select("+following")
   if(user.following.includes(req.params.id)){
    res.send('您已关注')
   }
   user.following.push(req.params.id)
   await user.save()
    res.send("关注成功")
}
