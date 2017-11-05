/**
 * Created by dell on 2017/11/3.
 */

mui('.mui-scroll-wrapper').scroll({
    indicators: false//不显示滚动条
});

var id = tools.getParam("productId");
console.log(id);
$.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
        id: id
    },
    success: function (data) {
        // console.log(data);
        var temp = data.size.split("-");
        // console.log(temp);["22","33"]
        var sizeArray = [];
        for (i = temp[0]; i <= temp[1];i++){
           sizeArray.push(i);
        }
        data.sizeArray = sizeArray;
        console.log(data);
        $(".mui-scroll").html(template("tpl",data));
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        mui(".mui-numbox").numbox();
    }
});
//尺码选择功能
$(".mui-scroll").on("click",".size",function () {
    $(this).addClass("now").siblings().removeClass("now");
});

//添加到购物车功能
$(".btn_add_cart").on("click",function () {
    // console.log("111");
    var size = $(".size.now").html();
    var num = $(".mui-numbox-input").val();
    if(!size){
        mui.toast("请选择尺码");
        return false;
    }
    $.ajax({
        type:"post",
        url:"/cart/addCart",
        data:{
            productId:id,
            size:size,
            num:num
        },
        success:function (data) {
            console.log(data);
            if(data.success){
                mui.toast("添加成功")
            }
            if(data.error === 400){
                // console.log(location.href);
                location.href = "login.html?retUrl=" + location.href;
            }
        }
    });

});