<?php
/**
 * Created by IntelliJ IDEA.
 * User: tanggaolin
 * Date: 16-3-21
 * Time: 上午10:31
 */

require_once('./phpService/getWidgetData.php');
require_once('./phpService/Pagination2.php');
$data_obj = new Widgetdata();


$page = isset($_GET['page'])? $_GET['page'] : 1;


$widget_data = $data_obj->getUnBuildWidget($page-1);
$data = array(
    'pageNum'=> $widget_data['page_num'],
    'nowPage'=>$page,
    'url'=>'index.php?page=:page'
);

$pagination = new Pagination($data);
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





<div class="header">
    <nav class="navbar navbar-default  navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">Cobo DIY widget</a>
        </div>
    </nav>
</div>


<div class="section">

    <div>
        <?php echo $pagination->showPage(); ?>
    </div>

    <div class = 'col-lg-12 col-md-12 col-sm-12 well masonry-container'>

            <?php foreach($widget_data['list']  as $v){
                $preview =  'http://localhost/diywidgets/'.$v['theme'] . '/' . $v['widget'] .'.png';
                $url = 'selectWidgetRes.php?theme='.$v['theme'].'&widget='.$v['widget'];
                ?>
                <div class="col-sm-3 col-md-3 col-lg-3 item">
                    <div class="thumbnail area-bg-transparency " style="position: relative">
                        <a href="<?=$url ?>">
                            <img style="width: 80%" src="<?=$preview?>">
                        </a>
                    </div>
                    <div class="caption">
                        <p>
                            <a href="<?= $url ?>" class="btn btn-sm btn-primary">选择图片资源</a>
                        </p>
                    </div>
                </div>
            <?php } ?>

    </div>

    <div>
        <?php echo $pagination->showPage(); ?>
    </div>


</div>
<script src="src/js/lib/jquery-1.11.1.min.js"></script>
<script src="src/js/lib/bootstrap.min.js"></script>
<script src="src/js/lib/imagesloaded.pkgd.min.js"></script>
<script src="src/js/lib/masonry.min.js"></script>
<script>

    var container = $('.masonry-container');

    container.imagesLoaded( function () {
        container.masonry({
            itemSelector: '.item',
            isFitWidth: true
        });
    });

</script>


</body>
</html>
