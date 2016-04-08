<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-29
 * Time: 下午10:20
 */
require_once('phpService/getWidgetRes.php');
$theme = isset($_GET['theme']) ? $_GET['theme'] : 'BeautyofLight_a';
$widget = isset($_GET['widget']) ? $_GET['widget'] : 'BeautyofLight_a_3';

$widget_path = 'diywidgets/';

$widget_preview = $widget_path.$theme.'/'.$widget . '.png';

$widget_icons = getIcons($widget_path.$theme.'/icons/');
$select_icons = getIcons($widget_path.$theme.'/'.$widget.'/icons/');


$widget_fonts = getFontTypes($widget_path.$theme.'/fonts/');
$select_fonts = getFontTypes($widget_path.$theme.'/'.$widget.'/fonts/');

$build_url = 'buildWidget.php?theme='.$theme.'&widget='.$widget;
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<link rel="stylesheet" href="src/css/bootstrap.min.css"/>
<link rel="stylesheet" href="src/css/comm.css"/>
<link  href="src/css/simple-slider.css" rel="stylesheet">
<style>
    <?php
        echo getFontsCssString($widget_fonts);
    ?>
</style>

<body>

<script src="src/js/lib/require.min.js"></script>
<script src="src/js/app.js"></script>


<input type = 'hidden' value="<?=$theme?>" id="theme-name" >
<input type = 'hidden' value="<?=$widget?>" id="widget-name">

<div class="header">
    <nav class="navbar navbar-default  navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">Cobo DIY widget</a>
        </div>
    </nav>
</div>

<div class="section">
    <div class = 'col-lg-12 col-md-12 col-sm-12 well'>

        <div class="col-md-3 col-sm-3">
            <div class="row">
                <div class="thumbnail area-bg-transparency " style="position: relative">
                    <img style="width: 80%" src="<?=$widget_preview?>">
                </div>
            </div>
        </div>

        <div class="col-md-offset-1 col-md-7 col-sm-7">

            <div>
                <a href = '<?=$build_url?>' class="btn btn-xs btn-success pull-right">
                    去 制 作 <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                </a>
            </div>
            <p></p>
            <hr/>

            <div >
                <label>已选图片:</label>
                &nbsp;&nbsp;&nbsp;
                <form style="display: inline-block" action="phpService/uploadImage.php" method="post"  enctype='multipart/form-data' id = 'img-form'>
                    <input type = 'hidden' value="<?=$theme?>" name="theme" >
                    <input type = 'hidden' value="<?=$widget?>" name="widget">
                    <button class="btn btn-xs btn-primary box " id = 'apk_btn'>
                        <span class="glyphicon glyphicon-folder-open"></span> 上传图片
                        <input class="fileupload btn-xs" style="width: 80px" type="file" id = 'img-upload' name="img_file" />
                    </button>
                </form>
                <span  style="margin-left: 200px">
                    <button class="btn btn-xs btn-warning " id = 'set-clock-hour-btn'>设为时针图</button>
                    <button class="btn btn-xs btn-warning " id = 'set-clock-min-btn'>设为分针图</button>
                </span>
                <span class="pull-right">
                    <button class="btn btn-xs btn-primary " id = 'set-bg-btn'>设为背景图</button>
                    <button class="btn btn-xs btn-danger " id = 'del-icon-btn'>删除</button>
                </span>
            </div>
            <div class="row">
                <?php foreach($select_icons  as $v){
                    $preview =  'diywidgets/'.$theme.'/'.$widget. '/icons/' . $v;
                    ?>
                    <div class="col-sm-2 col-md-2 col-lg-2 item">
                        <div class="thumbnail area-bg-transparency selected-icons" style="position: relative" data-name = '<?=$v?>'>
                            <img style="width: 100%" src="<?=$preview?>">
                        </div>
                        <div class="caption">
                            <p>
                                <?=$v?>
                            </p>
                        </div>
                    </div>
                <?php } ?>
            </div>

            <p></p>
            <hr/>
            <div>
                <label>已选字体:</label>
                <span class="pull-right">
                    <button class="btn btn-xs btn-danger" id = 'del-font-btn'>删 除</button>
                </span>
            </div>
            <div class="row">
                <?php foreach($select_fonts  as $v){
                    $font_file = pathinfo($v['url'],PATHINFO_BASENAME);
                    ?>
                    <div class="col-sm-2 col-md-2 col-lg-2 selected-fonts" data-name = '<?=$font_file?>'>
                        <p style="font-family: '<?=$v['font_name']?>';font-size: 35px; cursor: pointer" >
                            10:28 am Turs
                        </p>
                    </div>
                <?php } ?>
            </div>
        </div>



    </div>

    <div class = 'col-lg-12 col-md-12 col-sm-12 well'>

        <div>
            <label>插件可能需要的字体:</label>

            <span class="pull-right">
                <button class="btn btn-xs btn-success" id = 'add-fonts-btn'>添 加</button>
            </span>
        </div>
        <div class="row">
            <?php foreach($widget_fonts  as $v){
                $font_file = pathinfo($v['url'],PATHINFO_BASENAME);
                ?>
                <div class="col-sm-2 col-md-2 col-lg-2 all-fonts" data-name = '<?=$font_file?>'>
                    <p style="font-family: '<?=$v['font_name']?>';font-size: 35px;cursor: pointer" >
                        10:28 am Turs
                    </p>
                </div>
            <?php } ?>
        </div>

        <p></p>
        <hr/>

        <div>
            <label>插件可能需要的图片:</label>

            <span class="pull-right">
                <button class="btn btn-xs btn-success" id = 'add-icons-btn'>添 加</button>
            </span>
        </div>
        <div class="row">
            <?php foreach($widget_icons  as $v){
                $preview =  'diywidgets/'.$theme . '/icons/' . $v;
                ?>
                <div class="col-sm-2 col-md-2 col-lg-2 item">
                    <div class="thumbnail area-bg-transparency all-icons" style="position: relative" data-name = '<?=$v?>'>
                        <img style="width: 100%" src="<?=$preview?>">
                    </div>
                    <div class="caption">
                        <p>
                            <?=$v?>
                        </p>
                    </div>
                </div>
            <?php } ?>
        </div>

    </div>

    <div>
        <p class="alert  show-info" id = 'show-msg'></p>
    </div>


</div>
<script>

    require(['app/widget-res-pick'],function(widget_res_pick){

    });

</script>


</body>
</html>

