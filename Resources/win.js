//ウィンドウ

var mydogWin = require('winMydog');
var calendarWin = require('winCalendar');
var cameraWin = require('winCamera');
var cameraPostWin = require('winCameraPost');
var diaryWin = require('winDiary');
var timeWin = require('winTime');
var friendsWin = require('winFriends');
var todayWin = require('winToday');
var stampWin = require('winStamp');
var stampPostWin = require('winStampPost');
var stampTextWin = require('winStampText');
var profileWin = require('winProfile');
var profileEditWin = require('winProfileEdit');
var profileConfigWin = require('winProfileConfig');
var photoWin = require('winPhoto');
var photoListWin = require('winPhotoList');
var userListWin = require('winUserList');

// ---------------------------------------------------------------------
exports.win = {

	createFriendsWindow:function(_userData){
		Ti.API.debug('[func]createFriendsWindow:');
		var win = friendsWin.createWindow("follow", _userData, null, null);
		return win;
	},
	createMydogWindow:function(_userData){
		Ti.API.debug('[func]createMydogWindow:');
		var type = "random";
		var win = mydogWin.createWindow(type, _userData, null);
		return win;
	},
	createCalendarPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCalendarPhotoWindow:');
		var type = "date";
		var win = mydogWin.createWindow(type, _userData, _articleData);
		return win;
	},
	createCalendarWindow:function(_articleData){
		Ti.API.debug('[func]createCalendarWindow:');
		var win = calendarWin.createWindow(_articleData);
		return win;
	},
	createCameraWindow:function(_type, _userData){
		Ti.API.debug('[func]createCameraWindow:');
		var win = cameraWin.createWindow(_type, _userData);
		return win;
	},
	createCameraPostWindow:function(_type, _userData, _photoImage){
		Ti.API.debug('[func]createCameraPostWindow:');
		var win = cameraPostWin.createWindow(_type, _userData, _photoImage);
		return win;
	},
	createDiaryWindow:function(_userData){
		Ti.API.debug('[func]createDiaryWindow:');
		var win = diaryWin.createWindow(_userData);
		return win;
	},
	createTimeWindow:function(_userData, _diaryData){
		Ti.API.debug('[func]createTimeWindow:');
		var win = timeWin.createWindow(_userData, _diaryData);
		return win;
	},
	createTodayWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createTodayWindow:');
		var win = todayWin.createWindow(_userData, _stampData);
		return win;
	},
	createStampWindow:function(_type, _userData, _stampData){
		Ti.API.debug('[func]createStampWindow:');
		var win = stampWin.createWindow(_type, _userData, _stampData);
		return win;
	},
	createStampPostWindow:function(_type, _userData, _stampDataList){
		Ti.API.debug('[func]createStampPostWindow:');
		var win = stampPostWin.createWindow(_type, _userData, _stampDataList);
		return win;
	},
	createStampTextWindow:function(_userData, _stampData){
		Ti.API.debug('[func]createStampTextWindow:');
		var win = stampTextWin.createWindow(_userData, _stampData);
		return win;
	},
	createProfileWindow:function(_userData){
		Ti.API.debug('[func]createProfileWindow:');
		var win = profileWin.createWindow(_userData);
		return win;
	},
	createProfileEditWindow:function(_userData){
		Ti.API.debug('[func]createProfileEditWindow:');
		var win = profileEditWin.createWindow(_userData);
		return win;
	},
	createProfileConfigWindow:function(_userData){
		Ti.API.debug('[func]createProfileConfigWindow:');
		var win = profileConfigWin.createWindow(_userData);
		return win;
	},
	createPhotoWindow:function(_type, _articleData){
		Ti.API.debug('[func]createPhotoWindow:');
		var win = photoWin.createWindow(_type, _articleData);
		return win;
	},
	createPhotoListWindow:function(_type, _userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		var win = photoListWin.createWindow(_type, _userData, null, null);
		return win;
	},
	createUserListWindow:function(_type, _userData){
		Ti.API.debug('[func]createUserListWindow:');
		var win = userListWin.createWindow(_type, _userData);
		return win;
	},

	// タブでウィンドウを開く
	openTabWindow:function(_win, _animated) {
		Ti.API.debug('[func]openTabWindow:');
		// ウィンドウの表示
		tabGroup.activeTab.open(_win, _animated);
	},

	// 指定したobjectNameのタブを取得
	getTab:function(_objectName) {
		Ti.API.debug('[func]getTab:');
		var targetTab = null;
		for (var i=0; i<customTab.tabData.length; i++) {
			if (customTab.tabData[i].objectName == _objectName) {
				targetTab = tabGroup.tabs[i];
				break;
			}
		}
		return targetTab;
	},
	
	// カスタムタブを取得
	getCustomTabWin:function() {
		Ti.API.debug('[func]getCustomTabWin:');
		var tabData = [
			{image:"images/icon/light_chat.png", text:"friends", objectName:"friendsTab"},
			{image:"images/icon/light_plus.png", text:"today", objectName:"todayTab"},
			{image:"images/icon/light_diary.png", text:"diary", objectName:"diaryTab"},
			{image:"images/icon/light_pegman.png", text:"profile", objectName:"profileTab"},
		];
		var tabWin = Ti.UI.createWindow(style.tabWin);
		tabWin.tabData = tabData;
		var tabGroupView = Ti.UI.createView(style.tabGroupView);
		tabWin.add(tabGroupView);

		for (var i=0; i<tabData.length; i++) {
			var tabView = Ti.UI.createView(style.tabView);
			tabView.objectName = tabData[i].objectName;
			tabGroupView.add(tabView);
			var tabImage = Ti.UI.createImageView(style.tabImage);
			tabView.add(tabImage);
			tabImage.image = tabData[i].image;
			tabImage.tabIndex = i;

			// tabImageをクリック
			tabImage.addEventListener('click',function(e){
				Ti.API.debug('[event]tabImage.click:');
				e.source.opacity = 0.5;
				setTimeout(function(){
					e.source.opacity = 1.0;
		        }, 200);

				if (e.source.tabIndex == 2) {
					var diaryWin = win.getTab("diaryTab").window;
					if (tabGroup.activeTab.window.objectName != 'diaryWin') {
						diaryWin.activeTab = tabGroup.tabs[e.source.tabIndex];
					}
					diaryWin.fireEvent('refresh');
					
				} else {
					tabGroup.activeTab = tabGroup.tabs[e.source.tabIndex];					
				}
			});
		}

		return tabWin;
	},

};

