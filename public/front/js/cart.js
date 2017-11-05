/**
 * Created by dell on 2017/11/5.
 */
$(function () {
   //下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback:function () {
                    // 渲染数据
                    $.ajax({
                        type:"get",
                        url:"/cart/queryCart",
                        success:function (data) {
                            console.log(data);
                            setTimeout(function () {
                                tools.checkLogin(data);
                                $("#OA_task_2").html(template("tpl",{data:data}));
                                //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            },1000)
                        }
                    });
                }
            },

        }
    });


    //点击修改
    $("#OA_task_2").on("tap",".btn_edit",function () {
       // console.log("111");
        var data = this.dataset;
        var html = template("tpl2",data);
        html = html.replace(/\n/g," ");

        // 弹出提示框
        mui.confirm(html,"编辑商品",["是","否"],function (e) {
            if(e.index == 0){
                $.ajax({
                   type:"post",
                    url:" /cart/updateCart",
                    data:{
                        id:data.id,
                        size:$(".lt_edit_size .now").html(),
                        num:$(".mui-numbox-input").val()
                    },
                    success:function (data) {
                        // console.log(data);
                        tools.checkLogin(data);
                        if(data.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                });
            }else{
                mui.toast("操作取消")
            }
        });
        mui(".lt_edit_num").numbox();
        $(".lt_edit_size span").on("tap",function () {
            $(this).addClass("now").siblings().removeClass("now");
        })
    });



    //点击删除
    $("#OA_task_2").on("tap",".btn_delete",function () {
        // console.log("!11");
        var id = $(this).data("id");
        mui.confirm("你确定删除么","温馨提示",["是","否"],function (e) {
            if(e.index == 0){
                $.ajax({
                    type:"get",
                    url:" /cart/deleteCart",
                    data:{
                        id:[id]
                    },
                    success:function (data) {
                        // console.log(data);
                        tools.checkLogin(data);
                        if(data.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                });
            }else{
                mui.toast("操作取消")
            }
        })
    });


    //计算总金额的功能
    $("#OA_task_2").on("click",".ck",function () {
        var total = 0;
        $(":checked").each(function (index,e) {
            total += $(this).data("num") * $(this).data("price");
        });
        $(".lt_total span").html(total);
    })
});