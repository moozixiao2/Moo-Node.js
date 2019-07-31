//数据层
const model = require('./model');
//控制层
let controller = {
    //留言列表页
    getPostHtml(req, res){
        model.getAllMessages(function(arr){
            res.render('post', {arr});
        })
    },
    //删除
    delMessageById(req, res){
        //获得id
        let id = req.query.id;
        // console.log(id)
        // 对比id
        model.getAllMessages(function(arr){
            arr.findIndex((e, i) => {
                if(e.id == id){
                    arr.splice(i, 1);
                }
            })
            //写入
            model.writeFile(arr);
            res.send({code: 200, msg: '删除成功'});
        })
    },
    //主页
    getIndexHtml(req, res){
        res.render('index');
    },
    //发表留言，新增
    addNewMessage(req, res){
        model.getAllMessages(function(arr){
            model.getMaxId(function(maxId){
                req.body.id = maxId + 1;
                //加入数据
                arr.push(req.body);
                //写入
                model.writeFile(arr);
                res.send({code: 200, msg: '发布成功'});
            })
        })
    }
}   

//暴露
module.exports = controller;