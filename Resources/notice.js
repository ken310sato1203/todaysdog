//通知

// 通知設定の初期化
Ti.App.iOS.cancelAllLocalNotifications();

var userId = Ti.App.Properties.getString('userId');
var message = '今日のワンコを写真に撮ろう！';
var name = Ti.App.Properties.getString(userId + '_' + 'name');
if (name) {
	message = "今日の「" +name + "」さんを写真に撮ろう！";
}	
var hour = '18:00';
var notice = Ti.App.Properties.getString(userId + '_' + 'notice');
if (notice) {
	hour = notice;
}
var now = new Date();
var time = String.format("%04.0f/%02.0f/%02.0f ", now.getFullYear(), now.getMonth() + 1, now.getDate()) + hour;	

Ti.App.iOS.scheduleLocalNotification({
	alertBody: message,
	alertAction: 'OK',
	date: new Date(time),
	repeat: 'daily'
//	badge: Ti.UI.iPhone.appBadge + 1
});	

Ti.App.currentService.stop();
