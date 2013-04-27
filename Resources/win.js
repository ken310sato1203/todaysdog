//ウィンドウ

var mydogWin = require('winMydog');
var calendarWin = require('winCalendar');
var cameraWin = require('winCamera');
var diaryWin = require('winDiary');
var timeWin = require('winTime');
var stampWin = require('winStamp');
var stampPostWin = require('winStampPost');
var stampTextWin = require('winStampText');
var profileWin = require('winProfile');
var photoWin = require('winPhoto');
var photoListWin = require('winPhotoList');
var userListWin = require('winUserList');
var commentListWin = require('winCommentList');

// ---------------------------------------------------------------------
exports.win = {

	createTodayWindow:function(_userData){
		Ti.API.debug('[func]createTodayWindow:');
		var type = "all";
		return photoListWin.createWindow(type, _userData, null, null);
	},
	createFriendsWindow:function(_userData){
		Ti.API.debug('[func]createFriendsWindow:');
		var type = "follow";
		return photoListWin.createWindow(type, _userData, null, null);
	},
	createMydogWindow:function(_userData){
		Ti.API.debug('[func]createMydogWindow:');
		var type = "random";
		return mydogWin.createWindow(type, _userData, null);
	},
	createCalendarPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCalendarPhotoWindow:');
		var type = "date";
		return mydogWin.createWindow(type, _userData, _articleData);
	},
	createCameraPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCameraPhotoWindow:');
		var type = "post";
		return mydogWin.createWindow(type, _userData, _articleData);
	},
	createCalendarWindow:function(_articleData){
		Ti.API.debug('[func]createCalendarWindow:');
		return calendarWin.createWindow(_articleData);
	},
	createCameraWindow:function(_userData){
		Ti.API.debug('[func]createCameraWindow:');
		return cameraWin.createWindow(_userData);
	},
	createDiaryWindow:function(_userData){
		Ti.API.debug('[func]createDiaryWindow:');
		return diaryWin.createWindow(_userData);
	},
	createTimeWindow:function(_userData, _diaryData){
		Ti.API.debug('[func]createTimeWindow:');
		return timeWin.createWindow(_userData, _diaryData);
	},
	createStampWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampWindow:');
		return stampWin.createWindow(_userData, _stampData);
	},
	createStampPostWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampPostWindow:');
		return stampPostWin.createWindow(_userData, _stampData);
	},
	createStampTextWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampTextWindow:');
		return stampTextWin.createWindow(_userData, _stampData);
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
	createPhotoListWindow:function(_type, _userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		return photoListWin.createWindow(_type, _userData, null, null);
	},
	createUserListWindow:function(_type, _userData){
		Ti.API.debug('[func]createUserListWindow:');
		return userListWin.createWindow(_type, _userData);
	},
	createCommentListWindow:function(_articleData){
		Ti.API.debug('[func]createCommentListWindow:');
		return commentListWin.createWindow(_articleData);
	},

	// タブでウィンドウを開く
	openTabWindow:function(_win) {
		Ti.API.debug('[func]openTabWindow:');
		tabGroup.activeTab.open(_win,{animated:true});
	},
}

