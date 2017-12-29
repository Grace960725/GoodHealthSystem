<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */
/**
 * 本文件负责处理用户账户的分逻辑
 */

function userInfo_getUserProfile(){
    $userid=$_GET['userid'];
    return getUserProfileData($userid);
}

function resetUserInfo(){
    $userid=$_GET['userid'];
    $username=$_GET['username'];
    $sex=$_GET['sex'];
    $interests=$_GET['interests'];
    $city=$_GET['city'];
    return resetUserInfoMsg($userid, $username, $sex, $interests, $city);
}

function resetUserLogo(){
    $userid=$_GET['userid'];
    $imageInfo=$_GET['imgPath'];
    return resetUserLogoMsg( $userid, $imageInfo);
}

function resetUserPassword(){
    $userid=$_GET['userid'];
    $newPassword=$_GET['newPassword'];
    return resetUserPasswordMsg($userid, $newPassword);
}





