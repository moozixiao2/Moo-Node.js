//封装一个获得表单name属性的函数
function serialize(){
    let form = document.getElementById('wbform');
    let nameEles = form.querySelectorAll('[name]');
    let arr = [];
    //遍历设置格式
    nameEles.forEach(e => {
        let key = e.name;
        let val = e.value;
        arr.push(key + '=' + val);
    })
    return arr.join('&');
}
function currentTime(){
    let date = new Date();
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 10 ? '0' + M : M;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}

//获得btn
let btn = document.querySelector('.weibo-btn');
let time = document.getElementById('time');
btn.onclick = function(){
    //时间
    time.value = currentTime();
    //获得表单数据
    let data = serialize();

    console.log(data)
    //ajax请求
    let xhr = new XMLHttpRequest();
    //open
    xhr.open('get', 'http://127.0.0.1:8848/addMessages?' + data); //暂时用get
    //send
    xhr.send();
    //监听
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = JSON.parse(xhr.responseText);
            if(res.code === 200){
                alert(res.msg);
                //跳转主页
                location.href = '../../views/post.html';
            }
        }
    }
}