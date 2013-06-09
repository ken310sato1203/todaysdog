//ウィンドウ

var mydogWin = require('winMydog');
var calendarWin = require('winCalendar');
var cameraWin = require('winCamera');
var diaryWin = require('winDiary');
var timeWin = require('winTime');
var friendsWin = require('winFriends');
var todayWin = require('winToday');
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

	createFriendsWindow:function(_userData){
		Ti.API.debug('[func]createFriendsWindow:');
		var win = friendsWin.createWindow("follow", _userData, null, null);
//		win.add(customTab);
		return win;
	},
	createMydogWindow:function(_userData){
		Ti.API.debug('[func]createMydogWindow:');
		var type = "random";
		var win = mydogWin.createWindow(type, _userData, null);
//		win.add(customTab);
		return win;
	},
	createCalendarPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCalendarPhotoWindow:');
		var type = "date";
		var win = mydogWin.createWindow(type, _userData, _articleData);
//		win.add(customTab);
		return win;
	},
	createCameraPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCameraPhotoWindow:');
		var type = "post";
		var win = mydogWin.createWindow(type, _userData, _articleData);
//		win.add(customTab);
		return win;
	},
	createCalendarWindow:function(_articleData){
		Ti.API.debug('[func]createCalendarWindow:');
		var win = calendarWin.createWindow(_articleData);
//		win.add(customTab);
		return win;
	},
	createCameraWindow:function(_userData){
		Ti.API.debug('[func]createCameraWindow:');
		var win = cameraWin.createWindow(_userData);
//		win.add(customTab);
		return win;
	},
	createDiaryWindow:function(_userData){
		Ti.API.debug('[func]createDiaryWindow:');
		var win = diaryWin.createWindow(_userData);
//		win.add(customTab);
		return win;
	},
	createTimeWindow:function(_userData, _diaryData){
		Ti.API.debug('[func]createTimeWindow:');
		var win = timeWin.createWindow(_userData, _diaryData);
//		win.add(customTab);
		return win;
	},
	createTodayWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createTodayWindow:');
		var win = todayWin.createWindow(_userData, _stampData);
//		win.add(customTab);
		return win;
	},
	createStampWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampWindow:');
		var win = stampWin.createWindow(_userData, _stampData);
//		win.add(customTab);
		return win;
	},
	createStampPostWindow:function(_userData, _stampDataList){
		Ti.API.debug('[func]createStampPostWindow:');
		var win = stampPostWin.createWindow(_userData, _stampDataList);
//		win.add(customTab);
		return win;
	},
	createStampTextWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampTextWindow:');
		var win = stampTextWin.createWindow(_userData, _stampData);
//		win.add(customTab);
		return win;
	},
	createProfileWindow:function(_userData){
		Ti.API.debug('[func]createProfileWindow:');
		Ti.API.debug('_userData.name:' + _userData.name);
		var win = profileWin.createWindow(_userData);
//		win.add(customTab);
		return win;
	},
	createPhotoWindow:function(_articleData){
		Ti.API.debug('[func]createPhotoWindow:');
		var win = photoWin.createWindow(_articleData);
//		win.add(customTab);
		return win;
	},
	createPhotoListWindow:function(_type, _userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		var win = photoListWin.createWindow(_type, _userData, null, null);
//		win.add(customTab);
		return win;
	},
	createUserListWindow:function(_type, _userData){
		Ti.API.debug('[func]createUserListWindow:');
		var win = userListWin.createWindow(_type, _userData);
//		win.add(customTab);
		return win;
	},
	createCommentListWindow:function(_articleData){
		Ti.API.debug('[func]createCommentListWindow:');
		var win = commentListWin.createWindow(_articleData);
//		win.add(customTab);
		return win;
	},

	// タブでウィンドウを開く
	openTabWindow:function(_win) {
		Ti.API.debug('[func]openTabWindow:');
		// ウィンドウの表示
		tabGroup.activeTab.open(_win, {animated:true});
	},
	// 指定したobjectNameのタブを取得
	getTab:function(_objectName) {
		Ti.API.debug('[func]getTab:');
		var targetTab = null;
		for (var i=0; i<customTab.children.length; i++) {
			if (customTab.children[i].objectName == _objectName) {
				targetTab = tabGroup.tabs[i];
				break;
			}
		}
		return targetTab;
	},
	
	// カスタムタブを取得
	getCustomTabView:function() {
		Ti.API.debug('[func]getCustomTabView:');
		var tabGroupView = Ti.UI.createWindow(style.tabGroupView);

		var tabData = [
			{image:"images/icon/light_chat.png", text:"friends", objectName:"friendsTab"},
			{image:"images/icon/light_plus.png", text:"today", objectName:"todayTab"},
			{image:"images/icon/light_diary.png", text:"diary", objectName:"diaryTab"},
			{image:"images/icon/light_pegman.png", text:"profile", objectName:"profileTab"},
		];

		for (var i=0; i<tabData.length; i++) {
			var tabView = Ti.UI.createView(style.tabView);
			tabGroupView.add(tabView);
			var tabImage = Ti.UI.createImageView(style.tabImage);
			tabView.add(tabImage);
			tabImage.image = tabData[i].image;
			tabImage.tabIndex = i;
/*
			var tabLabel = Ti.UI.createLabel(style.tabLabel);
			tabView.add(tabLabel);
			tabLabel.text = tabData[i].text;
*/
			// tabImageをクリック
			tabImage.addEventListener('click',function(e){
				Ti.API.debug('[event]tabImage.click:');
				tabGroup.activeTab = tabGroup.tabs[e.source.tabIndex];
//				tabGroup.activeTab.window.barImage = 'images/icon/titlebar.png';
			});
		}

		return tabGroupView;
	},

}

