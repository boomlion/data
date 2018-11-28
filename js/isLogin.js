//判断是否登录
$(function(){
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    success:function(info){
  if(info.error==400){
    location.href='login.html'
  }
    }

  })
})