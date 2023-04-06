
const router = require('express').Router()
const validator = require('../middleware/validator')
const questions  = require('../controller/questions')
const auth  = require('../middleware/auth')
const {questionValidator} = require('../model/questions')
const checkQuestioner = require('../middleware/checkQuestioner')

//获取单独问题
router.get('/:id',questions.getOneQuestion)
//获取问题列表
router.get('/',questions.getQuestionList)
//添加问题
router.post('/addQuestion',[auth,validator(questionValidator)],questions.addQuestion)
//删除问题
router.delete('/delete/:id',[auth,checkQuestioner],questions.delectQuestion)
//修改问题
router.patch("/updateQuestion/:id",[auth,checkQuestioner],questions.updateQuestion)
//获取答案
//获取问题列表
router.get('/getAnswer/:id',questions.getQuestionAnswer)

module.exports = router