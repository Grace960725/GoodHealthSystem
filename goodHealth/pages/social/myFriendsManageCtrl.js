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
    friendListInit();

});

function friendListInit(){
    $.ajax({
        type: "get",
        url: "/goodHealth/php/userServiceController.php",
        data: {
            func: "getAllFriends",
            userid: window.localStorage.getItem("userid")
        },
        cache: false,
        dataType: "json",
        success: function(data){
            if(data['status']==403){//恶意ip访问控制的响应
                window.location.href='../error/403.html';
            }
            if(data['msg']=="success"){
                userList=data[0];
                fillFriendBoard(userList);

            } else {
                swal({
                    title: "您还没有添加好友哦",
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

function fillFriendBoard(list){
    var TEMPLATE=null;
    $("#friendInfoBoard").empty();

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
                "<button  class='btn btn-outline btn-success' onclick='deleteFriend(" + list[i]['userid'] + ")'>删除好友</button>" +
                "</div></div></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
            "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i+1]['image'].replace("-small", "") + "'></div></div>" +
            "<div class='col-sm-8'><h3><strong>" + list[i+1]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
            list[i+1]['email'] +
            "<br><br></address></div><div class='clearfix text-center'>" +
            "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i+1]['userid'] + ")'>查看资料</button>" +
            "<button  class='btn btn-outline btn-success' onclick='deleteFriend(" + list[i+1]['userid'] + ")'>删除好友</button>" +
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
                "<button  class='btn btn-outline btn-success' onclick='deleteFriend(" + list[i]['userid'] + ")'>删除好友</button>" +
                "</div></div></div>"+
                "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
                "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i+1]['image'].replace("-small", "") + "'></div></div>" +
                "<div class='col-sm-8'><h3><strong>" + list[i+1]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
                list[i+1]['email'] +
                "<br><br></address></div><div class='clearfix text-center'>" +
                "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i+1]['userid'] + ")'>查看资料</button>" +
                "<button  class='btn btn-outline btn-success' onclick='deleteFriend(" + list[i+1]['userid'] + ")'>删除好友</button>" +
                "</div></div></div><div class='col-lg-2'></div></div>";
        }
        TEMPLATE += "<div class='row'><div class='col-lg-2'></div>"+
            "<div class='col-lg-4'><div class='contact-box'><div class='col-sm-4'><div class='text-center'>" +
            "<img alt='image' class='img-circle m-t-xs img-responsive' src='" + "/goodHealth/img/" + list[i]['image'].replace("-small", "") + "'></div></div>" +
            "<div class='col-sm-8'><h3><strong>" + list[i]['username'] + "</strong></h3><address><strong>电子邮箱</strong><br>" +
            list[i]['email'] +
            "<br><br></address></div><div class='clearfix text-center'>" +
            "<button  class='btn btn-outline btn-primary' onclick='goToUserProfile(" + list[i]['userid'] + ")'>查看资料</button>" +
            "<button  class='btn btn-outline btn-success' onclick='deleteFriend(" + list[i]['userid'] + ")'>删除好友</button>" +
            "</div></div></div><div class='col-lg-6'></div>";
    }

    $("#friendInfoBoard").append(TEMPLATE);
}
function goToFriendProfile(friendID){
    localStorage.userName="";
    toUserProfile();
}

function deleteFriend(friendID) {
    swal({
        title: "确定删除该好友?",
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
                func: "deleteFriend",
                todeletefriendid:friendID,
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
                    swal("已成功删除好友!","您的好友已经更新", "success");
                    var userList=data[0];
                    fillFriendBoard(userList);
                } else {
                    swal({
                        title: "您还没有添加好友!",
                        text: "可以取兴趣圈结交新朋友哦 :)",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    //提示验证有误,提示重新输入用户邮箱和密码
                }
            }
        });

    });
}
