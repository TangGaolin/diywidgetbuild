<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-30
 * Time: 下午5:57
 */

if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    echo 0;
    die();
}


$theme = $_POST['theme'];
$widget = $_POST['widget'];
$selected_widget_fonts = $_POST['selected_widget_fonts'];

$base_path = '../diywidgets/'.$theme . '/' . $widget .'/fonts/';

foreach($selected_widget_fonts as $v){
    $fonts_file = $base_path . $v;
    if(!unlink($fonts_file)){
        echo 0;
        die();
    }
}

echo 1;
die();
