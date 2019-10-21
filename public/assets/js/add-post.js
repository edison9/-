// $.ajax({
// type:'get',
// url:'/categories',
// success:function(){

// }
// })

// let img_src = ''
// $('#feature').on('change',function(){
// let form = new FormData()
// form.append('avatar',this.files[0])
// $.ajax({
// type:'post',
// url:'/upload',
// data:form,
// processData:false,
// contentType:false,
// success:function(res){
//     img_src = res[0].avatar
// }

// })
// })

// $('#save_post').on('clcik',function(){
// let FormData = $('#post_form').serialize()
// if(img_src !='') FormData = FormData+'&thumbnail'
// $.ajax({
// type:'post',
// url:'/post',
// data:FormData,
// success:function(res){
//     location.href = 'posts.html'
// }
// })
// })

// 向服务器端发送请求 获取文章分类数据
$.ajax({
	url: '/categories',
	type: 'get',
	success: function (response) {

		var html = template('categoryTpl', {data: response});
		$('#category').html(html);
	}
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
	// 获取到管理员选择到的文件
	var file = this.files[0];
	// 创建formData对象 实现二进制文件上传
	var formData = new FormData();
	// 将管理员选择到的文件追加到formData对象中
	formData.append('cover', file);
	// 实现文章封面图片上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		// 告诉$.ajax方法不要设置参数类型
		contentType: false,
		success: function (response) {
			console.log(response)
			$('#thumbnail').val(response[0].cover);
		}
	})
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求 实现添加文章功能
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
			location.href = '/admin/posts.html'
		}
	})
	// 阻止表单默认提交的行为
	return false;
});
//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	
	var paramsAry = location.search.substr(1).split('&')
	//循环数据
	for (var i = 0; i<paramsAry.length; i++){
		var tmp = paramsAry[i].split('=')
		if(tmp[0] == name){
			return tmp[1]
		}
	}
	return -1
}

// 调用函数
var id = getUrlParams('id')
if(id!=-1){
	
	
	//完成是文章 的修改功能
	//需要将对应的数据显示到对应的输入框
	//发送ajax通过id获取到这篇文章的所有数据

	$.ajax({
	
		type:'get',
		url:'/posts/'+id,
		success:function(response){
			
			$('#pAdd').hide()
			$('#pEdit').show()
			//将写文章变成修改文章
			$('h1').text('修改文章')
			$('#title').val(response.title)
			$('#content').val(response.content)
			//我们需要显示图片
			$('#prev').attr('src',response.thumbnail).show()
			//将地址写到隐藏域中
			$('#img').val(response.thumbnail)

			$('#category>option').each(function(value,item){
				//形参item得到 是dom对象 将dom对象转换jq对象 $(dom对象)
				if($(item).val() == response.category.id){
					
					$(item).prop('selected',true)
				}
			})

		//显示修改状态
	$('#status > option').each(	(index , item) => {
	//判断option里面的value属性的值于response.category的值是否相等 人如果相等 就表示是这个分类 给其设置一个selected
		if($(item).attr('value')==response.state) {
			$(item).prop('selected',true)
		}
	})
//显示时间
			$('#created').val(response.createAt && response.createAt.substr(0,16))
		}		
	})
}

//找到PEdit这个按钮
$('#pEdit').on('click',function(){
	$.ajax({
		url:'/posts/'+id,
		type:'put',
		data:$('form').serialize(),
		success:function(response){
			location.href = 'post.html'
		}


	})
})

