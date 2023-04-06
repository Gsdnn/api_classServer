const router = require('express').Router()
const validator = require('../middleware/validator')
const answers  = require('../controller/answer')
const auth  = require('../middleware/auth')
const {answerValidator} = require('../model/answer')
//回答问题
router.post("/",[auth,validator(answerValidator)],answers.postAnswer)
//修改答案
router.patch('/edit/:id',[auth],answers.editAnswer)
//删除答案
router.delete('/delect/:id',auth,answers.delectAnswer)
//赞和踩
router.put('/',auth,answers.isFollowing)
module.exports = router