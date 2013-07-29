// アプリ

// モジュール読み込み
var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

var tabGroup = null;
var customTab = null;	

// ---------------------------------------------------------------------
var openTabWindow = function(_userData) {
	Ti.API.debug('[func]openTabWindow:');
	
	tabGroup = Ti.UI.createTabGroup(style.tabGroupHidden);
	var win1 = win.createFriendsWindow(_userData);
	var win2 = win.createTodayWindow(_userData, null);
	var win3 = win.createDiaryWindow(_userData);
	var win4 = win.createProfileWindow(_userData);
	win4.leftNavButton = null;
	
	var tab1 =  Ti.UI.createTab(style.tabHidden);
	var tab2 =  Ti.UI.createTab(style.tabHidden);
	var tab3 =  Ti.UI.createTab(style.tabHidden);
	var tab4 =  Ti.UI.createTab(style.tabHidden);
	
	tab1.setWindow(win1);
	tab2.setWindow(win2);
	tab3.setWindow(win3);
	tab4.setWindow(win4);
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	
	// 初期表示のウィンドウを設定
	tabGroup.setActiveTab(tab2);
	tabGroup.open();
	
	// カスタムタブを上から表示
	customTab = win.getCustomTabView();
	customTab.open();
	
	// 最新情報を表示
	tab2.addEventListener('focus', function(e){
		Ti.API.debug('[event]tab2.focus:');
		tab2.window.fireEvent('refresh');
	});
	tab3.addEventListener('focus', function(e){
		Ti.API.debug('[event]tab3.focus:');
		tab3.window.fireEvent('refresh');
	});
	tab4.addEventListener('focus', function(e){
		Ti.API.debug('[event]tab4.focus:');
		tab4.window.fireEvent('refresh');
	});
};

// ---------------------------------------------------------------------

// facebook側で登録したアプリ
Ti.Facebook.appid = '159833880868916';
Ti.Facebook.permissions = ['publish_stream'];
Ti.Facebook.forceDialogAuth = false;

var loginWin = Ti.UI.createWindow(style.todayWin);
var fbLoginButton = Ti.Facebook.createLoginButton({
	top : '100dp',
	style : Ti.Facebook.BUTTON_STYLE_WIDE
});
loginWin.add(fbLoginButton);
loginWin.open();

Ti.Facebook.addEventListener('login', function(e) {
	Ti.API.debug('[event]Ti.Facebook.login:');
	if (e.success) {
		Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function (e) {
			if (e.success) {
				var json = JSON.parse(e.result);
				var userData = model.getUser(json.username);
				if (userData) {
					model.setLoginId(json.username);
					openTabWindow(userData);
				} else {
					alert('Not found user');
				}
			}
		});
	}
});

Ti.Facebook.addEventListener('logout', function(e) {
	Ti.API.debug('[event]Ti.Facebook.logout:');
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.clearCookies('https://login.facebook.com');
	Ti.Facebook.accessToken = null;
	Ti.Facebook.uid = null;
});


// ---------------------------------------------------------------------
 