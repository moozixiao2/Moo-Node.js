//引入express
const express = require('express');
//引入body-parser
const bodyParser = require('body-parser');
//router
const router = require('./router');

//创建服务器
const app = express();
//绑定端口
const hort = 8080;
const post = '127.0.0.1';
app.listen(hort, post, () => {
    console.log('http://127.0.0.1:8080/index')
})
//处理静态资源
app.use('/assets', express.static('assets'));
//默认ejs
app.set('view engine', 'ejs');
//body-parser
app.use(bodyParser.urlencoded({extended: false}));

//router
app.use(router);