$(function () {
  var pageSize = 5;
  var nowPage = 1;
  rander();
  function rander() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: nowPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('onetbl', info));

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

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '不能为空'
          }
        }
      }
    }
  })

  $('.modal-footer .no').on('click', function () {
    $("#form").data('bootstrapValidator').resetForm(true)
  })

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      type: 'post',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          rander();
          $("#yespage").modal('hide');
          $("#form").data('bootstrapValidator').resetForm(true)

        }
      }
    })

  });

})