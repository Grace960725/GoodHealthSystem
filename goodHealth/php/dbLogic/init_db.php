<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * Medoo数据库框架的代码
 */


function getDBConnection(){
    $database = new medoo([
        'database_type' => 'sqlite',
        'database_file' => dirname(__FILE__).'/../../goodHealthDataBase.db'

    ]);
    return $database;
}

//$database->insert("activities", [
//    "name" => "foo",
//    "startDate" => "1996-08-01"
//]);
//echo $database->last_query();

/**
 * 普通实现
 */
//class MyDB extends SQLite3
//{
//    function __construct()
//    {
//        $this->open('/Applications/goodHealthDataBase.db');
//    }
//}
//$db = new MyDB();
//
//if(!$db){
//    echo $db->lastErrorMsg();
//} else {
//    echo "Opened database successfully\n";
//}
//
//$sql =<<<EOF
//      SELECT * from activity;
//EOF;
//
//$ret = $db->query($sql);
//while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
//    echo "name = ". $row['name'] . "\n";
//    echo "startDate = ". $row['startDate'] ."\n";
//}
//echo "Operation done successfully\n";
//$db->close();

?>