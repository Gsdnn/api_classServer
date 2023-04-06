
const router = require('express').Router()
const validator = require('../middleware/validator')
const comment  = require('../controller/comment')
const auth  = require('../middleware/auth')
const {commentValidator} = require('../model/comment')

router.post('/',[auth,validator(commentValidator)],comment.addComment)
router.get('/',auth,comment.getComment)
//编辑
router.patch("/edit/:id",auth,comment.editComment)
//删除
router.delete('/del/:id',auth,comment.delCmment)
 
module.exports = router