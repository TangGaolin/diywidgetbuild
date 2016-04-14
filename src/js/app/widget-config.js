/**
 * Created by tanggaolin on 16-3-21.
 */
define(['jquery','color_thief'], function ($,color_thief) {


    var widget_tmp_xml = '<AbsoluteElement xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="400dp" android:layout_height="500dp"></AbsoluteElement>';
    var xml_config =  new DOMParser().parseFromString(widget_tmp_xml, "text/xml");

    var canvas = {};
    var activeObject = null;


    var widget_width = 0;
    var widget_height = 0;
    var px_dp_raito = 3;

    var fonts_config = {};

    var default_fontfamily_file = 'serif';
    var default_fontfamily =  'serif2';

    var default_font_color =  {a:1,r:0,g:0,b:0};
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

    var is_build = $('#build_state').val();

    var widget_base_path = 'diywidgets/' + theme + '/' + widget + '/';
    var default_bg_img = 'widget_bg.png';

    var default_weather_icon = widget_base_path + '/icons/w01d.png';
    var default_battery_icon = widget_base_path + '/icons/battery_100.png';

    var default_clock_min_icon = widget_base_path + '/icons/widget_min.png';
    var default_clock_hour_icon = widget_base_path + '/icons/widget_hour.png';

    var preview_colors = {};

    var clock_center = {};

    var widget_preview = $('#widget-preview');
    var widget_area = $('.widget-area');
    var initWidgetConfig = function () {

        //if(is_build == 1){
        //    //console.log('xxxx');
        //    this.xml_config =  new DOMParser().parseFromString($('#widget_xml_string').val(), "text/xml");
        //    //console.log();
        //}

        var image_msg = JSON.parse($('#image-res').val());
        //bg-image
        this.has_bg_img = image_msg['has_bg_img'];
        this.widget_width = Math.round(image_msg['bg_img_size']['w'] / px_dp_raito);
        this.widget_height = Math.round(image_msg['bg_img_size']['h'] / px_dp_raito);
        if(this.has_bg_img){
            $(this.xml_config).find("AbsoluteElement").attr('android:layout_width', this.widget_width + 'dp');
            $(this.xml_config).find("AbsoluteElement").attr('android:layout_height', this.widget_height + 'dp');

            this.clock_center = {left: this.widget_width / 2, top:  this.widget_height / 2};
        }

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


        widget_area.css({'width':this.widget_width,'height':this.widget_height});
        widget_preview.css({'width':this.widget_width});

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
        }



        return this;
    };

    var getRgb = function(num){
        return ('0'+num.toString(16)).substr(-2)
    };

    var initPreviewColor = function(){

        var colorThief = new ColorThief();
        var colors = colorThief.getPalette(widget_preview[0], 10);
        var rgb = '';

        if(colors != null){
            for(var i = 0;i < colors.length;i++){
                rgb = '#' + getRgb(colors[i][0])+ getRgb(colors[i][1]) + getRgb(colors[i][2]);
                this.preview_colors[rgb] = rgb;
            }
        }
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
        preview_colors:preview_colors,

        canvas:canvas,
        activeObject:activeObject,
        clock_center:clock_center,

        initPreviewColor:initPreviewColor,
        initWidgetConfig:initWidgetConfig

    };
});