

define(['jquery','widget_config'], function ($,widget_config) {
	'use strict';

	var checkbox_html_temp = "<label class='checkbox-inline'> <input value='$key' type='checkbox'  class='text-type'> $value </label> ";
	var getTextcheckBoxHTML = function(text_types){
		var html = '';
		for(var i = 0, l = text_types.length; i < l; i++) {
			html += checkbox_html_temp.replace('$key',text_types[i]).replace('$value',widget_config.getTextType(text_types[i]));
		}
		return html;
	};


	var getFontsSelectHTML = function () {
		var select_html_temp = ['<option value="font_name" style="',
			"font-family: 'font_name'",
			'">font_name</option>' ].join('');
		var html = '',font_config;
		for(var i = 0, l = widget_config.fonts_config.length; i < l; i++) {
			font_config =  widget_config.fonts_config[i];
			html += select_html_temp.replace(/font_name/g,font_config['font_name']);
		}
		return html;
	};
	
	var createTextElement = function (text_type, data_format) {

		var TextElement = widget_config.xml_config.createElement('TextElement');
		$(TextElement).attr('android:layout_width',"match_parent");
		$(TextElement).attr('android:layout_height',"wrap_content");
		$(TextElement).attr('android:layout_y',convertDp(widget_config.default_text_top));
		$(TextElement).attr('android:alignment',"center");
		$(TextElement).attr('android:textColor',convertColor(widget_config.default_font_color));
		$(TextElement).attr('android:textSize',convertDp(widget_config.default_font_size));
		$(TextElement).attr('android:typeface', getFontSrc());
		if(text_type == 'CALENDAR'){
			$(TextElement).attr('android:type',text_type);
			$(TextElement).attr('android:data',getCalendarFormat(data_format));
		}else if(text_type == 'WEATHER'){
			$(TextElement).attr('android:type',text_type);
			$(TextElement).attr('android:data',getWeatherFormat(data_format));
		}else if(text_type == 'OTHER'){
			$(TextElement).attr('android:type',data_format);
		}else if(text_type == 'CUSTOM'){
			$(TextElement).attr('android:text',data_format);
		}else{
			//....
		}

		return TextElement;
	};

	var createImageElement = function (type,image_name) {
		var ImageElement = widget_config.xml_config.createElement('ImageElement');
		if(type == 'weather'){
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./level_weather.xml");

			$(ImageElement).attr('android:data',"{forecast:0}");
			$(ImageElement).attr('android:type',"WEATHER_LEVEL_IMAGE");
		}else if(type == 'battery'){
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./level_battery.xml");
			$(ImageElement).attr('android:type',"BATTERY_LEVEL_IMAGE");
		}else if(type == 'bg'){
			$(ImageElement).attr('android:layout_width',"match_parent");
			$(ImageElement).attr('android:layout_height',"match_parent");
			$(ImageElement).attr('android:src',"./icons/"+image_name);
		}else{
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./icons/"+image_name);
		}

		return ImageElement;
	};
	

	
	var convertDp = function (lenght) {
		return Math.round(lenght) + 'dp';
	};

	var convertColor = function (color) {
		return '#FF'+color.substring(1);
	};
	
	var getCalendarFormat = function (format) {
		return '{calendarFormat:"'+format+'"}';
	};
	var getWeatherFormat = function (format) {
		return '{weatherFormat:"'+format+'"}';
	};


	var getFontSrc = function () {

		if(widget_config.default_fontfamily_file == ''){
			return widget_config.default_fontfamily;
		}else{
			return './fonts/' + widget_config.default_fontfamily_file;
		}
	};






	var getImageListHTML = function () {
		var tmp_image_list = ['<div class="col-md-3 col-sm-3 item">',
			'<div class="thumbnail"><img src="image_src" alt="" width="80%"/></div>',
			'<div class="caption"><p><button class="btn btn-xs btn-default add-image-ele">添加</button></p></div></div>' ].join('');
		var html = '',image_src;
		for(var i = 0, l = widget_config.image_list.length; i < l; i++) {


			image_src =  widget_config.widget_base_path+'icons/'+widget_config.image_list[i];
			html += tmp_image_list.replace(/image_src/g,image_src);
		}
		return html;
	};

	var saveWidgetXML = function () {
		$.post('phpService/saveWidgetXML.php',
			{widget_xml:(new XMLSerializer()).serializeToString(widget_config.xml_config)},
			function(data,status){
			if(data == 1 && status=='success'){
				//comm.showMessage('排序成功～',comm.msg_style_info);
				//setTimeout("location.reload();",1500);
			}else{
				//comm.showMessage('操作失败',comm.msg_style_danger);
			}
		});
	};

	var findRootTag = function(tag,itemClass){
		if (tag.hasClass(itemClass)) {
			return tag;
		} else {
			return findRootTag(tag.parent(),itemClass);
		}
	};




	return {
		getTextcheckBoxHTML:getTextcheckBoxHTML,
		createTextElement:createTextElement,
		createImageElement:createImageElement,
		getFontsSelectHTML:getFontsSelectHTML,
		getImageListHTML:getImageListHTML,
		convertDp:convertDp,
		findRootTag:findRootTag,

		convertColor:convertColor,
		saveWidgetXML:saveWidgetXML



	};
});
