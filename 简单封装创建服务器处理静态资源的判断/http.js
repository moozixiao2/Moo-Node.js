//引用http模块
const http = require('http');
const fs = require('fs');
//创建服务器
const server = http.createServer();
//绑定端口及ip
server.listen(8080, '127.0.0.1', () => {
    console.log('服务器开启');
} )
//注册事件
server.on('request', (req, res) => {
    //链接
    if(req.url.startsWith('/views') || req.url.startsWith('/css') || req.url.startsWith('/images')){
        //是否是css
        if(req.url.endsWith('.css')){
            //加请求头
            res.setHeader('Content-Type', 'text/css');
        }

        //文件
        fs.readFile('../' + req.url, (err, data) => {
            if(err) throw err;
            res.end(data);
        } )
    }
} )