

define(['jquery','widget_config'], function ($,widget_config) {
	'use strict';

	Object.create = Object.create || function( obj ){
			var F = function(){};
			F.prototype = obj;
			return new F();
	};


	var TextElement = {
		text:'',
		width:'',
		height:'',
		top:0,
		left:0,
		fontFamily:'',
		fill:'#000000',
		textSize:'12',
		textAlign:'left',
		
		setElementValue: function (text_element) {
			// set text
			if(typeof($(text_element).attr("android:text")) == "undefined"){
				if(typeof($(text_element).attr("android:type")) == "undefined"){
					this.text = TextElement.text;
				}else{
					this.text =  widget_config.getTextType($(text_element).attr("android:type"));
				}
			}

			// set width
			if($(text_element).attr("android:layout_width") == "match_parent"){
				this.width = widget_config.getWidgetWidth();
			}else if($(text_element).attr("android:layout_width") == "wrap_content"){
				this.width = TextElement.width;
			}else {
				this.width =  parseInt($(text_element).attr("android:layout_width"));
			}

			// set height
			if($(text_element).attr("android:layout_height") == "match_parent"){
				this.height =  widget_config.getWidgetHeight();
			}else if($(text_element).attr("android:layout_height") == "wrap_content"){
				this.height = TextElement.height;
			}else {
				this.height = parseInt($(text_element).attr("android:layout_height"));
			}

			//set top
			if(typeof($(text_element).attr("android:layout_y")) == "undefined"){
				this.top = TextElement.top;
			}else{
				this.top =  parseInt($(text_element).attr("android:layout_y"));
			}

			//set left
			if(typeof($(text_element).attr("android:layout_x")) == "undefined"){
				this.left = TextElement.left;
			}else{
				this.left =  parseInt($(text_element).attr("android:layout_x"));
			}

			//set textAlign
			if(typeof($(text_element).attr("android:alignment")) == "undefined"){
				this.textAlign = TextElement.textAlign;
			}else{
				this.textAlign =  $(text_element).attr("android:alignment");
			}

			//set fontFamily
			if(typeof($(text_element).attr("android:typeface")) == "undefined"){
				this.fontFamily = TextElement.fontFamily;
			}else{
				this.fontFamily =  $(text_element).attr("android:typeface");
			}

			//set fill
			if(typeof($(text_element).attr("android:textColor")) == "undefined"){
				this.fill = TextElement.fill;
			}else{
				this.fill =  $(text_element).attr("android:textColor");
			}

			//set color
			if(typeof($(text_element).attr("android:textColor")) == "undefined"){
				this.fill = TextElement.fill;
			}else{
				this.fill =  '#'+$(text_element).attr("android:textColor").substring(3);
			}

			//set textSize
			if(typeof($(text_element).attr("android:textSize")) == "undefined"){
				this.textSize = TextElement.textSize;
			}else{
				this.textSize =  parseInt($(text_element).attr("android:textSize"));
			}
		}

	};







	var checkbox_html_temp = "<label class='checkbox-inline'> <input value='$key' type='checkbox'  class='text-type'> $value </label> ";
	var getTextcheckBoxHTML = function(text_types){
		var html = '';
		for(var i = 0, l = text_types.length; i < l; i++) {
			html += checkbox_html_temp.replace('$key',text_types[i]).replace('$value',widget_config.getTextType(text_types[i]));
		}
		return html;
	};
	var select_html_temp = ['<option value="font_name" style="',
								"font-family: 'font_name'",
							'">font_name</option>' ].join('');

	var getFontsSelectHTML = function () {
		var html = '',font_config;
		for(var i = 0, l = widget_config.fonts_config.length; i < l; i++) {
			font_config =  widget_config.fonts_config[i];
			html += select_html_temp.replace(/font_name/g,font_config['font_name']);
		}
		return html;
	};
	
	var createTextElement = function (text) {
		var TextElement = widget_config.xml_config.createElement('TextElement');
		if(text['text_value'] == ''){
			$(TextElement).attr('android:layout_width',"match_parent");
			$(TextElement).attr('android:layout_height',"wrap_content");
			$(TextElement).attr('android:layout_y',"20dp");
			$(TextElement).attr('android:alignment',"center");
			$(TextElement).attr('android:textColor',"#FF000000");
			$(TextElement).attr('android:textSize',"13dp");
			$(TextElement).attr('android:type',text['text_type']);
			$(TextElement).attr('android:typeface','./'+widget_config.default_fontfamily+'.ttf');

		}else{
			$(TextElement).attr('android:layout_width',"match_parent");
			$(TextElement).attr('android:layout_height',"wrap_content");
			$(TextElement).attr('android:layout_y',"20dp");
			$(TextElement).attr('android:alignment',"center");
			$(TextElement).attr('android:textColor',"#FF000000");
			$(TextElement).attr('android:textSize',"13dp");
			$(TextElement).attr('android:text',text['text_value']);
			$(TextElement).attr('android:typeface','./'+widget_config.default_fontfamily+'.ttf');
		}

		return TextElement;
	};

	var createImageElement = function (type) {
		var ImageElement = widget_config.xml_config.createElement('ImageElement');
		if(type == 'weather'){
			$(ImageElement).attr('android:layout_width',"wrap_content");
			$(ImageElement).attr('android:layout_height',"wrap_content");
			$(ImageElement).attr('android:src',"./weatherIcon.xml");
			$(ImageElement).attr('android:layout_y',"10pd");
			$(ImageElement).attr('android:layout_x',"10pd");
			$(ImageElement).attr('android:data',"{forecast:0}");
			$(ImageElement).attr('android:type',"WEATHER_LEVEL_IMAGE");

		}else if(type == 'bg'){
			$(ImageElement).attr('android:layout_width',"match_parent");
			$(ImageElement).attr('android:layout_height',"match_parent");
			$(ImageElement).attr('android:src',"./widget_bg_1.png");
		}else{
			//...
		}

		return ImageElement;
	};
	
	//var updateObjectXMLConfig = function (activeObject) {
	//	$(activeObject.xmlObject).attr('android:typeface','./'+widget_config.default_fontfamily+'.ttf')
	//};
	
	var convertDp = function (lenght) {
		return Math.round(lenght) + 'dp'
	};

	var convertColor = function (color) {
		return '#FF'+color.substring(1)
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
	


	return {
		getTextcheckBoxHTML:getTextcheckBoxHTML,
		createTextElement:createTextElement,
		createImageElement:createImageElement,
		getFontsSelectHTML:getFontsSelectHTML,
		convertDp:convertDp,

		convertColor:convertColor,
		saveWidgetXML:saveWidgetXML


		//updateObjectXMLConfig:updateObjectXMLConfig

	};
});
