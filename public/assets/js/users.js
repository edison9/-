//展示用户列表
render()
function render(){
  $.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
  let str = template('tpl_user',response)
  $('#show_users').html(str)
    }
  })
  
}

//将来图片保存的地址
let img_src = ''
$("#add_user").on('click',function(){
    let formData = $('#form_data').serialize()
  formData = formData + '&avatar=' + img_src
  console.log(formData);
  
$.ajax({
type:'post',
url:'/users',
data:formData,
success:function(response){
    location.reload()
}
})

})


$('#show_form').on('change','#avatar',function(){
  //1.完成原生的formData的数据收集
  let form = new FormData()
  form.append('avatar',this.files[0])
  //2.发送jq请求
  $.ajax({
    type:'post',
    url:'/upload',
    data:form,
    processData:false,
    contentType:false,
    success:function(response){
      $('#preview').attr('src',response[0].avatar)
      img_src = response[0].avatar
    }
})

})

// 3.0 添加用户信息
$("#add_user").on('click', function() {
  let formData = $("#from_data").serialize()
  formData = formData + '&avatar=' + img_src
  $.ajax({
    type: 'post',
    url: '/users',
    data: formdata,
    success: function(res) {
      location.reload()
    }
  })
})
//4.使用事件委托的方式绑定点击编辑事件
$('#show_users').on('click','#edit_user',function(){
  let id = $(this).parent().attr('data-id')
  $.ajax({
type:'get',
url:'/users/'+id,
success:function(response){
  let str = template('modify_data',response)
  $('#show_form').html(str)
}
  })
})

$('#show_form').on('click','#edit_user',function(){
let id = $('#modify_user').attr('data-id')
let formdata = $('#modify_user').serialize()
formdata = formdata + '&avatar=' + img_src
$.ajax({
type:'put',
url:'/users/'+id,
data:formdata,
success:function(response){
  location.reload()
}
})
})


$('#show_users').on('click','#del_user',function(){
//如果管理员确认要删除用户

//获取即将要删除的用户ID
let id = $(this).parent().attr('data-id')
let confirm = window.confirm('确认删除')
if(!confirm) return
//向服务器端发送请求 删除用户
$.ajax({
type:'delete',
url:'/users/'+id,
success:function(response){
  // location.reload()
  render()
}
})

})

//全选全不选
// var selectAll = $('#selectAll')
// selectAll.on('change',function(){
// //获取到全选按钮当前状态
// var status = $(this).prop('checked')
// //获取到所有的用户并将用户的状态和全选按钮保持一致
// $('#show_users').find('input').prop('checked',status)
// })

// $('#show_users').on('change','.userStatus',function(){
// var inputs = $('#show_users').find('input')
// if(inputs.length ==inputs.filer(':checked').length){
// selectAll.prop('checked',true)
// } else{

//   selectAll.prop('checked',false)
// }


// })
//全选和全不选
$('#selectAll').on('click',function(){
$('#show_users').find(':checkbox').prop('checked',$(this).prop('checked'))
})
//反选
$('#show_users').on('click',':checkbox',function(){

  let len1 = $('#show_users').find(':checkbox').size()
  let len2= $('#show_users').find(':checked').size()
  $('#selectAll').prop('checked',len1 == len2)
  //根据选中的 个数，显示或者隐藏批量删除按钮
  $('#del_many').css( 'display',len2 >=2?'inline-block':'none')

})


//7.给批量删除按钮注册事件
$('#del_many').on('click',function(){
  let ids = []
  //获取选中按钮的父元素td
let ipts = $('#show_users').find(':checked').parent().siblings('.cls')

ipts.each(function(i,item){
  //遍历每一个td获取ID加入到数组中
ids.push($(item).attr('data-id'))

})
//发送请求删除多项数据
$.ajax({
type:'delete',
url:'/users/'+ids.join("-"),
success:function(response) {
  render()
}

})

})