/**
 * Created by dell on 2017/11/4.
 */
$(function () {
    $(".btn_login").on("click",function () {
        var username = $("[name = 'username']").val();
        var password = $("[name = 'password']").val();
        //验证用户名和密码
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        $.ajax({
            type:"post",
            url:" /user/login",
            data:{
                username:username,
                password:password
            },
            success:function (data) {
                if(data.error === 403){
                    mui.toast(data.message);
                }
                if(data.success){
                    //登录成功记录原页面地址
                    var search = location.search;
                    if(search.indexOf("retUrl") > -1){
                        search = search.replace("?retUrl=","");
                        location.href = search;
                    }else{
                        location.href = "user.html";
                    }
                }
            }
        });
    })
});