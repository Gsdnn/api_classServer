const express = require('express')
const router = express.Router()
const {userValidator} = require('../model/user')
const validator = require('../middleware/validator')
const user = require('../controller/user')

const auth  = require('../middleware/auth')

//注册
router.post("/user",validator(userValidator),user.register)
//获取用户
router.get("/user",[auth,user.getuser])

//获取指定用户
router.get('/user/:id',[auth,user.getspicuser])
//编辑修改指定用户
router.patch('/user/:id',[auth,validator(userValidator)],user.edituser)

//删除指定用户
router.delete('/user/:id',[auth,user.delectuser])

router.get("/user/:id/following",user.listFollowing)
router.put('/user/following/:id',auth,user.confimFollowing)
router.delete("/user/following/:id",auth,user.cancelFollowing)
module.exports =router