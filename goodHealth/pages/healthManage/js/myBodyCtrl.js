/**
 * Created by GraceHan on 16/10/10.
 */
$(document).ready(function(){
    /**
     * 填充用户头像和用户名
     */
    fillUserBoard();
    /**请求健康信息
     */
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getBMI",
            userid: window.localStorage.getItem("userid")
        },
        cache: false,
        dataType: "json",
        success: function(data){
            var bmi=0;
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }
            if(data['msg']=="success"){
               bmi=data[0][0]['bmi'];
                paint(bmi);
            }else{
                swal({
                    title: "还没有您的身体信息哦",
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


});
function paint(bmi){
    $("#bmiInfo").append("BMI: "+bmi);
    FusionCharts.ready(function(){
        var fusioncharts = new FusionCharts({
                type: 'hlineargauge',
                renderAt: 'chart-container',
                id: 'BMI_gauge',
                width: '100%',
                height: '150',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "theme": "fint",
                        "caption": "BMI指数",
                        "lowerLimit": "10",
                        "upperLimit": "40",
                        "chartBottomMargin": "40",
                        "valueFontSize": "11",
                        "valueFontBold": "0"
                    },
                    "colorRange": {
                        "color": [{
                            "minValue": "0",
                            "maxValue": "18.5",
                            "label": "偏轻",
                            "code": "#83B7D5"
                        }, {
                            "minValue": "18.5",
                            "maxValue": "24",
                            "label": "健康",
                            "code":"#9DC56A",
                        }, {
                            "minValue": "24",
                            "maxValue": "28",
                            "label": "超重",
                            "code":"#E3BD65",
                        }, {
                            "minValue": "28",
                            "maxValue": "40",
                            "label": "超重",
                            "code":"#D88083",
                        }]
                    },
                    "pointers": {
                        "pointer": [{
                            "value": ""+bmi
                        }]
                    },
                }
            }
        );
        fusioncharts.render();
});

}

function calculateBMI() {
    $('#weight').val();
    $('#height').val();
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "addBMI",
            userid: window.localStorage.getItem("userid"),
            weight: $('#weight').val()+"",
            height: $('#height').val()+""
        },
        cache: false,
        dataType: "json",
        success: function(data){
            var bmi=0;
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../../pages/error/403.html';
            }
            if(data['msg']=="success"){
                console.log("hi");
                bmi=data['bmi'];
                console.log(bmi);
                location.reload();
            }else{
                swal({
                    title: "服务器忙,请重试",
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
        swal("已成功退出该活动!", "您仍可以到'所有活动'区域查看活动详情", "success");
    });
}
function endedActivityAlert(){
    swal({
        title:"本活动已结束!",
    });
}
