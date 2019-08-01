$(function(){
    let name = document.querySelector('input[name = "name"]');
    //点击
    $('#sub').on('click', () => {
        //交互常识
        let regx = new regxFun();
        regx.add(name, [
            {
                funName: 'regxEmpty',
                msg: '名字不能为空'
            },
            {
                funName: 'regxLength:3',
                msg: '名字不能少于3位'
            }
        ])
        let errMsg = regx.start();
        if(errMsg){
            $('#modelId').modal();
            $('#modelId .container-fluid').text(errMsg);
        }else{
            //获得表单数据
            let data = $('#myform').serialize();
            //发送ajax请求
            $.ajax({
                type: 'post',
                url: 'http://127.0.0.1:8080/addHeroById',
                data,
                success: function(res){
                    if(res.code === 200){
                        $('#modelId').modal();
                        $('#modelId .container-fluid').text(res.msg + '\n4秒后跳转到首页');
                        //跳转首页
                        setTimeout(() => {
                            location.href = '/index';
                        }, 4000);
                        //点击
                        $('.btn-sure').on('click', () => {
                            location.href = '/index';
                        })
                    }
                }
            })
        }
    })
})