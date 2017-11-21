<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2017/10/24
 * Time: 16:53
 */
header("Content-Type:text/html;charset=utf-8");
$dbms = 'mysql';
$dbName = 'db_party';
$user = 'root';
$pwd = '12345678';
$host='172.28.140.72';
$dsn = "$dbms:host=$host;dbname=$dbName";
$pdo = new PDO($dsn,$user,$pwd);
$pdo->query('set names utf8');

if($pdo){
    $id = rand(10000,99999);
    $name = $_POST['name'];
    $tel = $_POST['phone'];
    $address = $_POST['mail'];
    $Type1 = $_POST['pic1'];
    $Type2 = $_POST['pic2'];

    $sql0 = "select * from tb_party where ID like :ID";
    $result0 = $pdo->prepare($sql0);
    $result0->execute(array(':ID'=>$id));
    $row0 = $result0->fetch();

    while($row0){
        $id = rand(10000,99999);
        $sql0 = "select * from tb_party where ID like :ID";
        $result0 = $pdo->prepare($sql0);
        $result0->execute(array(':ID'=>$id));
        $row0 = $result0->fetch();
    }

    $sql1 = "select * from tb_party where name like :name";
    $result1 = $pdo->prepare($sql1);
    $result1->execute(array(':name'=>$name));
    $row1 = $result1->fetch();

    $sql2 = "select * from tb_party where tel like :tel";
    $result2 = $pdo->prepare($sql2);
    $result2->execute(array(':tel'=>$tel));
    $row2 = $result2->fetch();

    $sql3 = "select * from tb_party where address like :address";
    $result3 = $pdo->prepare($sql3);
    $result3->execute(array(':address'=>$address));
    $row3 = $result3->fetch();

    if($row1&&$row2&&$row3){
        $arr = array('check'=>2);
        $result = json_encode($arr);
        $callback = $_GET['callback'];
        echo $callback."($result)";
    }else{
        $sql = "insert into tb_party(ID,name,tel,address,Type1,Type2)values(:ID,:name,:tel,:address,:Type1,:Type2)";
        $result = $pdo->prepare($sql);
        $res = $result->execute(array(':ID'=>$id,':name'=>$name,':tel'=>$tel,':address'=>$address,':Type1'=>$Type1,':Type2'=>$Type2));
        if($res){
            $arr = array('check'=>$id);
            $result = json_encode($arr);
            $callback = $_GET['callback'];
            echo $callback."($result)";
        }else{
            $arr = array('check'=>1);
            $result = json_encode($arr);
            $callback = $_GET['callback'];
            echo $callback."($result)";
        }
    }
}else{
    $arr = array('check'=>4);
    $result = json_encode($arr);
    $callback = $_GET['callback'];
    echo $callback."($result)";
}