const jwt = require('jsonwebtoken')
const config = require("../config")

module.exports = (req,res,next) =>{
    const token = req.header("authorization")

    if(!token){
        return res.send({
            code:401,
            message:'token无效，请重新登入'
        })
    }
    try {
        //校验token是否正确
        const userData = jwt.verify(token,config.secret)
        req.userData =userData
        next()
    } catch (error) {
        return res.status(401).json({
            code:400,
            message:'token错误'
        })
    }
}