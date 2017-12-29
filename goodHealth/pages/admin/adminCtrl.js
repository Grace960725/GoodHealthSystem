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
            func: "getAllReports"
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../pages/error/403.html';
            }
            if(data['msg']=="success"){
                reportList=data[0];
                reportBoardInit(reportList);

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

function reportBoardInit(reportList){
    var TEMPLATE="";

    for(var i=0;i<reportList.length;i++){
         TEMPLATE+="<div class='ibox'>"+
                    "<div class='ibox-title'><h3>活动举报</h3></div>"+
                    "<div class='ibox-content'>"+
             "<form class='form-horizontal' onsubmit='return false'>" +
             "<div class='form-group'><label class='col-lg-2 control-label'>活动名称</label>" +
             "<div class='col-lg-10'>"+
             "<input placeholder='"+reportList[i]['activityname']+
             "' class='form-control' disabled='disabled'>" +
             "</div></div>" +
             "<div class='form-group'><label class='col-lg-2 control-label'>举报理由</label>"+
             "<div class='col-lg-10'><textarea placeholder='"+reportList[i]['reason']+"' class='form-control' disabled='disabled'></textarea></div>"+
             "</div><div class='form-group'><div class='col-lg-offset-2 col-lg-10'></div></div>" +
             "<div class='form-group'><div class='col-lg-offset-2 col-lg-10'>"+
             "<button class='btn btn-sm btn-success' id='confirmHandleReportBtn"+reportList[i]['reportid']+"' onclick='confirmReportHandle("+reportList[i]['reportid']+")'>确认处理</button>"+
             "</div></div></form></div></div>";
    }

    $("#reportBoard").append(TEMPLATE);
    $('#reportBoard').fadeIn(300);

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

//管理举报信息-忽略举报信息
// function giveUpReportHandle(reportID){
//     swal({
//         title: "确认忽略本举报?",
//         type: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#DD6B55",
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         closeOnConfirm: false
//     }, function () {
//         $.ajax({
//             type: "get",
//             url: "/goodHealth/php/adminServiceController.php",
//             data: {
//                 reportid:reportID,
//                 func: "confirmHandleReport"
//             },
//             cache: false,
//             dataType: "json",
//             success: function(data){
//                 if(data['status']==403){//恶意ip访问控制的响应
//                     window.location.href='../pages/error/403.html';
//                 }
//                 if(data['msg']=="success"){
//                     swal("举报忽略成功!", "", "success");
//                     $('#confirmHandleReportBtn'+reportID).attr("disabled",true);
//                     $('#confirmHandleReportBtn'+reportID).html("已忽略");
//                     $('#giveUpHandleReportBtn'+reportID).css("display","none");
//                 } else {
//                     swal({
//                         title: "数据加载失败,请稍后重试",
//                         type: "warning",
//                         showCancelButton: true,
//                         confirmButtonColor: "#DD6B55",
//                         confirmButtonText: "确定",
//                         cancelButtonText: "返回",
//                         closeOnConfirm: true
//                     });
//                     //提示验证有误,提示重新输入用户邮箱和密码
//                 }
//             }
//         });
//
//
//     });
// }


//用户管理-删除用户
function deleteUser(userID) {
    swal({
        title: "确定删除该用户?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        swal("已成功删除该用户!","系统用户列表已更新", "success");
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

function endedActivityAlert(){
    swal({
        title:"本活动已被撤销!",
    });
}