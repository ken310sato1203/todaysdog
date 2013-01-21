// アプリ

// モジュール読み込み
var window = require('window').window;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

// タブ作成
var tabGroup = Ti.UI.createTabGroup();

//var win1 = window.createTodayWindow();
var win1 = window.createPhotoListWindow();
var win2 = window.createFriendsWindow();
var win3 = window.createMydogWindow();
var win4 = window.createScheduleWindow();
var win5 = window.createProfileWindow();

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

