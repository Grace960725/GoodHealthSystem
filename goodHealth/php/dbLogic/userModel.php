<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */
/**
 * Medoo数据库框架的代码
 * 用于普通用户逻辑的数据库操作
 */
include_once dirname(__FILE__).'/medoo.php';
include_once  dirname(__FILE__).'/init_db.php';

/**
 * activtiesService
 */

function addActivityMsg($userid, $username, $activityname, $activityplace, $activitytype,
                        $starttime, $endtime, $limitnum){
    $msg="fail";
    $database=getDBConnection();

    if($database->insert('activities', [
        'name'=> $activityname,
        'proposerid' => $userid,
        'type' => $activitytype,
        'place'=>$activityplace,
        'starttime'=>$starttime,
        'endtime'=>$endtime,
        'limit_num'=>$limitnum,
        'joined_num'=>0,
        'iscanceled'=>0,
        'proposername'=>$username
    ])){
        $msg="success";
    }
    $data=array("msg"=>$msg);
    return json_encode($data) ;
}

function getAllActivitiesData()
{
    /**测试以后本方法OK*/

    $database=getDBConnection();

    //$data is an array
    $data=$database->select("activities", "*");
    $data=array($data,"msg"=>"success");
    return json_encode($data);
}

//getMyActivitiesData(1);
function  getMyActivitiesData($userid){

    $database=getDBConnection();
    /**
     * 做两张表的连接查询
     */
    $data=$database->select("participents", [
        "[>]activities" => "activityid"
    ], "*"
    , [
        "userid" => $userid,
    ]);

    $data=array($data,"msg"=>"success");
    echo json_encode($data);
}

function getRegisterActivityMsg($userid,$activityid){
    $msg="success";
    $duplicate=false;

    $database=getDBConnection();
    //在数据库中进行插入
    //participents表先查询是否存在,否则insert并且提示成功
    if ($database->has("participents", [
        "AND" => [
            "userid"=>$userid,
            "activityid" => $activityid
        ]
    ])) {
        //提示已经参加
        $duplicate=true;
        $data=array("msg"=>$msg,"duplicate"=>$duplicate);
        return json_encode($data);
    }
    else {
        $database->insert('participents', [
            'userid' => $userid,
            'activityid' => $activityid,
        ]);

        $database->update("activities", [
            // participate plus one
            "joined_num[+]" => 1,

        ], [
            "$activityid" => $activityid
        ]);
        return getAllActivitiesData();

    }
//    $data=array("msg"=>$msg,"duplicate"=>$duplicate);
//    return json_encode($data);
}


function getGiveUpActivityMsg($userid,$activityid){
    $msg="fail";
    $database=getDBConnection();

    if($database->delete("participents", [
       "AND" => [
           "userid"=>$userid,
           "activityid"=>$activityid
       ]
    ]))
    {
        $database->update("activities", [
            // participate plus one
            "joined_num[-]" => 1,

        ], [
            "activityid" => $activityid
        ]);
        $msg="success";
    }
    $data=array("msg"=>$msg);
    echo json_encode($data);
}

function getReportActivityMsg($userid,$username,$activityid,$activityname,$reason){
    $msg="fail";
    $duplicate=false;
    $database=getDBConnection();

    if ($database->has("reports", [
        "AND" => [
            "userid"=>$userid,
            "activityid"=>$activityid
        ]
    ]))
    {
       $duplicate=true;
    }else{
    if($database->insert("reports", [
            "userid"=>$userid,
            "username"=>$username,
            "activityid"=>$activityid,
            "activityname"=>$activityname,
            "reason"=>$reason
    ]))
    {
        $msg="success";
    }
    }
    $data=array("msg"=>$msg,"duplicate"=>$duplicate);
    echo json_encode($data);
}

/**
 * healthService
 */
/**本方法用于活动信息的创建和更新
 * @param $userid
 * @param $distance
 * @param $time
 * @param $calories
 */

