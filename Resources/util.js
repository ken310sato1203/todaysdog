//ユーティリティ

exports.util = {
	
	diary:{
		monthName:['January','February','March','April','May','June','July','August','September','October','November','December'],
		weekday:[
			{text:'SUN',color:'#CD5C5C'},
			{text:'MON',color:'#3a4756'},
			{text:'TUE',color:'#3a4756'},
			{text:'WED',color:'#3a4756'},
			{text:'THU',color:'#3a4756'},
			{text:'FRI',color:'#3a4756'},
			{text:'SAT',color:'#4169E1'}],
		timeRange:['-1','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],

	},
	// 現在日を日時フォーマットに変換
	getFormattedNowDate:function(){
	    var now = new Date();
	    var year = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = now.getDate();
	    var hour = 0;
	    var minute = 0;
	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f", year, month, date, hour, minute);
	},
	// 現在日時を日時フォーマットに変換
	getFormattedNowDateTime:function(){
	    var now = new Date();
	    var year = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = now.getDate();
	    var hour = now.getHours();
	    var minute = now.getMinutes();
	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f", year, month, date, hour, minute);
	},

	// Date型を日付フォーマットに変換
	getFormattedDate:function(_date){
	    var year = _date.getFullYear();
	    var month = _date.getMonth() + 1;
	    var date = _date.getDate();
	    return String.format("%04.0f-%02.0f-%02.0f", year, month, date);
	},
	// Date型を日時フォーマットに変換
	getFormattedDateTime:function(_date){
	    var year = _date.getFullYear();
	    var month = _date.getMonth() + 1;
	    var date = _date.getDate();
	    var hour = _date.getHours();
	    var minute = _date.getMinutes();
	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f", year, month, date, hour, minute);
	},
	// Date型を日時フォーマットに変換
	getCloudFormattedDateTime:function(_date){
	    var year = _date.getFullYear();
	    var month = _date.getMonth() + 1;
	    var date = _date.getDate();
	    var hour = _date.getHours();
	    var minute = _date.getMinutes();
	    var second = _date.getSeconds();
	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f:%02.0f +0000", year, month, date, hour, minute, second);
	},
	// フォーマットされた日付をDate型に変換
	getDate:function(_formatedDate){
		var year = _formatedDate.substr(0,4);
		var month = _formatedDate.substr(5,2) - 1;
		var day = _formatedDate.substr(8,2);
		var hour = _formatedDate.substr(11,2);
		var minute = _formatedDate.substr(14,2);
		var second = _formatedDate.substr(17,2);
		return new Date(year, month, day, hour, minute, second);
	},

	// 時間フォーマットに変換
	getFormattedHour:function(_hour){
	    return String.format("%02.0f:00", _hour);
	},
	// フォーマットされた時間を数値型に変換
	getHour:function(_formatedHour){
		if (_formatedHour == "-1") {
			return _formatedHour;
		} else {
			return parseInt(_formatedHour.substr(0,2));
		}		
	},

	// フォーマットされた日付を要素に分解
	getDateElement:function(_formatedDate){
		var year = _formatedDate.substr(0,4);
		var month = _formatedDate.substr(5,2);
		var day = _formatedDate.substr(8,2);
		var hour = _formatedDate.substr(11,2);
		var minute = _formatedDate.substr(14,2);
		var second = _formatedDate.substr(17,2);
		return {year:year, month:month, day:day, hour:hour, minute:minute, second:second};
	},

	// エラー時のアラート表示
	errorDialog:function(e){
		var dialog = Titanium.UI.createAlertDialog({
			title: 'エラーが発生しました',
			message: '[' + e.type + ']' + e.error,
			buttonNames: ['OK'],
		});
		dialog.show();
	},

};

