<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-21
 * Time: 上午11:35
 */

require_once('phpService/getWidgetRes.php');

$widget_path = 'diywidgets/';

$theme = isset($_GET['theme']) ? $_GET['theme'] : 'BeautyofLight_a';
$widget = isset($_GET['widget']) ? $_GET['widget'] : 'BeautyofLight_a_3';
$widget_base_path = $widget_path.$theme.'/'.$widget . '/';
$widget_preview = $widget_path.$theme.'/'.$widget . '.png';
$widget_zip = $widget_path.$theme.'/'.$widget . '.zip';
$widget_xml = $widget_path.$theme.'/'.$widget . '/widget.xml';

$font_array = getFontTypes($widget_base_path . 'fonts/');
$image_msg_array = getImageRes($widget_base_path);

$is_build = checkZipFlie($widget_zip);
if($is_build){
    $widget_xml_string = str_replace('&','&amp;',file_get_contents($widget_xml)) ;
    $widget_xml_string = str_replace("'",'&#39;',$widget_xml_string) ;
}
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

    @font-face {
        font-family:'serif2';
        src:url('src/fonts/DroidSans.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    <?php
        echo getFontsCssString($font_array);
    ?>
</style>

<body>

<script src="src/js/lib/require.min.js"></script>
<script src="src/js/app.js"></script>


<input type = 'hidden' value="<?=$theme?>" id="theme-name">
<input type = 'hidden' value="<?=$widget?>" id="widget-name">
<input type="hidden" value='<?= json_encode($image_msg_array) ?>' id = 'image-res'>
<input type="hidden" value='<?= json_encode($font_array) ?>' id = 'default-fontfamily'>
<input type="hidden" value="<?=$is_build?>" id = 'build_state'/>

<?php
    require_once('include/header.php');
?>


<div class="section">

    <div>
        <button class = "btn btn-xs btn-success bg-color" value="transparency.png">透明背景</button>
        <button class = "btn btn-xs  bg-color" value="black.png">黑色背景</button>
        <a class = "btn btn-xs  bg-color" href="selectWidgetRes.php?theme=<?=$theme?>&widget=<?=$widget?>">返回选择资源</a>
    </div>
    <p></p>
    <div class = 'col-lg-12 col-md-12 col-sm-12 well'>

        <div class="col-md-4 col-sm-4">
            <?php
                require_once('include/widget_preview_area.php');
            ?>
            <div class="row">
                <div id = 'option-modfiy-text-area' style="display: none">
                    <?php require_once('include/text_option_area.php'); ?>
                </div>

                <div id = 'option-modfiy-image-area' style="display: none">
                    <?php require_once('include/image_option_area.php'); ?>
                </div>
            </div>



        </div>



        <div class = 'col-md-7 col-sm-7 pull-right' id = 'option-area'>
            <div>
                <button class = "btn btn-xs btn-success" id = 'save-widget'>保 存</button>


                <?php  if($is_build){ ?>
                    <input type="hidden" value='<?=$widget_xml_string?>' id = 'widget_xml_string'/>
                    <span class="pull-right">
                        <a  href="<?=$widget_zip?>">下 载</a>
                        &nbsp;&nbsp;
                        <a  href="<?=$widget_xml?>" target="_blank">查看xml</a>
                    </span>

                <?php } ?>
            </div>
            <p></p>

            <?php require_once('include/option_text.php');?>

            <?php require_once('include/option_image.php');?>

        </div>

    </div>
</div>

<div>
    <p class="alert  show-info" id = 'show-msg'></p>
</div>

<script>

    require(['app/build-widget'],function(build_widget){
        build_widget.initWidget();
    });

</script>


</body>
</html>
