/**
 * Created by GraceHan on 16/10/10.
 */
$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();

    // activityDataInjection("5001",30.0,100.0,1000.0);

    /**请求运动信息
     */
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getActivityAmount",
            userid: window.localStorage.getItem("userid")
        },
        cache: false,
        dataType: "json",
        success: function(data){
            sportsInfo=data;
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }
            var totalTime="0小时";
            var totalDistance="0千米";
            var totalCalorie="0大卡";
            if(data['msg']=="success"){
                console.log(sportsInfo);
                totalTime=sportsInfo['time'];
                totalDistance=sportsInfo['distance'];
                totalCalorie=sportsInfo['calorie'];
                totalCircle=sportsInfo['circle'];
                totalFat=sportsInfo['fat'];
            }
            $("#distance").append(totalDistance+"千米");
            $("#time").append(totalTime+"小时");
            $("#calories").append(totalCalorie+"大卡");
            $("#circle").append(totalCircle+"圈");
            $("#fat").append(totalFat+"斤");
        }
    });

});

function giveUpActivityAlert(activityNum){
    swal({
        title: "确定退出本活动?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        swal("已成功退出该活动!", "您仍可以到'所有活动'区域查看活动详情", "success");
    });
}
function endedActivityAlert(){
    swal({
        title:"本活动已结束!",
    });
}

/**
 * 本方法用于注入运动数据
 */
function activityDataInjection(userid,time,distance,calories){

    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "addActivityAmount",
            userid: userid,
            time: time+"",
            distance: distance+"",
            calories: calories+""
        },
        cache: false,
        dataType: "json",
        success: function(data){
            sportsInfo=data;
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }

            if(data['msg']=="success"){
                console.log("inject success");

            }
        }
    });
}
