// アプリ

// モジュール読み込み
var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

// ログインユーザの取得
var loginId = model.getLoginId();

// タブ作成
var tabGroup = Ti.UI.createTabGroup();

var win1 = win.createPhotoListWindow();
var win2 = win.createFriendsWindow();
var win3 = win.createMydogWindow();
var win4 = win.createScheduleWindow();
var win5 = win.createProfileWindow(model.getUser(loginId));

var tab1 =  Ti.UI.createTab(style.todayTab(win1));
var tab2 =  Ti.UI.createTab(style.friendsTab(win2));
var tab3 =  Ti.UI.createTab(style.mydogTab(win3));
var tab4 =  Ti.UI.createTab(style.scheduleTab(win4));
var tab5 =  Ti.UI.createTab(style.profileTab(win5));

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);

tabGroup.open();

// プロフィールのタブをクリックで最新情報を表示
tab5.addEventListener('focus', function(e){
	Ti.API.debug('[event]tab5.focus:');
	tab5.window.fireEvent('refresh');
});