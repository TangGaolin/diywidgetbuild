<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-21
 * Time: 上午11:35
 */

require_once('phpService/getWidgetRes.php');

$theme = isset($_GET['theme']) ? $_GET['theme'] : 'WonderfulThanksgivingDay_a';
$widget = isset($_GET['widget']) ? $_GET['widget'] : 'WonderfulThanksgivingDay_1';
$widget_base_path = 'widgets/'.$theme.'/'.$widget . '/';
$widget_preview = 'widgets/'.$theme.'/'.$widget . '.png';

$font_array = getFontTypes($widget_base_path);
$image_size = getBackgroundSize($widget_base_path);
$weather_size = getWeatherIconSize($widget_base_path);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<link rel="stylesheet" href="src/css/bootstrap.min.css"/>
<link rel="stylesheet" href="src/css/bootstrap-colorpicker.min.css"/>
<link rel="stylesheet" href="src/css/comm.css"/>
<link  href="src/css/simple-slider.css" rel="stylesheet">
<style>
    <?php
   //echo font-face
    foreach($font_array as $v){
    $font_face = str_replace('%font-family%',$v['font_name'],$font_face_tmp);
    $font_face = str_replace('%font-url%',$v['url'],$font_face);
    echo $font_face;
}
?>
</style>

<body>

<script src="src/js/lib/require.min.js"></script>
<script src="src/js/app.js"></script>


<input type="hidden" value="<?=$widget_base_path?>" id = 'widget-base-path'>
<input type="hidden" value='<?= json_encode($image_size) ?>' id = 'bg-size'>
<input type="hidden" value='<?= json_encode($font_array) ?>' id = 'default-fontfamily'>
<input type="hidden" value='<?= $weather_size ?>' id = 'has-weather'>


<div class="header">
    <nav class="navbar navbar-default  navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">Cobo DIY widget</a>
        </div>
    </nav>
</div>

<div class="section">
    <div class = 'col-lg-12 col-md-12 col-sm-12 well'>

        <div class="col-md-5 col-sm-5">
            <div class="widget-area">
                <canvas id="canvas" ></canvas>
            </div>
            <p></p>
            <div>
                <img src="<?=$widget_preview?>" id = 'widget-preview'>
            </div>
        </div>



        <div class = 'col-md-7 col-sm-7' id = 'option-area'>
            <div>
                <div>
                    <button class = "btn btn-xs btn-primary" id = 'save-widget'>保 存</button>
                </div>

                <p></p>
                <label>文字元素:</label><br/>
                <div>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#date-area" aria-controls="home" role="tab" data-toggle="tab">日期</a></li>
                        <li role="presentation"><a href="#time-area" aria-controls="#data_id" role="tab" data-toggle="tab">时间</a></li>
                        <li role="presentation"><a href="#custom-area" aria-controls="messages" role="tab" data-toggle="tab">自定义</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content" style="background-color: #ffffff">

                        <div role="tabpanel" class="tab-pane active" id="date-area">
                        </div>
                        <div role="tabpanel" class="tab-pane" id="time-area">
                        </div>
                        <div role="tabpanel" class="tab-pane" id="custom-area">

                            <p></p>
                            <div class="form-inline" >
                                <input class="form-control input-sm" type="text" placeholder="输入文本"/>
                                <input type="button" class = 'btn btn-sm btn-default' value="添加"/>
                            </div>

                        </div>
                    </div>
                </div>

                <p></p>
                <label>图片元素:</label><br/>
                <div>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#weather-area" aria-controls="home" role="tab" data-toggle="tab">天气</a></li>
                        <li role="presentation"><a href="#battery-area" aria-controls="#data_id" role="tab" data-toggle="tab">电量</a></li>
                        <li role="presentation"><a href="#image-area" aria-controls="messages" role="tab" data-toggle="tab">图片资源</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content" style="background-color: #ffffff">

                        <div role="tabpanel" class="tab-pane active" id="weather-area">

                            <label>
                                <input type="checkbox" value="0" id = 'ctrl-weather'/> 加载天气图标
                            </label>



                        </div>
                        <div role="tabpanel" class="tab-pane" id="battery-area">
                        </div>
                        <div role="tabpanel" class="tab-pane" id="image-area">
                        </div>
                    </div>
                </div>

                <p></p>

                <div id = 'option-modfiy-text-area' style="display: none">
                    <?php require_once('include/text_option_area.php') ?>
                </div>

                <div id = 'option-modfiy-image-area' style="display: none">
                    <?php require_once('include/image_option_area.php') ?>
                </div>

            </div>


        </div>

    </div>
</div>
<script>

    require(['app/build-widget'],function(build_widget){
        build_widget.initWidget().initOption();
    });

</script>


</body>
</html>
