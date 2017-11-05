/**
 * Created by dell on 2017/11/4.
 */
   $(function () {
      $.ajax({
          type:"get",
          url:"/user/queryUserMessage",
          success:function (data) {
              tools.checkLogin(data);
              console.log(data);
              $(".userinfo").html(template("tpl",data));
          }
      });

   //   退出
       $(".logout").on("click",function () {
           mui.confirm("确定要退出么","温馨提示",["是","否"],function (e) {
               if(e.index === 1){
                   mui.toast("操作取消")
               }else{
                   $.ajax({
                       type:"get",
                       url:"/user/logout",
                       success:function (data) {
                           // console.log(data);
                           if(data.success){
                               location.href = "login.html";
                           }
                       }
                   });
               }
           })
       })
   });