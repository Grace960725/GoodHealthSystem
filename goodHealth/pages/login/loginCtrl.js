/**
 * Created by GraceHan on 16/10/10.
 */
/**
 * 登录逻辑
 */

$.ajaxSetup({cache:false});

/**
 * 闭包
 */
var pubkey=(function () {
    return "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgZSW86OCONmQu3W+cVSW3roHP" +
        "gIUxP0tSjPuME13SuToHEmPxWu+PpUbd6Ln8hSdFV8Lz0bVXczTPAaqNnIpE4ZQc" +
        "mU63TQZkzW2uc4R1GaZUNXcLe5SRlOcV8MXF8l5OgLq0Lca1dvjjUKkcIsHmnP0j" +
        "jErzwoj6Dsd9h/yQdQIDAQAB" +
        "-----END PUBLIC KEY-----"
})();

function login() {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    var encrypted = encrypt.encrypt($("#logInUserPassword").val()+"");

    $.ajax({
        type: "get",
        url: "../../php/login_registerServiceController.php",
        data: {
            func:"login",
            email: $("#logInUserEmail").val()+"",
            password: encrypted
        },
        cache: false,
        dataType: "json",
        success: function(data){
            //此处需要判断是否为管理员账号,如果是管理员账号就要跳进管理员页面
            console.log(data);
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../error/403.html';
            }
            if(data['msg']=="success"){
                console.log(data);
                window.localStorage.setItem("userid",data['userid']);
                window.localStorage.setItem("profileUserId",data['userid']);
                window.localStorage.setItem("username",data['username']);
                window.localStorage.setItem("useremail",data['useremail']);
                window.localStorage.setItem("userid",data['userid']);
                window.localStorage.setItem("userimage",data['image']);
                if(data['isadmin']=="1"){
                    window.location.href='../admin/admin.html';
                }else{
                    window.location.href='../index.html';
                }
            } else {
                swal({
                    title: "用户名或密码错误",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                });
                //提示验证有误,提示重新输入用户邮箱和密码
            }
        }
    });

}