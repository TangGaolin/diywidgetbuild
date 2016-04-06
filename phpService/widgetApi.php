<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-4-5
 * Time: 上午11:52
 */
require_once('getWidgetData.php');

$base_url = 'http://s1.cobo/diywidgetbuild/diywidgets';

$page = isset($_GET['page']) ? $_GET['page'] : 0;

$widget_data_obj = new Widgetdata();

$data = $widget_data_obj->getBuildOKWidget($page);


$response_array = array(
    'code'=>'200',
    'data'=>array()
);

$widget = array();
foreach($data as $v){
    $widget['zip'] = $base_url.'/'.$v['theme'].'/'.$v['widget'].'.zip';
    $widget['preiview'] = $base_url.'/'.$v['theme'].'/'.$v['widget'].'.png';

    $response_array['data'][] = $widget;
}


echo json_encode($response_array);



