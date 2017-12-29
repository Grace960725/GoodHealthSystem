<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */


function getActivityAmount(){
    $userid=$_GET['userid'];
     return getActivityAmountData($userid);
}

function addActivityAmount(){
    $userid=$_GET['userid'];
    $time=$_GET['time'];
    $distance=$_GET['distance'];
    $calories=$_GET['calories'];
   return addActivityAmountMsg($userid,$time,$distance,$calories);
}

function getBMI(){
    $userid=$_GET['userid'];
    return getBMIData($userid);
}

function addBMI()
{
    $userid = $_GET['userid'];
    $weight = $_GET['weight'];
    $height = $_GET['height'];
    return addBMIMsg($userid, $weight, $height/100);
}

function getSleepInfo(){
    $userid=$_GET['userid'];
    return getSleepInfoData($userid);
}


function addSleepInfo(){
    $userid=$_POST['userid'];
    $starttime=$_POST['starttime'];
    $endtime=$_POST['endtime'];
    $effectiverate=$_POST['rate'];
    return addSleepInfoMsg($userid,$starttime,$endtime,$effectiverate);
}




