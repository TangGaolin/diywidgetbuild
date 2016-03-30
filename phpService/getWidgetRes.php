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
        $font['font_name'] = explode('.',end(explode('/',$file)))[0];
        $font['url'] = $font_path.end(explode('/',$file));
        $fonts[] = $font;
    }
    foreach(glob($font_path.'*.otf') as $file) {
        $font['font_name'] = explode('.',end(explode('/',$file)))[0];
        $font['url'] = $font_path.end(explode('/',$file));
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
        'bg_img_size'=>array(
          'w'=>400,
          'h'=>500,
        ),
        'battery_img_size'=>array(),
        'weather_img_size'=>array(),
        'battery_list'=>array(),
        'weather_list'=>array(),
        'all_image_list'=>array(),
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
    if(sizeof($battery_array) > 0){
        $image_msg_array['has_battery'] = '1';
        $battery_image = $widget_base_path.'icons/'.$battery_array[0];
        list($image_width,$image_height) = getimagesize($battery_image);

        $image_msg_array['battery_img_size'] = array(
            'w'=>$image_width,
            'h'=>$image_height
        );
        $image_msg_array['battery_list'] = $battery_array;


    }


    $weather_array = [];
    foreach(glob($image_src_path.'w*d.png') as $file) {
        $weather_array[] = pathinfo($file,PATHINFO_BASENAME);
    }

    if(sizeof($weather_array) > 0){
        $weather_array[] = 'weather_na.png';
        $image_msg_array['has_weather'] = '1';
        $weather_image = $widget_base_path.'icons/'.$weather_array[0];
        list($image_width,$image_height) = getimagesize($weather_image);

        $image_msg_array['weather_img_size'] = array(
            'w'=>$image_width,
            'h'=>$image_height
        );
        $image_msg_array['weather_list'] = $weather_array;
    }

    foreach(glob($image_src_path.'*.png') as $file) {
        $image_msg_array['all_image_list'][]  = pathinfo($file,PATHINFO_BASENAME);
    }

    return $image_msg_array;

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
