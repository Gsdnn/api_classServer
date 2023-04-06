const router = require("express").Router()
//第一步先把每个模块的路由引入进来.


router.use(require('./user'))
//第二步引入模块
router.use('/auth',require('./auth'))
router.use('/upload',require('./upload'))
router.use('/topics',require('./topics'))
router.use('/questions',require('./questions'))
router.use('/answer',require('./answer'))
router.use('/comment',require('./comment'))



module.exports =router