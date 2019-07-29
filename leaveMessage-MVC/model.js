/**
 * 处理数据的读写
 */

//引用模块
const fs = require('fs');

//数据模型
let model = {
    //获取全部的留言信息
    getAllMessages: function(callback){
        //上传
        fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
            if(err) console.log(err);
            let arr = JSON.parse(data);
            callback(arr);
        })
    },
    //写入数据
    writeFile: function(arr){
        let jsonArr = JSON.stringify(arr);
        fs.writeFile('./data/messages.json', jsonArr, 'utf-8', (err) => {
            if(err) console.log(err);
        })
    },
    //最大id
    getMaxId: function(callback){
        this.getAllMessages(function(arr){
            let id = arr[0].id;
            arr.forEach(e => {
                if(e.id > id){
                    id = e.id;
                }
            });
            callback(id);
        })
    }
}

//
module.exports = model;
