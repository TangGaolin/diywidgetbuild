/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery','util','fabric','widget_config','bootstrap','colorpicker','slider'],function($,util,fab,widget_config,bootstrap,colorpicker,slider) {


    widget_config.initWidgetConfig();
    var canvas = new fabric.Canvas('canvas',{
        width: widget_config.widget_width,
        height: widget_config.widget_height
    });
    var activeObject = null;


    var initWidget = function () {

        if(widget_config.has_bg_img){
            //widget_config
            fabric.Image.fromURL(widget_config.defau_bg_img,  function(oImg) {
                oImg.setWidth(canvas.width);
                oImg.setHeight(canvas.height);
                oImg.selectable = false;
                oImg.xmlObject = util.createImageElement('bg');
                widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                canvas.add(oImg);
            });
        }
        canvas.renderAll();
        return this;
    };


    var elementListener = (function(){

        //add new Text Elemment
        $("#option-area").on('click','.text-type', function() {
            var text_type = $(this).val();
            var oText = new fabric.Text(widget_config.getTextType(text_type), {
                fontFamily: widget_config.default_fontfamily,
                fill:'#000000',
                fontSize:12,
                top:30
            });
            oText.xmlObject = util.createTextElement({text_value:'',text_type:text_type});
            widget_config.xml_config.firstChild.appendChild(oText.xmlObject);
            canvas.centerObjectH(oText);
            oText.lockMovementX = true;
            oText.hasControls = false;
            canvas.add(oText);
            activeObject = oText;
            $('#option-modfiy-area').show();
            initTextOptionModfiyArea()
        });

        //show weather icon or not
        var ctrlWeatherBtn = $('#ctrl-weather');
        var weaterObject = null;
        ctrlWeatherBtn.click(function() {
            if(ctrlWeatherBtn.val() == 0){
                if(widget_config.has_weather){

                    fabric.Image.fromURL(widget_config.default_weather_icon,  function(oImg) {
                        oImg.setWidth(oImg.width / widget_config.px_dp_raito);
                        oImg.setHeight(oImg.height / widget_config.px_dp_raito);
                        oImg.xmlObject = util.createImageElement('weather');
                        widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                        weaterObject = oImg;
                        oImg.hasControls = false;
                        canvas.add(oImg);
                    });
                    ctrlWeatherBtn.val(1);
                }else{

                }
            }else{
                canvas.remove(weaterObject);
                widget_config.xml_config.firstChild.removeChild(weaterObject.xmlObject);
                weaterObject = null;
                ctrlWeatherBtn.val(0);
            }

            //initTextOptionModfiyArea()
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
            if(activeObject.get('type') == 'text'){
                $(activeObject.xmlObject).attr('android:layout_y',util.convertDp(activeObject.getTop()));
                if($("#text-layout").val() != 'match_parent'){
                    $(activeObject.xmlObject).attr('android:layout_x',util.convertDp(activeObject.getLeft()));
                }
                initTextOptionModfiyArea();
            }

            if(activeObject.get('type') == 'image'){
                $(activeObject.xmlObject).attr('android:layout_y',util.convertDp(activeObject.getTop()));
                $(activeObject.xmlObject).attr('android:layout_x',util.convertDp(activeObject.getLeft()));
                initImageOptionModfiyArea();
            }
        });


        //监听 保存widget xml ----------------------save xml--------------------start
        var saveWidgetBtn = $('#save-widget');
        saveWidgetBtn.click(function () {
            util.saveWidgetXML()
        });
        //----end
    })();


    var modfiyTextListener = (function () {

        //监听文字元素的布局方式----------layout-----------------------start
        $("#text-layout").change(function(){
            var layout_width = $(this).val();

            if(layout_width == 'match_parent'){
                canvas.centerObjectH(activeObject);
                activeObject.lockMovementX = true;
                $(activeObject.xmlObject).removeAttr('android:layout_x');
                $(activeObject.xmlObject).attr("android:alignment",'center');
                //$('#text-layout-x-span').hide();
            }else{
                activeObject.lockMovementX = false;
                $(activeObject.xmlObject).attr('android:layout_x',util.convertDp(activeObject.getLeft()));
                $(activeObject.xmlObject).removeAttr("android:alignment");
                //$('#text-layout-x-span').show();
            }
            $(activeObject.xmlObject).attr('android:layout_width',layout_width);
            canvas.renderAll();
        });
        //------------------end


        //监听文字字体的变化--------family-----------------start
        var font_familys = $("#font-family-id");
        font_familys.change(function(){
            activeObject.setFontFamily($(this).val());
            $(activeObject.xmlObject).attr('android:typeface','./' + $(this).val()+'.ttf');
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
            $(activeObject.xmlObject).attr('android:textSize',util.convertDp(font_size.val()));
            console.log($(activeObject.xmlObject).attr('android:textSize'));
            canvas.renderAll();
        };

        //------------------end

        //监听文字颜色的变化-----------------color----------------start
        var font_color = $("#font-color");
        var font_color_option = $(".font-color-option");
        font_color_option.colorpicker().on(
            'changeColor.colorpicker', function () {
                activeObject.setFill(font_color.val());
                $(activeObject.xmlObject).attr('android:textColor',util.convertColor(font_color.val()));
                canvas.renderAll();
            }
        );

        //------------------end

        //监听文字旋转角度----------------------angle--------------------start
        var text_angle = $('#text-angle');
        text_angle.bind("slider:changed", function (event, data) {
            activeObject.setAngle(data.value);
            $(activeObject.xmlObject).attr('android:rotation',data.value);
            canvas.renderAll();
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

    var initTextOptionModfiyArea = function () {
        if(activeObject != null){
            $('#option-modfiy-image-area').hide();
            $('#option-modfiy-text-area').show();
            $('#show-text-value').html(activeObject.getText());
            $('#font_family_id').val(activeObject.getFontFamily());
            //$('#text_layout_y').val(activeObject.getTop());
            //$('#text_layout_x').val(activeObject.getLeft());
            $('#font-size').val(activeObject.getFontSize());

        }
        console.log(widget_config.xml_config);
    };

    var initImageOptionModfiyArea = function () {
        if(activeObject != null){
            $('#option-modfiy-text-area').hide();
            $('#option-modfiy-image-area').show();

        }
        console.log(widget_config.xml_config);
    };


    
    var initOption = function () {
        $("#date-area").html(util.getTextcheckBoxHTML(widget_config.date_text_types));
        $("#time-area").html(util.getTextcheckBoxHTML(widget_config.time_text_types));
        $("#font-family-id").html(util.getFontsSelectHTML());
        return this;
    };



    return {
        initWidget:initWidget,
        initOption:initOption
    };

});