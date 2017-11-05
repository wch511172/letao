/**
 * Created by dell on 2017/11/4.
 */
$(function () {
    //获取验证码
    $(".btn_getcode").on("click",function () {
        var $this = $(this);
        if($this.hasClass("disabled")){
            return false;
        }
        $this.addClass("disabled").html("正在发送中...");
        $.ajax({
            type:"get",
            url:"/user/vCode",
            success:function (data) {
                console.log(data);
                var num = 60;
                var timer = setInterval(function () {
                    num--;
                    $this.html(num + "秒后再次发送");
                    if(num == 0){
                        $this.html("再次发送").removeClass("disabled");
                        clearInterval(timer);
                    }
                },1000)
            }
        });
    });

//   点击注册
    $(".btn_register").on("click",function () {
        //获取数据
        // console.log($("#form").serialize());
        // var data = $("#form").serialize();
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();
        if(!username){
            mui.toast("请输入用户名")
        }
        if(!password){
            mui.toast("请设置密码")
        }
        if(!repassword){
            mui.toast("请确认密码")
        }
        if(password != repassword){
            mui.toast("两次密码设置不一致")
        }
        if(!mobile){
            mui.toast("请输入手机号")
        }
        if(!vCode){
            mui.toast("请输入验证码")
        }
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function (data) {
                // console.log(data);
                if(data.success){
                    mui.toast("注册成功");
                    setTimeout(function () {
                        location.href = "login.html"
                    },1000)
                }else{
                    mui.toast(data.message);
                }
            }
        });
    })
});