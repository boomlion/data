$(function () {
  var pageSize = 5;
  var nowPage = 1;
  rander();
  function rander() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: nowPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('onetbl', info));
        console.log(info)
        //我哈要在你这写个分页，然后还调用你你说气不气
        $('#telpage').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: nowPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            nowPage = page;
            rander();
          }

        })


      }

    })


  }
  // 文档校验
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 指定校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })




  $('.addtwo').click(function () {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        //开启数据渲染下拉框
        $('#dropdown-menu').html(template('dropli', info))

      }

    })


  })
  //点击吧下拉框的赋值给隐藏框
  $('#dropdown-menu').on('click', 'a', function () {
    $('.ljlok').val($(this).parent().data('id'));
    $('#dropdownText').text($(this).text());
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
    
    //  $("#form").data('bootstrapValidator').updateStatus("categoryId","VALID",$('#form'))
  })

  //点击取消，重置文件
  $('.modal-footer .no').on('click', function () {
    $("#form").data('bootstrapValidator').resetForm(true)
  })

  // 图片上传
  $('[type="file"]').fileupload({
    
    dataType: 'json',
    done: function (e, data) {
      // console.log(data.result.picAddr)
      $('#lijiale').attr('src', data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      // console.log(this)
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")

    }
  })



  // 这个点击阻止事件，然后自己发
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      dataType: 'json',
      data:$('#form').serialize(),
      success: function (info) {
        console.log(info)
        if (info.success) {

          rander();
          $("#yespage").modal('hide');
          $("#form").data('bootstrapValidator').resetForm(true)

        }
      }
    })

  });

})