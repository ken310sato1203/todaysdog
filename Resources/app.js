// アプリ

// モジュール読み込み
var Cloud = require('ti.cloud');

var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;

var tabGroup = null;
var customTab = null;	

// ---------------------------------------------------------------------
var openMainWindow = function(_userData) {
	Ti.API.debug('[func]openMainWindow:');

//	model.addUserList(_userData);
	model.setLoginId(_userData.id);
	
	tabGroup = Ti.UI.createTabGroup(style.tabGroupHidden);
	var win1 = win.createFriendsWindow(_userData);
	var win2 = win.createTodayWindow(_userData, null);
	var win3 = win.createDiaryWindow(_userData);
	var win4 = win.createProfileWindow(_userData);
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
	customTab = win.getCustomTabView();
	customTab.open();
	
/*
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
*/
};

// ---------------------------------------------------------------------

// facebook側で登録したアプリID
Ti.Facebook.appid = '159833880868916';
Ti.Facebook.permissions = ['publish_stream'];
Ti.Facebook.forceDialogAuth = false;

var loginWin = Ti.UI.createWindow(style.loginWin);
var loginFbButton = Ti.Facebook.createLoginButton(style.loginFacebookButton);
loginWin.add(loginFbButton);
loginWin.open();

Ti.Facebook.addEventListener('login', function(e) {
	Ti.API.debug('[event]Ti.Facebook.login:');
	if (e.success) {
		var type = 'facebook';
		model.loginCloudUser(type, Ti.Facebook.accessToken, function (e) {
			if (e.success) {
				var userData = e.userData;
				// 初回アイコンの登録
				if (userData.icon == null) {
					userData.icon = 'images/icon/i_circle.png';
					var defaultIcon = Ti.UI.createImageView({image: userData.icon});
					model.updateCloudUserIcon({
						user: userData.user,
						icon: defaultIcon.toBlob()
					}, function(e) {
						Ti.API.debug('[func]updateCloudUserIcon.callback:');
						if (! e.success) {
							util.errorDialog(e);
						}
					});
				}
				// 初回フォトコレクションの作成
				if (userData.post == null || userData.like == null) {
					userData.post = 0;
					userData.like = 0;
					// フォトコレクションの作成
					model.createCloudPhotoCollection({
						name: 'post'
					}, function(e) {
						Ti.API.debug('[func]createCloudPhotoCollection.callback:');
						if (e.success) {
							// フォトコレクションの作成
							model.createCloudPhotoCollection({
								name: 'like'
							}, function(e) {
								Ti.API.debug('[func]createCloudPhotoCollection.callback:');
								if (e.success) {
									// コレクションの更新
									model.updateCloudUserCollection({
										post: userData.post,
										like: userData.like,
									}, function(e) {
										if (! e.success) {
											util.errorDialog(e);
										}
									});
			
								} else {
									util.errorDialog(e);
								}
							});

						} else {
							util.errorDialog(e);
						}
					});
				}
				// メインウィンドウの表示
				openMainWindow(userData);

			} else {
				util.errorDialog(e);
			}
		});
	} else {
		util.errorDialog(e);
	}
});	

Ti.Facebook.addEventListener('logout', function(e) {
	Ti.API.debug('[event]Ti.Facebook.logout:');
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.clearCookies('https://login.facebook.com');
	Ti.Facebook.accessToken = null;
	Ti.Facebook.uid = null;
});


// ---------------------------------------------------------------------
 