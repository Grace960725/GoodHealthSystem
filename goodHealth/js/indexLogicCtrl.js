/**
 * Created by GraceHan on 16/10/10.
 */
var activityList;

$(document).ready(function(){
     /**
      * 填充用户头像和用户名
      */
    fillUserBoard();

    // $("#userImg").attr('src',"../img/"+window.localStorage.getItem("userimage"));
    // $("#userName").append(window.localStorage.getItem("username"));

    /**请求活动列表
     */
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getAllActivities"
        },
        cache: false,
        dataType: "json",
        success: function(data){

            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../pages/error/403.html';
            }
            if(data['msg']=="success"){
                activityList=data[0];
                // console.log(activityList);
                fillActivityBoard(activityList)

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

function fillActivityBoard(activityList){
    var TEMPLATE="";

    console.log(activityList.length);
    for(var i=0;i<activityList.length;i++) {
        //进行活动是否过期的判断
        if(compareTime(getNowFormatDate(),activityList[i]['starttime'])) {
            TEMPLATE += "<div class='vertical-timeline-block'>" +
                "<div class='vertical-timeline-icon navy-bg'><i class='fa fa-paw'></i></div>" +
                "<div class='vertical-timeline-content'><h3>" + activityList[i]["name"] + "</h3>" +
                "<div class='ibox-content'>" +
                "<h4>" + activityList[i]["type"] + "类</h4>" +
                "<h4><i class='fa fa-clock-o'></i>" + activityList[i]["starttime"] + " 至 " + activityList[i]["endtime"] + "</h4> " +
                "<h4><i class='fa fa-location-arrow'></i> 地点: " + activityList[i]["place"] + "</h4>" +
                "<h4><i class='fa fa-user'></i> 发起用户: " + activityList[i]["proposername"] + "</h4>" +
                "<h4>总人数: " + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                "<button class='btn btn-outline btn-default btn-xs' onclick='reportActivity(" + i + ")'>举报</button>" +
                "<button class='btn btn-w-m btn-primary btn-xs' onclick='joinActivityAlert(" + i + ")'>现在报名<i class='fa fa-bolt'></i></button>" +
                "</p></div></div></div>";

        }
    }
    for(var i=0;i<activityList.length;i++) {
        if(!compareTime(getNowFormatDate(),activityList[i]['starttime'])) {
            TEMPLATE += "<div class='vertical-timeline-block'>" +
                "<div class='vertical-timeline-icon navy-bg'><i class='fa fa-paw'></i></div>" +
                "<div class='vertical-timeline-content'><h3>" + activityList[i]["name"] + "</h3>" +
                "<div class='ibox-content'>" +
                "<h4>" + activityList[i]["type"] + "类</h4>" +
                "<h4><i class='fa fa-clock-o'></i>" + activityList[i]["starttime"] + " 至 " + activityList[i]["endtime"] + "</h4> " +
                "<h4><i class='fa fa-location-arrow'></i> 地点: " + activityList[i]["place"] + "</h4>" +
                "<h4><i class='fa fa-user'></i> 发起用户: " + activityList[i]["proposername"] + "</h4>" +
                "<h4>总人数: " + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                // "<button class='btn btn-outline btn-default btn-xs' onclick='reportActivity(" + i + ")'>举报</button>" +
                "<button class='btn btn-w-m btn-default btn-xs' onclick='invalidActivityAlert()'>已结束<i class='fa fa-bolt'></i></button>" +
                "</p></div></div></div>";
        }
    }
    $("#vertical-timeline").empty();
    $("#vertical-timeline").append(TEMPLATE);
}
/**
 * 提示活动已经过期
 */
 function invalidActivityAlert(){
    swal({
        title: "该活动已结束",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "返回",
        closeOnConfirm: true
    });
}

/**
 * 加入活动
 * @param activityNum
 */
function joinActivityAlert(activityNum){
    swal({
        title: "确定加入本活动?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false
    }, function () {
        //在点击报名活动的时候,要告诉用户是否已经参加过该活动。
        $.ajax({
            type: "get",
            url: "/goodHealth/php/userServiceController.php",
            data: {
                func: "registerActivity",
                activityid: activityList[activityNum]["activityid"],
                userid: window.localStorage.getItem("userid")
            },
            cache: false,
            dataType: "json",
            success: function(data){
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../pages/error/403.html';
                }
                if(data['msg']=="success"){
                    console.log(data);
                   if(data['duplicate']){
                       swal({
                           title: "您已经是该活动成员,无需重复报名",
                           type: "warning",
                           showCancelButton: true,
                           confirmButtonColor: "#DD6B55",
                           confirmButtonText: "确定",
                           cancelButtonText: "返回",
                           closeOnConfirm: true
                       });
                   }else{
                       // activityList=data[0];
                       swal({
                           title: "报名成功,您可以到我的活动版块查看",
                           type: "success",
                           showCancelButton: true,
                           confirmButtonColor: "#DD6B55",
                           confirmButtonText: "确定",
                           cancelButtonText: "返回",
                           closeOnConfirm: true
                       });
                       fillActivityBoard(data[0]);
                   }
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
        swal("已成功加入活动!", "您可以到'我的活动'区域查看活动详情", "success");
    });
}

var reportIndex;
function reportActivity(activityNum){
    /**
     * 闭包
     */
    reportIndex=(function(){
        return activityNum;
    })();

    $('#activitiesBoard').fadeOut(300);
    $('#reportBoard').fadeIn(300);
    console.log("ready");
    $("#reportActivityName").attr("placeholder",activityList[activityNum]['name']);
}

$('#cancelReport').click(function(){
    $('#reportBoard').fadeOut(300);
    $('#activitiesBoard').fadeIn(300);
});

$('#confirmReport').click(function(){
    var userid=window.localStorage.getItem("userid");
    var name=$('#reportActivityName').val();
    var reason=$('#reportReason').val();
    console.log(name+" "+reason);

    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "reportActivity",
            activityid: activityList[reportIndex]["activityid"],
            activityName: activityList[reportIndex]["name"],
            userid: window.localStorage.getItem("userid"),
            userName: window.localStorage.getItem("username"),
            reason: reason
        },
        cache: false,
        dataType: "json",
        success: function(data){
            console.log(data);
            console.log(data['duplicate']);
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../pages/error/403.html';
            }
            if(data['duplicate']){
                swal({
                    title: "您已举报过该活动,请勿重复举报",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                });
                return;
            }
            if(data['msg']=="success"){
                swal({
                        title: "举报成功,您的举报正在被处理!!",
                        type: "success",
                        text: "本对话框将在2秒内关闭.",
                        timer: 2000,
                        showConfirmButton: false,
                    }
                );
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



    $('#reportBoard').css("display","none");
    $('#activitiesBoard').fadeIn(300);

});

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
    console.log(startDate);
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