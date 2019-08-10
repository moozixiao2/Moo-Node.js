//express的router
const express = require('express');
const router = express.Router();

//引入控制层
const controller = require('./controller');

//主页
router.get('/index', (req, res) => {
    controller.getIndexHtml(req, res);
})
//新增页面
router.get('/add', (req, res) => {
    controller.getAddHtml(req, res);
})
//删除
router.get('/delHeroById', (req, res) => {
    controller.delHeroById(req, res);
})
//特定新增
router.post('/addHeroById', (req, res) => {
    controller.addHeroById(req, res);
})
//主页到修改页面
router.get('/edit', (req, res) => {
    controller.getEditHtml(req, res);
})
//修改英雄数据
router.post('/editHeroById', (req, res) => {
    controller.editHeroById(req, res);
})
//文件上传
router.post('/uploadFile', controller.uploadFile);
//暴露
module.exports = router;