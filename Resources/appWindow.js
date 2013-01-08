// ウィンドウ

var style = require('style').style;
var model = require('model').model;
var util = require('util').util;
var todayWin = require('appToday');
var friendsWin = require('appFriends');
var mydogWin = require('appMydog');
var scheduleWin = require('appSchedule');
var profileWin = require('appProfile');

exports.createTabGroup = function(){

	Ti.API.debug('tabGroup:' + tabGroup);
	var tabGroup = Ti.UI.createTabGroup();

	var win1 = todayWin.createWindow(style, model, util);
	var win2 = friendsWin.createWindow(style, model, util);
	var win3 = mydogWin.createWindow(style, model, util);
	var win4 = scheduleWin.createWindow(style, model, util);
	var win5 = profileWin.createWindow(style, model, util);

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

	return tabGroup;
}

