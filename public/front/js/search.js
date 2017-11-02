/**
 * Created by dell on 2017/11/2.
 */
mui(".mui-scroll-wrapper").scroll({
    indicators: false
});

//思路：
//1. 输入关键字，点击按钮，跳转到搜索列表页。
//2. 需要把关键字保存到web缓存中（cookie sessionStorage localStorage）
// 2.1 要求：最多存10条
// 2.2 如果超过了10条，需要删除最早的那条
// 2.3 如果发现搜索记录是重复，需要把该条搜索记录放到最上面。

//2. 点击清空按钮吗，需要把搜索记录对应的缓存清除。
//3. 点击删除的时候，需要删除单条记录
//4. 点击单条记录，可以直接跳转到对应的搜索详情页。


//获取缓存中的数据，转换成数组，返回
// console.log(localStorage.getItem("lt_search_history"));
function getHistory() {
    var search_history = localStorage.getItem("lt_search_history")||"[]";
    var arr = JSON.parse(search_history);
    return arr;
}
function render() {
    var arr = getHistory();
    // console.log({arr:arr});
    $(".lt_history").html(template("tpl",{arr:arr}));
}
render();

//添加搜索记录
$(".search_btn").on("click",function () {
   var key = $(".search_text").val().trim();
    //1. 先从缓冲中把数组获取到
    var arr = getHistory();
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    // render();
    //页面跳转
    location.href = "searchList.html?key="+key;
});

//删除功能实现
$(".lt_history").on("click",".fa-close",function () {
    var arr = getHistory();
    var index = $(this).data("index");
    arr.splice(index,1);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    render();
});

//清空功能实现
$(".lt_history").on("click",".icon_empty",function () {
   localStorage.removeItem("lt_search_history");
    render();
});