module.exports ={
    app:{
        port:process.env.PORT || 3000
    },
    db:{
        url:process.env.MONGODB_URL  || "mongodb://localhost:27017/dwzhihu"
    },
    secret:'0942guodada'
}