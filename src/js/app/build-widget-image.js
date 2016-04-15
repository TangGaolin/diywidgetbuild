/**
 * Created by tanggaolin on 16-4-13.
 */

define(['jquery', 'build_widget_util','fabric',
    'widget_config','data_format','util2'],function($,build_widget_util,fab,widget_config,format_data,util) {


    var addImageBtn = $('.add-image-ele');
    addImageBtn.click(function () {
        var image_name = $(this).attr('data-name');
        fabric.Image.fromURL(widget_config.widget_base_path + 'icons/' + image_name, function (oImg) {
            oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
            oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));
            oImg.xmlObject = build_widget_util.createImageElement('image', image_name);
            oImg.oldPositon = {top: 0, left: 0};
            widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
            oImg.hasControls = false;
            widget_config.canvas.add(oImg);
            widget_config.canvas.setActiveObject(oImg);
            widget_config.activeObject = oImg;
            widget_config.canvas.renderAll();
            initImageOptionModfiyArea();
        });
    });

    //show weather icon or not
    var ctrlWeatherBtn = $('#ctrl-weather');
    var weaterObject = null;
    ctrlWeatherBtn.click(function () {
        if (ctrlWeatherBtn.attr('data-value') == 0) {
            if (widget_config.has_weather) {
                fabric.Image.fromURL(widget_config.default_weather_icon, function (oImg) {
                    oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                    oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));
                    oImg.xmlObject = build_widget_util.createImageElement('weather', '');
                    oImg.oldPositon = {top: 0, left: 0};
                    widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                    oImg.hasControls = false;
                    weaterObject = oImg;
                    widget_config.canvas.add(oImg);
                    widget_config.canvas.setActiveObject(oImg);
                    widget_config.activeObject = oImg;
                    widget_config.canvas.renderAll();
                    initImageOptionModfiyArea();
                });
                ctrlWeatherBtn.attr('data-value', 1);
                ctrlWeatherBtn.addClass('btn-success');
                build_widget_util.getXmlRes('weather');
            } else {
                util.showMessage('天气资源错误!!!', util.msg_style_danger);
            }
        } else {
            widget_config.canvas.remove(weaterObject);
            widget_config.xml_config.firstChild.removeChild(weaterObject.xmlObject);
            widget_config.activeObject = weaterObject = null;
            ctrlWeatherBtn.attr('data-value', 0);
            ctrlWeatherBtn.removeClass('btn-success');
            initImageOptionModfiyArea();
        }

    });


