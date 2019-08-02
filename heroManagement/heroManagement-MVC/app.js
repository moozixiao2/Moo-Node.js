//引入模块
const http = require('http');
//引入路由
const router = require('./router');
//创建服务器
const server = http.createServer();
//绑定端口及ip 
const port = '127.0.0.1';
const host = 8848;
server.listen(host, port, () => {
    console.log('http://' + port + ':' + host + '/views/index.html');
})
//注册请求事件
server.on('request', (req, res) => {
    router(req, res);
})