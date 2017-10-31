/**
 * Created by dell on 2017/10/31.
 */


$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                console.log(data);
                $('tbody').html(template("tpl",data));
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/pageSize),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
   render();

    $(".btn_add").on('click',function () {
        $("#addModal").modal("show");
        $.ajax({
           type:"get",
           url:"/category/queryTopCategoryPaging",
           data:{
               page:1,
               pageSize:100
           },
           success:function (data) {
               $('.dropdown-menu').html(template("tpl2",data));
           }

       });
    });

    //点击下拉框，让某个选中
    $(".dropdown-menu").on("click","a",function () {
        //获取到当前a标签的内容，设置给dropdown-text
        $(".dropdown-text").text($(this).text());

        //获取到当前a标签的自定义属性，data-id,修改隐藏域的value值
        $("#categoryId").val($(this).data("id"));
        //改成通过状态
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    //初始文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            //给默认图片设置src
            $(".img_box img").attr("src", data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    var $form = $('#form');
    // console.log($form);
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            hot:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌是否火热"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            }
        }
    });
    $form.on("success.form.bv",function (e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function (data) {
                // console.log(data);
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                    $(".dropdown-text").text("请选择");
                    $(".img_box img").attr("src", "img/none.png");

                }
            }
        });
    });
});