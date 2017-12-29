<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */
/**
 * 本文件负责处理用户社交管理的分逻辑
 */
include_once dirname(__FILE__) . '/userInfoService.php';


function getAllCircles(){
    $userid=$_GET['userid'];
    $circleIdList=getAllCirclesData($userid);
    $circleUsers=getCircleUsers($circleIdList);
    return $circleUsers;
}

function getCircleUsers($circleIdList){
    $circleUsers=getCircleUsersData($circleIdList);
    return $circleUsers;
}


function getAllFriends(){
    $userid=$_GET['userid'];
    return getAllFriendsData($userid);
}

function addNewFriend(){
    $userid=$_GET['userid'];
    $newFriendId=$_GET['newfriendid'];
    return getAddNewFriendMsg($userid, $newFriendId);
}

function deleteFriend(){
    $userid=$_GET['userid'];
    $toDeleteFriendId=$_GET['todeletefriendid'];
    return getDeleteFriendMsg( $userid, $toDeleteFriendId);
}

function social_getUserProfile(){
    $userid=$_GET['userid'];
    return userInfo_getUserProfile($userid);
}






