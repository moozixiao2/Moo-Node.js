$(function () {
    function currentTime() {
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
    //点击
    $('.weibo-btn').on('click', function(){
        let name = document.getElementById('name');
        let message = document.querySelector('.weibo-text');
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
        regx.add(message, [
            {
                funName: 'regxEmpty',
                msg: '内容不能为空'
            },
            {
                funName: 'regxLength:4',
                msg: '内容不能少于4位'
            }
        ])
        
        let errMsg = regx.start();
        if(errMsg){
            $('#modelId').modal();
            $('#modelId .container-fluid').text(errMsg);
        }else{
            $('#time').val(currentTime());
            //获得表单数据
            let data = $('#wbform').serialize();
            //ajax
            $.ajax({
                type: 'post',
                url: 'http://127.0.0.1:8080/addNewMessage',
                data,
                success: function(res){
                    if(res.code === 200){
                        $('#modelId').modal();
                        $('#modelId .container-fluid').text(res.msg);

                        $('.btn-sure').on('click', () => {
                            location.href = '/post';
                        })
                    }
                }
            })
        }
    })
})

