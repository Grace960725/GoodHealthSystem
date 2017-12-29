/**
 * Created by GraceHan on 16/10/10.
 */



$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();
    $("#Email").attr("placeholder",window.localStorage.getItem("useremail"));
    $("#newName").attr("placeholder",window.localStorage.getItem("username"));
});

function goToUserProfile(friendID){
    localStorage.userName="";
    toUserProfile();
}

$("#confirmNewInfoBtn").click(function(){
    var interestList= $("#interestSelect").select2("val");
    var city= $("#citySelect").select2("val");
    // ["interest_bicycle", "interest_run", "interest_ropeskip"]
    var sex=$(':radio[name="sex"]:checked').val();

    /**
     * 闭包,把用户名的处理逻辑隐藏起来
     */
    var newName=(function(){
        if(!$("#newName").val()) {
            console.log("null");
            return window.localStorage.getItem("username");
        }else{
            console.log("NOT null");
            return $("#newName").val();
        }
    })();

    $.ajax({
        type: "get",
        url: "../../php/userServiceController.php",
        data: {
            func:"resetUserInfo",
            userid: window.localStorage.getItem("userid"),
            username:newName,
            sex: sex,
            interests: interestList,
            city: city
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
                swal({
                    title: "用户信息更新成功",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                });
            } else {
                swal({
                    title: "头像更新失败,请稍后重试",
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

function resetLogo() {
    //只实现了将文件名进行存储,所以本地读取时要注意路径问题
    $.ajax({
        type: "get",
        url: "../../php/userServiceController.php",
        data: {
            func:"resetUserLogo",
            userid:"1",
            imgPath: window.localStorage.getItem("logoPath").replace(".jpg", "-small.jpg")
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
                swal({
                    title: "头像更新成功",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                }, function(){
                    window.localStorage.setItem("userimage",window.localStorage.getItem("logoPath").replace(".jpg", "-small.jpg"));
                    fillUserBoard();
                    $("#profileBoard").fadeOut(100);
                    $("#profileBoard").fadeIn(100);
                });

            } else {
                swal({
                    title: "头像更新失败,请稍后重试",
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
