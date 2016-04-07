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
                    <button type="button" data-value="0"  class="btn btn-sm btn-default" id = 'ctrl-clock'>确定时钟旋转点</button>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane " id="image-area">

                <div>
                    
                </div>
                <div class="well area-bg">
                    <div class="row image-container">
                        <?php
                            foreach($image_msg_array['all_image_list'] as $v){
                                $img_url = 'diywidgets/'.$theme.'/'.$widget.'/icons/'.$v;

                        ?>
                        <div class="col-md-3 col-sm-3 item">
                            <div class="thumbnail">
                                <img src="<?=$img_url?>" alt="" width="100%" />
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