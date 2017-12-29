/**
 * Created by GraceHan on 16/10/10.
 */
$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();
});

$("#newPassword").focus(function(){

    if(!$("#currentPassword").val()){
        swal({
            title: "请先输入您的当前密码",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            cancelButtonText: "返回",
            closeOnConfirm: true
        });
    }else{
        $.ajax({
            type: "get",
            url: "../../php/login_registerServiceController.php",
            data: {
                func:"login",
                email: window.localStorage.getItem("useremail"),
                password: $("#currentPassword").val()+""
            },
            cache: false,
            dataType: "json",
            success: function(data){

                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../error/403.html';
                }
                if(data['msg']=="success"){
                    console.log(data);
                } else {
                    swal({
                        title: "当前密码错误",
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
});

$("#confirmNewPasswordBtn").click(function(){
    // resetUserPassword(){
    //     $userid=$_GET['userid'];
    //     $newPassword=$_GET['newPassword'];
    $.ajax({
        type: "get",
        url: "../../php/userServiceController.php",
        data: {
            func:"resetUserPassword",
            userid: window.localStorage.getItem("userid"),
            newPassword: $("#newPassword").val()+""
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../error/403.html';
            }
            if(data['msg']=="success"){
                console.log(data);
                swal({
                    title: "密码更新成功",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                });
            } else {
                swal({
                    title: "密码更新失败,请稍后重试",
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
});