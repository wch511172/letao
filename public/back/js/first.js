/**
 * Created by dell on 2017/10/31.
 */

$(function () {
    var currentPage = 1;
    var pageSize = 8;


    function render() {
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page: currentPage,
                pageSize: pageSize
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
        });
    }
    render();

    $('.btn_add').on('click',function () {
        $('#addModal').modal('show');
    });

    var $form = $('#form');
    // console.log($form);
    $form.bootstrapValidator({
        //校验时使用的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            //name 属性
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名不能为空"
                    }
                }
            }
        }
    });


    // $('.btn_confirm').on('click',function () {
    //     console.log("111");
        $form.on("success.form.bv",function (e) {
            e.preventDefault();
            $.ajax({
                type:"post",
                url:"/category/addTopCategory",
                data:$form.serialize(),
                success:function (data) {
                    if(data.success){
                        $('#addModal').modal('hide');
                        currentPage = 1;
                        render();
                        //3. 重置表单
                        $form.data("bootstrapValidator").resetForm();
                        //表单有一个reset方法，会把表单中所有的值都清空,js对象的方法
                        $form[0].reset();
                    }
                }
            })
        });

    // })

});
