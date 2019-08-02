/**
 * 处理数据的读写
 */

 //引入模块
const fs = require('fs');

//数据模型
 let model = {
    //获得所有的英雄json,并返回数组
    getAllHeros: function(callback){
        fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            let arr = JSON.parse(data);
            //由于fs.readFile是异步编程,所以要返回arr,需要回调函数
            callback(arr);
        })
    },
    //写入writeFile
    writeFile: function(arr){
        //转换成json字符串
        let jsonArr = JSON.stringify(arr);
        fs.writeFile('./data/heros.json', jsonArr, 'utf-8', (err) => {
            if (err) console.log(err);
        })
    },
    //id
    getMaxId: function(callback){
        this.getAllHeros(function(arr){
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