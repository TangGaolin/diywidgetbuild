<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-30
 * Time: 下午3:25
 */

if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    echo 0;
    die();
}

$theme = $_POST['theme'];
$widget = $_POST['widget'];
$type = $_POST['type'];
$selected_widget_icons = $_POST['selected_widget_icons'];
$base_path = '../diywidgets/'. $theme . '/' . $widget . '/icons/';


if(sizeof($selected_widget_icons) > 0){
    if($type == 'set_bg'){
        $src_icon = $base_path . $selected_widget_icons[0];
        $dst_icon = $base_path . 'widget_bg.png';
        if(rename($src_icon,$dst_icon)){
            echo 1;
            die();
        }else{
            echo 0;
            die();
        }
    }

    if($type == 'delete_icons'){

        foreach($selected_widget_icons as $v){
            $icon_file = $base_path . $v;
            if(!unlink($icon_file)){
                echo 0;
                die();
            }
        }
        echo 1;
        die();

    }

}else{
    echo 0;
    die();
}