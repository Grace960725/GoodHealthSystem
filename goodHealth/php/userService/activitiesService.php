<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */
/**
 * 本文件负责处理用户活动管理的分逻辑
 */


function getAllActivities(){
     return getAllActivitiesData();
}

function getMyActivities(){
    $userid=$_GET['userid'];
    return getMyActivitiesData($userid);
}

function registerActivity(){
    $userid=$_GET['userid'];
    $activityid=$_GET['activityid'];
    return getRegisterActivityMsg($userid,$activityid);
}

function giveUpActivity(){
    $userid=$_GET['userid'];
    $activityid=$_GET['activityid'];
    return getGiveUpActivityMsg($userid,$activityid);
}


function reportActivity(){
    $userid=$_GET['userid'];
    $username=$_GET['userName'];
    $activityname=$_GET['activityName'];
    $activityid=$_GET['activityid'];
    $reason=$_GET['reason'];
    return getReportActivityMsg($userid,$username,$activityid,$activityname,$reason);
}

function addActivity(){

    $userid=$_GET['userid'];
    $username=$_GET['username'];
    $activityname=$_GET['activityname'];
    $activityplace=$_GET['activityplace'];
    $activitytype=$_GET['activitytype'];
    $starttime=$_GET['starttime'];
    $endtime=$_GET['endtime'];
    $limitnum=$_GET['limitnum'];
    return addActivityMsg($userid, $username, $activityname, $activityplace, $activitytype,
        $starttime, $endtime, $limitnum);
}



