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


$widget_data = $data_obj->getBuildOKWidget($page-1);
$data = array(
    'pageNum'=> $widget_data['page_num'],
    'nowPage'=>$page,
    'url'=>'showRes.php?page=:page'
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

<?php
    require_once('include/header.php');
?>

<div class="section">

    <div class="row">
        <?php echo $pagination->showPage(); ?>
    </div>

    <div class = 'col-lg-12 col-md-12 col-sm-12 well masonry-container' >

        <?php foreach($widget_data['list']  as $v){
            $preview =  'diywidget_previews/'. $v['widget'] .'.png';
            $url = 'selectWidgetRes.php?theme='.$v['theme'].'&widget='.$v['widget'];
            ?>
            <div class="col-sm-3 col-md-3 col-lg-3 item" id = 'item_<?=$v["widget"]?>'>
                <div class="thumbnail area-bg-transparency " style="position: relative">
                    <a href="<?=$url?>" title="<?=$v['widget']?>">
                        <img style="width: 80%" src="<?=$preview?>">
                    </a>
                    <button class="btn btn-xs btn-success ok-btn" style="position:absolute;top:0px;left: 0px" data-name = '<?=$v["widget"]?>'> 测试OK </button>
                </div>

                <p></p>

            </div>
        <?php } ?>

    </div>

    <div class="row">
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


    var okBtn = $('.ok-btn');

    okBtn.click(function(){
        var widget = $(this).attr('data-name');
        $.post('phpService/okWidget.php',
            {widget:widget},
            function(data,status){
                if(data == 1 && status=='success'){
                    location.reload();
                }else{
                    alert('系统异常');
                }
            });
    });

//    function findRootTag(tag,itemClass){
//        if (tag.hasClass(itemClass)) {
//            return tag;
//        } else {
//            return findRootTag(tag.parent(),itemClass);
//        }
//    };

</script>


</body>
</html>
