const {Questions} = require('.././model/questions')
const { Answer } = require('../model/answer')
const { Topic } = require('../model/topics')
const { User } = require('../model/user')


//获取问题列表
exports.getQuestionList = async(req,res)=>{
    let {pageCount} = req.query //每一页有几个
    pageCount = Math.max(pageCount*1,1)
    let page = Math.max(req.query.page*1,1) -1 //从第0页开始才是第一页
  
    const questionList = await Questions.find({$or:[{title:{$regex:req.query.keyword,$options:"$i"}},
    {description:{$regex:req.query.keyword,$options:"$i"}}]}).limit(pageCount).skip(page*pageCount)
    if(questionList){
        res.send({
            code:200,
            msg:'获取问题列表成功',
            data:questionList
        })
    }else{
        res.send({
            code:200,
            msg:'获取问题列表失败'
        })
    }
}

//获取指定问题

exports.getOneQuestion = async(req,res)=>{
 const quetisonId = req.params.id
    const question  = await Questions.findById(quetisonId).select('+questioner +topicList').populate("questioner")
    if(question){
        res.send({
            msg:'查询成功',
            data:question
        })
    }else{
        res.send({
            msg:'查询失败成功'
        }) 
    }
   
}

//添加问题

exports.addQuestion = async(req,res)=>{
    const {title,description,topicList} = req.body //标题，描述，话题
    const userId = req.userData._id //提问者
    // let topicLists = JSON.parse(topicList)
    let jointopicLists = topicList.split(",")
    question = new Questions({
        title,
        description,
        questioner:userId,
        topicList:jointopicLists
    })
     const data = await question.save()
    if(data){ //将问题存入对应的User列表
     const user = await User.findById(userId).select("+questionList")
      user.questionList.push(data._id)
      await user.save()

     for(let i of jointopicLists){ //将问题存入对应的话题列表
        const topics = await Topic.findById(i).select("+underQuestions")
        console.log(topics)
        topics.underQuestions.push(data._id)
        await topics.save()
     }
    }
     res.send({
        code:200,
        msg:'添加话题成功'
     })
    
}

//删除问题
exports.delectQuestion = async(req,res)=>{
    const questionID = req.params.id
    if(questionID){
        const question = await Questions.findByIdAndDelete(questionID)
        if(question){
            res.send({
                code:200,
                msg:'删除成功'
            })
        }else{
            res.send({
                code:400,
                msg:'删除失败'
            })
        }
    }else{
        res.send({
            code:400,
            msg:'Id不存在'
        })
    }
}
//修改问题
exports.updateQuestion = async(req,res)=>{
    const body = req.body
    const id = req.params.id
    if(!req.params.id) return res.send({code:400,msg:'id不正确'})
    const question = await Questions.findByIdAndUpdate({_id:id},body)
    if(question){
       return res.send({
            code:200,
            msg:'修改成功'
        })
    }
    return res.send({
        code:200,
        msg:'修改失败'
    })
}

//获取问题答案
exports.getQuestionAnswer = async(req,res)=>{
    const questionId = req.params.id
    const answer = await Answer.find({questionId}).select("+answerer").populate("answerer")//根据id获取关联数据
   if(answer){
    res.send({
        code:200,
        msg:'获取成功',
        data:answer
    })
   }else{
    res.send({
        code:400,
        msg:'获取失败',
    })
   }
    
}