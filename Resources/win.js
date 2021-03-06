//ウィンドウ

var loginWin = require('winLogin');
var registWin = require('winRegist');
var mydogWin = require('winMydog');
var calendarWin = require('winCalendar');
var cameraWin = require('winCamera');
var cameraPostWin = require('winCameraPost');
var diaryWin = require('winDiary');
var timeWin = require('winTime');
var stampListWin = require('winStampList');
var friendsWin = require('winFriends');
var friendsCommentWin = require('winFriendsComment');
var friendsConfigWin = require('winFriendsConfig');
var todayWin = require('winToday');
var stampWin = require('winStamp');
var stampPostWin = require('winStampPost');
var stampTextWin = require('winStampText');
var profileWin = require('winProfile');
var profileEditWin = require('winProfileEdit');
var profileConfigWin = require('winProfileConfig');
var photoWin = require('winPhoto');
// var photoListWin = require('winPhotoList');
var userListWin = require('winUserList');

// 多重クリック防止
var clickEnable = true;

// ---------------------------------------------------------------------
exports.win = {

	createLoginWindow:function(){
		Ti.API.debug('[func]createLoginWindow:');
		var win = loginWin.createWindow();
		return win;
	},
	createRegistWindow:function(_type){
		Ti.API.debug('[func]createRegistWindow:');
		var win = registWin.createWindow(_type);
		return win;
	},
	createFriendsWindow:function(_userData){
		Ti.API.debug('[func]createFriendsWindow:');
		var win = friendsWin.createWindow("follow", _userData, null, null);
		return win;
	},
	createFriendsCommentWindow:function(_userData){
		Ti.API.debug('[func]createFriendsCommentWindow:');
		var win = friendsCommentWin.createWindow("follow", _userData, null, null);
		return win;
	},
	createFriendsConfigWindow:function(_userData){
		Ti.API.debug('[func]createFriendsConfigWindow:');
		var win = friendsConfigWin.createWindow(_userData);
		return win;
	},
	createMydogWindow:function(_userData){
		Ti.API.debug('[func]createMydogWindow:');
		var win = mydogWin.createWindow('random', _userData, null);
		return win;
	},
	createCalendarPhotoWindow:function(_userData, _articleData){
		Ti.API.debug('[func]createCalendarPhotoWindow:');
		var win = mydogWin.createWindow('date', _userData, _articleData);
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
	createStampListWindow:function(_userData, _diaryData){
		Ti.API.debug('[func]createStampListWindow:');
		var win = stampListWin.createWindow(_userData, _diaryData);
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
/*
	createPhotoListWindow:function(_type, _userData){
		Ti.API.debug('[func]createPhotoListWindow:');
		var win = photoListWin.createWindow(_type, _userData, null, null);
		return win;
	},
*/
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
	
	// loginWinを開く
	openLoginWin:function() {
		Ti.API.debug('[func]openLoginWin:');
		tabGroup.close();
		customTab.close();
		loginWindow.show();
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
			{image:"images/icon/w_friend.png", text:"friends", objectName:"friendsTab"},
			{image:"images/icon/w_home2.png", text:"today", objectName:"todayTab"},
			{image:"images/icon/w_diary.png", text:"diary", objectName:"diaryTab"},
			{image:"images/icon/w_profile.png", text:"profile", objectName:"profileTab"},			
//			{image:"images/icon/light_chat.png", text:"friends", objectName:"friendsTab"},
//			{image:"images/icon/light_plus.png", text:"today", objectName:"todayTab"},
//			{image:"images/icon/light_diary.png", text:"diary", objectName:"diaryTab"},
//			{image:"images/icon/light_pegman.png", text:"profile", objectName:"profileTab"},
		];
		var tabWin = Ti.UI.createWindow(style.tabWin);
		tabWin.tabData = tabData;
		var tabGroupView = Ti.UI.createView(style.tabGroupView);
		tabWin.add(tabGroupView);
		var selectedTab = null;
		// 初期表示のタブを設定
		var selectedIndex = 1;
		tabGroup.activeTab = tabGroup.tabs[selectedIndex];

		for (var i=0; i<tabData.length; i++) {
			var tabView = Ti.UI.createView(style.tabView);
			tabView.width = (style.commonSize.screenWidth / tabData.length) + 'dp';
			tabView.tabIndex = i;
			tabView.objectName = tabData[i].objectName;
			tabGroupView.add(tabView);
			var tabImage = Ti.UI.createImageView(style.tabImage);
			tabImage.image = tabData[i].image;
			tabView.add(tabImage);
			tabView.tabImage = tabImage;

			// 初期表示のタブを設定
			if (i == selectedIndex) {
				selectedTab = tabView;
				tabImage.opacity = 1.0;
			} else {
				tabImage.opacity = 0.7;
			} 
			// tabViewをクリック
			tabView.addEventListener('click',function(e){
				Ti.API.debug('[event]tabView.click:');
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					var targetITab = e.source;
					if (selectedTab != null) {
						selectedTab.tabImage.opacity = 0.7;
					}
					selectedTab = targetITab;
					targetITab.tabImage.opacity = 1.0;

//					targetITab.tabImage.opacity = 0.5;
					// diaryWinのrefresh後に入れると、diaryWinはクローズされないのでイベントが追加されてしまう。
					setTimeout(function(){
//						targetITab.tabImage.opacity = 1.0;
						clickEnable = true;
			        }, 200);
			        
					if (targetITab.tabIndex == 0) {
						if (tabGroup.activeTab.window.objectName != 'friendsWin') {
							tabGroup.activeTab = tabGroup.tabs[targetITab.tabIndex];
							// 未読記事の更新
							if (tabGroup.articleUpdateFlag) {
								tabGroup.articleUpdateFlag = false;
								var loginUser = model.getLoginUser();
								Ti.App.Properties.setString(loginUser.id + '_' + 'lastArticleDate', tabGroup.lastArticle.date);
							}
						}
						
					} else if (targetITab.tabIndex == 1) {
						var todayWin = win.getTab("todayTab").window;
						if (tabGroup.activeTab.window.objectName != 'todayWin') {
							todayWin.fireEvent('refresh', {activeTab:tabGroup.tabs[targetITab.tabIndex]});
						} else {
							todayWin.fireEvent('refresh');
						}

					} else if (targetITab.tabIndex == 2) {
						var diaryWin = win.getTab("diaryTab").window;
						if (tabGroup.activeTab.window.objectName != 'diaryWin') {
							diaryWin.fireEvent('refresh', {timeWinUpdateFlag:true, activeTab:tabGroup.tabs[targetITab.tabIndex]});
						} else {
							diaryWin.fireEvent('refresh', {timeWinUpdateFlag:true});
						}

					} else {
						tabGroup.activeTab = tabGroup.tabs[targetITab.tabIndex];
					}
				}
			});
		}

		return tabWin;
	},

};

