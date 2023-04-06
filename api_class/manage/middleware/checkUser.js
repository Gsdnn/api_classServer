const {User} = require('../model/user')
module.exports = async(req,res,next)=>{
    const Userid = req.params.id
    const user = await User.findById(Userid.toString())
    console.log(user)
    if(!user || null){
        return res.send({
            code:400,
            msg:'用户不存在'
        })
    }
    next()
}