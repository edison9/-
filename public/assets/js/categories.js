// $('#add_cate').on('click',function(){
// let formData = $('#form_cate').serialize()

// $.ajax({
// type:'post',
// url:'/categories',
// data:formData,
// success:function(res){
//     console.log(res);
    
// }
// })
// })

// $('#show_cate').on('click','.edit',function(){
//     //获取要修改的分类数据的ID
//     let id = $(this).parent().attr('data-id')
//     $.ajax({
//         type:'get',
//         url:'/categries/'+id,
//         success:function(res){
//           let str = template('modify_cate_tpl',res)
//           $('#show_form').html(str)
//         }

//     })
// })


// $('#show_form').on('click','#mod_cate',function(){
// let id = $('#modify_cate').attr('data-id')

// let formData = $('#modify_cate').serialize()
// $.ajax({
// type:'put',
// url:'/categories/'+id,
// data:formData,
// success:function(res){
//     render()
//     $('#title,#className').val('')
// }

// })
// })

// $('#show_cate').on('click','.del_cate',function(){
// let id = $(this).parent().attr('data-id')
// $.ajax({
// type:'delete',
// url:'/categories/'+ id,
// success:function(){
//     render()
// }

// })

// })
$('#addCategory').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){

    location.reload()
}

    })
    return false
})

//向服务器端发送请求，获取文章分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(res){
        var html = template('categoryListTpl',{data:res})
        $('#categroyBox').html(html)
    }
    })

    $('#categroyBox').on('click','.edit',function(){
        var id = $(this).attr('data-id')
        $.ajax({
            url:'/categories/'+id,
            type:'get',
            success:function(res){
               var html = template('modifyCategoryTpl',res)
               $('#formBox').html(html)
            }

        })

    })
    //当修改分类数据表单发生提交行为
    $('#formBox').on('submit','#modifyCategory',function(){
        var formData = $(this).serialize()
        var id = $(this).attr('data-id')
        $.ajax({
            url:'/categories/'+id,
            type:'put',
            data:formData,
            success:function(){
                location.reload()
            }
        })

        return false
    })

//添加删除
$('#categroyBox').on('click','.delete',function(){
    if(confirm('确认删除'))
    var id = $(this).attr('data-id')
    $.ajax({
        url:'/categories/'+id,
        type:'delete',
        success:function(){
            location.reload()
        }
    })


})





