<div class = 'page-header' >
    <span id = 'show-text-value' class="text-danger h4"></span>
    <label> -----  文字效果调试 </label>
    <button class="btn btn-xs btn-danger pull-right" id = 'delete-text'>删 除</button>
</div>

<div>


    <div class="row">
        <div class="col-md-4 col-sm-4 form-inline">
            <label>布局与位置:</label><br/>
            <div class="form-inline">
                <select class="form-control input-sm"  style="width: 120px" id = 'text-layout' >
                    <option value="match_parent">独占行</option>
                    <option value="wrap_content">适应内容</option>
                </select>
            </div>
        </div>

        <div class="col-md-4 col-sm-4 form-inline" >
            <label>字母大小写:</label><br/>
            <button class="btn btn-sm" id = "change-letter-size" data-value = '0'>A/a</button>
        </div>
    </div>
    <p></p>
    <div class="row">
        <div class="col-md-4 col-sm-4 form-inline">
            <label>字体:</label><br/>
            <div class="form-inline">
                <select class="form-control input-sm"  style="width: 120px" id = 'font-family-id' >
                    <?php foreach($font_array as $v){
                        ?>
                        <option value="<?=pathinfo($v['url'],PATHINFO_BASENAME)?>" style="font-family: '<?=$v['font_name']?>'" ><?=$v['font_name']?></option>
                    <?php } ?>
                </select>
            </div>
        </div>

        <div class="col-md-4 col-sm-4 form-inline" >
            <label>字体大小:</label>
            <br/>
            <button class="btn btn-sm btn-default" id = "font-size-minus">- </button>
            <input class="form-control input-sm small_input" id = 'font-size' type="text" style="width: 40px">
            <button class="btn btn-sm btn-default" id = "font-size-plus"> +</button>
        </div>

        <div class="col-md-4 col-sm-4  form-inline">
            <label>字体颜色:</label>
            <div data-format="hex" class="input-group font-color-option">
                <input type="text"  class="form-control input-sm" id = 'font-color' value=" #000000"/>
                <span class="input-group-addon input-sm"><i style="background-color: #000000"></i></span>
            </div>
        </div>
    </div>


    <p></p>
    <div class="row">
        <div class="col-md-12 col-sm-12 form-inline" >
            <label>旋转角度 :</label>
            <div class="form-inline">
                <input type="text" data-slider="true" id = 'text-angle' value = "0" data-slider-range="-180,180" data-slider-step="1">
            </div>
        </div>
    </div>

    <p></p>


    <div>
        <p class="text-danger">
            <label>快捷键:</label>
            <br/>
            位置
            <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
            &nbsp;&nbsp;
            <br/>
            旋转
            ctrl + <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>,
            ctrl + <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
            &nbsp;&nbsp;
            <br/>
            缩放
            ctrl + <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>,
            ctrl + <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
        </p>
    </div>
</div>