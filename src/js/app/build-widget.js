/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery', 'build_widget_util','fabric',
    'widget_config','bootstrap','colorpicker',
    'slider','data_format','util2'],function($,build_widget_util,fab,widget_config,bootstrap,colorpicker,slider,format_data,util) {


    widget_config.initWidgetConfig();
    var canvas = new fabric.Canvas('canvas',{
        width: widget_config.widget_width,
        height: widget_config.widget_height
    });
    var activeObject = null;

    var initWidget = function () {

        if(widget_config.has_bg_img){
            //widget_config
            fabric.Image.fromURL(widget_config.widget_base_path+'icons/'+widget_config.default_bg_img,  function(oImg) {
                oImg.setWidth(canvas.width);
                oImg.setHeight(canvas.height);
                oImg.selectable = false;
                oImg.xmlObject = build_widget_util.createImageElement('bg',widget_config.default_bg_img);
                widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                canvas.add(oImg);
            });
        }
        canvas.renderAll();
        return this;
    };


    var createTextOption = function(text_type,data_format){

        var data_text = '';
        if(text_type == 'CALENDAR'){
            data_text = format_data.timeFormat(data_format);
        }else if(text_type == 'WEATHER'){
            data_text = format_data.weatherFormat(data_format);
        }else if(text_type == 'OTHER'){
            data_text = format_data.otherFormat(data_format);
        }else if(text_type == 'CUSTOM'){
            data_text = data_format;
        }else{
            data_text = data_format;
        }

        data_text = build_widget_util.stringCapitalize(data_text,'title');

        var oText = new fabric.Text(data_text, {
            fontFamily: widget_config.default_fontfamily == 'serif'? 'serif2' : widget_config.default_fontfamily,
            fill:widget_config.default_font_color,
            fontSize:widget_config.default_font_size,
            top:widget_config.default_text_top,
            left:widget_config.default_text_left
        });

        oText.xmlObject = build_widget_util.createTextElement(text_type,data_format);
        oText.oldPositon = {top:widget_config.default_text_top, left:widget_config.default_text_left};

        widget_config.xml_config.firstChild.appendChild(oText.xmlObject);
        //canvas.centerObjectH(oText);
        //oText.lockMovementX = true;
        oText.hasControls = false;
        canvas.add(oText);
        activeObject = oText;
        $('#option-modfiy-area').show();
        initTextOptionModfiyArea()
    };


    var elementListener = (function(){

        //change Bg Color
        var chanegBgColorBtn = $('.bg-color');
        chanegBgColorBtn.click(function () {
            $('.area-bg').css({'background-image':"url('src/img/"+$(this).attr('value')+"')"});
            $('.bg-color').removeClass('btn-success');
            $(this).addClass('btn-success');
        });

        //add new Text Elemment
        var tab_pane = 'tab-pane';
        $(".text-ele").click(function() {
            var root_ele  = build_widget_util.findRootTag($(this),tab_pane);
            var text_type  = root_ele.attr('data-type');
            var data_format  = $(this).attr('data-format');
            createTextOption(text_type,data_format);
        });

        $(".add-text-ele").click(function () {
            var root_ele= build_widget_util.findRootTag($(this),tab_pane);
            var text_type = root_ele.attr('data-type');

            var data_format = $('.input-format',root_ele).val();
            if(data_format.length == 0){
                util.showMessage('输入框不能为空!',util.msg_style_danger);
            }else{
                createTextOption(text_type,data_format);
            }

        });

        var addImageBtn = $('.add-image-ele');
        addImageBtn.click(function () {
            var image_name = $(this).attr('data-name');
            fabric.Image.fromURL(widget_config.widget_base_path+'icons/'+image_name,  function(oImg) {
                oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));
                oImg.xmlObject = build_widget_util.createImageElement('image',image_name);
                oImg.oldPositon = {top:0, left:0};
                widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                oImg.hasControls = false;
                activeObject = oImg;
                canvas.add(oImg);
                initImageOptionModfiyArea();
            });
        });

        //show weather icon or not
        var ctrlWeatherBtn = $('#ctrl-weather');
        var weaterObject = null;
        ctrlWeatherBtn.click(function() {
            if(ctrlWeatherBtn.attr('data-value') == 0){
                if(widget_config.has_weather){
                    fabric.Image.fromURL(widget_config.default_weather_icon,  function(oImg) {
                        oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                        oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));
                        oImg.xmlObject = build_widget_util.createImageElement('weather','');
                        oImg.oldPositon = {top:0, left:0};
                        widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                        weaterObject = oImg;
                        oImg.hasControls = false;
                        activeObject = oImg;
                        canvas.add(oImg);
                        initImageOptionModfiyArea();
                    });
                    ctrlWeatherBtn.attr('data-value',1);
                    ctrlWeatherBtn.addClass('btn-success');
                    build_widget_util.getXmlRes('weather');
                }else{
                    util.showMessage('该插件没有天气元素',util.msg_style_danger);
                }
            }else{
                canvas.remove(weaterObject);
                widget_config.xml_config.firstChild.removeChild(weaterObject.xmlObject);
                activeObject = weaterObject = null;
                ctrlWeatherBtn.attr('data-value',0);
                ctrlWeatherBtn.removeClass('btn-success');
                initImageOptionModfiyArea();
            }

        });



        //show battery icon or not
        var ctrlbatteryBtn = $('#ctrl-battery');
        var ctrlbatteryObject = null;
        ctrlbatteryBtn.click(function() {
            if(ctrlbatteryBtn.attr('data-value') == 0){
                if(widget_config.has_battery){
                    fabric.Image.fromURL(widget_config.default_battery_icon,  function(oImg) {
                        oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                        oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));

                        oImg.xmlObject = build_widget_util.createImageElement('battery','');
                        widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                        oImg.oldPositon = {top:0, left:0};
                        ctrlbatteryObject = oImg;
                        oImg.hasControls = false;
                        activeObject = oImg;
                        canvas.add(oImg);
                        initImageOptionModfiyArea();
                    });
                    ctrlbatteryBtn.attr('data-value',1);
                    ctrlbatteryBtn.addClass('btn-success');
                    build_widget_util.getXmlRes('battery');
                }else{
                    util.showMessage('该插件没有电量元素',util.msg_style_danger);
                }
            }else{
                canvas.remove(ctrlbatteryObject);
                widget_config.xml_config.firstChild.removeChild(ctrlbatteryObject.xmlObject);
                activeObject = ctrlbatteryObject = null;
                ctrlbatteryBtn.attr('data-value',0);
                ctrlbatteryBtn.removeClass('btn-success');
                initImageOptionModfiyArea();
            }

        });



        // observe canvas activeObject chanege
        canvas.observe('object:selected', function () {
            activeObject =  canvas.getActiveObject();
            if(activeObject.get('type') == 'text'){
                initTextOptionModfiyArea();
            }else if(activeObject.get('type') == 'image'){
                initImageOptionModfiyArea();
            }else{

            }
        });

        canvas.observe('object:modified', function () {
            updateElePosition();
            if(activeObject.get('type') == 'text'){
                initTextOptionModfiyArea();
            }

            if(activeObject.get('type') == 'image'){
                initImageOptionModfiyArea();
            }

        });


        //监听 保存widget xml ----------------------save xml--------------------start
        var saveWidgetBtn = $('#save-widget');
        saveWidgetBtn.click(function () {
            build_widget_util.saveWidgetXML()
        });
        //----end
    })();


    var updateElePosition = function(){

        var df_top = activeObject.top - activeObject.oldPositon.top;
        var df_left = activeObject.left - activeObject.oldPositon.left;

        var new_top = parseInt($(activeObject.xmlObject).attr('android:layout_y')) + df_top;
        $(activeObject.xmlObject).attr('android:layout_y',build_widget_util.convertDp(new_top));

        var new_left = parseInt($(activeObject.xmlObject).attr('android:layout_x')) + df_left;
        $(activeObject.xmlObject).attr('android:layout_x',build_widget_util.convertDp(new_left));

        activeObject.oldPositon.top = activeObject.top;
        activeObject.oldPositon.left = activeObject.left;

    };


    var updateEleAngle = function(){
        $(activeObject.xmlObject).attr('android:rotation', activeObject.angle);
        activeObject.oldPositon.top = activeObject.top;
        activeObject.oldPositon.left = activeObject.left;

    };


    var modfiyTextListener = (function () {

        //监听文字元素的布局方式----------layout-----------------------start
        $("#text-layout").change(function(){
            var layout_width = $(this).val();

            if(layout_width == 'match_parent'){
                canvas.centerObjectH(activeObject);
                activeObject.lockMovementX = true;
                $(activeObject.xmlObject).attr("android:alignment",'center');
                updateElePosition();
            }else{
                activeObject.lockMovementX = false;
                updateElePosition();
                $(activeObject.xmlObject).removeAttr("android:alignment");
            }

            $(activeObject.xmlObject).attr('android:layout_width',layout_width);
            canvas.renderAll();
        });
        //------------------end


        //监听文字字体的变化--------family-----------------start
        var font_familys = $("#font-family-id");
        font_familys.change(function(){

            activeObject.setFontFamily($(this).val().split('.')[0]);
            $(activeObject.xmlObject).attr('android:typeface','./fonts/' + $(this).val());
            canvas.renderAll();
        });
        //------------------end

        //监听文字大小的变化------------------size--------------start
        var font_size = $("#font-size");
        var font_size_minus = $("#font-size-minus");
        var font_size_plus = $("#font-size-plus");
        font_size_minus.click(function(){
            font_size.val( parseInt(font_size.val()) - 1);
            updateWidgetFontSize();
        });
        font_size_plus.click(function() {
            font_size.val(parseInt(font_size.val()) + 1);
            updateWidgetFontSize();
        });
        font_size.keyup(function(){
            updateWidgetFontSize();
        });

        var updateWidgetFontSize = function(){
            activeObject.setFontSize(font_size.val());
            if($("#text-layout").val() == 'match_parent'){
                canvas.centerObjectH(activeObject);
            }
            $(activeObject.xmlObject).attr('android:textSize',build_widget_util.convertDp(font_size.val()));

            canvas.renderAll();
        };



        //------------------end

        //监听文字颜色的变化-----------------color----------------start
        var font_color = $("#font-color");
        var font_color_option = $(".font-color-option");
        font_color_option.colorpicker().on(
            'changeColor.colorpicker', function () {
                activeObject.setFill(font_color.val());
                $(activeObject.xmlObject).attr('android:textColor',build_widget_util.convertColor(font_color.val()));
                canvas.renderAll();
            }
        );

        //------------------end

        //监听文字旋转角度----------------------angle--------------------start
        var text_angle = $('#text-angle');
        text_angle.bind("slider:changed", function (event, data) {
            activeObject.setAngle(data.value);
            updateEleAngle();
            canvas.renderAll();

        });

        //-----------------end

        //监听文字大小写------------------------------------------start
        var letterSizeBtn = $('.change-letter-size');
        letterSizeBtn.click(function () {

            letterSizeBtn.removeClass('btn-success');
            $(activeObject.xmlObject).attr('android:textCaps',$(this).attr('data-type'));
            activeObject.setText(build_widget_util.stringCapitalize(activeObject.getText(),$(this).attr('data-type')));
            canvas.renderAll();
            $(this).addClass('btn-success');
        });

        //-----------------end

        //删除当前文字元素----------------------angle--------------------start
        var deleteTextBtn = $('#delete-text');
        deleteTextBtn.click(function(){
            canvas.remove(activeObject);
            widget_config.xml_config.firstChild.removeChild(activeObject.xmlObject);
            activeObject = null;
            initTextOptionModfiyArea();
        });

    })();


    var modfiyImageListener = (function () {


        //监听图片大小的变化------------------size--------------start
        var image_w = $("#image-w");
        var image_size_minus = $("#image-size-minus");
        var image_size_plus = $("#image-size-plus");
        image_size_minus.click(function(){
            image_w.val( parseInt(image_w.val()) - 1);
            updateWidgetImageSize();
        });
        image_size_plus.click(function() {
            image_w.val(parseInt(image_w.val()) + 1);
            updateWidgetImageSize();
        });
        image_w.keyup(function(){
            updateWidgetImageSize();
        });

        var updateWidgetImageSize = function(){

            var image_height = Math.round(image_w.val() * activeObject.getHeight() /  activeObject.getWidth());
            activeObject.setWidth(parseInt(image_w.val()));
            activeObject.setHeight(image_height);
            $(activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(image_w.val()));
            $(activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(image_height));

            canvas.renderAll();
        };



        var deleteTextBtn = $('#delete-image');
        deleteTextBtn.click(function(){
            canvas.remove(activeObject);
            widget_config.xml_config.firstChild.removeChild(activeObject.xmlObject);
            activeObject = null;
            initImageOptionModfiyArea();
        });

    })();

    var initTextOptionModfiyArea = function () {
        if(activeObject != null){
            $('#option-modfiy-image-area').hide();
            $('#option-modfiy-text-area').show();
            $('#show-text-value').html(activeObject.getText());
            $('#font_family_id').val(activeObject.fontFamily);
            $('#text-layout').val($(activeObject.xmlObject).attr('android:layout_width'));
            $('#font-size').val(activeObject.fontSize);
            $('.change-letter-size').removeClass('btn-success');
            $("button[data-type][data-type='"+$(activeObject.xmlObject).attr('android:textCaps')+"']").addClass('btn-success');

            $('#font-color').val(activeObject.getFill());

            $('.font-color-option i').css({'background-color':function(){return activeObject.getFill();}});
        }else{
            $('#option-modfiy-text-area').hide();
        }

    };

    var initImageOptionModfiyArea = function () {
        if(activeObject != null){
            $('#option-modfiy-text-area').hide();
            $('#option-modfiy-image-area').show();
            $('#image-w').val(activeObject.getWidth());
        }else{
            $('#option-modfiy-image-area').hide();

        }

    };


    




