<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-30
 * Time: 下午2:22
 */

if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    echo 0;
    die();
}


$theme = $_POST['theme'];
$widget = $_POST['widget'];
$selected_icons = $_POST['select_icons'];

$base_path = '../diywidgets/';

foreach($selected_icons as $v){
    $src_icon = $base_path . $theme . '/icons/' . $v;
    $dst_icon = $base_path . $theme . '/' . $widget . '/icons/' . $v;
    if(!copy($src_icon,$dst_icon)){
        echo 0;
        die();
    }
}

echo 1;
die();
