// アプリ

// モジュール読み込み
var Cloud = require('ti.cloud');
var Facebook = require('facebook');

var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

var sqliter = require("sqliter").sqliter;
var sqlite = new sqliter("todaysdog");

var tabGroup = null;
var customTab = null;

// facebook側で登録したアプリID tiapp.xmlから取得
Facebook.appid = Ti.App.Properties.getString('ti.facebook.appid');
//Facebook.permissions = ['offline_access', 'publish_stream'];
Facebook.permissions = ['publish_stream'];
// iOS6以降、facebookのシングルサインオンに対応するためforceDialogAuthはfalseにすべきとあるが
// authorizeがGET系のみとなり、reauthorizeで再度POST系の認証をする必要があるため、trueとしシングルサインオンには対応しない
Facebook.forceDialogAuth = true;
// ログイン状態の時に、facebook側でログアウトした場合
// Facebook.loggedInはtureなのに、loginイベントが発火してしまうため、
// fbLoginFlagで制御する
var fbLoginFlag = false;

// 起動時の背景が黒いので白のウィンドウで埋める
var backWindow = Ti.UI.createWindow({backgroundColor: 'white'});

// ロード用画面
var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
actInd.show();
backWindow.add(actInd);
backWindow.open();

var loginWindow = win.createLoginWindow();
loginWindow.hide();
loginWindow.open();

var session = Ti.App.Properties.getString('session');
if (session) {
	Cloud.sessionId = session;
	model.loginSessionCheck(function(e) {
		Ti.API.debug('[func]loginSessionCheck.callback:');
	    if (e.success) {
			loginWindow.fireEvent('email_login');
	    } else {
			loginWindow.show();
	    }
	});

} else {
	if ( Facebook.loggedIn ) {
		fbLoginFlag = true;
		loginWindow.fireEvent('facebook_login');
	} else {
		loginWindow.show();
	}
}
	
Facebook.addEventListener('login', function(e) {
	Ti.API.debug('[event]Facebook.login:');
	if (e.success) {
		if (! fbLoginFlag) {
			fbLoginFlag = true;
			loginWindow.fireEvent('facebook_login');
		}

	} else {
		loginWindow.show();
	}
});

Facebook.addEventListener('logout', function(e) {
	Ti.API.debug('[event]Facebook.logout:');
	fbLoginFlag = false;
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.clearCookies('https://login.facebook.com');
	win.openLoginWin();
});

// アプリがバックグラウンドに変わった時に実行
var service = Ti.App.iOS.registerBackgroundService({url:'background.js'});

/* バックグラウンド処理がうまくいかない場合があるのでやめる。
var OS_MAJOR = parseInt(Ti.Platform.version.split('.')[0], 10);
if (Ti.Platform.name == 'iPhone OS' && OS_MAJOR >= 7) {
	// iOS 7 以上
	// バックグラウンドで定期的に実行
	var interval = Ti.App.iOS.BACKGROUNDFETCHINTERVAL_MIN;
	interval = 60;
	Ti.App.iOS.setMinimumBackgroundFetchInterval(interval);
	Ti.App.iOS.addEventListener('backgroundfetch', function (e) {
		// バッジ（最新記事件数）の更新
		model.updateCloudNewArticleCount(function(e) {
			Ti.API.debug('[func]updateCloudNewArticleCount.callback:');
			if (e.success) {
				Ti.UI.iPhone.appBadge = (e.articleCount == 0) ? null : e.articleCount;
				// タブバーをカスタマイズしているのでタブにバッジをつけるのは難しい
	//			tabGroup.tabs[0].setBadge(badgeCount);
	
			} else {
				util.errorDialog(e);
			}
		});

        // イベントハンドラの最後で呼び出し必須
        Ti.App.iOS.endBackgroundHandler(e.handlerId);
	});
}
*/



