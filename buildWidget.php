<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-21
 * Time: 上午11:35
 */

require_once('phpService/getWidgetRes.php');

$theme = isset($_GET['theme']) ? $_GET['theme'] : 'BeautyofLight';
$widget = isset($_GET['widget']) ? $_GET['widget'] : 'BeautyofLight_3';
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

        <div class="col-md-4 col-sm-4">
            <?php
                require_once('include/widget_preview_area.php');
            ?>
            <div class="row">
                <div id = 'option-modfiy-text-area' style="display: none">
                    <?php require_once('include/text_option_area.php') ?>
                </div>

                <div id = 'option-modfiy-image-area' style="display: none">
                    <?php require_once('include/image_option_area.php') ?>
                </div>
            </div>

        </div>



        <div class = 'col-md-7 col-sm-7 pull-right' id = 'option-area'>
            <div>
                <button class = "btn btn-xs btn-primary" id = 'save-widget'>保 存</button>
            </div>
            <p></p>

            <?php require_once('include/option_text.php');?>

            <?php require_once('include/option_image.php');?>


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
