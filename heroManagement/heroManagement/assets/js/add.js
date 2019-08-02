//封装一个获得表单中name属性的函数
function serialize(){
    //获取form
    let form = document.getElementById('myform');
    //获取form下含name属性
    let nameEles = form.querySelectorAll('[name]');
    //数组装键值对name=value,最后用join('&')
    let arr = [];
    //遍历
    nameEles.forEach(e => {
        //由于name属性中gender单选都存在所以需要处理成一个
        if(e.type === 'radio' && e.checked){
            let key = e.name;
            let val = e.value;
            arr.push(key + '=' + val);
        }
        //
        if(e.type !== 'radio'){
            let key = e.name;
            let val = e.value;
            arr.push(key + '=' + val);
        }
    })
    return arr.join('&');
}

//获得btn
let btn = document.getElementById('sub');
//点击
btn.onclick = function(){
    //获得表单数据
    let data = serialize();
    //ajax请求
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://127.0.0.1:8084/addHeros?' + data);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = JSON.parse(xhr.responseText);
            if(res.code === 200){
                alert(res.msg);

                //跳转到首页
                location.href = '../../views/index.html';
            }
        }
    }
}