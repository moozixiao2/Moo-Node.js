/**
 * 处理业务
 */

//引用模块
const fs = require('fs');
const template = require('art-template');
const url = require('url');
const queryString = require('querystring');
//引入模块
const model = require('./model');

 //控制器模块
 let controller = {
    //处理静态资源
    staticResouse: function(req, res){
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
    },
    //主页
    getIndexHtml: function(req, res){
        fs.readFile(__dirname + '/views/index.html', 'utf-8', (err, data) => {
            if(err) console.log(err);
            res.end(data);
        })
    },
    //留言显示页
    getPostHtml: function(req, res){
        model.getAllMessages(function(arr){
            let html = template(__dirname + '/views/post.html', {arr});
            res.end(html);
        })
    },
    //新增留言
    addNewMessage: function(req, res){
        let data = '';
        req.on('data', (chunck) => {
            data += chunck;
        })
        req.on('end', () => {
            //处理post携带的数据
            data = queryString.parse(data);
            //
            model.getAllMessages(function(arr){
                //id
                model.getMaxId(function(maxId){
                    data.id = maxId + 1;
                    //数据加入 
                    arr.push(data);
    
                    model.writeFile(arr);
                    //提示
                    let tip = JSON.stringify({code:200, msg: '留言成功！'});
                    res.end(tip);
                })
            })
        })
    }
 }

 module.exports = controller;