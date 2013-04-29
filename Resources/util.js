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
	    return String.format("%04.0f-%02.0f-%02.0f", year, month, date);
	},
	// フォーマットされた日付をDate型に変換
	getDate:function(_formatedDate){
		var year = _formatedDate.substr(0,4);
		var month = _formatedDate.substr(5,2) - 1;
		var day = _formatedDate.substr(8,2);
		return new Date(year, month, day);
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
		return {year:year, mohth:month, day:day};
	},

}

