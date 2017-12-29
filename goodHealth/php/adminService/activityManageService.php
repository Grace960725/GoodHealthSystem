<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * 本文件用于实现管理员进行活动管理的分逻辑
 */


function getAllActivities(){
    return getAllActivitiesData();
}

function cancelActivity(){
    $activityid=$_GET['activityid'];
    return cancelActivityMsg($activityid);
}







