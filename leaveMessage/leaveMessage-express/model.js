//引入模块
const fs = require('fs');

//数据层
let model = {
    //获得所有的留言信息
    getAllMessages(callback){
        fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
            if(err) console.log(err);
            let arr = JSON.parse(data);
            callback(arr);
        })
    },
    //写入
    writeFile(arr){
        let jsonArr = JSON.stringify(arr);
        fs.writeFile('./data/messages.json', jsonArr, 'utf-8', (err) => {
            if(err) console.log(err);
        })
    },
    //id
    getMaxId(callback){
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
//暴露
module.exports = model;