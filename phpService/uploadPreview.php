<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-4-5
 * Time: 下午10:40
 */


/*
 * 根据上传之后的文件名和文件路径实现图片上上传
 * */

function goBack($msg){
    echo "<script>alert('".$msg."');location.href=history.go(-1);</script>";
    die();
}

if(empty($_POST['theme']) || empty($_POST['widget'])){
    die('bad request.....');
}

$theme = $_POST['theme'];
$widget = $_POST['widget'];

$to_path = '../diywidget_previews/'.$widget.'.png';


$file = $_FILES['preview_file'];


if($file['error'] == 0 && ($file['type'] == 'image/jpeg' || $file['type'] == 'image/png')){
    if(is_uploaded_file($file['tmp_name'])){
        if(!move_uploaded_file($file['tmp_name'],$to_path)){
            $this->goBack('上传文件失败～');
        }
    }else{
        $this->goBack('这个文件不是上传文件！');
    }
}else{
    $this->goBack('上传文件错误！');
}

$back_url = 'http://s1.cobo/diywidgetbuild/buildWidget.php?theme='.$theme.'&widget='.$widget;

header("Location: $back_url");

