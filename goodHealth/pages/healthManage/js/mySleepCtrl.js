/**
 * Created by GraceHan on 16/10/10.
 */
$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();
    // sleepDataInjection();

    /**请求最近一次的睡眠信息
     */
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getSleepInfo",
            userid: window.localStorage.getItem("userid")
        },
        cache: false,
        dataType: "json",
        success: function(data){
            sleepInfo=data;
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }
            var startTime="00:00";
            var endTime="00:00";
            var totalTime_hour="0";
            var totalTime_minute="0";
            var effectiveTime_hour="0";
            var effectiveTime_minute="0";
            var rate=0;
            if(data['msg']=="success"){
                console.log(sleepInfo);
                startTime=sleepInfo['starttime'];
                endTime=sleepInfo['endtime'];
                totalTime_hour=sleepInfo['time_h'];
                totalTime_minute=sleepInfo['time_m'];
                effectiveTime_hour=sleepInfo['effectivetime_h'];
                effectiveTime_minute=sleepInfo['effectivetime_m'];
                rate=sleepInfo['rate'];
            }

            $("#starttime").append("<span style='font-size: 25px;'>"+startTime['startHour']+
                                    "</span>时<span style='font-size: 25px;'>"+startTime['startMinute']+"</span>分"+
                "</br></br>"+startTime['startYear']+"年"+startTime['startMonth']+"月"+startTime['startDate']+"日");
            $("#endtime").append("<span style='font-size: 25px;'>"+endTime['endHour']+
                "</span>时<span style='font-size: 25px;'>"+endTime['endMinute']+"</span>分"+
                "</br></br>"+endTime['endYear']+"年"+endTime['endMonth']+"月"+endTime['endDate']+"日");
            $("#time").append("<span style='font-size: 25px;'>"+totalTime_hour+
                        "</span>小时<span style='font-size: 25px;'> "+totalTime_minute+"</span>分</br></br></br>");
            $("#effectivetime").append("<span style='font-size: 25px;'>"+effectiveTime_hour+
                "</span>小时<span style='font-size: 25px;'> "+effectiveTime_minute+"</span>分</br></br></br>");
            $("#rate").append(rate+"%");
            $("#sparkline5").sparkline([rate, 100-rate], {
                type: 'pie',
                height: '140',
                sliceColors: ['#1ab394', '#F5F5F5']
            });
            // 7<span style="font-size: 5px;"> 小时 </span>0<span style="font-size: 5px;"> 分钟</span>
            // $("#time").append(totalTime+"小时");
            // $("#calories").append(totalCalorie+"大卡");
            // $("#circle").append(totalCircle+"圈");
            // $("#fat").append(totalFat+"斤");
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
 * 本方法用于注入睡眠数据
 */
function sleepDataInjection(){
    $.ajax({
        type: "post",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "addSleepInfo",
            userid: "3",
            starttime: "2016-11-03 23:45:00",
            endtime: "2016-11-04 07:40:00",
            rate: "0.9"
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }

            if(data['msg']=="success"){
                console.log("inject success");
            }
        }
    });
}