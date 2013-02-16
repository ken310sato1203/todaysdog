//ウィンドウ

var friendsWin = require('winFriends');
var mydogWin = require('winMydog');
var scheduleWin = require('winSchedule');
var profileWin = require('winProfile');
var photoWin = require('winPhoto');
var photoListWin = require('winPhotoList');
var userListWin = require('winUserList');

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
	createUserListWindow:function(_listType, _userData){
		Ti.API.debug('[func]createUserListWindow:');
		return userListWin.createWindow(_listType, _userData);
	},

	// 新しいウィンドウを開き、クローズ時のイベント実行用に前のウィンドウを格納
	openWindow:function(_prevWin, _nextWin) {
		Ti.API.debug('[func]openWindow:');
		tabPrevWin = _prevWin;
		tabGroup.activeTab.open(_nextWin,{animated:true});
	},
	
}

