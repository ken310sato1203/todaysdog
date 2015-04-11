//バックグラウンド実行
Ti.API.debug('[background]start:');

var userId = Ti.App.Properties.getString('userId');
var today = Ti.App.Properties.getString(userId + '_' + 'today');
var config = Ti.App.Properties.getString(userId + '_' + 'config');

var now = new Date();
var year = ("000" + now.getFullYear()).substr(-4);
var month = ("0" + (now.getMonth()+1)).substr(-2);
var day = ("0" + now.getDate()).substr(-2);
var hour = ("0" + now.getHours()).substr(-2);
var nowDay = year + "-" + month + "-" + day;
// 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
//var nowDay = String.format("%04.0f-%02.0f-%02.0f", now.getFullYear(), now.getMonth() + 1, now.getDate());

Ti.API.debug('[background]nowDay:' + nowDay);
Ti.API.debug('[background]today:' + today);
Ti.API.debug('[background]config:' + config);

// 今日更新があった場合に通知設定を変更
if (today == nowDay || config == nowDay) {
	// 通知設定の初期化
	Ti.App.iOS.cancelAllLocalNotifications();
	// 通知日時
	var notice = Ti.App.Properties.getString(userId + '_' + 'notice');
	var time = year + "/" + month + "/" + day + " " + notice;
	// 今日の投稿があれば通知を明日から設定
	if (today == nowDay) {
		now.setDate(now.getDate() + 1);
		year = ("000" + now.getFullYear()).substr(-4);
		month = ("0" + (now.getMonth()+1)).substr(-2);
		day = ("0" + now.getDate()).substr(-2);
		time = year + "/" + month + "/" + day + " " + notice;
	}


	var message = '今日のワンコを写真に撮ろう！';
	var name = Ti.App.Properties.getString(userId + '_' + 'name');
	if (name) {
		message = "今日の「" +name + "」さんを写真に撮ろう！";
	}

	Ti.API.debug('[background]notice:' + notice);
	Ti.API.debug('[background]time:' + time);

	Ti.App.iOS.scheduleLocalNotification({
		alertBody: message,
		alertAction: 'OK',
		date: new Date(time),
		repeat: 'daily',
	});	
	
	if (Ti.App.currentService) {
		Ti.App.currentService.stop();
	}
}
