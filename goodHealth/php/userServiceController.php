<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */
/**
 * 本php用于实现对于普通用户的逻辑控制
 */
include_once dirname(__FILE__).'/dbLogic/generalUserModel.php';
include_once dirname(__FILE__).'/dbLogic/userModel.php';

include_once dirname(__FILE__) . '/userService/activitiesService.php';
include_once dirname(__FILE__) . '/userService/healthService.php';
include_once dirname(__FILE__) . '/userService/socialService.php';
include_once dirname(__FILE__) . '/userService/userInfoService.php';
require_once '../flight/Flight.php';

//通过本处接受GET请求,通过echo来实现调用
//$param=$_GET['func'];
//
//echo $param();



//进行ip访问频率检查
$currentIP=$_SERVER['REMOTE_ADDR'];

//首先对访问频率进行检测,防止恶意访问
if(ipControl($currentIP)){
    //通过本处接受GET请求,通过echo来实现调用
//    if($_GET['func']) {
        $param = $_GET['func'];
//    }else{
//        $param = $_POST['func'];
//    }
    echo $param();

}else{
    $errorMsg_ip=array("status"=>403);
    echo json_encode($errorMsg_ip);
}


