$(function () {
  var pageSize = 5;
  var nowPage = 1;
  rander();
  function rander() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: nowPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(Math.ceil(info.total / info.size));
        $('tbody').html(template('teltbl', info));

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


  $('tbody').on('click', '.btn', function () {
    //还要有一个模态框呦




    var isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
    var id = $(this).parent().data('id')
    $('.modal-footer .yes').on('click', function () {
      $.ajax({
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        type: 'post',
        dataType: 'json',
        success: function (info) {
          rander();
          $('#yespage').modal('hide')
        }
      })
    })

  })


})