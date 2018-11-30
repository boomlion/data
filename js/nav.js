$(function () {
  var arr = [];
  var arr1=[];
  var pageSize = 5;
  var nowPage = 1;
  rander();
  function rander() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      data: {
        page: nowPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('tbody').html(template('prductTbl', info));
        console.log(info)
        // 我哈要在你这写个分页，然后还调用你你说气不气
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


  $('.addtwo').click(function () {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('#dropdown-menu').html(template('bewtbl', info))



      }
    })

  })

  $('#dropdown-menu').on('click', 'a', function () {
    $('.ljlok').val($(this).data('id'));
    $('#dropdownText').text($(this).text())
    $("#form").data('bootstrapValidator').updateStatus('brandId','VALID')
    
  })
  //多文件 上传；
  //如何做到多文件上传，首先可以试一下fileupload这个
  //东西，看看返回的什么吗在做决定


  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      //返回多次，所以可以就当与遍历 懂我意思吗
      arr.unshift(data.result.picName);
      arr1.unshift(data.result.picAddr)
      if (arr.length === 1) {
        $('#lijiale').attr('src', data.result.picAddr)
      } else {

if(arr.length==3){
  $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID')

}
        $('#imgBox').prepend('<img src=' + data.result.picAddr + ' style="width: 100px;">')
        if (arr.length > 3) {
          arr.pop();
          arr1.pop();
          $('#imgBox img:last-of-type').remove();
        }
      }


    }
  });




  //开启表单验证，就是你懂的呀，隐藏的也会进行验证

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      proName: {
        validators: {
          notEmpty: {
            message: '产品名称不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '产品原价格不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '产品价格不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '产品描述不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '产品尺寸不能为空'
          },

          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '格式应该为xx-xx'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '产品库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '应由字母组成首字母不能为0'
          }

        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: '品牌不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '上传三张图片'
          }
        }
      }
    }
  })
  //验证完成 


//提交啊 就是拼接字符串
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
var listen=$('#form').serialize();

listen+="&picAddr1="+arr1[0]+"&picName1="+arr[0];
listen+="&picAddr1="+arr1[1]+"&picName1="+arr[1];
listen+="&picAddr1="+arr1[2]+"&picName1="+arr[2];

  $.ajax({
    url: '/product/addProduct',
    type: 'post',
    dataType: 'json',
    data:listen,
    success: function (info) {
      if (info.success) {

        rander();
        $("#yespage").modal('hide');
        $("#form").data('bootstrapValidator').resetForm(true);
        $('#dropdownText').text('请选择二级分类');

$('#imgBox').html('<img src="./images/none.png" style="width: 100px;" id="lijiale">')
      }
    }
  })

});

})