//引用http模块
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');
//创建服务器
const server = http.createServer();
//绑定端口及ip
server.listen(8084, '127.0.0.1', () => {
    console.log('服务器开启！通过"http://127.0.0.1:8084/views/index.html"');
} )
//注册事件
server.on('request', (req, res) => {
    //静态资源处理 //views的html为art-template动态生成的动态资源
    if(req.url.startsWith('/assets')){
        //css
        if(req.url.endsWith('.css')){
            //加响应头
            res.setHeader('Content-Type', 'text/css');
        }

        // 传数据
        fs.readFile('.' + req.url, (err, data) => {
            if(err) console.log(err);
            res.end(data);
        } )
    }else{
        //获得地址栏参数，即？后的参数
        let result = url.parse(req.url, true);
        //动态资源处理
        if(req.url === '/views/index.html'){
            fs.readFile('./data/hero.json', 'utf-8', (err, data) => {
                if(err) console.log(err);
                //data是十六进制数得转换
                let arr = JSON.parse(data);
                let html = template(__dirname + '/views/index.html', {arr});
                // console.log(html)
                res.end(html);
            } )
        }else 
        //新增页面
        if(req.url === '/views/add.html'){
            fs.readFile(__dirname + result.pathname, (err, data) => {
                if(err) console.log(err);
                res.end(data);
            } )
        }
        //特定addHeros
        if(result.pathname === '/addHeros' && req.method === 'GET'){
            fs.readFile(__dirname + '/data/hero.json', 'utf-8', (err, data) => {
                if(err) console.log(err);
                // console.log(data);
                //由于data是json字符串
                let oldData = JSON.parse(data);
                //加入id
                let idFirst = 0;
                oldData.forEach(e => {
                    if(e.id > idFirst){
                        idFirst = e.id;
                    }
                });
                //最大id加一
                result.query.id = idFirst + 1;
                //加入数据
                oldData.push(result.query);
                console.log(oldData)
                let jsonArr = JSON.stringify(oldData);
                //上传
                fs.writeFile(__dirname + '/data/hero.json', jsonArr, 'utf-8', (err) => {
                    if(err) console.log(err);
                    res.end(JSON.stringify({code: 200, msg: '新增成功'}));
                } )
            } )
        }
    }
} )