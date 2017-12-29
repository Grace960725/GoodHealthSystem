<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * Medoo数据库框架的代码
 * 进行管理员逻辑数据库操作
 */
include_once dirname(__FILE__).'/medoo.php';
include_once  dirname(__FILE__).'/init_db.php';

/**
 * reportManageService
 */
function getAllReportsData()
{
    /**测试以后本方法OK*/
    $msg="fail";
    $database=getDBConnection();

    //$data is an array
    if($data=$database->select("reports", "*")){
        $msg="success";
    }
    echo json_encode(array($data,"msg"=>$msg));
}

//confirmHandleReportMsg(1);
function confirmHandleReportMsg($reportId){
    $msg="fail";
    $database=getDBConnection();

    //$data is an array
    if($database->delete("reports",[
        "reportid"=>$reportId
        ]
)){
        $msg="success";
        $data=$database->select("reports", "*");
    }
    return json_encode(array($data,"msg"=>$msg));
}

function giveUpHandleReportMsg($reportId){
    return Null;
}

/**
 * activityManageService
 */
function getAllActivitiesData(){
    $msg="fail";
    $database=getDBConnection();
    //$data is an array
    if($data=$database->select("activities", "*")){
        $msg="success";
    }
    return json_encode(array($data,"msg"=>$msg));

}

function cancelActivityMsg($activityid){
    $msg="fail";
    $database=getDBConnection();
    //$data is an array
    if($database->delete("activities", [
        "activityid"=>$activityid
    ])){
        $msg="success";
        return getAllActivitiesData();

    }else{
        return json_encode(array("msg"=>$msg));
    }
}

/**
 * userManageService
 */
function getAllUsersData(){
    $msg="fail";
    $database=getDBConnection();
    //$data is an array
    if($data=$database->select("user", "*")){
        $msg="success";
    }
    return json_encode(array($data,"msg"=>$msg));
}
function getUserPasswordData(){

}
function admin_resetUserPasswordMsg(){

}

function deleteUserMsg($userid){
    $msg="fail";
    $database=getDBConnection();
    //$data is an array
    if($database->delete("user", [
        "userid"=>$userid
    ])){
        $msg="success";
    }
    return getAllUsersData();
}

?>