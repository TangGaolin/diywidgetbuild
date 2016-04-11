<?php
$curr_url_file = pathinfo($_SERVER['PHP_SELF'],PATHINFO_BASENAME);

function echoActive($tab){
    global $curr_url_file;
    return $curr_url_file == $tab ? "class='active'" : '';
}
?>

<div class="header">

    <nav class="navbar navbar-default  navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">Cobo DIY widget</a>
        </div>

        <div>
            <ul class="nav navbar-nav">
                <li <?php echo echoActive('index.php'); ?> ><a href="index.php">首页</a></li>
                <li  <?php echo echoActive('showRes.php'); ?>  ><a href="showRes.php">查看结果</a></li>
                <li  <?php echo echoActive('errorWidget.php'); ?>  ><a href="errorWidget.php">有误插件</a></li>
                <li ><a href="http://wiki.cobo/index.php/Dev/diy_widget" target="_blank">制作教程</a></li>
            </ul>

        </div>

    </nav>


</div>

