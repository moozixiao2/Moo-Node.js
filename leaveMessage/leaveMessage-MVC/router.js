/**
 * 判断请求
 */

//引用模块
//引入控制器
const controller = require('./controller');

 //路由
 let router = function(req, res){
    //处理静态资源
    if(req.url.startsWith('/assets')){
        controller.staticResouse(req, res);
    }else{
        // 处理动态资源
        if(req.url === '/views/post.html'){
            controller.getPostHtml(req, res);
        }else
        //首页
        if(req.url === '/views/index.html'){
            controller.getIndexHtml(req, res);
        }else
        //特定add
        if(req.url === '/addNewMessage' && req.method === 'POST'){
            controller.addNewMessage(req, res);
        }
    }
 }

 module.exports = router;