//5-5000
//$list1=[10.0,20.0,30.0,40.0,50.0,60.0,70.0,80.0,90.0,100.0];
//$list2=[100.0,90.0,80.0,70.0,60.0,50.0,40.0,30.0,20.0,10.0];
//$list3=[1000.0,2000.0,3000.0,4000.0,5000.0,6000.0,7000.0,8000.0,9000.0,10000.0];
//for($index=5;$index<=5000;$index++){
//    $distance=$list1[$index%10];
//    $time=$list2[$index%10];
//    $calories=$list3[$index%10];
//    injectActivityAmountMsg($index+"",$distance,$time,$calories);
//}
//function  injectActivityAmountMsg($userid,$distance,$time,$calories){
//
//    $database=getDBConnection();
//
//    $database->insert("sportsInfo", [
//            "userid"=>$userid,
//            "time"=>$time,
//            "distance"=>$distance,
//            "calories"=>$calories
//        ]);
//
//}
function  addActivityAmountMsg($userid,$distance,$time,$calories){
    $msg="fail";
    $database=getDBConnection();

    if ($database->has("sportsInfo", [
            "userid"=>$userid
    ]))
    {//has执行update操作
        if(
        $database->update('sportsInfo', [
            'time' => $time,
            'distance'=>$distance,
            'calories'=>$calories
        ],[
            "userid" =>$userid
        ])){
            $msg="success";
        }

    }else{
        if($database->insert("sportsInfo", [
            "userid"=>$userid,
            "time"=>$time,
            "distance"=>$distance,
            "calories"=>$calories
        ]))
        {
            $msg="success";
        }
    }
    $data=array("msg"=>$msg);
    echo json_encode($data);
}

/**
 * 本方法用于注入睡眠数据
 * @param $userid
 * @param $starttime
 * @param $endtime
 * @param $effectiverate
 */
//addSleepInfoMsg("2","2016-11-03 00:00:00","2016-11-04 06:00:00",0.7);
function addSleepInfoMsg($userid,$starttime,$endtime,$effectiverate){
    $msg="fail";
    $database=getDBConnection();

    $time1 = date($starttime);
    $time2 = date($endtime);


    if ($database->has("sleepinfo", [
        "userid"=>$userid
    ]))
    {//has执行update操作
        if(
        $database->update('sleepinfo', [
            'starttime' => $time1,
            'endtime'=> $time2,
            'effectiverate'=>$effectiverate
        ],[
            "userid" =>$userid
        ])){

            $msg="success";
        }
    }else{
        if($database->insert("sleepinfo", [
            "userid"=>$userid,
            'starttime' => $time1,
            'endtime'=> $time2,
            'effectiverate'=>$effectiverate

        ]))
        {
            $msg="success";
        }
    }
    $data=array("msg"=>$msg);
    echo json_encode($data);
}

