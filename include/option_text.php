<div class = 'option-text'>
    <label>文字元素:</label><br/>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#date-area" aria-controls="home" role="tab" data-toggle="tab">日期 / 时间</a></li>
            <li role="presentation"><a href="#weather-area"  role="tab" data-toggle="tab">天气</a></li>
            <li role="presentation"><a href="#other-area"  role="tab" data-toggle="tab">电量/提醒</a></li>
            <li role="presentation"><a href="#custom-area"   role="tab" data-toggle="tab">自定义</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" style="background-color: #ffffff">

            <div role="tabpanel" class="tab-pane active" id="date-area" data-type = 'CALENDAR'>

                <div>
                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'jj:mm'>10:28</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'jj'>10(小时)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = "mm">28(分钟)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'A'>am/pm</button>
                    </div>

                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'MMMM'>January</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'MMM'>Jan</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'MM'>03(月)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'EEEE'>wednesday</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'E'>wed</button>
                    </div>
                </div>

                <div class="form-inline" style="padding: 5px 10px">
                    <input class="form-control input-sm input-format" type="text" placeholder="自定义日期格式"/>
                    <button type="button" class = 'btn btn-sm btn-default add-text-ele' >添加</button>
                    <br/>
                    <span class="text-danger small">例:yyyy-MM-dd = 2016-3-28</span>
                </div>


            </div>

            <div role="tabpanel" class="tab-pane" id="weather-area" data-type="WEATHER">
                <div>
                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'TU'>50℃ (气温)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'W'>12km/h (风速)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = "S">Sunny (天气状态)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'R'>30% (湿度)</button>

                    </div>

                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'A'>beijing (位置)</button>
                    </div>

                </div>

                <div class="form-inline" style="padding: 5px 10px">
                    <input class="form-control input-sm input-format" type="text"  placeholder="自定义天气格式"/>
                    <button type="button" class = 'btn btn-sm btn-default add-text-ele' >添加</button>
                    <br/>
                    <span class="text-danger small">例:L/H U = 0/15 ℃ </span>
                </div>
            </div>


            <div role="tabpanel" class="tab-pane" id="other-area" data-type="OTHER">
                <div>
                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'SMS_UNREAD'>SMS:8 (未读消息)</button>
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = 'TELEPHONY_MISSED_CALLS'>Call:2 (未接来电)</button>


                    </div>

                    <div class="btn-group btn-sm" role="group" >
                        <button type="button" class="btn btn-sm btn-default text-ele" data-format = "BATTERY_LEVEL">80% (电量)</button>
                    </div>

                </div>


            </div>

            <div role="tabpanel" class="tab-pane" id="custom-area" data-type="CUSTOM">

                <div class="form-inline" style="padding: 5px 10px">
                    <input class="form-control input-sm input-format" type="text"  placeholder="自定义文字"/>
                    <button type="button" class = 'btn btn-sm btn-default add-text-ele' >添加</button>
                    <br/>
                    <span class="text-danger small">注:插件上固定的文字 如:Call </span>
                </div>

            </div>
        </div>
    </div>

    <p></p>

</div>