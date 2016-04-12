define(function () {
	'use strict';
	var full_mounts = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var ab_mounts = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

	var full_weeks = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var ab_weeks = ['Sunday','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


	var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

	function numToWords (num) {
		if ((num = num.toString()).length > 9) return 'overflow';
		var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return; var str = '';
		str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + '-' + a[n[1][1]]) + 'crore ' : '';
		str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + '-' + a[n[2][1]]) + 'lakh ' : '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + '-' + a[n[3][1]]) + 'thousand ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + '-' + a[n[4][1]]) + 'hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + '-' + a[n[5][1]]) : '';
		return str;
	}
	var date = new Date(2015, 8, 23, 10, 28, 12);


	var getTimeString = function(str){
		var res = '';
		switch (str) {
			case 'yy':
				res = date.getFullYear().toString().substr(-2);
				break;

			case 'yyyy':
				res = date.getFullYear().toString();
				break;

			case 'M':
				res = (date.getMonth()+1).toString();
				break;

			case 'MM':
				res = ('0'+(date.getMonth()+1).toString()).substr(-2);
				break;
			case 'MMM':
				res = ab_mounts[date.getMonth()];
				break;
			case 'MMMM':
				res = full_mounts[date.getMonth()];
				break;
			case 'dd':
				res = ('0'+date.getUTCDate()).toString().substr(-2);
				break;

			case 'jj':
				res = date.getHours().toString();
				break;

			case 'JJJJ':
				res = numToWords(date.getHours());
				break;

			case 'mm':
				res = ('0'+date.getMinutes().toString()).substr(-2);
				break;

			case 'mmmm':
				res = numToWords(date.getMinutes());
				break;

			case 'ss':
				res = date.getSeconds().toString();
				break;
			case 'E':
				res = ab_weeks[date.getDay()];
				break;

			case 'EEEE':
				res = full_weeks[date.getDay()];
				break;

			case 'A':
				res = date.getHours() < 12 ? 'am' : 'pm';
				break;

			case 'a':
				res = date.getHours() < 12 ? 'am' : 'pm';
				break;

			default:
				res = str;
		}

		return res;
	};




	var timeFormat = function(format_string){

		var result = '';
		var tmp = '';
		var curr_char = '';
		var next_char = '';

		for (var i = 0;i < format_string.length;i++){
			curr_char = format_string.charAt(i);
			tmp += curr_char;
			next_char = i+1 < format_string.length ? format_string.charAt(i+1) : '';
			if(curr_char != next_char){
				result += getTimeString(tmp);
				tmp = '';
			}
		}
		result += getTimeString(tmp);
		return result;
	};



	var getWeatherString = function(str){
		var res = '';
		switch (str) {
			case 'T':
				res = '50';
				break;
			case 'U':
				res = '℉';
				break;
			case 'L':
				res = '46';
				break;
			case 'H':
				res = '50';
				break;
			case 'S':
				res = 'Sunny';
				break;
			case 'W':
				res = '10km/h';
				break;
			case 'A':
				res = 'New York';
				break;
			case 'R':
				res = '80%';
				break;

			default:
				res = str;
		}

		return res;
	};



	var weatherFormat = function(format_string){

		var result = '';
		for (var i = 0;i < format_string.length;i++){
			result += getWeatherString(format_string.charAt(i));
		}
		return result;
	};
	
	
	var otherFormat = function (format_string) {
		var res = '';
		switch (format_string) {
			case 'BATTERY_LEVEL':
				res = '100%';
				break;
			case 'SMS_UNREAD':
				res = '2';
				break;
			case 'TELEPHONY_MISSED_CALLS':
				res = '1';
				break;
			default:
				res = format_string;
		}

		return res;
	};




	return {
		timeFormat:timeFormat,
		numToWords:numToWords,
		weatherFormat:weatherFormat,
		otherFormat:otherFormat
	};
});
