//事件委托的方式点击删除
$('.weibo-list').on('click', '.del', function(){
    // console.log(this)
    //获得id
    let id = $(this).attr('data-id');
    //移除对应项的结构
    $(this).parent('li').remove();
    //删除对应json中的数据
    $.ajax({
        url: 'http://127.0.0.1:8848/delMessageById',
        data: {id},
        success: function(res){
            if(res.code === 200){
                alert(res.msg);
            }
        }
    })
})