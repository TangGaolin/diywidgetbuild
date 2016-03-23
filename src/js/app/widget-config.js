/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery'], function ($) {


    var widget_tmp_xml = '<AbsoluteElement xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="524dp" android:layout_height="768dp"></AbsoluteElement>';
    var xml_config =  new DOMParser().parseFromString(widget_tmp_xml, "text/xml");

    var widget_width = 0;
    var widget_height = 0;
    var px_dp_raito = 1;

    var phone_len_u = 'dp';

    var fonts_config = JSON.parse($('#default-fontfamily').val());


    var default_fontfamily =  fonts_config[0]['font_name'];

    var has_bg_img = true;

    var widget_base_path = $('#widget-base-path').val();

    var date_text_types = [
        'DATE',
        'DATE_YEAR',
        'DATE_LONG_YEAR'
    ];

    var time_text_types = [
        'TIME_AMPM',
        'TIME',
        'TIME_DIGITAL_HOUR',
        'TIME_DIGITAL_12HOUR'
    ];


    var text_type_value = {
        'DATE':'2016-10-10',
        'DATE_YEAR':'16',
        'DATE_LONG_YEAR':'2016',
        'TIME_AMPM':'am',
        'TIME':'10:28',
        'TIME_DIGITAL_HOUR':'24',
        'TIME_DIGITAL_12HOUR':'10'
    };

    var setWidgetWidth = function (width) {
        widget_width = width / px_dp_raito;
    };

    var setWidgetHeight = function (height) {
        widget_height = height / px_dp_raito;
    };



    var getTextType = function(type){
        return text_type_value[type];
    };


    var initWidgetConfig = function () {

        var bg_size = JSON.parse($('#bg-size').val());
        if(bg_size['image_height'] == 0 || bg_size['image_width'] == 0){
            this.widget_width = 400;
            this.widget_height = 500;
            this.has_bg_img = false;
        }else{
            if(bg_size['image_width'] > 500 || bg_size['image_height'] > 600){
                this.px_dp_raito = 2;
                this.widget_width = bg_size['image_width'] / this.px_dp_raito;
                this.widget_height = bg_size['image_height'] / this.px_dp_raito;
            }else{
                this.widget_width = bg_size['image_width'] / this.px_dp_raito;
                this.widget_height = bg_size['image_height'] / this.px_dp_raito;
            }
            this.has_bg_img = true;
        }

        $('.widget_area').css({'width':this.widget_width,'height':this.widget_height});
        $(this.xml_config).find("AbsoluteElement").attr('android:layout_width',this.widget_width);
        $(this.xml_config).find("AbsoluteElement").attr('android:widget_height',this.widget_height);


        return this;
    };

    return {

        text_type_value:text_type_value,
        date_text_types:date_text_types,
        time_text_types:time_text_types,
        widget_width:widget_width,
        widget_height:widget_height,
        has_bg_img:has_bg_img,
        widget_base_path:widget_base_path,
        xml_config:xml_config,
        fonts_config:fonts_config,
        default_fontfamily:default_fontfamily,
        dp:dp,



        initWidgetConfig:initWidgetConfig,
        setWidgetWidth:setWidgetWidth,
        setWidgetHeight:setWidgetHeight,
        getTextType:getTextType
    };
});