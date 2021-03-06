//ユーティリティ

exports.util = {
	
	local:{
		photoPath:Ti.Filesystem.applicationDataDirectory + 'photo/',
		iconPath:Ti.Filesystem.applicationDataDirectory + 'icon/',
		dataPath:Ti.Filesystem.applicationDataDirectory + 'data/',
	},
	
	diary:{
		monthName:['January','February','March','April','May','June','July','August','September','October','November','December'],
		weekday:[
			{text:'日',color:'#CD5C5C',},
			{text:'月',color:'#3a4756'},
			{text:'火',color:'#3a4756'},
			{text:'水',color:'#3a4756'},
			{text:'木',color:'#3a4756'},
			{text:'金',color:'#3a4756'},
			{text:'土',color:'#4169E1'}],
		timeRange:['-1','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
	},
	// 現在日を日時フォーマットに変換
	getFormattedNowDate:function(){
	    var now = new Date();
	    var year = ("000" + now.getFullYear()).substr(-4);
	    var month = ("0" + (now.getMonth()+1)).substr(-2);
	    var day = ("0" + now.getDate()).substr(-2);
	    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
	    return year + "-" + month + "-" + day;
//	    return String.format("%04.0f-%02.0f-%02.0f", year, month, day);
	},
	// 現在日時を日時フォーマットに変換
	getFormattedNowDateHour:function(){
	    var now = new Date();
	    var year = ("000" + now.getFullYear()).substr(-4);
	    var month = ("0" + (now.getMonth()+1)).substr(-2);
	    var day = ("0" + now.getDate()).substr(-2);
	    var hour = ("0" + now.getHours()).substr(-2);
	    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
	    return year + "-" + month + "-" + day + " " + hour;
//	    return String.format("%04.0f-%02.0f-%02.0f %02.0f", year, month, day, hour);
	},
	// 現在日時を日時フォーマットに変換
	getFormattedNowDateTime:function(){
	    var now = new Date();
	    var year = ("000" + now.getFullYear()).substr(-4);
	    var month = ("0" + (now.getMonth()+1)).substr(-2);
	    var day = ("0" + now.getDate()).substr(-2);
	    var hour = ("0" + now.getHours()).substr(-2);
	    var minute = ("0" + now.getMinutes()).substr(-2);
	    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
	    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
//	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f", year, month, day, hour, minute);
	},

	// Date型を日付フォーマットに変換
	getFormattedDate:function(_date){
	    var year = ("000" + _date.getFullYear()).substr(-4);
	    var month = ("0" + (_date.getMonth()+1)).substr(-2);
	    var day = ("0" + _date.getDate()).substr(-2);
	    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
	    return year + "-" + month + "-" + day;
//	    return String.format("%04.0f-%02.0f-%02.0f", year, month, day);
	},
	// Date型を日付フォーマットに変換
	getFormattedYMD:function(_date){
		if (_date instanceof Date) {
		    var year = _date.getFullYear();
		    var month = _date.getMonth() + 1;
		    var day = _date.getDate();
		    return year + '年' + month + '月' + day + '日';
		} else {
			var year = _date.substr(0,4);
			var month = _date.substr(5,2);
			var day = _date.substr(8,2);
		    return year + '年' + month + '月' + day + '日';
	   }
	},
	// Date型を日付フォーマットに変換
	getFormattedMD:function(_date){
		if (_date instanceof Date) {
		    var year = _date.getFullYear();
		    var month = _date.getMonth() + 1;
		    var day = _date.getDate();
		    return month + '月' + day + '日';
		} else {
			// 先頭０を外すため１をかける
			var year = _date.substr(0,4);
			var month = _date.substr(5,2) * 1;
			var day = _date.substr(8,2) * 1;
		    return month + '月' + day + '日';
	   }
	},
	// Date型を日時フォーマットに変換
	getFormattedDateTime:function(_date){
		if (_date instanceof Date) {
		    var year = ("000" + _date.getFullYear()).substr(-4);
		    var month = ("0" + (_date.getMonth()+1)).substr(-2);
		    var day = ("0" + _date.getDate()).substr(-2);
		    var hour = ("0" + _date.getHours()).substr(-2);
		    var minute = ("0" + _date.getMinutes()).substr(-2);
		    var second = ("0" + _date.getSeconds()).substr(-2);
		    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
		    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
//		    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f:%02.0f", year, month, day, hour, minute, second);
		} else {
			var year = _date.substr(0,4);
			var month = _date.substr(5,2);
			var day = _date.substr(8,2);
			var hour = _date.substr(11,2);
			var minute = _date.substr(14,2);
			var second = _date.substr(17,2);
		    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
//			return String.format("%s-%s-%s %s:%s:%s", year, month, day, hour, minute, second);
		}
	},
	// Date型を日時フォーマットに変換
	getCloudFormattedDateTime:function(_date){
		if (_date instanceof Date) {
		    var year = ("000" + _date.getFullYear()).substr(-4);
		    var month = ("0" + (_date.getMonth()+1)).substr(-2);
		    var day = ("0" + _date.getDate()).substr(-2);
		    var hour = ("0" + _date.getHours()).substr(-2);
		    var minute = ("0" + _date.getMinutes()).substr(-2);
		    var second = ("0" + _date.getSeconds()).substr(-2);
		    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
		    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + " +0000";
//		    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f:%02.0f +0000", year, month, day, hour, minute, second);
		} else {
			var year = _date.substr(0,4);
			var month = _date.substr(5,2);
			var day = _date.substr(8,2);
			var hour = _date.substr(11,2);
			var minute = _date.substr(14,2);
			var second = _date.substr(17,2);
		    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + " +0000";
//		    return String.format("%s-%s-%s %s:%s:%s +0000", year, month, day, hour, minute, second);
		}
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
	    // 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
		return ("0" + _hour).substr(-2) + ":00";
//	    return String.format("%02.0f:00", _hour);
	},
	// フォーマットされた時間を数値型に変換
	getHour:function(_formatedHour){
		if (_formatedHour == "-1") {
			return _formatedHour;
		} else {
			return parseInt(_formatedHour.substr(0,2), 10);
		}		
	},

	// Date型またはフォーマットされた日時を要素に分解
	getDateElement:function(_date){
		if (_date instanceof Date) {
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1;
			var day = _date.getDate();
			var hour = _date.getHours();
		    var minute = _date.getMinutes();
		    var second = _date.getSeconds();
			return {year:year, month:month, day:day, hour:hour, minute:minute, second:second};
		} else {
			var year = _date.substr(0,4);
			var month = _date.substr(5,2);
			var day = _date.substr(8,2);
			var hour = _date.substr(11,2);
			var minute = _date.substr(14,2);
			var second = _date.substr(17,2);
			return {year:year, month:month, day:day, hour:hour, minute:minute, second:second};
		}
	},

	// 誕生日から年齢を算出
	calculateAge:function(_date){
		var today = new Date();
		var birthday = null;
		if (_date instanceof Date) {
			birthday = _date;
		} else {
			var year = _date.substr(0,4);
			var month = _date.substr(5,2) - 1;
			var day = _date.substr(8,2);
			birthday = new Date(year, month, day);			
		}
		var b = new Date(birthday.getTime()).setFullYear(2000);
		var w = new Date(today.getTime()).setFullYear(2000);
		return today.getFullYear() - birthday.getFullYear() - (w >= b ? 0: 1);
	},

	// エラー表示
	errorDialog:function(e){
		var message = '';
		var dialog = Titanium.UI.createAlertDialog({
			title: 'エラーが発生しました',
			message: JSON.stringify(e),
			buttonNames: ['OK'],
		});
		dialog.show();
	},
	// アラート表示
	alertDialog:function(message){
		var dialog = Titanium.UI.createAlertDialog({
//			title: 'アラート',
			message: message,
			buttonNames: ['OK'],
		});
		dialog.show();
	},
	// 空と重複を取り除く
	unique:function(array) {
		var storage = {};
		var uniqueArray = [];
		for ( var i=0; i<array.length; i++) {
			var value = array[i];
			if (value != '' && !(value in storage)) {
				storage[value] = true;
				uniqueArray.push(value);
			}
		}
		return uniqueArray;
	},

	// リストに存在しているかチェック
	checkList:function(_list, _id){
		Ti.API.debug('[func]checkList:');
		for (var i=0; i<_list.length; i++) {
			if (_list[i] == _id) {
				return true;
			}
		}
		return false;
	},

};

