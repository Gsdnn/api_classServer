const express = require('express')
const router = express.Router()
const {userValidator} = require('../model/user')
const validator = require('../middleware/validator')
const user = require('../controller/user')

//校验中间件
const auth  = require('../middleware/auth')
const checkUser = require('../middleware/checkUser')

//注册
router.post("/user",validator(userValidator),user.register)
//获取用户
router.get("/user",[auth,user.getuser])

//获取指定用户
router.get('/user/:id',[auth,user.getspicuser])
//编辑修改指定用户
router.patch('/user/:id',[auth,validator(userValidator)],user.edituser)

//删除指定用户
router.delete('/user/:id',auth,user.delectuser)

//获取关注列表
router.get("/user/:id/followinglist",user.listFollowing)
//关注
router.put('/user/following/:id',[auth,checkUser],user.confimFollowing)
//取消关注
router.delete('/user/followingcancel/:id',[auth,checkUser],user.unfollow)
//用户关注话题
router.put('/user/confimFollowingTop/:id',[auth],user.confimFollowingTop)
//用户关注话题
router.delete('/user/followingTopcancel/:id',[auth],user.unfollowTop)
module.exports =router  