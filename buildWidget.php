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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<link rel="stylesheet" href="src/css/bootstrap.min.css"/>
<link rel="stylesheet" href="src/css/comm.css"/>

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
            <div class="widget_area">
                <canvas id="canvas" ></canvas>
            </div>
            <div>
                <img src="<?=$widget_preview?>" width="150px">
            </div>
        </div>



        <div class = 'col-md-7 col-sm-7' id = 'option-area'>
            <div>
                <label>添加文字元素:</label><br/>
                <div>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#date-area" aria-controls="home" role="tab" data-toggle="tab">日期</a></li>
                        <li role="presentation"><a href="#time-area" aria-controls="#data_id" role="tab" data-toggle="tab">时间</a></li>
                        <li role="presentation"><a href="#custom-area" aria-controls="messages" role="tab" data-toggle="tab">自定义</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content" style="margin-top: 10px">
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
                <div id = 'option-modfiy-area' style="display: none">
                    <div class = 'page-header' >
                        <label>文字效果调试</label>
                    </div>

                    <div>

                        <div class="row">
                            <div class="col-md-3 col-sm-3 form-inline">
                                <label>字体:</label><br/>
                                <div class="form-inline">
                                    <select class="form-control input-sm"  style="width: 150px" id = 'font-family-id' >

                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3 col-sm-3 form-inline" >
                                <label>字体大小:</label>
                                <br/>
                                <button class="btn btn-sm btn-default" id = "font-size-minus">-</button>
                                <input class="form-control input-sm small_input" id = 'font-size' type="text" style="width: 40px">
                                <button class="btn btn-sm btn-default" id = "font-size-plus">+</button>
                            </div>


                        </div>

                        <p></p>
                        <label>布局与位置:</label><br/>
                        <div class="form-inline">
                            <select class="form-control input-sm"  style="width: 150px" id = 'text-layout' >
                                <option value="match_parent">独占行</option>
                                <option value="wrap_content">适应内容</option>
                            </select>

                            &nbsp;&nbsp;&nbsp;

<!--                            <span id = 'text-layout-x-span' style="display: none">-->
<!--                                <label>x偏移:</label>-->
<!--                                <button class="btn btn-sm btn-default" id = "shadow_offsetX_minus">-</button>-->
<!--                                <input class="form-control input-sm small_input" id = 'text_layout_x' type="text">-->
<!--                                <button class="btn btn-sm btn-default" id = "shadow_offsetX_plus">+</button>-->
<!--                            </span>-->
<!---->
<!--                            <label>Y偏移:</label>-->
<!--                            <button class="btn btn-sm btn-default" id = "shadow_offsetY_minus">-</button>-->
<!--                            <input class="form-control input-sm small_input" id = 'text_layout_y' type="text">-->
<!--                            <button class="btn btn-sm btn-default" id = "shadow_offsetY_plus">+</button>-->
                        </div>

                        <p></p>


                    </div>
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
