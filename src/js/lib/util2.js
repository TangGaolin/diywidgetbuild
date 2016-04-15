

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

	var getActive = function(){
		return $(document.activeElement).is('input') || $(document.activeElement).is('textarea');
	};

	return {
		msg_style_info:msg_style_info,
		msg_style_danger:msg_style_danger,
		showMessage:showMessage,
		isImage:isImage,
		getActive:getActive
	};
});
