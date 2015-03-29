//バックグラウンド実行

var userId = Ti.App.Properties.getString('userId');
var today = Ti.App.Properties.getString(userId + '_' + 'today');
var config = Ti.App.Properties.getString(userId + '_' + 'config');

var now = new Date();
var year = ("000" + now.getFullYear()).substr(-4);
var month = ("0" + (now.getMonth()+1)).substr(-2);
var day = ("0" + now.getDate()).substr(-2);
// 0埋めをformatでやっていたがバージョンアップで正しく処理されなくなったのでsubstrで対応
var nowDay = year + "-" + month + "-" + day + " " + hour;
//var nowDay = String.format("%04.0f-%02.0f-%02.0f", now.getFullYear(), now.getMonth() + 1, now.getDate());

// 今日更新があった場合に通知設定を変更
if (today == nowDay || config == nowDay) {
	// 通知設定の初期化
	Ti.App.iOS.cancelAllLocalNotifications();
	
	var notice = Ti.App.Properties.getString(userId + '_' + 'notice');
	// 今日の投稿があれば通知を明日から設定
	var nextDay = ("0" + (now.getDate() + ((today == nowDay) ? 1 : 0)) ).substr(-2);
	var time = year + "/" + month + "/" + nextDay + " " + notice;
//	var time = String.format("%04.0f/%02.0f/%02.0f ", now.getFullYear(), now.getMonth() + 1, now.getDate() + nextDay) + notice;

	var message = '今日のワンコを写真に撮ろう！';
	var name = Ti.App.Properties.getString(userId + '_' + 'name');
	if (name) {
		message = "今日の「" +name + "」さんを写真に撮ろう！";
	}

	Ti.App.iOS.scheduleLocalNotification({
		alertBody: message,
		alertAction: 'OK',
		date: new Date(time),
		repeat: 'daily',
//		badge: badgeCount
	});	
	
	if (Ti.App.currentService) {
		Ti.App.currentService.stop();
	}
}
