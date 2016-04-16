

define(['jquery','widget_config','util2'], function ($,widget_config,util) {
	'use strict';

	
	var createTextElement = function (text_type, data_format) {

		var TextElement = widget_config.xml_config.createElement('TextElement');
		//$(TextElement).attr('android:layout_width',"wrap_content");
		//$(TextElement).attr('android:layout_height',"wrap_content");
		$(TextElement).attr('android:layout_y',convertDp(widget_config.default_text_top));
		$(TextElement).attr('android:layout_x',convertDp(widget_config.default_text_left));
		$(TextElement).attr('android:textColor',convertColor(widget_config.default_font_color));
		$(TextElement).attr('android:textSize',convertDp(widget_config.default_font_size));
		$(TextElement).attr('android:typeface', getFontSrc(widget_config.default_fontfamily_file));
		$(TextElement).attr('android:textCaps', 'title');
		$(TextElement).attr('android:gravity', 'center');
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
			$(ImageElement).attr('android:src',"./icons/" + image_name);

		}else if(type == 'clock_min'){
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./time_min.xml");
			$(ImageElement).attr('android:type',"TIME_MINUTE_IMAGE");

		}else if(type == 'clock_hour'){
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./time_hour.xml");
			$(ImageElement).attr('android:type',"TIME_HOUR_IMAGE");

		}else{
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./icons/" + image_name);
		}

		$(ImageElement).attr('android:layout_y',"0dp");
		$(ImageElement).attr('android:layout_x',"0dp");

		return ImageElement;
	};
	

	
	var convertDp = function (lenght) {
		if(parseInt(lenght) == lenght){
			return lenght + 'dp';
		}
		return lenght.toFixed(1) + 'dp';
	};


	var toHexadecimal = function(num){
		return ('0' + parseInt(num).toString(16)).substr(-2);
	};

	var convertColor = function (color) {
		return '#' + toHexadecimal(color.a * 255) + toHexadecimal(color.r) + toHexadecimal(color.g) + toHexadecimal(color.b);
	};


	var convertRgbString = function (color) {
		return 'rgba(' + color.r +','+ color.g +',' + color.b +','+ color.a + ')';
	};

	var convertStringToRgb = function (color_string) {
		var color = { r:0,g:0,b:0,a:1};
		if(color_string.length != 9){
			return color;
		}

		color.a = color_string.substr(1,2).toLowerCase() == 'ff' ? 1 : (parseInt(color_string.substr(1,2),16) / 255).toFixed(1);
		color.r = parseInt(color_string.substr(3,2),16);
		color.g = parseInt(color_string.substr(5,2),16);
		color.b = parseInt(color_string.substr(7,2),16);

		return convertRgbString(color);

	};

	var getCalendarFormat = function (format) {
		return '{calendarFormat:"'+format+'"}';
	};
	var getWeatherFormat = function (format) {
		return '{weatherFormat:"'+format+'"}';
	};


	var getFontSrc = function (font_file) {

		if(font_file == 'serif'){
			return font_file;
		}else{
			return './fonts/' + font_file;
		}
	};


	var checkWidgetXML = function () {
		$(widget_config.xml_config).find('TextElement').each(function(){
			if($(this).attr('android:layout_width') == "match_parent"){
				$(this).removeAttr('android:layout_x');
			}
		});
	};



	var saveWidgetXML = function () {
		checkWidgetXML();
		$.post('phpService/saveWidgetXML.php',
			{theme:widget_config.theme,widget:widget_config.widget,widget_xml:(new XMLSerializer()).serializeToString(widget_config.xml_config)},
			function(data,status){
				if(data == 1 && status=='success'){
					util.showMessage('保存成功...',util.msg_style_info);
				}else{
					util.showMessage('保存失败!!!',util.msg_style_danger);
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


	var getXmlRes = function(xml_type){

		$.post('phpService/addWidgetXml.php',
			{theme:widget_config.theme,widget:widget_config.widget,xml_type:xml_type},
			function(data,status){
				if(data['code'] == 1 && status=='success'){
					util.showMessage(data['msg'],util.msg_style_info);
				}else{
					util.showMessage(data['msg'],util.msg_style_danger);
				}
			},'json');

	};

	var stringCapitalize = function(string,type){
		var res = '';

		string = string.trim();
		switch (type) {
			case 'lower':
				res = string.toLowerCase();
				break;
			case 'capitalize':
				res = string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
				break;
			case 'upper':
				res = string.toUpperCase();
				break;
			case 'title':
				res = string.replace(/[a-zA-Z]+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				break;

			default:
				res = string.replace(/[a-zA-Z]+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}

		return '  ' + res + '  ';

	};



	var updateElePosition = function(){

		var df_top = widget_config.activeObject.top - widget_config.activeObject.oldPositon.top;
		var df_left = widget_config.activeObject.left - widget_config.activeObject.oldPositon.left;

		var new_top = parseFloat($(widget_config.activeObject.xmlObject).attr('android:layout_y')) + df_top;
		$(widget_config.activeObject.xmlObject).attr('android:layout_y',convertDp(new_top));

		var old_left = typeof($(widget_config.activeObject.xmlObject).attr('android:layout_x')) == 'undefined'
			? widget_config.activeObject.oldPositon.left : parseFloat($(widget_config.activeObject.xmlObject).attr('android:layout_x'));

		var new_left = old_left + df_left;
		$(widget_config.activeObject.xmlObject).attr('android:layout_x',convertDp(new_left));


		widget_config.activeObject.oldPositon.top = widget_config.activeObject.top;
		widget_config.activeObject.oldPositon.left = widget_config.activeObject.left;

	};


	var updateEleAngle = function(){
		$(widget_config.activeObject.xmlObject).attr('android:rotation', widget_config.activeObject.angle);
		widget_config.activeObject.oldPositon.top = widget_config.activeObject.top;
		widget_config.activeObject.oldPositon.left = widget_config.activeObject.left;

	};
	var getDataFormatString = function (format) {
		return format.replace(new RegExp('.*[\"]+(.*)[\"]+.*'), "$1");
	};


	return {

		createTextElement:createTextElement,
		createImageElement:createImageElement,

		convertDp:convertDp,
		findRootTag:findRootTag,

		convertColor:convertColor,
		convertRgbString:convertRgbString,
		getXmlRes:getXmlRes,
		saveWidgetXML:saveWidgetXML,
		stringCapitalize:stringCapitalize,
		checkWidgetXML:checkWidgetXML,
		updateElePosition:updateElePosition,
		updateEleAngle:updateEleAngle,

		convertStringToRgb:convertStringToRgb,
		getFontSrc:getFontSrc,
		getDataFormatString:getDataFormatString



	};
});
