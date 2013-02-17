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
var tabPrevWin = null;

var userData = model.getUser(loginId);

var win1 = win.createTodayWindow(userData);
var win2 = win.createFriendsWindow(userData);
var win3 = win.createMydogWindow(userData);
var win4 = win.createScheduleWindow(userData);
var win5 = win.createProfileWindow(userData);

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