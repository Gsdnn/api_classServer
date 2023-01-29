module.exports =(validator)=>{
    return (req,res,next)=>{
        const {error,value} = validator(req.body)
        if(error) return res.send({status:400,original:error._original,err:error.details[0].message})
        req.validator =value
        next()
    }
}