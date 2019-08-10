$(function(){
    
    //文件上传
    $('#img').on('change', function(){
        let file = this.files[0];
        let fd = new FormData();
        fd.append('pic', file);
        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res){
                if(res.code === 200){
                    $('#photo').attr('src', '/assets/image/' + res.pic);
                    $('#headSrc').val(res.pic);
                }
            }
        })
    })
    let name = document.getElementById('name');
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
            let data = $('#form').serialize();
            //发送ajax请求
            $.ajax({
                type: 'post',
                url: 'http://127.0.0.1:8080/editHeroById',
                data,
                success: function(res){
                    if(res.code === 200){
                        $('#modelId').modal();
                        $('#modelId .container-fluid').text(res.msg + '\n4秒跳转到首页');
                        //跳转到首页
                        setTimeout(() => {
                            location.href = '/index';
                        }, 4000);
                        $('.btn-sure').on('click', () => {
                            location.href = '/index';
                        })
                    }
                }
            })
        }
    })
})