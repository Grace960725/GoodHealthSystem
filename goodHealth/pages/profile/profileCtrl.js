/**
 * Created by GraceHan on 16/10/10.
 */

$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */

    fillUserBoard();

    /**请求活动列表
     */
    userInfoInit();

});

function userInfoInit(){
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "social_getUserProfile",
            userid: window.localStorage.getItem("profileUserId")
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../error/403.html';
            }
            if(data['msg']=="success"){
                var userInfo=data[0][0];

                var activityList=data['activityInfo'];

                var tmp_Interest="";
                if(userInfo['interest_run']==1){
                    tmp_Interest+=" 跑步";
                }
                if(userInfo['interest_jog']==1){
                    tmp_Interest+=" 慢跑";
                }
                if(userInfo['interest_swim']==1){
                    tmp_Interest+=" 游泳";
                }
                if(userInfo['interest_bicycle']==1){
                    tmp_Interest+=" 自行车";
                }
                if(userInfo['interest_ropeskip']==1){
                    tmp_Interest+=" 跳绳";
                }

                var TEMPLATE="<div class='profile-image' style='margin-left:25%'>"+
                    "<img src='"+
                    "../../img/"+userInfo['image']+"'"+
                    "' class='img-circle circle-border m-b-md' alt='profile'></div><div class='profile-info' style='margin-left:10px;'>"
                    +"<div><div><h2>"+userInfo['username']+
                    "</h2><h4>"+
                    "兴趣:"+tmp_Interest+
                    "</h4><h4>" +
                    "地区: "+userInfo['city']+
                    "</h4></div></div></div>";

                $("#basicProfile").append(TEMPLATE);



                //开始进行动态填充活动轨迹
                TEMPLATE="";
                for(var i=0;i<activityList.length;i++) {
                    //进行活动是否过期的判断
                    if(compareTime(getNowFormatDate(),activityList[i]['starttime'])) {
                        TEMPLATE += "<div class='vertical-timeline-block'>" +
                            "<div class='vertical-timeline-icon navy-bg'><i class='fa fa-paw'></i></div>" +
                            "<div class='vertical-timeline-content'><h3>" + activityList[i]["name"] +
                            "<span class='pull-right text-right'><span class='label label-success pull-right'>进行中</span></span></h3>" +
                            "<div class='ibox-content'>" +
                            "<h4>" + activityList[i]["type"] + "类</h4>" +
                            "<h4><i class='fa fa-clock-o'></i>" + activityList[i]["starttime"] + " 至 " + activityList[i]["endtime"] + "</h4> " +
                            "<h4><i class='fa fa-location-arrow'></i>" + activityList[i]["place"] + "</h4>" +
                            "<h4><i class='fa fa-user'></i> 发起用户:" + activityList[i]["proposerid"] + "</h4>" +
                            "<h4>总人数:" + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                            "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                            "</p></div></div></div>";

                    }
                }

                for(var i=0;i<activityList.length;i++) {
                    if(!compareTime(getNowFormatDate(),activityList[i]['starttime'])) {
                        TEMPLATE += "<div class='vertical-timeline-block'>" +
                            "<div class='vertical-timeline-icon navy-bg'><i class='fa fa-paw'></i></div>" +
                            "<div class='vertical-timeline-content'><h3>" + activityList[i]["name"] +
                            "<span class='pull-right text-right'><span class='label label-success pull-right'>已结束</span></span></h3>" +
                            "<div class='ibox-content'>" +
                            "<h4>" + activityList[i]["type"] + "类</h4>" +
                            "<h4><i class='fa fa-clock-o'></i>" + activityList[i]["starttime"] + " 至 " + activityList[i]["endtime"] + "</h4> " +
                            "<h4><i class='fa fa-location-arrow'></i>" + activityList[i]["place"] + "</h4>" +
                            "<h4><i class='fa fa-user'></i> 发起用户:" + activityList[i]["proposerid"] + "</h4>" +
                            "<h4>总人数:" + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                            "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                            "</p></div></div></div>";
                    }
                }
                $("#vertical-timeline").append(TEMPLATE);
            }
            else {
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
}
// function goToUserProfile(friendID){
//     localStorage.userName="";
//     toUserProfile();
// }

function addFriend(friendID) {
    swal({
        title: "确定添加该好友?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "get",
            url: "/goodHealth/php/userServiceController.php",
            data: {
                func: "addNewFriend",
                newfriendid: friendID,
                userid: window.localStorage.getItem("userid")
            },
            cache: false,
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../error/403.html';
                }
                if(data['msg']=="success"){
                    userList=data[0];
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
        swal({
            title: "成功发送好友请求!",
            text: "该用户将会收到您的好友请求",
            timer: 2000,
            showConfirmButton: false });
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

//判断日期，时间大小
function compareTime(startDate, endDate) {
    // console.log(startDate);
    if (startDate.length > 0 && endDate.length > 0) {
        var startDateTemp = startDate.split(" ");
        var endDateTemp = endDate.split(" ");

        var arrStartDate = startDateTemp[0].split("-");
        var arrEndDate = endDateTemp[0].split("-");

        var arrStartTime = startDateTemp[1].split(":");
        var arrEndTime = endDateTemp[1].split(":");

        var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);

        if (allStartDate.getTime() >= allEndDate.getTime()) {
            // alert("startTime不能大于endTime，不能通过");
            return false;
        } else {
            // alert("startTime小于endTime，所以通过了");
            return true;
        }
    } else {
        // alert("时间不能为空");
        return false;
    }
}