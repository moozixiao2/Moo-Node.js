
let tbody = document.getElementById('tbody');
console.log(tbody)
//ajax
let xhr = new XMLHttpRequest();
//open
xhr.open('get', 'http://127.0.0.1:8084/getAllHeros');
//send
xhr.send();
//监听
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        //转化
        let res = JSON.parse(xhr.responseText);
        //显示结构
        let html = '';
        res.forEach(e => {
            html += `
            <tr>
              <td>${e.id}</td>
              <td>${e.name}</td>
              <td>${e.gender}</td>
              <td><img src="../assets/image/${e.img}"></td>
              <td><a href="./edit.html?id=${e.id}">修改</a> 
                <a data-id="${e.id}" href="javascript:void(0);">删除</a>
              </td>
            </tr>
            `
        });
        
        // <td><img src="${e.img}"></td>
        //
        tbody.innerHTML = html;
    }
}