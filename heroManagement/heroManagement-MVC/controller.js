/**
 * 处理请求
 */

//引入模块
const fs = require('fs');
const template = require('art-template');
const queryString = require('querystring');

//引入数据模型
const model = require('./model');

//控制器对象
let controller = {
    //处理静态资源
    staticSource: function (req, res) {
        //处理css在浏览器警告情况
        if (req.url.endsWith('.css')) {
            // 加响应头
            res.setHeader('Content-Type', 'text/css');
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    },
    //获得主页
    getIndexHtml: function (req, res) {
        model.getAllHeros(function(arr){
            let html = template(__dirname + '/views/index.html', {arr});
            res.end(html);
        })
    },
    //获得新增页
    getAddHtml: function (req, res) {
        fs.readFile(__dirname + '/views/add.html', (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    },
    //新增功能
    addNewsHero: function (req, res) {
        // 用post，需要处理数据
        let data = '';
        req.on('data', (chunck) => {
            data += chunck;
        })
        req.on('end', () => {
            //引用queryString 处理数据
            data = queryString.parse(data);
            //
            model.getAllHeros(function(arr){
                model.getMaxId((maxId) => {
                    //最大id+1
                    data.id = maxId + 1;
                    //追加
                    arr.push(data);
    
                    model.writeFile(arr);
                    let tips = JSON.stringify({code: 200, msg: '新增成功'});
                    res.end(tips);
                })
            })
        })
    }
}
//
module.exports = controller;