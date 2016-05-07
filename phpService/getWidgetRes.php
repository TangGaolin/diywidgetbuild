<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-22
 * Time: 下午3:07
 */

function getFontTypes($font_path){

    $fonts = array();
    foreach(glob($font_path.'*.ttf') as $file) {
        $font['font_name'] = pathinfo($file,PATHINFO_FILENAME);
        $font['url'] = $font_path.pathinfo($file,PATHINFO_BASENAME);
        $fonts[] = $font;
    }
    foreach(glob($font_path.'*.otf') as $file) {
        $font['font_name'] = pathinfo($file,PATHINFO_FILENAME);
        $font['url'] = $font_path.pathinfo($file,PATHINFO_BASENAME);
        $fonts[] = $font;
    }
    return $fonts;
}



function getIcons($icon_dir){
    $icon_array = [];
    foreach(glob($icon_dir.'*.png') as $file) {
        $icon_array[] = pathinfo($file,PATHINFO_BASENAME);
    }
    return $icon_array;
}

function getImageRes($widget_base_path){

    $image_src_path = $widget_base_path.'icons/';

    $image_msg_array = array(
        'has_bg_img'=>0,
        'has_battery'=>0,
        'has_weather'=>0,
        'has_clock'=>0,
        'bg_img_size'=>array(
          'w'=>400,
          'h'=>500,
        ),

        'all_image_list'=>array()
    );

    $bg_image = $widget_base_path.'icons/'.'widget_bg.png';
    if(is_file($bg_image)){
        $image_msg_array['has_bg_img'] = '1';
        list($image_width,$image_height) = getimagesize($bg_image);
        $image_msg_array['bg_img_size'] = array(
          'w'=>$image_width,
          'h'=>$image_height
        );

    }else{
        $image_msg_array['has_bg_img'] = '0';
    }

    $battery_array = [];

    foreach(glob($image_src_path.'battery*.png') as $file) {
        $battery_array[] = pathinfo($file,PATHINFO_BASENAME);
    }
    if(sizeof($battery_array) > 0 && is_file($widget_base_path.'icons/battery_100.png')){
        $image_msg_array['has_battery'] = '1';
    }

    $weather_array = [];
    foreach(glob($image_src_path.'w*d.png') as $file) {
        $weather_array[] = pathinfo($file,PATHINFO_BASENAME);
    }

    if(is_file($image_src_path.'weather_na.png')){
        $weather_array[] = 'weather_na.png';
    }

    $sure_weather_array = ["w01d.png","w02d.png","w03d.png","w04d.png","w09d.png","w10d.png","w11d.png","w13d.png","w50d.png","weather_na.png"];
    if(sizeof($weather_array) == 10 && is_file($widget_base_path.'icons/w01d.png')){
        $image_msg_array['has_weather'] = arraySame($sure_weather_array,$weather_array) ? 1 : 0;
    }


    $clock_min_image = $widget_base_path.'icons/'.'widget_min.png';
    $clock_hour_image = $widget_base_path.'icons/'.'widget_hour.png';

    if(is_file($clock_min_image) && is_file($clock_hour_image)){
        $image_msg_array['has_clock'] = '1';
    }

    foreach(glob($image_src_path.'*.png') as $file) {
        $image_msg_array['all_image_list'][] = pathinfo($file,PATHINFO_BASENAME);
    }

    return $image_msg_array;

}

function arraySame($arr1,$arr2){

    sort($arr1);
    sort($arr2);
    if(implode($arr1) === implode($arr2)){
        return true;
    }else{
        return false;
    }

}



function getFontsCssString($font_array){
    $fonts_css_string = '';

    $font_face_tmp = <<<EOF
    @font-face {
        font-family:'%font-family%';
        src:url('%font-url%') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
EOF;

    foreach($font_array as $v) {
        $font_face = str_replace('%font-family%', $v['font_name'], $font_face_tmp);
        $font_face = str_replace('%font-url%', $v['url'], $font_face);
        $fonts_css_string .= $font_face;
    }

    return $fonts_css_string;
}


function checkZipFlie($zip_file){

    if(is_file($zip_file)){
        return true;
    }else{
        return false;
    }
}
