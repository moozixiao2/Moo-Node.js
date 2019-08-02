/**
 * 判断请求
 */

//引入模块

//引入 控制器
const controller = require('./controller');

let router = function(req, res){
    //处理静态资源
    if(req.url.startsWith('/assets')){
        controller.staticSource(req, res);
    }else
    //主页
    if(req.url === '/views/index.html'){
        controller.getIndexHtml(req, res);
    }else
    //add资源
    if(req.url === '/views/add.html'){
        controller.getAddHtml(req, res);
    }else
    //特定
    if(req.url === '/addNewHero' && req.method === 'POST'){
        controller.addNewsHero(req, res);
    }
}

//
module.exports = router;