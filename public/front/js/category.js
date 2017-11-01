/**
 * Created by dell on 2017/11/1.
 */
var sc =mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false//不显示滚动条
});

//渲染一级分类

$.ajax({
    type:"get",
    url:" /category/queryTopCategory",
    success:function (data) {
        // console.log(data);
        $('.lt_category_l .mui-slider').html(template("tpl",data));
        renderSecond(data.rows[0].id)
    }
});


//渲染二级分类
function renderSecond(id) {
    $.ajax({
        type:"get",
        url:" /category/querySecondCategory",
        data:{
            id:id
        },
        success:function (data) {
            console.log(data);
            $('.lt_category_r .mui-slider').html(template("tpl2",data));
        }
    });
}

//给左边所有的li注册委托事件，获取到自定义属性id，渲染对应的二级分类。
$(".lt_category_l").on("click","li",function () {
    $(this).addClass("now").siblings().removeClass("now");
    var id = $(this).data("id");
    renderSecond(id);
    //这里需要让右侧的区域滚动 scrollTop到0，0
    sc[1].scrollTo(0,0,500);
});
