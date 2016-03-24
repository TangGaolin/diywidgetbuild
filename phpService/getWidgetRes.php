<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-22
 * Time: 下午3:07
 */

function getFontTypes($widget_base_path){

    $font_path = $widget_base_path;
    $fonts = array();
    foreach(glob($font_path.'*.ttf') as $file) {
        $font['font_name'] = explode('.',end(explode('/',$file)))[0];
        $font['url'] = $widget_base_path.end(explode('/',$file));
        $fonts[] = $font;
    }
    return $fonts;
}

function getBackgroundSize($widget_base_path){

    $image_src = $widget_base_path.'widget_bg_1.png';
    if(is_file($image_src)){
        list($image_width,$image_height) = getimagesize($image_src);
        return array(
            'image_width'=>$image_width,
            'image_height'=>$image_height
        );
    }else{
        return array(
            'image_width'=>0,
            'image_height'=>0
        );
    }
}

function getWeatherIconSize($widget_base_path){

//    $weather_icon = $widget_base_path.'w01d.png';
//    if(is_file($weather_icon)){
//        list($image_width,$image_height) = getimagesize($weather_icon);
//        return array(
//            'image_width'=>$image_width,
//            'image_height'=>$image_height
//        );
//    }else{
//        return array(
//            'image_width'=>0,
//            'image_height'=>0
//        );
//    }

    return 1;

}

$font_face_tmp = <<<EOF
    @font-face {
        font-family:'%font-family%';
        src:url('%font-url%') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
EOF;
