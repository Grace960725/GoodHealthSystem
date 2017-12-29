/**
 * Created by GraceHan on 16/10/10.
 */
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
