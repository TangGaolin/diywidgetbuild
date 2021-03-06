<div class = 'option-image'>
    <label>图片元素:</label><br/>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#weather-image-area" aria-controls="home" role="tab" data-toggle="tab">天气</a></li>
            <li role="presentation"><a href="#battery-area"  role="tab" data-toggle="tab">电量</a></li>
            <li role="presentation"><a href="#clock-area"  role="tab" data-toggle="tab">时钟</a></li>
            <li role="presentation"><a href="#image-area"  role="tab" data-toggle="tab">图片资源</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" style="background-color: #ffffff">

            <div role="tabpanel" class="tab-pane active" id="weather-image-area">
                <div class="btn-group btn-sm" role="group" >
                    <button type="button" data-value="0"  class="btn btn-sm btn-default" id = 'ctrl-weather'>加载天气图标</button>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="battery-area">

                <div class="btn-group btn-sm" role="group" >
                    <button type="button" data-value="0"  class="btn btn-sm btn-default" id = 'ctrl-battery'>加载电量图标</button>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="clock-area">
                <div class="btn-group btn-sm" role="group" >
                    <button type="button" data-value="0"  class="btn btn-sm btn-default" id = 'ctrl-clock'>加载时钟图标</button>
                </div>

                <p></p>

                <div class="container clock-area-option" style="display: none">
                    <div class="form-inline">
                        <label>时钟中心点位置:</label>
                        <br/>
                        <label>left:</label>
                        <button class="btn btn-sm btn-default" id = "clock-center-left-minus">- </button>
                        <input class="form-control input-sm small_input" id = 'clock-center-left' type="text" style="width: 50px">
                        <button class="btn btn-sm btn-default" id = "clock-center-left-plus"> +</button>
                        &nbsp;&nbsp;&nbsp;
                        <label>top:</label>
                        <button class="btn btn-sm btn-default" id = "clock-center-top-minus">- </button>
                        <input class="form-control input-sm small_input" id = 'clock-center-top' type="text" style="width: 50px">
                        <button class="btn btn-sm btn-default" id = "clock-center-top-plus"> +</button>
                    </div>
                    <p></p>
                    <div class="form-inline">

                        <label>时针大小:</label><br/>
                        <button class="btn btn-sm btn-default" id = "img-hour-size-minus">- </button>
                        <input class="form-control input-sm small_input" id = 'img-hour-size' type="text" style="width: 50px" >
                        <button class="btn btn-sm btn-default" id = "img-hour-size-plus"> +</button>
                        <br/>

                        <label>分针大小:</label><br/>
                        <button class="btn btn-sm btn-default" id = "img-min-size-minus">- </button>
                        <input class="form-control input-sm small_input" id = 'img-min-size' type="text" style="width: 50px" >
                        <button class="btn btn-sm btn-default" id = "img-min-size-plus"> +</button>
                    </div>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane " id="image-area">

                <div class="well area-bg">
                    <div class="row image-container">
                        <?php
                            foreach($image_msg_array['all_image_list'] as $v){
                                $img_url = 'diywidgets/'.$theme.'/'.$widget.'/icons/'.$v;

                        ?>
                        <div class="col-md-3 col-sm-3 item">
                            <div class="thumbnail">
                                <img src="<?=$img_url?>" alt="" width="100%" id="<?=$v?>"/>
                            </div>
                            <div class="caption">
                                <p>
                                    <?=$v?>
                                    <button class="btn btn-xs btn-default add-image-ele" data-name = '<?=$v?>'>添加</button>
                                </p>
                            </div>
                        </div>

                        <?php }?>

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>