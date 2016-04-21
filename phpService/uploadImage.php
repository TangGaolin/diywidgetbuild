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

$base_path = '../diywidgets/'.$theme.'/'.$widget.'/icons/';


$file = $_FILES['img_file'];

for($i = 0;$i < sizeof($file['name']);$i++){

    if($file['error'][$i] == 0 && ($file['type'][$i] == 'image/jpeg' || $file['type'][$i] == 'image/png')){
        if(is_uploaded_file($file['tmp_name'][$i])){
            $to_path = $base_path . $file['name'][$i];
            if(!move_uploaded_file($file['tmp_name'][$i],$to_path)){
                $this->goBack('上传文件失败～');
            }
        }else{
            $this->goBack('这个文件不是上传文件！');
        }
    }else{
        $this->goBack('上传文件错误！');

    }
}

$back_url = 'http://s1.cobo/diywidgetbuild/selectWidgetRes.php?theme='.$theme.'&widget='.$widget;

header("Location: $back_url");

