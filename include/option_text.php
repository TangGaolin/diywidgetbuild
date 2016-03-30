<div class = 'option-text'>
    <label>文字元素:</label><br/>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#date-area" aria-controls="home" role="tab" data-toggle="tab">日期 / 时间</a></li>
            <li role="presentation"><a href="#weather-area"  role="tab" data-toggle="tab">天气</a></li>
            <li role="presentation"><a href="#custom-area"   role="tab" data-toggle="tab">自定义</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" style="background-color: #ffffff">

            <div role="tabpanel" class="tab-pane active" id="date-area" text-type = 'CALENDAR'>

                <div>
                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'yyyy'>2015</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'dd'>Jan 2015</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = "EEE">Tue</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'yyyy.MM.dd'>2015.12.11</button>
                    </div>

                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'A'>am/pm</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'JJ:mm'>10:28</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'JJ'>10(小时)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'mm'>28(分钟)</button>
                    </div>
                </div>

                <div class="form-inline">
                    <div class="btn-group btn-sm" role="group">
                        <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li>
                        </ul>
                    </div>

                    <div class="input-group">
                        <input type="text" class="form-control input-sm " >
                        <span class="input-group-btn">
                            <button class="btn btn-default btn-sm" type="button">添加</button>
                        </span>
                     </div>
                </div>

            </div>
            <div role="tabpanel" class="tab-pane" id="weather-area">

            </div>
            <div role="tabpanel" class="tab-pane" id="custom-area">

                <div class="form-inline" >
                    <input class="form-control input-sm" type="text" placeholder="输入文本"/>
                    <input type="button" class = 'btn btn-sm btn-default' value="添加"/>
                </div>

            </div>
        </div>
    </div>

    <p></p>
    <p></p>
    <p></p>
</div>