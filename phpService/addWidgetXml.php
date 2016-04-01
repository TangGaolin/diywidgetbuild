<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-30
 * Time: 下午6:00
 */

if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    echo 0;
    die();
}

$theme = $_POST['theme'];
$widget = $_POST['widget'];
$xml_type = $_POST['xml_type'];
$base_path = '../diywidgets/'.$theme.'/'.$widget;
if($xml_type == 'weather'){
    $src_xml = '../tmps/level_weather.xml';
    $dst_xml = $base_path.'/level_weather.xml';
    if(!copy($src_xml,$dst_xml)){
        echo 0;
        die();
    }
    echo 1;
    die();
}else if($xml_type == 'battery'){



}else{
    echo 0;
    die();
}