//show battery icon or not
    var ctrlBatteryBtn = $('#ctrl-battery');
    var ctrlbatteryObject = null;
    ctrlBatteryBtn.click(function () {
        if (ctrlBatteryBtn.attr('data-value') == 0) {
            if (widget_config.has_battery) {
                fabric.Image.fromURL(widget_config.default_battery_icon, function (oImg) {
                    oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                    oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));
                    oImg.xmlObject = build_widget_util.createImageElement('battery', '');
                    widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                    oImg.oldPositon = {top: 0, left: 0};
                    oImg.hasControls = false;
                    ctrlbatteryObject = oImg;
                    widget_config.canvas.add(oImg);
                    widget_config.canvas.setActiveObject(oImg);
                    widget_config.activeObject = oImg;
                    widget_config.canvas.renderAll();

                    initImageOptionModfiyArea();
                });
                ctrlBatteryBtn.attr('data-value', 1);
                ctrlBatteryBtn.addClass('btn-success');
                build_widget_util.getXmlRes('battery');
            } else {
                util.showMessage('电量资源错误!!!', util.msg_style_danger);
            }
        } else {
            widget_config.canvas.remove(ctrlbatteryObject);
            widget_config.xml_config.firstChild.removeChild(ctrlbatteryObject.xmlObject);
            widget_config.activeObject = ctrlbatteryObject = null;
            ctrlBatteryBtn.attr('data-value', 0);
            ctrlBatteryBtn.removeClass('btn-success');
            initImageOptionModfiyArea();
        }

    });


    //-----clock image
    var ctrlClockBtn = $('#ctrl-clock');
    var clockMinObject = null;
    var clockHourObject = null;

    ctrlClockBtn.click(function () {

        console.log(widget_config.clock_center / 2);
        console.log(widget_config.clock_center / 2);
        if (widget_config.has_clock == 1) {
            if (ctrlClockBtn.attr('data-value') == 0) {
                //add min-clock
                fabric.Image.fromURL(widget_config.default_clock_min_icon, function (oImg) {
                    oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                    oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));

                    oImg.setLeft(widget_config.clock_center.left - oImg.width / 2);
                    oImg.setTop(widget_config.clock_center.top - oImg.height / 2);

                    oImg.xmlObject = build_widget_util.createImageElement('clock_min', '');


                    $(oImg.xmlObject).attr('android:layout_x', build_widget_util.convertDp(oImg.left));
                    $(oImg.xmlObject).attr('android:layout_y', build_widget_util.convertDp(oImg.top));
                    widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                    oImg.selectable = false;
                    clockMinObject = oImg;
                    widget_config.canvas.add(oImg);
                    widget_config.canvas.renderAll();

                    initClockModfiyArea();
                });

                //add hour-clock
                fabric.Image.fromURL(widget_config.default_clock_hour_icon, function (oImg) {
                    oImg.setWidth(Math.round(oImg.width / widget_config.px_dp_raito));
                    oImg.setHeight(Math.round(oImg.height / widget_config.px_dp_raito));

                    oImg.setLeft(widget_config.clock_center.left - oImg.width / 2);
                    oImg.setTop(widget_config.clock_center.top - oImg.height / 2);

                    oImg.xmlObject = build_widget_util.createImageElement('clock_hour', '');

                    $(oImg.xmlObject).attr('android:layout_x', build_widget_util.convertDp(oImg.left));
                    $(oImg.xmlObject).attr('android:layout_y', build_widget_util.convertDp(oImg.top));
                    widget_config.xml_config.firstChild.appendChild(oImg.xmlObject);
                    oImg.selectable = false;
                    clockHourObject = oImg;
                    widget_config.canvas.add(oImg);
                    widget_config.canvas.renderAll();

                    initClockModfiyArea();
                });

                //initClockModfiyArea();
                build_widget_util.getXmlRes('clock');

                ctrlClockBtn.attr('data-value', 1);
                ctrlClockBtn.addClass('btn-success');
                widget_config.canvas.renderAll();
            } else {

                widget_config.xml_config.firstChild.removeChild(clockMinObject.xmlObject);
                widget_config.xml_config.firstChild.removeChild(clockHourObject.xmlObject);
                widget_config.canvas.remove(clockMinObject);
                widget_config.canvas.remove(clockHourObject);
                clockMinObject = clockHourObject = null;
                initClockModfiyArea();
                ctrlClockBtn.attr('data-value', 0);
                ctrlClockBtn.removeClass('btn-success');
            }
        } else {
            util.showMessage('时钟资源错误!!!', util.msg_style_danger);
        }


    });


    var initClockModfiyArea = function () {

        if (clockMinObject == null && clockHourObject == null) {
            $('.clock-area-option').hide();
        } else {

            $('#clock-center-left').val(widget_config.clock_center.left);
            $('#clock-center-top').val(widget_config.clock_center.top);

            if (clockMinObject != null) {
                $('#img-min-size').val(clockMinObject.width);
            }

            if (clockHourObject != null) {
                $('#img-hour-size').val(clockHourObject.width);
            }


            $('.clock-area-option').show();
        }

    };

    var clockCenterLeftMinus = $("#clock-center-left-minus");
    clockCenterLeftMinus.click(function () {
        widget_config.clock_center.left -= 1;
        reanderClock();
    });

    var clockCenterLeftPlus = $("#clock-center-left-plus");
    clockCenterLeftPlus.click(function () {
        widget_config.clock_center.left += 1;
        reanderClock();
    });


    var clockCenterTopMinus = $("#clock-center-top-minus");
    clockCenterTopMinus.click(function () {
        widget_config.clock_center.top -= 1;
        reanderClock();
    });

    var clockCenterTopPlus = $("#clock-center-top-plus");
    clockCenterTopPlus.click(function () {
        widget_config.clock_center.top += 1;
        reanderClock();
    });


    var clockHourSizeMinus = $("#img-hour-size-minus");
    clockHourSizeMinus.click(function () {
        clockHourObject.width -= 1;
        clockHourObject.height -= 1;

        $(clockHourObject.xmlObject).attr('android:layout_width', build_widget_util.convertDp(clockHourObject.width));
        $(clockHourObject.xmlObject).attr('android:layout_height', build_widget_util.convertDp(clockHourObject.height));
        reanderClock();
    });

    var clockHourSizeMinusPlus = $("#img-hour-size-plus");
    clockHourSizeMinusPlus.click(function () {
        clockHourObject.width += 1;
        clockHourObject.height += 1;

        $(clockHourObject.xmlObject).attr('android:layout_width', build_widget_util.convertDp(clockHourObject.width));
        $(clockHourObject.xmlObject).attr('android:layout_height', build_widget_util.convertDp(clockHourObject.width));
        reanderClock();
    });


    var clockMinSizeMinus = $("#img-min-size-minus");
    clockMinSizeMinus.click(function () {
        clockMinObject.width -= 1;
        clockMinObject.height -= 1;

        $(clockMinObject.xmlObject).attr('android:layout_width', build_widget_util.convertDp(clockMinObject.width));
        $(clockMinObject.xmlObject).attr('android:layout_height', build_widget_util.convertDp(clockMinObject.height));
        reanderClock();
    });

    var clockMinSizeMinusPlus = $("#img-min-size-plus");
    clockMinSizeMinusPlus.click(function () {
        clockMinObject.width += 1;
        clockMinObject.height += 1;

        $(clockMinObject.xmlObject).attr('android:layout_width', build_widget_util.convertDp(clockMinObject.width));
        $(clockMinObject.xmlObject).attr('android:layout_height', build_widget_util.convertDp(clockMinObject.width));
        reanderClock();
    });


    var reanderClock = function() {

        clockMinObject.setLeft(widget_config.clock_center.left - clockMinObject.width / 2);
        clockMinObject.setTop(widget_config.clock_center.top - clockMinObject.height / 2);
        clockHourObject.setLeft(widget_config.clock_center.left - clockHourObject.width / 2);
        clockHourObject.setTop(widget_config.clock_center.top - clockHourObject.height / 2);
        $(clockMinObject.xmlObject).attr('android:layout_x', build_widget_util.convertDp(clockMinObject.left));
        $(clockMinObject.xmlObject).attr('android:layout_y', build_widget_util.convertDp(clockMinObject.top));
        $(clockHourObject.xmlObject).attr('android:layout_x', build_widget_util.convertDp(clockHourObject.left));
        $(clockHourObject.xmlObject).attr('android:layout_y', build_widget_util.convertDp(clockHourObject.top));

        widget_config.canvas.renderAll();
        initClockModfiyArea();

    }



    //监听图片大小的变化------------------size--------------start
    var image_w = $("#image-w");
    var image_size_minus = $("#image-size-minus");
    var image_size_plus = $("#image-size-plus");
    image_size_minus.click(function(){
        image_w.val(parseInt(image_w.val()) - 1);
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

        var image_height = parseFloat(parseInt(image_w.val())* widget_config.activeObject.height /  widget_config.activeObject.width);

        widget_config.activeObject.setWidth(parseFloat(image_w.val()));
        widget_config.activeObject.setHeight(parseFloat(image_height));

        $(widget_config.activeObject.xmlObject).attr('android:layout_width',build_widget_util.convertDp(widget_config.activeObject.width));
        $(widget_config.activeObject.xmlObject).attr('android:layout_height',build_widget_util.convertDp(widget_config.activeObject.height));

        widget_config.canvas.renderAll();
    };



    var deleteTextBtn = $('#delete-image');
    deleteTextBtn.click(function(){
        widget_config.canvas.remove(widget_config.activeObject);
        widget_config.xml_config.firstChild.removeChild(widget_config.activeObject.xmlObject);
        widget_config.activeObject = null;
        initImageOptionModfiyArea();
    });



    var initImageOptionModfiyArea = function () {
        if(widget_config.activeObject != null){
            $('#option-modfiy-text-area').hide();
            $('#option-modfiy-image-area').show();
            $('#image-w').val(widget_config.activeObject.getWidth());
        }else{
            $('#option-modfiy-image-area').hide();
        }
    };


    var initImageObjWithXML = function () {

        var image_type,image_url,layout_width,layout_height,layout_x,layout_y;
        $(widget_config.xml_config).find("ImageElement").each(function(){

            image_type = typeof($(this).attr("android:type")) == "undefined" ? false : $(this).attr("android:type");
            image_url = $(this).attr("android:src");
            layout_width = $(this).attr("android:layout_width");
            layout_height = $(this).attr("android:layout_height");
            layout_y = $(this).attr("android:layout_y");
            layout_x = $(this).attr("android:layout_x");

            if(image_type == false){

                var image_name = image_url.substr(image_url.lastIndexOf('/') + 1);
                if(image_name == widget_config.default_bg_img
                    && layout_width == 'match_parent' && layout_height == 'match_parent'){
                    fabric.Image.fromURL(widget_config.widget_base_path + 'icons/' + image_name, function (oImg) {

                        oImg.setWidth(widget_config.widget_width);
                        oImg.setHeight(widget_config.widget_height);
                        oImg.setTop(-0.5);
                        oImg.setLeft(-0.5);
                        oImg.selectable = false;
                        widget_config.canvas.add(oImg);
                        widget_config.canvas.moveTo(oImg,-100);
                    });

                }else{
                    fabric.Image.fromURL(widget_config.widget_base_path + 'icons/' + image_name, function (oImg) {
                        if(layout_width == 'wrap_content' && layout_height == 'wrap_content'){
                            oImg.setWidth((oImg.width / widget_config.px_dp_raito).toFixed(1));
                            oImg.setHeight((oImg.height / widget_config.px_dp_raito).toFixed(1));
                        }else{
                            oImg.setWidth(parseFloat(layout_width));
                            oImg.setHeight(parseFloat(layout_height));
                        }
                        oImg.setTop(parseFloat(layout_y));
                        oImg.setLeft(parseFloat(layout_x));

                        oImg.oldPositon = {top: oImg.top, left: oImg.left};
                        widget_config.canvas.add(oImg);
                    });
                }
            }


        });
    };





    return {
        initImageOptionModfiyArea:initImageOptionModfiyArea,
        initImageObjWithXML:initImageObjWithXML
    };
});