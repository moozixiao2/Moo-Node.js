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
    console.log(id)
    //与英雄数据对比
    model.getAllHeros(arr => {
        //对比id
        arr.findIndex((e,i) => {
            if(e.id == id){
                arr.splice(i, 1);
            }
        })
        //写入数据
        model.writeFile(arr);
        res.send({code: 200, msg: '删除成功'});
    })
}
//新增页面
function getAddHtml(req, res){
    res.render('add');
}
//增加英雄
function addHeroById(req, res){
    model.getAllHeros(arr => {
        //最大id + 1
        model.getMaxId(maxId => {
            req.body.id = parseInt(maxId) + 1;
            //加入req.body数据
            arr.push(req.body);
            //写入
            model.writeFile(arr);
            //res
            res.send({code: 200, msg: '新增成功'});
        })
    })
}
//修改页面获得数据
function getEditHtml(req, res){
    let id = req.query.id;
    // console.log(id)
    model.getHeroById(id, content => {
        res.render('edit', content);
    })
}
//修改英雄数据
function editHeroById(req, res){
    //获得数据
    let data = req.body;
    console.log(data)
    model.getAllHeros(arr => {
        for(let i = 0; i < arr.length; i++){
            if(data.id == arr[i].id){
                arr[i] = data;
                break;
            }
        }
        //写入
        model.writeFile(arr);
        //res
        res.send({code: 200, msg: '修改成功'});
    })
}
