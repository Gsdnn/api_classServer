const mongoose = require('mongoose')
const config = require('../config')
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db.url,{ useNewUrlParser: true , useUnifiedTopology: true} );
const db = mongoose.connection
// mongoose.connect(config.db.url)
db.on('error',err=>{
    console.log("数据库连接失败",err)
})
db.on('open',()=>{
    console.log('数据库连接成功')
})