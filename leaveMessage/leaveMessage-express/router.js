//路由模块
const express = require('express');
const router = express.Router();
//控制层
const controller = require('./controller');

//留言列表
router.get('/post', (req, res) => {
    controller.getPostHtml(req, res);
})
//特定删除
router.get('/delMessageById', (req, res) => {
    controller.delMessageById(req, res);
})
//主页
router.get('/index', (req, res) => {
    controller.getIndexHtml(req, res);
})
//特定主页新增发布
router.post('/addNewMessage', (req, res) => {
    controller.addNewMessage(req, res);
})

//暴露
module.exports = router;