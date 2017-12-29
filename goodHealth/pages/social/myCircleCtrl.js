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
    circleListInit();

});
var bicycleList=[];
var runList=[];
var jogList=[];
var swimList=[];
var ropeskipList=[];
var tabTitle=["自行车圈","跑步圈","慢跑圈","游泳圈","跳绳圈"];
var tabIndex=1;

function circleListInit(){
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getAllCircles",
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
                bicycleList=userList['interest_bicycle'];
                runList=userList['interest_run'];
                jogList=userList['interest_jog'];
                swimList=userList['interest_swim'];
                ropeskipList=userList['interest_ropeskip'];
                //activityList[0]/[1]...表示一个个单元数据
                //开始进行动态填充

                // var TEMPLATE=null;
                // var templateTab=null;
                if(bicycleList!=null) {
                    fillTab(bicycleList,"自行车圈");
                    tabIndex++;
                }
                if(runList!=null) {
                    fillTab(runList,"跑步圈");
                    tabIndex++;
                }

                if(jogList!=null) {
                    fillTab(jogList,"慢跑圈");
                    tabIndex++;
                }
                if(swimList!=null) {
                    fillTab(swimList,"游泳圈");
                    tabIndex++;
                }
                if(ropeskipList!=null) {
                    fillTab(ropeskipList,"跳绳圈");
                    tabIndex++;
                }
                $("#circleSection").css("display","block");
            } else {
                swal({
                    title: "您还没有所在的兴趣圈",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "返回",
                    closeOnConfirm: true
                });
                $("#circleSection").css("display","none");
                //提示验证有误,提示重新输入用户邮箱和密码
            }
        }
    });
}
function fillTab(list,tabName){
    var TEMPLATE=null;
    var templateTab=null;
    templateTab = " <a data-toggle='tab' href='full_height.html#tab-"+tabIndex+"' class='text-center'>"+
        "<div align='center'><i class='fa fa-group fa-2x'></i></div><div class='m-b-md text-center'><h2 class='font-bold'>" +
        tabName+"</h2><h3>"+list.length+"位圈内用户</h3></div></a>";
    TEMPLATE="<div class='row'>";
    for (var i = 0; i < list.length; i++) {
        TEMPLATE += "<div class='col-lg-12'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
            "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i]['image'].replace("-small", "") + "'></div></div>" +
            "<div class='col-sm-8'><h3><strong>" + list[i]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
            list[i]['email'] +
            "<br><br></address></div><div class='clearfix text-center'>" +
            "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i]['userid']+ ")'>查看资料</button>" +
            "<button  class='btn btn-outline btn-success' onclick='addFriend(" + list[i]['userid']+ ")'>添加好友</button>" +
            "</div></div></div>"
    }
    TEMPLATE+="</div>";
    $("#tabBtn"+tabIndex).append(templateTab);
    $("#tab-"+tabIndex).append(TEMPLATE);
}

//本方法目前还没有实现,等到profile的填充逻辑完善以后再进行实现
function goToUserProfile(userid){
    // localStorage.userName="";
    toUserProfile(userid);
}

function addFriend(userID) {
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
                newfriendid: userID,
                userid: window.localStorage.getItem("userid")
            },
            cache: false,
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data['status']==403){//恶意ip访问控制的响应
                    window.location.href='../error/403.html';
                }
                if(data['duplicate']=="true"){
                    swal({
                        title: "重复好友!",
                        text: "该用户已经是您的好友,无需重复添加",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
                else{ if(data['msg']=="success"){
                    swal({
                        title: "成功添加好友!",
                        text: "您的好友请求已被受理",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
                else {
                    swal({
                        title: "好友请求发送失败,请稍后重试",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确定",
                        cancelButtonText: "返回",
                        closeOnConfirm: true
                    });
                }
                }
            }
        });


    });
}
