$(function(){
    //委托
    $('.weibo-list').on('click', '.del', function(){
        //删除交互
        $('#modelId').modal();

        //this
        let that = this;
        //获得id
        let id = $(this).attr('data-id');
        // console.log(id)
        //确定删除按钮
        $('.btn-sure').on('click', function(){
            //ajax请求
            $.ajax({
                url: 'http://127.0.0.1:8080/delMessageById',
                data: {id},
                success: function(res){
                    if(res.code === 200){
                        $('#modelId, .modal-backdrop').hide();
                        $('#modelId2').modal();
                        $('#modelId2 .container-fluid').text(res.msg);

                        //移除对应结构
                        $(that).parents('li').remove();
                    }
                }
            })
        })
    })
})