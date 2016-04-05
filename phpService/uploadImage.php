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

/************                文件上传方法     ***************************/
function upload_fun($up_info, $to_path){

    //1.判断文件上传是否错误
    if($up_info['error']>0){
        switch ($up_info['error']>0) {
            case 1:
                $this->goBack("文件太大");
                break;
            case 2:
                $this->goBack("文件大小超过了浏览器限制！");
                break;
            case 3:
                $this->goBack("文件部分被上传!");
                break;
            case 4:
                $this->goBack("没有找到要上传的文件！");
                break;
            case 5:
                $this->goBack("服务器临时文件夹丢失，请重新上传！");
                break;
            case 6:
                $this->goBack("文件写入到临时文件夹出错！");
                break;
        }

    }

    //2.判断上传文件类型是否合法
    if($up_info['type'] != 'image/jpeg' && $up_info['type'] != 'image/png'){
        $this->goBack('文件格式不对～');
    }

    //6.判断是否是上传的文件，并移动文件
    if(is_uploaded_file($up_info['tmp_name'])){
        if(!move_uploaded_file($up_info['tmp_name'],$to_path)){
            $this->goBack('上传文件失败～');
        }
    }else{
        $this->goBack('这个文件不是上传文件！');
    }
}


function goBack($msg){
    echo "<script>alert('".$msg."');location.href=history.go(-1);</script>";
    die();
}

if(empty($_POST['theme']) || empty($_POST['widget'])){
    die('bad request.....');
}

$theme = $_POST['theme'];
$widget = $_POST['widget'];

$to_path = '../diywidgets/'.$theme.'/'.$widget.'/icons/'.$_FILES["img_file"]["name"];
upload_fun($_FILES['img_file'],$to_path);
$back_url = 'http://localhost/diywidgetbuild/selectWidgetRes.php?theme='.$theme.'&widget='.$widget;

header("Location: $back_url");

