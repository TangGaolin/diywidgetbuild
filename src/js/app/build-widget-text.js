/**
 * Created by tanggaolin on 16-4-13.
 */
define(['jquery', 'build_widget_util','fabric',
    'widget_config','bootstrap','colorpicker',
    'slider','data_format','util2'],function($,build_widget_util,fab,widget_config,bootstrap,colorpicker,slider,format_data,util) {


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
            fill:build_widget_util.convertRgbString(widget_config.default_font_color),
            fontSize:widget_config.default_font_size,
            top:widget_config.default_text_top,
            left:widget_config.default_text_left,
            lineHeight:1
        });


        oText.xmlObject = build_widget_util.createTextElement(text_type,data_format);
        oText.oldPositon = {top:widget_config.default_text_top, left:widget_config.default_text_left};
        $(oText.xmlObject).attr('android:layout_width',build_widget_util.convertDp(oText.width));
        $(oText.xmlObject).attr('android:layout_height',build_widget_util.convertDp(oText.height));

        widget_config.xml_config.firstChild.appendChild(oText.xmlObject);
        //console.log(widget_config.xml_config);

        oText.hasControls = false;
        widget_config.canvas.add(oText);


        widget_config.canvas.setActiveObject(oText);
        widget_config.activeObject = oText;
        $('#option-modfiy-area').show();


        widget_config.canvas.renderAll();
        initTextOptionModfiyArea()
    };


    var initTextOptionModfiyArea = function () {
        if(widget_config.activeObject != null){
            $('#option-modfiy-image-area').hide();
            $('#option-modfiy-text-area').show();
            $('#show-text-value').html(widget_config.activeObject.text);
            $('#font_family_id').val($(widget_config.activeObject.xmlObject).attr('android:typeface').split('.').pop());

            if($(widget_config.activeObject.xmlObject).attr('android:layout_width') == 'match_parent'){
                $('#text-layout').val($(widget_config.activeObject.xmlObject).attr('android:layout_width'));
            }else{
                $('#text-layout').val('wrap_content');
            }

            $('#font-size').val(widget_config.activeObject.fontSize);
            $('.change-letter-size').removeClass('btn-success');
            $("button[data-type][data-type='"+$(widget_config.activeObject.xmlObject).attr('android:textCaps')+"']").addClass('btn-success');

            $('#font-color').val(widget_config.activeObject.fill);

            $('.font-color-option i').css({'background-color':function(){return widget_config.activeObject.fill;}});
        }else{
            $('#option-modfiy-text-area').hide();
        }

    };




    //监听文字元素的布局方式----------layout-----------------------start
    $("#text-layout").change(function(){
        var layout_width = $(this).val();
        if(layout_width == 'match_parent'){
            widget_config.canvas.centerObjectH(widget_config.activeObject);
            widget_config.activeObject.lockMovementX = true;
            build_widget_util.updateElePosition();
        }else{
            widget_config.activeObject.lockMovementX = false;
            build_widget_util.updateElePosition();
        }

        $(widget_config.activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(widget_config.activeObject.width));
        widget_config.canvas.renderAll();
    });
    //------------------end


    //监听文字字体的变化--------family-----------------start
    var font_familys = $("#font-family-id");
    font_familys.change(function(){
        widget_config.activeObject.setFontFamily($(this).val().split('.')[0]);
        $(widget_config.activeObject.xmlObject).attr('android:typeface','./fonts/' + $(this).val());
        widget_config.canvas.renderAll();
        initTextOptionModfiyArea();
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
        widget_config.activeObject.setFontSize(font_size.val());
        if($("#text-layout").val() == 'match_parent'){
            widget_config.canvas.centerObjectH(widget_config.activeObject);
        }
        $(widget_config.activeObject.xmlObject).attr('android:textSize',build_widget_util.convertDp(font_size.val()));
        $(widget_config.activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(widget_config.activeObject.width));
        $(widget_config.activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(widget_config.activeObject.height));

        widget_config.canvas.renderAll();
    };



    //------------------end

    //监听文字颜色的变化-----------------color----------------start
    var font_color_option = $(".font-color-option");
    widget_config.initPreviewColor();
    font_color_option.colorpicker({
        colorSelectors:widget_config.preview_colors,
        format: 'rgba'
    }).on(
        'changeColor.colorpicker', function (e) {
            widget_config.activeObject.setFill(build_widget_util.convertRgbString(e.color.toRGB()));
            $(widget_config.activeObject.xmlObject).attr('android:textColor',build_widget_util.convertColor(e.color.toRGB()));
            widget_config.canvas.renderAll();
            console.log(widget_config.preview_colors);
        }
    );

    //------------------end

    //监听文字旋转角度----------------------angle--------------------start
    var text_angle = $('#text-angle');
    text_angle.bind("slider:changed", function (event, data) {
        widget_config.activeObject.setAngle(data.value);
        build_widget_util.updateEleAngle();
        widget_config.canvas.renderAll();

    });

    //-----------------end

    //监听文字大小写------------------------------------------start
    var letterSizeBtn = $('.change-letter-size');
    letterSizeBtn.click(function () {

        letterSizeBtn.removeClass('btn-success');
        $(widget_config.activeObject.xmlObject).attr('android:textCaps',$(this).attr('data-type'));
        widget_config.activeObject.setText(build_widget_util.stringCapitalize(widget_config.activeObject.getText(),$(this).attr('data-type')));
        widget_config.canvas.renderAll();
        $(this).addClass('btn-success');
    });

    //-----------------end

    //删除当前文字元素----------------------angle--------------------start
    var deleteTextBtn = $('#delete-text');
    deleteTextBtn.click(function(){
        widget_config.canvas.remove(widget_config.activeObject);
        widget_config.xml_config.firstChild.removeChild(widget_config.activeObject.xmlObject);
        widget_config.activeObject = null;
        initTextOptionModfiyArea();
    });

    return {
        initTextOptionModfiyArea:initTextOptionModfiyArea
    };

});

