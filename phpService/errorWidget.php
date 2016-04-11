<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-4-11
 * Time: 下午8:42
 */


if(!isset($_POST['widget'])){
    echo 0;
    die();
}else{
    try {
        require_once('db.php');
        $pdo = Db::getInstance()->connect();
        $sql = 'update widgets set state = -1,build_time = :build_time where widget = :widget';

        $stmt = $pdo->prepare($sql);
        $build_time = time();
        $stmt->bindParam(":build_time", $build_time);
        $stmt->bindParam(":widget", $_POST['widget']);
        $stmt->execute();

        echo 1;
        die();
    } catch (Exception $e) {
        echo 0;
        die();
    }

}
