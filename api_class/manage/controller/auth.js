const { User } = require("../model/user")
const bycrypt = require('bcrypt')
//写接口中方法的地方
exports.login = async(req,res,next) =>{
 try {
   //获取校验过后的数据
   const validValue = req.validator
   const name  = validValue.name
   const user = await User.findOne({name}).select('+password') //因为读取数据的时候把密码隐藏了现在需要在添加回来 +号可以显示全部否则只有密码
   console.log(user)
   console.log(validValue.password)
   //判断密码是否存在
   if(!user) 
   return res.send({
      code:400,
      msg:"用户不存在,请重新输入",
  })
let compareResult = await bycrypt.compare(validValue.password,user.password)
if(!compareResult)return res.send('用户名或者密码错误')
   res.send({
      code:200,
      msg:'登入成功',
      authorization:{
         token:user.generateToken()
      }
   })
 } catch (err) {
    next(err)
 }
}