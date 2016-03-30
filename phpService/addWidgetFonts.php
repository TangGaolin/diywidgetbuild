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
$select_fonts = $_POST['select_fonts'];

$base_path = '../diywidgets/'.$theme;

foreach($select_fonts as $v){
    $src_icon = $base_path   . '/fonts/' . $v;
    $dst_icon = $base_path . '/' . $widget . '/fonts/' . $v;
    if(!copy($src_icon,$dst_icon)){
        echo 0;
        die();
    }
}

echo 1;
die();
