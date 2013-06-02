// アプリ

// モジュール読み込み
var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

// ---------------------------------------------------------------------
// ログインユーザの取得
var loginId = model.getLoginId();

// タブ作成
var tabGroup = Ti.UI.createTabGroup(style.tabGroup);

var userData = model.getUser(loginId);

var win1 = win.createFriendsWindow(userData);
var win2 = win.createTodayWindow(userData, null);
var win3 = win.createDiaryWindow(userData);
var win4 = win.createProfileWindow(userData);

var tab1 =  Ti.UI.createTab(style.friendsTab);
var tab2 =  Ti.UI.createTab(style.todayTab);
var tab3 =  Ti.UI.createTab(style.diaryTab);
var tab4 =  Ti.UI.createTab(style.profileTab);

tab1.setWindow(win1);
tab2.setWindow(win2);
tab3.setWindow(win3);
tab4.setWindow(win4);

// プロフィールのタブをクリックで最新情報を表示
/*
tab4.addEventListener('focus', function(e){
	Ti.API.debug('[event]tab4.focus:');
	if (tab4.window != null) {
		tab4.window.fireEvent('refresh', {stampData:null});
		if (tab4.window.nextWin != null) {
			tab4.window.nextWin.fireEvent('refresh', {stampData:null});			
		}
	}
});
*/
// プロフィールのタブをクリックで最新情報を表示
tab4.addEventListener('focus', function(e){
	Ti.API.debug('[event]tab4.focus:');
	if (tab4.window != null) {
		var currentData = model.getUser(loginId);
		tab4.window.fireEvent('refresh', {userData:currentData});
	}
});

// ---------------------------------------------------------------------

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

tabGroup.setActiveTab(tab2);
//tabGroup.animate({bottom: '-50dp', duration : 500});
tabGroup.open();
