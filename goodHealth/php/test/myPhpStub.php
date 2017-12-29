<?php
//rsa 私钥
$private_key='-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDgZSW86OCONmQu3W+cVSW3roHPgIUxP0tSjPuME13SuToHEmPx
Wu+PpUbd6Ln8hSdFV8Lz0bVXczTPAaqNnIpE4ZQcmU63TQZkzW2uc4R1GaZUNXcL
e5SRlOcV8MXF8l5OgLq0Lca1dvjjUKkcIsHmnP0jjErzwoj6Dsd9h/yQdQIDAQAB
AoGAKCcRRKdrHydub9Bh21iFIkQQqF+39aL8yG2/yUXh4QYR8xgAWDzMZyjM8IJn
XV86MrdMhDJ/P4G27l++9A4R04G+W9wkLoefSq1HOr4eJDQTT9u6dP9GpVHhUElU
kpGGD4AR335yq/EKLkAirpCvLdEgAW30dnE0L7132ohXEBUCQQDyAFiD/bRMhZHe
TcvRbxJAipg90wKfO67k8m1Irq0nEWwvJFdtmCu3ila6WBoZ/AawDDRYFMwsCX1P
aeB9P+ObAkEA7WAUzK/vgxgOMKNpDfKrYmK/okdZvx/rCWasT1rACAoVdqV//8TU
MbsZu5p+gDA9vn2o+lIhydQOzCq6T8tFLwJAZ5WmTbkGt8pkiZcbKuY0FdQ9Hhl4
Adh2ICF0javXCeX3PKZ9lbeQ3tskDFcxtPWflzNiJGGikybssFVNdc8nCQJACORb
gxtoFnoVNf85FTus7d+THCoeE4nHjS+abtKQdPyjtzEV7WfbJw3CNgPgjz6/YV5l
sRLYjy3xa/aByjFsIwJAOuk3Kj2jTTIJgrTED5pwTwt/oIuM1sGbp07oQSeqpSye
H0wVhEoxzJIwfTOHJ3+auYoEYWiCf/vuyjmwJRlGCA==
-----END RSA PRIVATE KEY-----';

$es=$_GET["key"];
//从前端拿到的RSA加密数据
//$es='CP51TfQsTXrkVeDxkkDJcO9YF6gHmIJfHX6GBLguYCXKl3A7SCn1zhXXUSwmj+MuIOh4HtsKLre3ukUOehU5V5cPYpkajCCQ5mRZfxdbOUEBNW/mT66RYmQ08WO4NGvIRriLx5LsGtS4VF4uE+8aM+mUvab6jOVUUFotqPTUyu4=';
//私钥解密
openssl_private_decrypt(base64_decode($es),$decrypted,$private_key);
echo $decrypted;
//$encrypt_exist=false;
//if(!empty($decrypted)) {
//    $arr = json_decode($decrypted, true);
//    if(array_key_exists("encrypt",$arr)) {
//        if($arr['encrypt']=="yes")
//            $encrypt_exist=true;
//    }
//}
//if(!$encrypt_exist)
//    die("抱歉！数据提交错误！");
////继续后续处理
//var_dump($arr);
?>