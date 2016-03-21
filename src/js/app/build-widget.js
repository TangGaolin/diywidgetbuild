/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery','util','fabric','widget_config'],function($,util,fab,widget_config) {

    var widget_base_path = $('#widget-base-path').val();
    var xml_url = widget_base_path + 'widget.xml';
    var xml_config = util.getWidgetXml(xml_url);

    var layout_width =  parseInt($(xml_config).find("AbsoluteElement").attr('android:layout_width'));
    var layout_height =  parseInt($(xml_config).find("AbsoluteElement").attr('android:layout_height'));

    $('.widget_area').css({'width':layout_width,'height':layout_height});

    var canvas = new fabric.Canvas('canvas',{
        width: layout_width,
        height: layout_height
    });


    ////add image element to view
    var applyImage = function(image_element){
        var image_url = widget_base_path+image_element.attr('android:src');
        var image_width=0,image_height=0;

        if(image_element.attr('android:layout_width') == 'match_parent'
            &&
            image_element.attr('android:layout_width') == 'match_parent'
        ){
            image_width = canvas.width;
            image_height = canvas.height;
        }

        fabric.Image.fromURL(image_url,  function(oImg) {

            if(image_width !=0 ){
                oImg.setWidth(image_width);
                oImg.setHeight(image_height);
                oImg.selectable = false;
            }
            canvas.add(oImg);
        });
    };



    var applyText = function(text_element){

        var text_element_object = util.getTextElementAttrValue(text_element,"android:type");

        var font_family = util.getElementValueByAttr(text_element,"android:type");

        //new fabric.Text(text_value, {
        //    fontFamily: CanvasImageText.fontFamily,
        //    fill:CanvasImageText.fill,
        //    fontSize:CanvasImageText.fontSize,
        //    fontWeight:CanvasImageText.fontWeight,
        //    shadow: CanvasImageText.shadow,
        //    fontStyle: CanvasImageText.fontStyle,
        //    top:CanvasImageText.top,
        //    left:CanvasImageText.left
        //});

        //fabric.Image.fromURL(image_url,  function(oImg) {
        //    if(image_width !=0){
        //        oImg.setWidth(image_width);
        //        oImg.setHeight(image_height);
        //    }
        //    oImg.selectable = false;
        //    canvas.add(oImg);
        //});
    };

    $(xml_config).find("ImageElement").each(function(){
        console.log($(this).attr('android:src'));
        applyImage($(this));
    });

    $(xml_config).find("TextElement").each(function(){
        applyText($(this));
    });








    //canvas.renderAll();


});