<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * 本文件用于实现管理员处理举报信息的分逻辑
 */

//include_once '../dbLogic/generalUserModel.php';

function getAllReports(){
    return getAllReportsData();
}

function confirmHandleReport(){
    $reportId=$_GET['reportid'];
    return confirmHandleReportMsg($reportId);
}

function giveUpHandleReport(){
    $reportId=$_GET['reportid'];
    return giveUpHandleReportMsg($reportId);
}