function  getActivityAmountData($userid){
    $msg="fail";
    $database=getDBConnection();
    /**
     * 查询
     */
    if($data=$database->select("sportsInfo",  "*"
        , [
            "userid" => $userid,
        ])){
        $msg="success";
        $distance=$data[0]["distance"];
//      400米跑道圈数换算
        $circle=substr(sprintf("%.3f", $distance*1000/400),0,-2);
//      1kg大约是7700大卡,一斤也就是0.5kg,那么大约是3850大卡.
        $calories=$data[0]["calories"];
        $fat=substr(sprintf("%.3f", $calories/3850),0,-2);
        $data=array("distance"=>$distance,"time"=>$data[0]['time'],"calorie"=>$calories,"circle"=>$circle,"fat"=>$fat,"msg"=>$msg);

    }else{
    $data=array($data,"msg"=>$msg);
    }
    echo json_encode($data);
}
//getSleepInfoData("2");
function getSleepInfoData($userid){
    $msg="fail";
    $database=getDBConnection();

    if($data=$database->select("sleepInfo",  "*"
        , [
            "userid" => $userid,
        ])){
        $msg="success";
        $starttime=$data[0]["starttime"];
        $startMonth=substr($starttime,0,2);
        $startDate=substr($starttime,3,2);
        $startYear=substr($starttime,6,4);
        $startHour=substr($starttime,11,2);
        $startMinute=substr($starttime,14,2);


        $endtime=$data[0]["endtime"];
        $endMonth=substr($endtime,0,2);
        $endDate=substr($endtime,3,2);
        $endYear=substr($endtime,6,4);
        $endHour=substr($endtime,11,2);
        $endMinute=substr($endtime,14,2);



        $rate=$data[0]["effectiverate"];
//      换算成睡眠小时
        $time=substr(sprintf("%.3f",(strtotime($endtime)-strtotime($starttime))/3600),0,-2);
        $time_h=substr(sprintf("%.3f",(strtotime($endtime)-strtotime($starttime))/3600),0,1);
        $time_m=($time-$time_h)*60;
//      换算成有效睡眠时间
        $effecttime=substr(sprintf("%.3f",$time*$rate),0,-2);
        $effecttime_h=substr(sprintf("%.3f",$time*$rate),0,1);
        $effecttime_m=($effecttime-$effecttime_h)*60;
        $data=array("starttime"=>array(
            "startYear"=>$startYear, "startMonth"=>$startMonth, "startDate"=>$startDate,
            "startHour"=>$startHour,  "startMinute"=>$startMinute
        ),
            "endtime"=>array(
            "endYear"=>$endYear, "endMonth"=>$endMonth, "endDate"=>$endDate,
            "endHour"=>$endHour,  "endMinute"=>$endMinute
        ),
            "rate"=>$rate*100,
            "time_h"=>$time_h,
            "time_m"=>$time_m,
            "effectivetime_h"=>$effecttime_h,
            "effectivetime_m"=>$effecttime_m,
            "msg"=>$msg);
    }else{
        $data=array($data,"msg"=>$msg);
    }
    echo json_encode($data);
}

function getBMIData($userid){
    $msg="fail";
    $database=getDBConnection();

    if($data=$database->select("healthInfo",  "*"
        , [
            "userid" => $userid,
        ])){
        $msg="success";
        $data=array($data,"msg"=>$msg);
    }
    else{
        $data=array("msg"=>$msg);
    }
    return json_encode($data);
}

//addBMIMsg("4","80","1.75");
function addBMIMsg($userid,$weight,$height){
    $bmi=substr(sprintf("%.3f", $weight/($height*$height)),0,-2);

    $msg="fail";
    $database=getDBConnection();


    if ($database->has("healthInfo", [
        "userid"=>$userid
    ]))
    {//has执行update操作
        if(
        $database->update('healthInfo', [
            'bmi' => $bmi,
        ],[
            "userid" =>$userid
        ])){
            $msg="success";
        }
    }else{
        if($database->insert("healthInfo", [
            "userid"=>$userid,
            'bmi' => $bmi
        ]))
        {
            $msg="success";
        }
    }
    $data=array("bmi"=>$bmi,"msg"=>$msg);
    return json_encode($data);
}

/**
 * socialService
 */
function getAllCirclesData($userid)
{

    $database = getDBConnection();

    if ($database->has("user", [
        "userid" => $userid
    ])
    ) {
        $data = $database->select("user", [
            "interest_jog", "interest_run", "interest_bicycle", "interest_swim", "interest_ropeskip"
        ], [
            "userid" => $userid,
        ]);

        $data = $data[0];
    } else {

    }
    $result = array();
    if ($data['interest_jog'] == "1") {
        array_push($result, "interest_jog");
    }
    if ($data['interest_run'] == 1) {
        array_push($result, "interest_run");
    }
    if ($data['interest_bicycle'] == 1) {
        array_push($result, "interest_bicycle");
    }
    if ($data['interest_swim'] == 1) {
        array_push($result, "interest_swim");
    }
    if ($data['interest_ropeskip'] == 1) {
        array_push($result, "interest_ropeskip");
    }
    return $result;

}

//$input=array("interest_bicycle","interest_run");
//getCircleUsersData($input);
function getCircleUsersData($circleNames){
    $database=getDBConnection();
    $msg="fail";
    $result=array("interest_bicycle"=>null,"interest_run"=>null,"interest_jog"=>null,"interest_swim"=>null,"interest_ropeskip"=>null);

    foreach ($circleNames as $circleName) {
        $data = $database->select("user", [
             "username","email","image","userid"
        ], [
            $circleName => 1,
        ]);
        $result[$circleName]=$data;
        $msg="success";
    }

    $result=array($result,"msg"=>$msg);
    return json_encode($result);

}

