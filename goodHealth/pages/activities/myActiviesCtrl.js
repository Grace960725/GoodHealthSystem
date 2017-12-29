/**
 * Created by GraceHan on 16/10/10.
 */
$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();
    // $("#userImg").attr('src',"../img/"+window.localStorage.getItem("userimage"));
    // $("#userName").append(window.localStorage.getItem("username"));

    /**请求活动列表
     */
    activityListInit();

});
function activityListInit(){
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getMyActivities",
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
                activityList=data[0];
                console.log(activityList);
                //activityList[0]/[1]...表示一个个单元数据
                //开始进行动态填充
                if(activityList.length==0){
                    $("#hint").css("display","block");
                }else{
                    $("#hint").css("display","none");
                }
                var TEMPLATE="";

                for(var i=0;i<activityList.length;i++) {
                    //进行活动是否过期的判断
                    if(compareTime(getNowFormatDate(),activityList[i]['starttime'])) {
                        TEMPLATE += "<div class='vertical-timeline-block'>" +
                            "<div class='vertical-timeline-icon navy-bg'><i class='fa fa-paw'></i></div>" +
                            "<div class='vertical-timeline-content'><h3>" + activityList[i]["name"] + "</h3>" +
                            "<div class='ibox-content'>" +
                            "<h4>" + activityList[i]["type"] + "类</h4>" +
                            "<h4><i class='fa fa-clock-o'></i>" + activityList[i]["starttime"] + " 至 " + activityList[i]["endtime"] + "</h4> " +
                            "<h4><i class='fa fa-location-arrow'></i>" + activityList[i]["place"] + "</h4>" +
                            "<h4><i class='fa fa-user'></i> 发起用户:" + activityList[i]["proposerid"] + "</h4>" +
                            "<h4>总人数:" + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                            "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                            "<button class='btn btn-w-m btn-primary btn-xs' onclick='giveUpActivityAlert(" + i + ")'>退出活动<i class='fa fa-bolt'></i></button>" +
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
                            "<h4><i class='fa fa-location-arrow'></i>" + activityList[i]["place"] + "</h4>" +
                            "<h4><i class='fa fa-user'></i> 发起用户:" + activityList[i]["proposerid"] + "</h4>" +
                            "<h4>总人数:" + activityList[i]["limit_num"] + "人 | 已报名:" + activityList[i]["joined_num"] + "人</h4>" +
                            "<p style='marigin-right:10px;padding-top: 15px;padding-bottom: 20px;'>"+
                            // "<button class='btn btn-outline btn-default btn-xs' onclick='reportActivity(" + i + ")'>举报</button>" +
                            "<button class='btn btn-w-m btn-default btn-xs' onclick='invalidActivityAlert()'>已结束<i class='fa fa-bolt'></i></button>" +
                            "</p></div></div></div>";
                    }
                }
                $("#vertical-timeline").empty();
                $("#vertical-timeline").append(TEMPLATE);

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
}
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
        $.ajax({
            type: "get",
            url: "/goodHealth/php/userServiceController.php",
            data: {
                func: "giveUpActivity",
                userid: window.localStorage.getItem("userid"),
                activityid:  activityList[activityNum]["activityid"]
            },
            cache: false,
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../error/403.html';
                }
                if(data['msg']=="success"){
                    swal({
                        title: "成功退出活动",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "返回",
                        closeOnConfirm: true
                    },function () {
                        $(".vertical-timeline-block")[activityNum].remove();
                    activityListInit();

                });
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

                }
            }
        });
        swal("已成功退出该活动!", "您仍可以到'所有活动'区域查看活动详情", "success");
    });
}

function endedActivityAlert(){
    swal({
        title:"本活动已结束!",
    });
}

function toogle_tooltype(){
    $('#proposerName').attr("placeholder",window.localStorage.getItem("username"));
    $('#Float_button').toggleClass('active');
    $('.BG_darkfilter').toggleClass('active');
    $('.tooltype').toggleClass('active');

}
function toogle_tooltype_fade(){
    //用于从填写新活动信息处进行返回
    $('#Float_button').toggleClass('active');
    $('.BG_darkfilter').toggleClass('active');
    $('.tooltype').toggleClass('active');
}

function blankAlert(blankName){
    swal({
        title: blankName+"不能为空",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "返回",
        closeOnConfirm: true
    });
}

/**
 * 上传新活动
 */
$("#confirmNewAcitivityBtn").click(function () {
    var activityName=$("#activityName").val();
    var activityPlace=$("#activityPlace").val();
    var activityType=$("#activityType").val();
    var activityStartDate=$("#activityStartDate").val();
    var activityStartTime=activityStartDate+" "+$("#activityStartTime").val();
    var activityEndDate=$("#activityEndDate").val();
    var activityEndTime=activityEndDate+" "+$("#activityEndTime").val();
    var activityLimitNum=$("#activityLimitNum").val();


    if(!activityName){
        blankAlert("活动名");
        return;
    }
    if(!activityPlace){
        blankAlert("活动地点");
        return;
    }
    if(!activityType){
        blankAlert("活动类型");
        return;
    }
    if(!activityStartDate){
        blankAlert("活动开始日期");
        return;
    }
    if(!activityStartTime){
        blankAlert("活动开始时间");
        return;
    }
    if(!activityEndDate){
        blankAlert("活动结束日期");
        return;
    }
    if(!activityEndTime){
        blankAlert("活动结束时间");
        return;
    }
    if(!activityLimitNum){
        blankAlert("活动人数上限");
        return;

    }


    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "addActivity",
            userid: window.localStorage.getItem("userid"),
            username: window.localStorage.getItem("username"),
            activityname: activityName,
            activityplace: activityPlace,
            activitytype: activityType,
            starttime: activityStartTime,
            endtime: activityEndTime,
            limitnum: activityLimitNum
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../pages/error/403.html';
            }
            if(data['msg']=="success"){
                console.log(data);
                swal({
                        title: "活动创建成功,您可以到所有活动区查看该活动",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "返回",
                        closeOnConfirm: true
                }
                 );
                toogle_tooltype_fade();
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

// function addActivity(){
    // 添加活动,需要在activity表中插入,创建者不会被自动加入活动
    // $('a#Float_button').toggleClass('active');
    // $('.BG_darkfilter').toggleClass('active');
    // $('.tooltype').toggleClass('active');
// }


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
    if(startDate==null){
        return true;
    }
    if(endDate==null){
        return true;
    }
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