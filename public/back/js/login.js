/**
 * Created by dell on 2017/10/29.
 */


$(function () {
    //1.使用表单校验插件
    var $form = $('#lt_form');
    $form.bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },
            password:{
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    //长度校验
                    stringLength:{
                        min:4,
                        max:30,
                        message:"密码长度在6-20之间"
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }

    });

    var validator = $form.data('bootstrapValidator');
   //2. 给表单注册一个校验成功的事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    location.href = "index.html"
                }else{
                    //使用js代码让username这个字段校验失败。
                    //第一个参数：name属性
                    //第二个参数：INVALID    VALID
                    //第三个参数：
                    if(data.error === 1000){
                        validator.updateStatus("username", "INVALID", "callback");
                    }

                    if(data.error === 1001){
                        validator.updateStatus("password", "INVALID", "callback");
                    }
                }
            }
        })
    });


    //3. 表单重置功能
    $("[type='reset']").on('click',function () {
        validator.resetForm();
    })
});