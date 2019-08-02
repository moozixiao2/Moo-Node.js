//引入数据层
const model = require('./model');

//创建控制层对象并暴露
module.exports = {
    getIndexHtml,getAddHtml,delHeroById,addHeroById,getEditHtml,editHeroById
}

//主页
function getIndexHtml(req, res){  
    model.getAllHeros(arr => {
        res.render('index', {arr});
    })
}
//删除
function delHeroById(req, res){ 
    //获得id
    let id = req.query.id;
    model.delHeroById(id, result => {
        // console.log(result)
        let response = {};
        if(result.affectedRows === 1){
            response.code = 200;
            response.msg = '删除成功';
        }else{
            response.code = 503;
            response.msg = '删除失败';
        }
        res.send(response);
    })
}
//新增页面
function getAddHtml(req, res){
    res.render('add');
}
//增加英雄
function addHeroById(req, res){
    //获得数据
    let data = req.body;
    model.addNewHero(data, result => {
        let response = {};
        if(result.affectedRows === 1){
            response.code = 200;
            response.msg = '新增成功';
        }else{
            response.code = 503;
            response.msg = '新增失败';
        }
        res.send(response);
    })
}
//修改页面获得数据
function getEditHtml(req, res){
    let id = req.query.id;
    model.getHeroById(id, result => {
        res.render('edit', result);
    })
}
//修改英雄数据
function editHeroById(req, res){
    let data = req.body;
    model.editHeroById(data, result => {
        let response = {};
        if(result.affectedRows === 1){
            response.code = 200;
            response.msg = '修改成功';
        }else{
            response.code = 503;
            response.msg = '修改失败';
        }
        res.send(response);
    })
}
