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

var win1 = win.createTodayWindow(userData);
var win2 = win.createFriendsWindow(userData);
var win3 = win.createStampWindow(userData, null);
var win4 = win.createDiaryWindow(userData);
var win5 = win.createProfileWindow(userData);

var tab1 =  Ti.UI.createTab(style.todayTab(win1));
var tab2 =  Ti.UI.createTab(style.friendsTab(win2));
var tab3 =  Ti.UI.createTab(style.stampTab(win3));
var tab4 =  Ti.UI.createTab(style.diaryTab(win4));
var tab5 =  Ti.UI.createTab(style.profileTab(win5));


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
tab5.addEventListener('focus', function(e){
	Ti.API.debug('[event]tab5.focus:');
	if (tab5.window != null) {
		var currentData = model.getUser(loginId);
		tab5.window.fireEvent('refresh', {userData:currentData});
	}
});

// ---------------------------------------------------------------------

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);

tabGroup.open();
