//ユーティリティ

exports.util = {
	// 現在日時の取得
	getFormattedDate:function(){
	    var now = new Date();
	    var year = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = now.getDate();
	    var hour = now.getHours();
	    var minute = now.getMinutes();
	    return String.format("%04.0f-%02.0f-%02.0f %02.0f:%02.0f", year, month, date, hour, minute);
	},
	 

}

