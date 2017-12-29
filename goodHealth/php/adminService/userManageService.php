<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * 本文件用于实现管理员进行用户管理的分逻辑
 */


function getAllUsers(){
    return getAllUsersData();
}

function getUserPassword(){
    $userid=$_GET['userid'];
    return getUserPasswordData($userid);
}

function resetUserPassword(){
    $userid=$_GET['userid'];
    $password=$_GET['password'];
    return resetUserPasswordMsg($userid,$password);
}

function deleteUser(){
    $userid=$_GET['userid'];
    return deleteUserMsg($userid);
}







