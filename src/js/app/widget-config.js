/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery'], function ($) {


    var widget_tmp_xml = '<AbsoluteElement xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="524dp" android:layout_height="768dp"></AbsoluteElement>';
    var xml_config =  new DOMParser().parseFromString(widget_tmp_xml, "text/xml");

    var widget_width = 0;
    var widget_height = 0;
    var px_dp_raito = 3;

    var fonts_config = {};

    var default_fontfamily_file = '';
    var default_fontfamily =  '';

    var default_font_color =  '#000000';
    var default_font_size =  16;
    var default_text_top =  30;
    var default_text_left =  30;

    var has_bg_img = 0;
    var has_weather = 0;
    var weather_image_num = 0;
    var has_battery = 0;
    var has_clock = 0;

    var theme = $('#theme-name').val();
    var widget = $('#widget-name').val();

    var widget_base_path = 'diywidgets/' + theme + '/' + widget + '/';
    var default_bg_img = 'widget_bg.png';

    var default_weather_icon = widget_base_path + '/icons/w01d.png';
    var default_battery_icon = widget_base_path + '/icons/battery_100.png';

    var default_clock_min_icon = widget_base_path + '/icons/widget_min.png';
    var default_clock_hour_icon = widget_base_path + '/icons/widget_hour.png';




    var initWidgetConfig = function () {

        var image_msg = JSON.parse($('#image-res').val());
        //bg-image
        this.has_bg_img = image_msg['has_bg_img'];
        this.widget_width = Math.round(image_msg['bg_img_size']['w'] / px_dp_raito);
        this.widget_height = Math.round(image_msg['bg_img_size']['h'] / px_dp_raito);

        //weather
        this.has_weather = image_msg['has_weather'];
        if(this.has_weather){
            this.default_weather_icon = widget_base_path + 'icons/w01d.png';
        }

        //batter
        this.has_battery = image_msg['has_battery'];
        if(this.has_battery){
            this.default_battery_icon = widget_base_path + 'icons/battery_100.png';
        }

        //clock
        this.has_clock = image_msg['has_clock'];


        $('.widget-area').css({'width':this.widget_width,'height':this.widget_height});
        $('#widget-preview').css({'width':this.widget_width});

        $(this.xml_config).find("AbsoluteElement").attr('android:layout_width', this.widget_width + 'dp');
        $(this.xml_config).find("AbsoluteElement").attr('android:layout_height', this.widget_height + 'dp');

        var fonts_msg = JSON.parse($('#default-fontfamily').val());

        if(fonts_msg.length > 0){
            this.fonts_config = fonts_msg;
            var default_font_url = fonts_msg[0]['url'];
            this.default_fontfamily_file = default_font_url.substring(default_font_url.lastIndexOf('/')+1);
            this.default_fontfamily = fonts_msg[0]['font_name'];
        }else{
            this.fonts_config = fonts_msg;
            this.default_fontfamily_file = '';
            this.default_fontfamily = 'serif';
            console.log(default_fontfamily_file);
        }


        return this;
    };

    return {


        widget_width:widget_width,
        widget_height:widget_height,
        has_bg_img:has_bg_img,
        widget:widget,
        theme:theme,
        widget_base_path:widget_base_path,
        xml_config:xml_config,
        fonts_config:fonts_config,
        default_fontfamily:default_fontfamily,
        default_fontfamily_file:default_fontfamily_file,
        default_font_size:  default_font_size,
        default_text_top:  default_text_top,
        default_text_left:  default_text_left,
        default_font_color:default_font_color,
        has_weather:has_weather,
        weather_image_num:weather_image_num,
        has_battery:has_battery,
        has_clock:has_clock,
        default_weather_icon:default_weather_icon,
        default_bg_img:default_bg_img,
        px_dp_raito:px_dp_raito,
        default_battery_icon:default_battery_icon,
        default_clock_hour_icon:default_clock_hour_icon,
        default_clock_min_icon:default_clock_min_icon,

        initWidgetConfig:initWidgetConfig

    };
});