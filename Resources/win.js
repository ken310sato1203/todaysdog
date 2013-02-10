//ウィンドウ

var friendsWin = require('winFriends');
var mydogWin = require('winMydog');
var scheduleWin = require('winSchedule');
var profileWin = require('winProfile');
var photoWin = require('winPhoto');
var photoListWin = require('winPhotoList');

exports.win = {

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
	createProfileWindow:function(_userData){
		Ti.API.debug('[func]createProfileWindow:');
		Ti.API.debug('_userData.name:' + _userData.name);
		return profileWin.createWindow(_userData);
	},
	createPhotoWindow:function(_articleData){
		Ti.API.debug('[func]createPhotoWindow:');
		return photoWin.createWindow(_articleData);
	},
	createPhotoListWindow:function(_listType, _userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		return photoListWin.createWindow(_listType, _userData);
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

