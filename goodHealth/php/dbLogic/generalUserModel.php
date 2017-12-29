<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * Medoo数据库框架的代码,
 * 进行所有用户的登录注册通用数据库操作
 */


include_once  dirname(__FILE__).'/../dbLogic/medoo.php';
include_once  dirname(__FILE__).'/../dbLogic/init_db.php';
//include_once dirname(__FILE__).'/../dbLogic/generalUserModel.php';


function ipControl($ipAddress){
    $database=getDBConnection();
    $checkIp=$database->get("ipControl",array("cnt","lastVisit"),
        array(
            "ipAddr[=]"=>$ipAddress
        ));

    if($checkIp){
        //控制访问频率,30s内Ip访问10次则返回503状态
        $cnt=$checkIp["cnt"];
        $cnt=$cnt+1;

        $lastVisit=$checkIp["lastVisit"];
        $currentTime=date("Y-m-d H:i:s");



        $interval=floor((strtotime($currentTime)-strtotime($lastVisit))%86400%60);
        
        if($interval>30){//30秒内访问没有达到10次,重新计数
            $database->update("ipControl",[
                "cnt"=>0
            ],[
                "ipAddr"=>$ipAddress
            ]);
            return true;
        }else{

        if($cnt==10){
            $database->delete("ipControl", [
                "ipAddr"=>$ipAddress
                ]);
            if($interval<30){//表示30秒内的访问超过了10次
                 return false;
             }else{
                 return true;
            }
        }else{
        $database->update("ipControl",[
            "cnt"=>$cnt
        ],[
            "ipAddr"=>$ipAddress
        ]);
            return true;
        }
        }
    }else{
        $database->insert('ipControl', [
            'ipAddr' => $ipAddress,
            'cnt' => 1,
            'lastVisit'=> date("Y-m-d H:i:s")
        ]);
        return true;
    }
}

function logInCheckMsg($email,$password){
    /**测试以后本方法OK*/
    $userid=null;
    $username=null;
    $useremail=null;
    $isadmin=false;
    $image =null;
    $msg="fail";

    $database=getDBConnection();
    //$data is an array
    $data=$database->get("user",
        array("userid","username","email","isadmin","image"),
        array(
            "AND"=> array(
            "email[=]"=>$email,
            "password[=]"=>$password
            )
        ));

    if($data) {
        $userid=$data["userid"];
        $username=$data["username"];
        $useremail=$data["email"];
        $isadmin=$data["isadmin"];
        $image=$data["image"];
        $msg="success";
    }

    $data=array("userid"=>$userid ,"username" => $username, "useremail" => $useremail, "msg" => $msg, "isadmin" => $isadmin, "image"=>$image);
    return json_encode($data);
}

/**插入用于测试的用户数据
 * @param $email
 * @param $password
 * @param $name
 *
 * @return string
 */
//for($index=3000;$index<5000;$index++){
//    $email="testEmail".$index."@qq.com";
//    $password="2143680";
//    $name="testUSER".$index;
//    userInject($email,$password,$name);
//}

//function userInject($email,$password,$name){
//    /**测试以后本方法OK*/
//
//
//    $database=getDBConnection();
//    //$data is an array
//
//    $database->insert('user', [
//            'username' => $name,
//            'password' => $password,
//            'isadmin' => 0,
//            'email' => $email,
//            "sex"=>"男",
//            "interest_jog"=>1,
//            "interest_run"=>0,
//            "interest_bicycle"=>1,
//            "interest_swim"=>1,
//            "interest_ropeskip"=>0,
//            "city"=>"上海",
//            "image"=>"profile_small.jpg"
//        ]);
//
//}

function registerMsg($email,$password,$name){
    /**测试以后本方法OK*/

    $duplicate=false;

    $database=getDBConnection();
    //$data is an array

    $checkEmail=$database->get("user",
        array("userid","username","email","isadmin"),
        array(
            "email"=>$email
        ));

    $checkUserName=$database->get("user",
        array("userid","username","email","isadmin"),
        array(
            "username"=>$name
        ));

    if($checkUserName||$checkEmail){
        $duplicate=true;
    }else {
        $database->insert('user', [
            'username' => $name,
            'password' => $password,
            'isadmin' => 0,
            'email' => $email,
            "sex"=>"男",
            "interest_jog"=>0,
            "interest_run"=>0,
            "interest_bicycle"=>0,
            "interest_swim"=>0,
            "interest_ropeskip"=>0,
            "city"=>"南京",
            "image"=>"profile_small.jpg"
        ]);
    }
    $data=array("duplicate"=>$duplicate);
    return json_encode($data);
}
?>