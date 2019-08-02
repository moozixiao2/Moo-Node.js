$(function(){
    //事件委托
    $('#tbody').on('click', 'a:last-child', function (){
        //删除操作常识
        $('#modelId').modal();
        //获得id 
        let id = $(this).attr('data-id');console.log(id)
        //this
        let that = this;
        //点击确定
        $('#modelId .btn-sure').on('click', () => {
            //发送ajax请求
            $.ajax({
                url: 'http://127.0.0.1:8080/delHeroById',
                data: { id },
                success: function(res){
                    if(res.code === 200){
                        //移除modelId
                        $('#modelId, .modal-backdrop').hide();
                        $('#modelId2').modal();
                        $('#modelId2 .container-fluid').text(res.msg);
                        //移除页面对应的结构
                        $('#modelId2 .btn-sure').on('click', () => {
                            $(that).parents('tr').remove();
                        });
                    }
                }
            })
        })
    })
})