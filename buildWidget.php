<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-21
 * Time: 上午11:35
 */

$theme = isset($_GET['theme']) ? $_GET['theme'] : 'WonderfulThanksgivingDay_a';
$widget = isset($_GET['widget']) ? $_GET['widget'] : 'WonderfulThanksgivingDay_1';
$widget_base_path = 'widgets/'.$theme.'/'.$widget . '/';


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<link rel="stylesheet" href="src/css/bootstrap.min.css"/>
<link rel="stylesheet" href="src/css/comm.css"/>

<body>

<script src="src/js/lib/require.min.js"></script>
<script src="src/js/app.js"></script>


<input type="hidden" value="<?=$widget_base_path?>" id = 'widget-base-path'>

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
        </div>

        <div class = 'col-md-7 col-sm-7 option_area'>



        </div>

    </div>
</div>
<script>

    require(['app/build-widget'],function(build_widget){

    });

</script>


</body>
</html>
