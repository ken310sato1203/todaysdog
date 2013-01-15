//ユーティリティ

exports.util = {
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
		Ti.API.debug('[func]getFormattedDate:' + year + month + date);
	    return String.format("%04.0f-%02.0f-%02.0f", year, month, date);
	},

	// フォーマットされた日付をDate型に変換
	getDate:function(_formatedDate){
		Ti.API.debug('getDate:' + _formatedDate);
		var year = _formatedDate.substring(0,4);
		var month = _formatedDate.substring(5,7) - 1;
		var day = _formatedDate.substring(8,10);
		Ti.API.debug('getDate:' + year + month + day);
		return new Date(year, month, day);
	},

}

