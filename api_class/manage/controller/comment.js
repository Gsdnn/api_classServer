const { Comment } = require("../model/comment")

exports.addComment = async(req,res)=>{
    const body =req.body
    const userId = req.userData._id
    if(body.questionId || body.answerId ){
        comment = new Comment({
            ...body,
            commentaer:userId
         })
         await comment.save()
         res.send({
            code:200,
            msg:"添加评论成功"
        })
    } else if( body.correlationComment){ //评论下的评论
        comment = new Comment({
            ...body,
            commentaer:userId
         })
         await comment.save()
        const correlationComment = await Comment.findById(body.correlationComment)
        correlationComment.correlationComment=body.comment  //评论嵌套
        await correlationComment.save()
        res.send({
            code:200,
            msg:"添加评论成功"
        })
    }else{
        res.send({
            code:400,
            msg:"请输入完整信息"
        
        })
    }
    
}
//获取评论
exports.getComment = async(req,res)=>{
    const page = Math.max(req.query.page*1,1)-1
    const pageCount = Math.max(req.query.pageCount*1,3)
    // const id =req.params.id
    const comment = await Comment.find().limit(pageCount).skip(pageCount*page).select('+correlationComment').populate("correlationComment")
    if(comment){
        res.send({
            code:200,
            msg:'success',
            data:comment
        })
        comment.forEach(element => {
            if(element.correlationComment){
                console.log(element)
            }
        });
    }else{
        res.send({
            code:400,
            msg:"获取失败"
        })
    }
}
//修改评论
exports.editComment = async(req,res)=>{
    const id = req.params.id
    const body = req.body
    const comment = await Comment.findByIdAndUpdate({_id:id},body)
    if(comment){
       return res.send({
            code:200,
            msg:'修改成功',
        })
    }
    return res.send({
        code:200,
        msg:'修改失败',
        data:comment
    })
    
}

//删除评论
exports.delCmment = async(req,res)=>{
    const id = req.params.id
    const comment = await Comment.findByIdAndDelete({_id:id})
    if(comment){
        return res.send({
             code:200,
             msg:'删除成功',
         })
     }
     return res.send({
         code:200,
         msg:'删除失败',
     })
}