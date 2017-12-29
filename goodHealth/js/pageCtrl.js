/**
 * Created by GraceHan on 16/10/12.
 */

/**本页适用于带参跳转*/
function toUserProfile(profileUserId){
    window.localStorage.setItem('profileUserId',profileUserId);
    window.location.href="../profile/profile.html";
    fillUserBoard();

}

function fillUserBoard(){
    /**
     * 填充用户头像和用户名
     */
    $("#userImg").attr('src',"/goodHealth/img/"+window.localStorage.getItem("userimage"));
    $("#userName").empty();
    $("#userName").innerHTML="";
    $("#userName").append(window.localStorage.getItem("username"));

}

function logout() {
    $("#profileBoard").fadeOut(200);
    $("#unknownUserBoard").fadeIn(200);
}

//由landing到登陆
function toLogin(){
    window.location.href="../../pages/login/login.html";
}

//由landing到主页
function toIndex(){
    window.location.href="../pages/index.html";
}
