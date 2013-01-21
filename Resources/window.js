//ウィンドウ

var todayWin = require('winToday');
var friendsWin = require('winFriends');
var mydogWin = require('winMydog');
var scheduleWin = require('winSchedule');
var profileWin = require('winProfile');
var photoWin = require('winPhoto');
var photoListWin = require('winPhotoList');

exports.window = {

	createTodayWindow:function(){
		Ti.API.debug('[func]createTodayWindow:');
		return todayWin.createWindow();
	},
	createFriendsWindow:function(){
		Ti.API.debug('[func]createFriendsWindow:');
		return friendsWin.createWindow();
	},
	createMydogWindow:function(){
		Ti.API.debug('[func]createMydogWindow:');
		return mydogWin.createWindow();
	},
	createScheduleWindow:function(){
		Ti.API.debug('[func]createScheduleWindow:');
		return scheduleWin.createWindow();
	},
	createProfileWindow:function(){
		Ti.API.debug('[func]createProfileWindow:');
		return profileWin.createWindow();
	},
	createPhotoWindow:function(){
		Ti.API.debug('[func]createPhotoWindow:');
		return photoWin.createWindow();
	},
	createPhotoListWindow:function(_userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		return photoListWin.createWindow(_userData);
	},

	// 指定タブを取得
	getTab:function(_title) {
		for (i=0; i<tabGroup.tabs.length; i++) {
			if (tabGroup.tabs[i].title == _title){
				return tabGroup.tabs[i];
			}
		}
		return null;
	},
	
}

