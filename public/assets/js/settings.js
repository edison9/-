$('#logout').on('click',function(){
    var isConfirm = confirm('真的要退出？')
    if(isConfirm) {
        $.ajax({
            type:'post',
            url:'/logout',
            success:function(){
                location.href = 'login.html'
            }
        })
    }
})

//展示用户的相关信息
$.ajax({
    type:'get',
    url:'/users/'+userId,
    success:function(response) {
        $('.avatar').attr('src',response.avatar)
        $('.profile.name').html(response.nickName)
    }
})