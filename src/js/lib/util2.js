

define(['jquery'], function ($) {
	'use strict';
	var msg_style_info = 'alert-info';
	var msg_style_danger = 'alert-danger';
	var showMsg = $('#show-msg');
	var showMessage = function(msg,msg_style){
		showMsg.addClass(msg_style);
		showMsg.html(msg);
		showMsg.show();
		setTimeout("$('#show-msg').fadeOut('slow');",1200);
	};

	var isImage  = function (filename) {
		switch (filename.split('.').pop().toLowerCase()) {
			case 'jpg':
			case 'gif':
			case 'bmp':
			case 'png':
				//etc
				return true;
		}
		return false;
	};


	var convertRgbString = function (color) {
		return 'rgba(' + color.r +','+ color.g +',' + color.b +','+ color.a + ')';
	};


	var toHexadecimal = function(num){
		return ('0' + parseInt(num).toString(16)).substr(-2);
	};

	var convertColor = function (color) {
		return '#' + toHexadecimal(color.a * 255) + toHexadecimal(color.r) + toHexadecimal(color.g) + toHexadecimal(color.b);
	};



	var convertStringToRgb = function (color_string) {
		var color = { r:0,g:0,b:0,a:1};
		if(color_string.length != 9){
			return color;
		}

		color.a = parseInt(color_string.substr(1,2),16);
		color.r = parseInt(color_string.substr(3,2),16);
		color.g = parseInt(color_string.substr(5,2),16);
		color.b = parseInt(color_string.substr(7,2),16);

		return convertRgbString(color);

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

	var getDataFormatString = function (format) {

		return format.replace( new RegExp('.*[\"]+(.*)[\"]+.*'), "$1");

	};

	return {
		msg_style_info:msg_style_info,
		msg_style_danger:msg_style_danger,
		showMessage:showMessage,
		isImage:isImage,
		convertRgbString:convertRgbString,
		convertColor:convertColor,
		convertStringToRgb:convertStringToRgb,
		stringCapitalize:stringCapitalize,
		getDataFormatString:getDataFormatString
	};
});
