

define(['jquery','widget_config'], function ($,widget_config) {
	'use strict';

	var getWidgetXml = function (xml_url) {
		var xml_config;
		$.ajax({url: xml_url, type: 'GET', dataType: 'xml', async: false,
			error: function(jqXHR) {
				alert(jqXHR.status+"加载XML文档出错!");
			},
			success:function(xml){
				xml_config = xml;
			}
		});
		return xml_config;
	};



	return {
		getWidgetXml:getWidgetXml

	};
});
