$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '密码长度必须在6到30之间'
          },
          callback:{
            message:'密码不正确'
          }

        }
      },
    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.error === 1000) {
          $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
          return;
        } else if (res.error === 1001) {
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
          alert("密码不正确");
          return;
        }
        if (res.success) {
          location.href = "index.html"
        }
      }
    })
  });

  $('#reset').on('click', function () {

    $('#form').data("bootstrapValidator").resetForm();

  })
})




