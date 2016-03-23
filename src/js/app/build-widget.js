/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery','util','fabric','widget_config','bootstrap'],function($,util,fab,widget_config,bootstrap) {


    widget_config.initWidgetConfig();
    var canvas = new fabric.Canvas('canvas',{
        width: widget_config.widget_width,
        height: widget_config.widget_height
    });
    var activeObject = null;


    var initWidget = function () {

        if(widget_config.has_bg_img){
            //widget_config
            var back_image_url = widget_config.widget_base_path + 'widget_bg_1.png';
            fabric.Image.fromURL(back_image_url,  function(oImg) {
                oImg.setWidth(canvas.width);
                oImg.setHeight(canvas.height);
                oImg.selectable = false;
                var ImageElement = widget_config.xml_config.createElement('ImageElement');
                $(ImageElement).attr('android:layout_width',"match_parent");
                $(ImageElement).attr('android:layout_height',"match_parent");
                $(ImageElement).attr('android:src',"./widget_bg_1.png");
                oImg.xmlObject = ImageElement;
                widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                canvas.add(oImg);
            });
        }
        canvas.renderAll();
        return this;
    };


    var eventListener = (function(){

        //add new Text Elemment
        $("#option-area").on('click','.text-type', function() {
            var text_type = $(this).val();
            var oText = new fabric.Text(widget_config.getTextType(text_type), {
                fontFamily: widget_config.default_fontfamily,
                fill:'#000000',
                fontSize:20,
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

        //update font family
        $("#font-family-id").change(function(){
            var font_value = $(this).val();
            activeObject.setFontFamily(font_value);
            $(activeObject.xmlObject).attr('android:typeface','./'+font_value+'.ttf');
            canvas.renderAll();
        });

        //update font size
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
            canvas.centerObjectH(activeObject);
            $(activeObject.xmlObject).attr('android:textSize',font_size.val()+'dp');
            canvas.renderAll();
        };

        //update text layout
        $("#text-layout").change(function(){
            var layout_width = $(this).val();

            if(layout_width == 'match_parent' ){
                canvas.centerObjectH(activeObject);
                activeObject.lockMovementX = true;
                $(activeObject.xmlObject).attr('android:layout_x','0dp');
                $(activeObject.xmlObject).attr("android:alignment",'center');
                $('#text-layout-x-span').hide();
            }else{
                activeObject.lockMovementX = false;
                $(activeObject.xmlObject).attr('android:layout_x',activeObject.getLeft() + 'dp');
                $(activeObject.xmlObject).removeAttr("android:alignment");
                $('#text-layout-x-span').show();
            }

            $(activeObject.xmlObject).attr('android:layout_width',layout_width);


            canvas.renderAll();
        });



        // observe canvas activeObject chanege
        canvas.observe('object:selected', function () {
            activeObject =  canvas.getActiveObject();
            if(activeObject.get('type') == 'text'){
                initTextOptionModfiyArea();
            }

        });

        canvas.observe('object:modified', function () {
            if(activeObject.get('type') == 'text'){

                $(activeObject.xmlObject).attr('android:layout_y',activeObject.getTop()+'dp');
                $(activeObject.xmlObject).attr('android:layout_x',activeObject.getLeft()+'dp');
                initTextOptionModfiyArea();
            }
        });
    })();

    var initTextOptionModfiyArea = function () {
        if(activeObject != null){
            $('#option-modfiy-area').show();

            $('#font_family_id').val(activeObject.getFontFamily());
            $('#text_layout_y').val(activeObject.getTop());
            $('#text_layout_x').val(activeObject.getLeft());
            $('#font-size').val(activeObject.getFontSize());

        }else{
            $('#option-modfiy-area').hide();
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