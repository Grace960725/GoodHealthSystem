/**
 * Created by GraceHan on 16/10/10.
 * 因为管理员的逻辑和用户的逻辑不属于同一套流程,所以把所有的管理员控制逻辑放在本文件中
 */
$(document).ready(function(){
    fillUserBoard();

    $.ajax({
        type: "get",
        url: "/goodHealth/php/adminServiceController.php",
        data: {
            func: "getAllUsers"
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../pages/error/403.html';
            }
            if(data['msg']=="success"){
                userList=data[0];
                userBoardInit(userList);

            } else {
                swal({
                    title: "数据加载失败,请稍后重试",
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

function userBoardInit(list){
    var TEMPLATE=null;
    $("#userInfoBoard").empty();

    if(list.length%2==0) {
        TEMPLATE = "";
        for (var i = 0; i < list.length; i+=2) {
            TEMPLATE += "<div class='row'><div class='col-lg-2'></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
                "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i]['image'].replace("-small", "") + "'></div></div>" +
                "<div class='col-sm-8'><h3><strong>" + list[i]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
                list[i]['email'] +
                "<br><br></address></div><div class='clearfix text-center'>" +
                "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i]['userid'] + ")'>查看资料</button>" +
                "<button  class='btn btn-outline btn-success' onclick='deleteUser(" + list[i]['userid'] + ")'>删除用户</button>" +
                "</div></div></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
                "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i+1]['image'].replace("-small", "") + "'></div></div>" +
                "<div class='col-sm-8'><h3><strong>" + list[i+1]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
                list[i+1]['email'] +
                "<br><br></address></div><div class='clearfix text-center'>" +
                "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i+1]['userid'] + ")'>查看资料</button>" +
                "<button  class='btn btn-outline btn-success' onclick='deleteUser(" + list[i+1]['userid'] + ")'>删除用户</button>" +
                "</div></div></div><div class='col-lg-2'></div></div>";
        }
    }

    if(list.length%2!=0) {
        TEMPLATE = "";
        for (var i = 0; i < list.length-1; i+=2) {
            TEMPLATE += "<div class='row'><div class='col-lg-2'></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
                "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i]['image'].replace("-small", "") + "'></div></div>" +
                "<div class='col-sm-8'><h3><strong>" + list[i]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
                list[i]['email'] +
                "<br><br></address></div><div class='clearfix text-center'>" +
                "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i]['userid'] + ")'>查看资料</button>" +
                "<button  class='btn btn-outline btn-success' onclick='deleteUser(" + list[i]['userid'] + ")'>删除用户</button>" +
                "</div></div></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
                "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i+1]['image'].replace("-small", "") + "'></div></div>" +
                "<div class='col-sm-8'><h3><strong>" + list[i+1]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
                list[i+1]['email'] +
                "<br><br></address></div><div class='clearfix text-center'>" +
                "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i+1]['userid'] + ")'>查看资料</button>" +
                "<button  class='btn btn-outline btn-success' onclick='deleteUser(" + list[i+1]['userid'] + ")'>删除用户</button>" +
                "</div></div></div><div class='col-lg-2'></div></div>";
        }
        TEMPLATE += "<div class='row'><div class='col-lg-2'></div>"+
            "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
            "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i]['image'].replace("-small", "") + "'></div></div>" +
            "<div class='col-sm-8'><h3><strong>" + list[i]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
            list[i]['email'] +
            "<br><br></address></div><div class='clearfix text-center'>" +
            "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i]['userid'] + ")'>查看资料</button>" +
            "<button  class='btn btn-outline btn-success' onclick='deleteUser(" + list[i]['userid'] + ")'>删除用户</button>" +
            "</div></div></div><div class='col-lg-6'></div>";
    }

    $("#userInfoBoard").append(TEMPLATE);

}

function deleteUser(userID){
    swal({
        title: "确定删除该用户?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "get",
            url: "/goodHealth/php/adminServiceController.php",
            data: {
                userid: userID,        //+1是因为数据库的编号从1开始
                func: "deleteUser"
            },
            cache: false,
            dataType: "json",
            success: function(data){
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../pages/error/403.html';
                }
                if(data['msg']=="success"){
                    userBoardInit(data[0]);
                    swal("已成功删除该用户!","系统用户列表已更新", "success");

                } else {
                    swal({
                        title: "数据加载失败,请稍后重试",
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

}

function goToUserProfile(userid){
        // localStorage.userName="";
        toUserProfile(userid);
}

//管理举报信息-确认举报处理完成
function confirmReportHandle(reportID){
    swal({
        title: "已成功处理本举报?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "get",
            url: "/goodHealth/php/adminServiceController.php",
            data: {
                reportid:reportID,        //+1是因为数据库的编号从1开始
                func: "confirmHandleReport"
            },
            cache: false,
            dataType: "json",
            success: function(data){
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../pages/error/403.html';
                }
                if(data['msg']=="success"){
                    // reportList=data[0];
                    // reportBoardInit(reportList);
                    swal("举报处理成功!", "", "success");
                    $('#confirmHandleReportBtn'+reportID).attr("disabled",true);
                    $('#confirmHandleReportBtn'+reportID).html("已处理");
                    $('#giveUpHandleReportBtn'+reportID).css("display","none");
                } else {
                    swal({
                        title: "数据加载失败,请稍后重试",
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
}


//用户管理-修改用户密码
function fixUserProfile(userID) {
    window.location.href="adminPasswordReset.html";
}
//用户管理-确认修改用户密码
$("#confirmNewUserInfoBtn").click(function(){
    swal({
        title: "确定更新该账户密码?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        swal("已成功更新用户信息!","", "success");
    });
});

//活动管理
function cancelActivityAlert(activityNum){
    swal({
        title: "确定撤销本活动?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        swal("已成功撤销该活动!", "", "success");
        $('#cancelActivityBtn'+activityNum).attr("disabled",true);
        $('#cancelActivityBtn'+activityNum).html("已撤销");
    });
}
function endedActivityAlert(){
    swal({
        title:"本活动已被撤销!",
    });
}