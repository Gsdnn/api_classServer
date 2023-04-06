const router = require('express').Router()
const validator = require('../middleware/validator')
const topics  = require('../controller/topics')
const auth  = require('../middleware/auth')
const {topicValidator} = require('../model/topics')
//获取列表
router.get('/',topics.getTopicList)
//上传话题
router.post('/',[auth,validator(topicValidator)],topics.addTopic)
//获取指定话题
router.get('/:id',topics.getOneTopic)
router.patch('/:id',[auth,validator(topicValidator)],topics.editTopic)
module.exports = router