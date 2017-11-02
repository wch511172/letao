/**
 * Created by dell on 2017/11/3.
 */
mui(".mui-scroll-wrapper").scroll({
   indicators:false
});

//思路：
//1. 获取地址栏的参数，设置到文本框中.
//2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
//3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
//4. 点击排序，需要对商品进行排序。1升序 2降序
//5. 添加一个遮罩效果

var data = {
    proName:"",
    brandId:"",
    price:"",
    num:"",
    page:1,
    pageSize:10
};
function render(data) {
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:data,
        success:function (data) {
            console.log(data);
            $(".lt_product").html(template("tpl", data));
        }
    });
}

var key = tools.getParam("key");
$(".search_text").val(key);
data.proName = key;
render (data);

//点击搜索按钮，
$(".search_btn").on("click",function () {
    var key = $(".search_text").val().trim();
    data.proName = key;
    render(data);
});

//点击排序按钮
$(".lt_sort a[data-type]").on("click",function () {
    var $this = $(this);
    var $span = $(this).find("span");
//变换自身箭头
    if($this.hasClass("now")){
        $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else{
        $this.addClass("now").siblings().removeClass("now");
    // 全部箭头方向朝下
        $(".lt_sort span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
//通过自定义属性 得到排序类型
    var type = $this.data("type");
    var value = $span.hasClass("fa-angle-down")?2:1;
    //设置num或者price ，在这之前需要保证之前的清空
    data.price = "";
    data.num = "";
    data[type] = value;
    render(data);
});


