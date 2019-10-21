
// 向服务器端发送请求 获取文章列表数据
$.ajax({
type:'get',
url:'/posts',
success:function(response){
var html = template('postsTpl',response)
$('#postsBox').html(html)
var page = template('pageTpl',response)
$('#page').html(page)
}
})

// 处理日期时间格式
function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

function changePage(page) {
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(response){
        var html = template('postsTpl',response)
        $('#postsBox').html(html)
        var page = template('pageTpl',response)
        $('#page').html(page)
        }
        })
}
// 向服务器端发送请求 索要分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html = template('categoryTpl',{data:response})
        console.log(html);
        $('#catgoryBox').html(html)  
    }
})
   //根据条件索要文章列表数据
   $('#filterForm').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(response){
            var html = template('postsTpl',response)
            $('#postsBox').html(html)
            var page = template('pageTpl',response)
            $('#page').html(page)
        }      
    })
    return false
})
// 向服务器端发送请求 获取文章列表数据
$.ajax({
	type: 'get',
	url: '/posts',
	success: function (response) {
		var html = template('postsTpl', response);
		$('#postsBox').html(html);
		var page = template('pageTpl', response);
		$('#page').html(page);
	}
});

//当删除按钮被点击时
$('#postsBox').on('click','.delete',function(){
    if(confirm('确认操作')){
        var id = $(this).attr('data-id')
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function(){
                location.reload()
            }

        })

    }


})
