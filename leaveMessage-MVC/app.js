//加载模块
const http = require('http');

//引用路由
const router = require('./router');

//创建服务器
const server = http.createServer();
//设置端口及ip
const port = '127.0.0.1';
const host = 8848;
//绑定端口及ip
server.listen(host, port, () => {
    console.log('服务器开启，主页地址：http://127.0.0.1:8848/views/index.html');
})
//注册请求事件
server.on('request', (req, res) => {
    router(req, res);
})