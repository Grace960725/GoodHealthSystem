<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * 本文件用于实现用户注册逻辑
 */

//include_once '../dbLogic/generalUserModel.php';


function register(){
    $email=$_GET['email'];
    $password=$_GET['password'];
    $name=$_GET['username'];
    return registerMsg($email,$password,$name);
}







