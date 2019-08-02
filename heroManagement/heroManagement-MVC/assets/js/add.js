let name = document.querySelector('#myform [name = "name"');
//获取点击
$('#sub').on('click', () => {
    //判断非空
    let regx = new RegxFun();
    regx.add(name, [
        {
            funName: 'regxEmpty',
            msg: '名字不能为空'
        },
        {
            funName: 'regxLength:4',
            msg: '名字不能小于4位'
        }
    ])
    //获得表单数据
    let data = $('#myform').serialize();

    let errMsg = regx.start();
    if (errMsg) {
        alert(errMsg);
    } else {
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8848/addNewHero',
            data,
            dataType: 'json',
            success: function (res) {
                if (res.code === 200) {
                    alert(res.msg);
                    //跳转到主页
                    location.href = '../../views/index.html';
                }
            }
        })
    }
    // console.log(data);
})