// Keyboard

    var listenKeyBoard = (function () {
        var key_values = [37, 38, 39, 40];

        var new_width,new_height,new_fonts_size;
        $(document.body).on('keydown', function (e) {


            if($.inArray(e.which, key_values) == -1 || activeObject == null){
                return;
            }
            $("#banner_model").hide();
            $("#edit_area").show();
            $("#diy_self").addClass('active');
            $("#choose_temp").removeClass('active');
            switch (e.which) {
                case 37:
                    e.preventDefault();

                    if(e.ctrlKey){
                        activeObject.setAngle(parseInt(activeObject.getAngle()) - 1);
                        updateEleAngle();
                        break;
                    }
                    if($(activeObject.xmlObject).attr('android:layout_width') != "match_parent"
                        || typeof ($(activeObject.xmlObject).attr('android:alignment')) == "undefined" ){
                        activeObject.setLeft(activeObject.left - 1);
                        updateElePosition();
                    }
                    break;

                case 38:
                    e.preventDefault();

                    if(e.ctrlKey){
                        if(activeObject.get('type') == 'image'){
                            new_width = activeObject.getWidth()+1;
                            new_height = Math.round( new_width * activeObject.getHeight() /  activeObject.getWidth());
                            activeObject.setWidth(parseInt(new_width));
                            activeObject.setHeight(new_height);
                            $(activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(new_width));
                            $(activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(new_height));

                        }

                        if(activeObject.get('type') == 'text'){
                            var new_fonts_size = parseInt(activeObject.getFontSize())+1;
                            activeObject.setFontSize(new_fonts_size);
                            $(activeObject.xmlObject).attr('android:textSize',build_widget_util.convertDp(new_fonts_size));
                            if($(activeObject.xmlObject).attr('android:layout_width') == "match_parent"){
                                canvas.centerObjectH(activeObject);
                            }
                        }
                        break;
                    }

                    activeObject.setTop(activeObject.top - 1);
                    updateElePosition();
                    break;

                case 39:
                    e.preventDefault();

                    if(e.ctrlKey){
                        activeObject.setAngle(parseInt(activeObject.getAngle()) + 1);
                        updateEleAngle();
                        break;
                    }

                    if($(activeObject.xmlObject).attr('android:layout_width') != "match_parent"
                        || typeof ($(activeObject.xmlObject).attr('android:alignment')) == "undefined" ){
                        activeObject.setLeft(activeObject.left + 1);
                        updateElePosition();
                    }
                    break;

                case 40:
                    e.preventDefault();

                    if(e.ctrlKey){
                        if(activeObject.get('type') == 'image'){
                            new_width = activeObject.getWidth() - 1;
                            new_height = Math.round( new_width * activeObject.getHeight() /  activeObject.getWidth());
                            activeObject.setWidth(parseInt(new_width));
                            activeObject.setHeight(new_height);
                            $(activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(new_width));
                            $(activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(new_height));
                        }

                        if(activeObject.get('type') == 'text'){
                            new_fonts_size = parseInt(activeObject.getFontSize()) - 1;
                            activeObject.setFontSize(new_fonts_size);
                            $(activeObject.xmlObject).attr('android:textSize',build_widget_util.convertDp(new_fonts_size));

                            if($(activeObject.xmlObject).attr('android:layout_width') == "match_parent"){
                                canvas.centerObjectH(activeObject);
                            }
                        }
                        break;
                    }

                    activeObject.setTop(activeObject.top + 1);
                    updateElePosition();
                    break;
            }

            canvas.renderAll();


        });
    })();



    return {
        initWidget:initWidget
    };

});