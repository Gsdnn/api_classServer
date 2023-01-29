const router = require('express').Router()
const auth  = require('../controller/auth')

//写接口以及挂在校验和中间件函数的地方
const validator = require('../middleware/validator')
const {userValidator} =require('../model/user')

router.post("/",validator(userValidator),auth.login)


module.exports =router