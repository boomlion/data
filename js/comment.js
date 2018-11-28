//存放公共的方法

$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500)
})

$(function(){
  $('.togglehidden').click(function(){
    $(this).next().stop().slideToggle();
  })

$('.sf').click(function(){
//缩放 ，左右晃动，都是以class类为中心，这样更方便
//三个要走，第一个就是左边的aside，
//第二个就是中心padd
//第三个急救室titlepadd
$('.lt_aside').stop().toggleClass('sf');
$('.lt_main .title').stop().toggleClass('sf');
$('.lt_main').stop().toggleClass('sf');


})


//退出功能，你只要发送就行了
$('.modal-footer .sure').click(function(){
$.ajax({
  url:'/employee/employeeLogout',
  type:'get',
  success:function(info){
   if(info.success){
     location.href="login.html"
   }
  }
})

})




})