//getAllFriendsData(1);
function getAllFriendsData($userid){
    $database=getDBConnection();
    $msg="fail";

    if($friendList=$database->select("friends",
        array("[>]user" => array("friendid"=>"userid")),
        "*",
        array("friends.userid"=>$userid))){
        $msg="success";
    }

    return json_encode(array($friendList,"msg"=>$msg));
}

function getAddNewFriendMsg($userid, $newFriendId){
    $database=getDBConnection();
    $msg="fail";
    $duplicate="false";

    //在数据库中进行插入
    //participents表先查询是否存在,否则insert并且提示成功
    if ($database->has("friends", [
        "AND" => [
            "userid"=>$userid,
            "friendid" => $newFriendId
        ]
    ])) {
        //提示已经参加
        $duplicate="true";
    } else {
        if($database->insert('friends', [
        'friendid'=> $newFriendId,
        'userid' => $userid
    ])){
        $msg="success";
    }
    }

    $result=array("msg"=>$msg,"duplicate"=>$duplicate);
    return json_encode($result);
}


function getUserProfileData($userid){
    $database=getDBConnection();
    $msg="fail";

    if($data = $database->select("user", "*", [
            "userid"=> $userid,
        ])) {
           $msg = "success";

            $actIDList=$database->select("participents", "*", [
            "userid"=> $userid,
             ]);

            $actData=array();
            foreach($actIDList as $actID){

                $tmp=$database->select("activities", "*", [
                    "activityid"=> $actID['activityid'],
                ]);
                array_push($actData,$tmp[0]);
            }
       }
    echo json_encode(array($data,"msg"=>$msg,"activityInfo"=>$actData));
}

/**
 * userInfoService
 */
function resetUserInfoMsg($userid, $username, $sex, $interests, $city){

    $checkInterests=array("interest_run"=>0,"interest_jog"=>0,"interest_swim"=>0,"interest_bicycle"=>0,"interest_ropeskip"=>0);
    foreach($checkInterests as $checkInterest=>$tmp){
        foreach ($interests as $interest){
            if($checkInterest==$interest){
                unset($checkInterests[$checkInterest]);
            }
        }
    }
    $database=getDBConnection();

    $database->update('user', [
        'username' => $username,
        'sex' => $sex,
        'city' => $city,
    ],[
        "userid" =>$userid
    ]);

    foreach ($interests as $interest){
    $database->update('user', [
        $interest => 1,
    ],[
        "userid" =>$userid
    ]);
   }

    foreach ($checkInterests as $checkInterest=>$tmp){
        $database->update('user', [
            $checkInterest=>$tmp,
        ],[
            "userid" =>$userid
        ]);
    }

    $data=array("msg"=>"success");
    echo json_encode($data);
}

function resetUserLogoMsg($userid, $imageInfo){
    //测试已经通过,但是注意文件只有名字,没有前缀,务必在js处加绝对路径
    $database=getDBConnection();
    //$data is an array

     $database->update('user', [
            'image' => $imageInfo,
        ],[
            "userid" =>$userid
     ]);

    $data=array("msg"=>"success");
    return json_encode($data);
}

function resetUserPasswordMsg($userid,$newPassword){
    $msg="fail";
    $database=getDBConnection();
    //$data is an array

    if($database->update('user', [
        'password' => $newPassword,
    ],[
        "userid" =>$userid
    ])){
        $msg="success";
    }

    $data=array("msg"=>$msg);

    return json_encode($data);

}

function getDeleteFriendMsg($userid, $friendid){
    $database=getDBConnection();

    if ($database->delete("friends", [
        "AND" => [
            "userid"=>$userid,
            "friendid" => $friendid
        ]
    ])) {
        return getAllFriendsData($userid);
    } else{
        return json_encode(array("msg"=>"fail"));
    }
}

?>