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

    $(".weibo-btn").on('click', function () {
        //非空判断
        let name = document.getElementById('name');
        let message = document.querySelector('.weibo-text');
        let regx = new RegxFun();
        regx.add(name, [{
            funName: 'regxEmpty',
            msg: '名字不能为空'
        }, {
            funName: 'regxLength:4',
            msg: '名字不能小于4位'
        }
        ])
        regx.add(message, [{
            funName: 'regxEmpty',
            msg: '内容不能为空'
        }
        ])
        //时间
        $('#time').val(currentTime());
        //获得表单数据
        let data = $('#wbform').serialize();
        //ajax请求

        let errMsg = regx.start();
        if (errMsg) {
            alert(errMsg);
        } else {
            $.ajax({
                type: 'post',
                url: 'http://127.0.0.1:8848/addNewMessage',
                data,
                dataType: 'json',
                success: function (res) {
                    if (res.code === 200) {
                        alert(res.msg);

                        //转到留言页面
                        location.href = '../../views/post.html'
                    }
                },
            })
        }
        // $.ajax({
        //     type: 'post',
        //     url: 'http://127.0.0.1:8848/addNewMessage',
        //     data,
        //     dataType: 'json',
        //     success: function (res) {
        //         // let errMsg = regx.start();
        //         // if (errMsg) {
        //         //     alert(errMsg);
        //         // } else {
        //             if (res.code === 200) {
        //                 alert(res.msg);

        //                 //转到留言页面
        //                 location.href = '../../views/post.html'
        //             }
        //         // }
        //     },
        // })
    })
})