const {Topic} = require('../model/topics')
//获取话题列表
exports.getTopicList =  async(req,res,next)=>{
    try {
        const page = Math.max(req.query.page *1,1) - 1 //当前是第几页，要扣掉默认第一页的
        const pageCount = Math.max(req.query.pageCount*1,3)
       const topicList = await Topic.find({name:{$regex:req.query.keyword,$options:"$i"}}).limit(pageCount).skip(page  * pageCount)
       //如果使用普通正则表达式的话那就是 new RegExp("\\{"+req.query.keyword+"}");
       
       const Totalcount = await Topic.find().count()
       if(topicList) return res.send({code:200,topicList,Totalcount,msg:'获取数据成功'})
       res.send({
        code:400,
        msg:'暂无数据'
       })
    } catch (error) {
        next(error)
    }
}
//获取单条分类内容
exports.getOneTopic = async(req,res,next)=>{
    try {
        const topicId = req.params.id
        if(!topicId){
            res.send({
                code:400,
                msg:'请输入id'
            })
        }
        const topic = await Topic.findById(topicId)
        res.send({
            code:200,
            msg:'请求成功',
            topic
        })
    } catch (error) {
        
    }
}

//添加分类
exports.addTopic = async(req,res,next)=>{
    let data = req.validator
    let topicData = await Topic.findOne(data)
    if(topicData)
    return res.send({
        code:400,
        msg:'话题已存在',
        topic:data
    })
    topic = new Topic(data)
    await topic.save()
    res.send({
        code:200,
        msg:'添加成功'
    })
    
}
//编辑话题
exports.editTopic = async(req,res,next)=>{
    const body = req.validator
    const TopicId = req.params.id
    const topic = await Topic.findById(TopicId.toString())
    if(topic){
        const data = await Topic.findByIdAndUpdate({_id:TopicId.toString()},body)
        if(!data)return res.send({msg:'修改失败'})
        res.status(200).json({
            msg:'修改成功',
            topic,
        })
    }else{
        res.status(400).json({
            msg:'id不存在',
        })
    }
}