//引入fs
const fs = require('fs');

//创建数据层对象并暴露
module.exports = {
    getAllHeros,writeFile,getMaxId,getHeroById
}

//获得全英雄数据
function getAllHeros(callback){
    fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
        if(err) console.log(err);
        let arr = JSON.parse(data);
        callback(arr);
    })
}
//写入数据
function writeFile(arr){
    let jsonStr = JSON.stringify(arr);
    fs.writeFile('./data/heros.json', jsonStr, 'utf-8', (err, data) => {
        if(err) console.log(err);
    })
}
//最大id
function getMaxId(callback){
    this.getAllHeros(arr => {
        let id = arr[0].id;
        arr.forEach(e => {
            if(e.id > id){
                id = e.id;
            }
        });
        callback(id);
    })
}
//根据id显示修改页面的英雄数据
function getHeroById(id, callback){
    this.getAllHeros(arr => {
        let content = arr.find(e => {
            return e.id == id;
        })
        callback(content);
    })
}
