<div class = 'option-image'>
    <label>图片元素:</label><br/>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#weather-image-area" aria-controls="home" role="tab" data-toggle="tab">天气</a></li>
            <li role="presentation"><a href="#battery-area"  role="tab" data-toggle="tab">电量</a></li>
            <li role="presentation"><a href="#image-area"  role="tab" data-toggle="tab">图片资源</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" style="background-color: #ffffff">

            <div role="tabpanel" class="tab-pane active" id="weather-image-area">
                <label>
                    <input type="checkbox" value="0" id = 'ctrl-weather'/> 加载天气图标
                </label>
            </div>
            <div role="tabpanel" class="tab-pane" id="battery-area">
                <label>
                    <input type="checkbox" value="0" id = 'ctrl-battery'/> 加载电量图标
                </label>
            </div>
            <div role="tabpanel" class="tab-pane " id="image-area">
                <div class="well area-bg">
                    <div class=" row masonry-container ">

                    </div>

                </div>
            </div>
        </div>
    </div>

</div>