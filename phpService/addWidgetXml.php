<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-30
 * Time: 下午6:00
 */

function responseMsg($code,$msg){
    $msg_array = array(
        'code' => $code,
        'msg' => $msg
    );

    echo json_encode($msg_array);
}


if(!isset($_POST['theme']) || !isset($_POST['widget']) ){
    responseMsg(0,'Invalid request!!');
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
        responseMsg(0,'天气文件加载失败!!!');

    }else{
        responseMsg(1,'天气文件加载成功....');
    }

    die();
}else if($xml_type == 'battery'){

    $batter_xml_file = $base_path . '/level_battery.xml';
    $battery_array  = array();
    $batteryXML  = new DOMDocument('1.0', 'utf-8');
    $root = $batteryXML->createElement('level-list');
    $batteryXML->appendChild($root);

    $xmlns_android = $batteryXML->createAttribute('xmlns:android');
    $root->appendChild($xmlns_android);

    $value = $batteryXML->createTextNode('http://schemas.android.com/apk/res/android');
    $xmlns_android->appendChild($value);

    $next_num = 0;

    foreach(glob($base_path.'/icons/battery*.png') as $file) {
        $image_name = pathinfo($file,PATHINFO_BASENAME);
        $image_num = intval(preg_replace('/[^0-9]+/', '', $image_name), 10);
        $battery_array[$image_num] = $image_name;
    }

    ksort($battery_array);
    foreach($battery_array as $k=>$v) {

        $item = $batteryXML->createElement('item');
        $android_image = $batteryXML->createAttribute('android:image');
        $item->appendChild($android_image);

        $value = $batteryXML->createTextNode('./icons/'.$v);
        $android_image->appendChild($value);

        $min_level = $next_num;
        if($k == 0){
            $max_level = 100;
            $next_num = 100;
        }else{
            $max_level = $k * 100 + 1;
            $next_num = $max_level;
        }


        $android_minLevel = $batteryXML->createAttribute('android:minLevel');
        $item->appendChild($android_minLevel);

        $value = $batteryXML->createTextNode($min_level);
        $android_minLevel->appendChild($value);

        $android_maxLevel = $batteryXML->createAttribute('android:maxLevel');
        $item->appendChild($android_maxLevel);

        $value = $batteryXML->createTextNode($max_level);
        $android_maxLevel->appendChild($value);

        $root->appendChild($item);

    }


    if(file_put_contents($batter_xml_file,$batteryXML->saveXML(),LOCK_EX) != false){
        responseMsg(1,'电量文件加载成功.....');
    }else{
        responseMsg(0,'生成level_battery.xml文件失败!!!');
    }
    die();


}else if($xml_type = 'clock'){
    $src_hour_xml = '../tmps/time_hour.xml';
    $dst_hour_xml = $base_path.'/time_hour.xml';

    $src_min_xml = '../tmps/time_min.xml';
    $dst_min_xml = $base_path.'/time_min.xml';

    if(copy($src_hour_xml,$dst_hour_xml) && copy($src_min_xml,$dst_min_xml)){
        responseMsg(0,'时钟文件加载成功....');
    }else{
        responseMsg(1,'时钟文件加载失败!!!');
    }

    die();
}else{
    responseMsg(0,'Invalid request!!');
    die();
}
