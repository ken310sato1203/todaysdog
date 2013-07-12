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
var tabGroup = Ti.UI.createTabGroup(style.tabGroupHidden);

var userData = model.getUser(loginId);

var win1 = win.createFriendsWindow(userData);
var win2 = win.createTodayWindow(userData, null);
var win3 = win.createDiaryWindow(userData);
var win4 = win.createProfileWindow(userData);
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
var customTab = win.getCustomTabView();	
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
 