//引入mysql
const mysql = require('mysql');
//创建数据库链接
const conn = mysql.createConnection({
    //ip
    port : 3306,
    //端口
    host: '127.0.0.1',
    //用户名
    user: 'root',
    //密码
    password: 'root',
    //数据库
    database: 'moo-heros'
})


//创建数据层对象并暴露
module.exports = {
    getAllHeros,delHeroById,addNewHero,getHeroById,editHeroById
}

//获得全英雄数据
function getAllHeros(callback){
    //创建sql语句 
    let sql = 'SELECT * FROM heros WHERE isDel = 0';
    //执行sql语句 
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        // console.log(result)
        callback(result);
    })
}
//删除
function delHeroById(id, callback){
    //创建sql语句 
    let sql = `UPDATE heros SET isDel = 1 WHERE id = ${id}`;
    //执行sql语句 
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        callback(result);
    })
}
//新增
function addNewHero(data, callback){
    //创建sql语句 
    let sql = `INSERT INTO heros SET \`name\` = '${data.name}', \`gender\` = '${data.gender}', \`img\` = '${data.img}'`;
    //执行sql语句 
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        callback(result);
    })
}
//根据id显示修改页面的英雄数据
function getHeroById(id, callback){
    //创建sql语句 
    let sql = `SELECT * FROM heros WHERE id = ${id}`;
    //执行sql语句 
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        //获取
        callback(result[0]);
    })
}
//修改数据
function editHeroById(data, callback){
    //创建sql语句 
    let sql = `UPDATE heros SET \`name\` = '${data.name}', \`gender\` = '${data.gender}', \`img\` = '${data.img}' WHERE id = ${data.id}`;
    //执行sql语句 
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        //获取
        callback(result);
    })
}