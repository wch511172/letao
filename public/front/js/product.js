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