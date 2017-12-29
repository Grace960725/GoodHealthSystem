<?php
/**
 * Created by PhpStorm.
 * User: GraceHan
 * Date: 16/10/21
 * Time: 16:14
 */

/**
 * 本文件用于实现用户登录
 */
/**
 * 需要在返回信息中加入用户、管理员的身份信息
 */
/**
 * @return string在本处使用私钥解密
 */


function logIn(){
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
    $email=$_GET['email'];
    $password=$_GET['password'];
    openssl_private_decrypt(base64_decode($password),$decrypted,$private_key);

    return logInCheckMsg($email,$decrypted);
}







