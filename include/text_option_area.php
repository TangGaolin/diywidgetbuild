<div class = 'page-header' >
    <span id = 'show-text-value' class="text-danger h4"></span>
    <label> -----  文字效果调试 </label>
    <button class="btn btn-xs btn-danger pull-right" id = 'delete-text'>删 除</button>
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

        <div class="col-md-3 col-sm-3  form-inline">
            <label>文字颜色:</label>
            <div data-format="hex" class="input-group font-color-option">
                <input type="text"  class="form-control" id = 'font-color' value=" #000000"/>
                <span class="input-group-addon"><i style="background-color: #000000"></i></span>
            </div>
        </div>
    </div>

    <p></p>

    <div class="row">
        <div class="col-md-3 col-sm-3 form-inline">
            <label>布局与位置:</label><br/>
            <div class="form-inline">
                <select class="form-control input-sm"  style="width: 150px" id = 'text-layout' >
                    <option value="match_parent">独占行</option>
                    <option value="wrap_content">适应内容</option>
                </select>

                &nbsp;&nbsp;&nbsp;
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
</div>