/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery', 'build_widget_util','fabric',
    'widget_config','bootstrap','colorpicker',
    'slider','data_format','util2','build_widget_text','build_widget_image'],function($,build_widget_util,fab,widget_config,bootstrap,colorpicker,slider,format_data,util,build_widget_text,build_widget_image) {

    widget_config.initWidgetConfig();

    widget_config.canvas = new fabric.Canvas('canvas',{
        width: widget_config.widget_width,
        height: widget_config.widget_height
    });

    var initWidget = function () {

        if(widget_config.is_build){
            widget_config.widget_tmp_xml = $('#widget_xml_string').val();
            widget_config.xml_config =  new DOMParser().parseFromString(widget_config.widget_tmp_xml, "text/xml");

            console.log(widget_config.xml_config);

            build_widget_image.initImageObjWithXML();

            build_widget_text.initTextObjWithXML();

        }else{

            if(widget_config.has_bg_img){
                //widget_config
                fabric.Image.fromURL(widget_config.widget_base_path+'icons/'+widget_config.default_bg_img,  function(oImg) {
                    oImg.setWidth(widget_config.canvas.width);
                    oImg.setHeight(widget_config.canvas.height);
                    oImg.setTop(-0.5);
                    oImg.setLeft(-0.5);
                    oImg.selectable = false;
                    oImg.xmlObject = build_widget_util.createImageElement('bg',widget_config.default_bg_img);
                    widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                    widget_config.canvas.add(oImg);

                });
            }
        }

        widget_config.canvas.renderAll();

        return this;
    };





    //change Bg Color
    var chanegBgColorBtn = $('.bg-color');
    chanegBgColorBtn.click(function () {
        $('.area-bg').css({'background-image':"url('src/img/"+$(this).attr('value')+"')"});
        $('.bg-color').removeClass('btn-success');
        $(this).addClass('btn-success');
    });


    // Keyboard
    var listenKeyBoard = (function () {
        var key_values = [37, 38, 39, 40];

        var new_width,new_height,new_fonts_size;
        $(document.body).on('keydown', function (e) {

            if($.inArray(e.which, key_values) == -1 || widget_config.activeObject == null || util.getActive()){
                return;
            }

            switch (e.which) {
                case 37:
                    e.preventDefault();

                    if(e.ctrlKey || e.altKey){
                        widget_config.activeObject.setAngle(parseInt(widget_config.activeObject.angle) - 1);
                        build_widget_util.updateEleAngle();
                        break;
                    }
                    if($(widget_config.activeObject.xmlObject).attr('android:layout_width') != "match_parent"){
                        widget_config.activeObject.setLeft(widget_config.activeObject.left - 1);
                        build_widget_util.updateElePosition();
                    }
                    break;

                case 38:
                    e.preventDefault();

                    if(e.ctrlKey || e.altKey){
                        if(widget_config.activeObject.get('type') == 'image'){
                            new_width = widget_config.activeObject.width + 1;
                            new_height = new_width * widget_config.activeObject.height /  widget_config.activeObject.width;
                            widget_config.activeObject.setWidth(new_width);
                            widget_config.activeObject.setHeight(new_height);
                            $(widget_config.activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(new_width));
                            $(widget_config.activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(new_height));
                            build_widget_image.initImageOptionModfiyArea();
                        }

                        if(widget_config.activeObject.get('type') == 'text'){
                            new_fonts_size = widget_config.activeObject.fontSize + 1;
                            widget_config.activeObject.setFontSize(new_fonts_size);
                            build_widget_text.updateTextSize();
                        }
                        break;
                    }

                    widget_config.activeObject.setTop(widget_config.activeObject.top - 1);
                    build_widget_util.updateElePosition();
                    break;

                case 39:
                    e.preventDefault();

                    if(e.ctrlKey || e.altKey){
                        widget_config.activeObject.setAngle(widget_config.activeObject.angle + 1);
                        build_widget_util.updateEleAngle();
                        break;
                    }

                    if($(widget_config.activeObject.xmlObject).attr('android:layout_width') != "match_parent"){
                        widget_config.activeObject.setLeft(widget_config.activeObject.left + 1);
                        build_widget_util.updateElePosition();
                    }
                    break;

                case 40:
                    e.preventDefault();

                    if(e.ctrlKey || e.altKey){
                        if(widget_config.activeObject.get('type') == 'image'){
                            new_width = widget_config.activeObject.width - 1;
                            new_height = new_width * widget_config.activeObject.height /  widget_config.activeObject.width;
                            widget_config.activeObject.setWidth(new_width);
                            widget_config.activeObject.setHeight(new_height);
                            $(widget_config.activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(new_width));
                            $(widget_config.activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(new_height));
                            build_widget_image.initImageOptionModfiyArea();
                        }

                        if(widget_config.activeObject.get('type') == 'text'){
                            new_fonts_size = widget_config.activeObject.fontSize - 1;
                            widget_config.activeObject.setFontSize(new_fonts_size);
                            build_widget_text.updateTextSize();
                        }
                        break;
                    }

                    widget_config.activeObject.setTop(widget_config.activeObject.top + 1);
                    build_widget_util.updateElePosition();
                    break;
            }

            console.log(widget_config.activeObject.xmlObject);
            widget_config.canvas.renderAll();

        });
    })();


    // observe widget_config.canvas widget_config.activeObject chanege
    widget_config.canvas.observe('object:selected', function () {
        widget_config.activeObject =  widget_config.canvas.getActiveObject();
        if(widget_config.activeObject.get('type') == 'text'){
            build_widget_text.initTextOptionModfiyArea();
        }
        if(widget_config.activeObject.get('type') == 'image'){
            build_widget_image.initImageOptionModfiyArea();
        }

    });

    widget_config.canvas.observe('object:modified', function () {
        build_widget_util.updateElePosition();
        if(widget_config.activeObject.get('type') == 'text'){
            build_widget_text.initTextOptionModfiyArea();
        }

        if(widget_config.activeObject.get('type') == 'image'){
            build_widget_image.initImageOptionModfiyArea();
        }

    });


    //监听 保存widget xml ----------------------save xml--------------------start
    var saveWidgetBtn = $('#save-widget');
    saveWidgetBtn.click(function () {
        build_widget_util.checkWidgetXML();
        $.post('phpService/saveWidgetXML.php',
            {
                theme:widget_config.theme,
                widget:widget_config.widget,
                widget_xml:(new XMLSerializer()).serializeToString(widget_config.xml_config),
                widget_preview: widget_config.canvas.toDataURL({
                    format: 'png',
                    left: 0,
                    top: 0,
                    multiplier:3,
                    quality:1
                })
            },
            function(data,status){
                if(data == 1 && status=='success'){
                    util.showMessage('保存成功...',util.msg_style_info);
                }else{
                    util.showMessage('保存失败!!!',util.msg_style_danger);
                }
            });
    });
    //----end

    return {
        initWidget:initWidget
    };

});