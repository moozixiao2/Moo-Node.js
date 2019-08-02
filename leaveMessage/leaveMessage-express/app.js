//引入express
const express = require('express');
//引入body-parser
const bodyParse = require('body-parser');
//引入router
const router = require('./router');
//创建服务器
const app = express();
//绑定端口及ip
const host = 8080;
const port = '127.0.0.1';
app.listen(host, port, () => {
    console.log('http://127.0.0.1:8080/post')
})
//处理静态资源
app.use('/assets', express.static('assets'));
//默认ejs
app.set('view engine', 'ejs');
//body-parser
app.use(bodyParse.urlencoded({extended: false}));
//router
app.use(router);