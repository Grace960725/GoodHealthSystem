/**
 * Created by GraceHan on 16/10/10.
 */
/**
 * 注册逻辑
 */

function register() {
    /**
     * 使用正则表达式+闭包来检验电子邮件合法性
     */
    var validEmail=(function( email_address ) {
        var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if ( regex.test( email_address ) )
        {
            return true;
        }
        else
        {
            return false;
        }
    })($("#regUserEmail").val()+"");

    if(!validEmail){
        swal({
            title: "您的邮箱地址不合法",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "返回",
            closeOnConfirm: true
        });

    } else {
        if (!$("#agreeItem").is(":checked")) {
            swal({
                title: "请阅读并确认条款",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "返回",
                closeOnConfirm: true
            });
        } else {
            $.ajax({
                type: "get",
                url: "/goodHealth/php/login_registerServiceController.php",
                data: {
                    func: "register",
                    username: $("#regUserName").val() + "",
                    email: $("#regUserEmail").val() + "",
                    password: $("#regUserPassword").val() + ""
                },
                dataType: "json",
                ajaxCache: false,
                cache: false,
                success: function (data) {
                    //此处需要判断用户名和邮箱是否已经被注册
                    console.log(data);
                    if (data['status'] == 403) {//恶意ip访问控制的响应
                        window.location.href = '../error/403.html';
                    }
                    if (!data['duplicate']) {
                        swal({
                                title: "注册成功,即将前往登录页面",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定",
                                cancelButtonText: "返回",
                                closeOnConfirm: false
                            },
                            function () {
                                window.location.href = '../login/login.html';
                            });
                    } else {
                        console.log("exist!");
                        swal({
                            title: "用户名或邮箱已注册",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定",
                            cancelButtonText: "返回",
                            closeOnConfirm: true
                        });
                    }
                }
            });
        }

    }
}