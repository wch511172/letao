/**
 * Created by dell on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {
                console.log(data);
                $('tbody').html(template('tpl',data));
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
        });
    }
    render();

    $(".btn_add").on("click",function () {
        $("#addModal").modal("show");
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function (data) {
                // console.log(data);
                $(".dropdown-menu").html(template("tpl2",data));
            }
        });
    });

    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown-text").text($(this).text());
        $("#brandId").val($(this).data("id"));
        //改成通过状态
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    });
    $("#fileupload").fileupload({
        dataType:"json",
        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            // console.log(data);
            $(".img_box").append(' <img src="' + data.result.picAddr + '" width="100" height="100" alt="">')
        }
    });

    var $form = $("#form");
    console.log($form.serialize());
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        //必须是0以上的数字
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的库存"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    regexp:{
                        //必须是0以上的数字
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入正确商品尺寸(30-50)"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    },
                    regexp:{
                        //必须是0以上的数字
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    },
                    regexp:{
                        //必须是0以上的数字
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个大于0的价格"
                    }
                }
            },
        }
    });


    $form.on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:$form.serialize(),
            success:function (data) {
                console.log(data);
                if(data.success){
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                    $(".dropdown-text").text("请选择");
                    $form.find('img').remove();
                }
            }
        });
    });

    //更改商品上架状态
    $("tbody").on("click",".btn",function () {
        $('#proModal').modal('show');
        var id = $(this).closest("tr").data("id");
        var statu = $(this).parent().data("statu");
        statu = statu === 1?2:1;
        var proName = $(this).closest("tr").data("proName");
        var oldPrice = $(this).closest("tr").data("oldPrice");
        var price = $(this).closest("tr").data("price");
        var proDesc = $(this).closest("tr").data("proDesc");
        var size = $(this).closest("tr").data("size");
        var num = $(this).closest("tr").data("num");
        var brandId = $(this).closest("tr").data("brandId");
        $('.btn_confirm').off().on('click',function () {
            $.ajax({
                type: "post",
                url: "/product/updateProduct",
                data: {
                    id:id,
                    statu:statu,
                    proName:proName,
                    oldPrice:oldPrice,
                    price:price,
                    proDesc:proDesc,
                    size:size,
                    num:num,
                    brandId:brandId
                },
                success: function (data) {
                    // console.log(data);
                    $('#proModal').modal('hide');
                    render();
                }
            });
        });
    })
});