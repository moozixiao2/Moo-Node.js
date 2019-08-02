//加载模块
const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('art-template');
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
    //处理静态资源
    if(req.url.startsWith('/assets')){
        //处理css在浏览器的警告
        if(req.url.endsWith('.css')){
            // 加上响应头
            res.setHeader('Content-Type', 'text/css');
        }
        //上传
        fs.readFile(__dirname + req.url, 'utf-8', (err, data) => {
            if(err) console.log(err);
            res.end(data);
        })
    }else{
        //获得参数数据
        let result = url.parse(req.url, true);
        // 处理动态资源
        if(req.url === '/views/post.html'){
            //上传
            fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
                if(err) console.log(err);
                // console.log(data)
                //data 字符串
                let arr = JSON.parse(data);
                //模块设置
                let html = template(__dirname + result.pathname, {arr});
                res.end(html);
            })
        }else
        //首页
        if(req.url === '/views/index.html'){
            fs.readFile(__dirname + result.pathname, 'utf-8', (err, data) => {
                if(err) console.log(err);
                res.end(data);
            })
        }
        if(result.pathname === '/addMessages'){
            fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
                if(err) console.log(err);
                // console.log(data);
                //data为json字符串
                let oldData = JSON.parse(data);
                //没有id,设置对应的id,由数组中最大的id+1
                let idMax = 0;
                oldData.forEach(e => {
                    if(e.id > idMax){
                        idMax = e.id;
                    }
                });
                result.query.id = idMax + 1;
                //没有时间设置为当前时间

                //加入新的数据
                oldData.push(result.query);
                let jsonArr = JSON.stringify(oldData);
                // 写入message.json
                fs.writeFile('./data/messages.json', jsonArr, 'utf-8', (err, data) => {
                    if(err) console.log(err);
                    res.end(JSON.stringify({code: 200, msg: '发布成功'}))
                })
            })
        }
    }
})