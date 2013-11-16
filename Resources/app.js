// アプリ

// モジュール読み込み
var Cloud = require('ti.cloud');
var Facebook = require('facebook');

var win = require('win').win;
var style = require('style').style;
var model = require('model').model;
var util = require('util').util;
var sqliter = require("sqliter").sqliter;
var sqlite = new sqliter("todaysdog");

var tabGroup = null;
var customTab = null;	

// facebook側で登録したアプリID
Facebook.appid = '159833880868916';
Facebook.permissions = ['publish_stream'];
// iOS6以降、facebookのシングルサインオンに対応するためforceDialogAuthはfalseにすべきとあるが
// authorizeがGET系のみとなり、reauthorizeで再度POST系の認証をする必要があるため、trueとしシングルサインオンには対応しない
Facebook.forceDialogAuth = true;

// ログイン状態の時に、facebook側でログアウトした場合
// Facebook.loggedInはtureなのに、loginイベントが発火してしまうため、
// loginFlagで制御する
var loginFlag = false;

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

var loginFacebook = function() {
	Ti.API.debug('[func]loginFacebook:');

	actInd.show();
	loginWin.add(actInd);
	
	model.loginCloudUser('facebook', Facebook.accessToken, function (e) {
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
			
			// スタンプデータの初期化
//			model.dropLocalStampList();
			model.createLocalStampList();
/*
			model.initCloudStampList({
				userId: userData.id
			}, function(e) {
				Ti.API.debug('[func]initCloudStampList.callback:');
				if (! e.success) {
					util.errorDialog(e);
				}
			});
*/
			var countLocalStampList = model.getCountLocalStampList(userData.id);
			if (countLocalStampList == 0) {
				model.getAllCloudStampList({
					userId: userData.id
				}, function(e) {
					Ti.API.debug('[func]getAllCloudStampList.callback:');
					if (e.success) {

						// 最新のデータのみを抽出
						var stampHistoryList = [];
						var checkList = {};
						for (var i = 0; i < e.stampList.length; i++) {
							
							if (checkList[e.stampList[i].stamp] == null) {
								checkList[e.stampList[i].stamp] = true;
								stampHistoryList.push(e.stampList[i]);
							}
						}
												
						// ローカルDBに登録
						model.addLocalStampHistoryList(stampHistoryList);

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
	
//	actInd.hide();
};

// ---------------------------------------------------------------------

var loginWin = Ti.UI.createWindow(style.loginWin);
var loginFbButton = Facebook.createLoginButton(style.loginFacebookButton);
loginFbButton.style = Facebook.BUTTON_STYLE_WIDE;
loginFbButton.hide();
loginWin.add(loginFbButton);
loginWin.open();	

// ロード用画面
var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

if ( Facebook.loggedIn ) {
	loginFlag = true;
	loginFacebook();
} else {
	loginFbButton.show();
}


// ---------------------------------------------------------------------

Facebook.addEventListener('login', function(e) {
	Ti.API.debug('[event]Facebook.login:');
	if (e.success) {
		loginFbButton.hide();
		if (! loginFlag) {
			loginFacebook();
		}

	} else {
		// ログインダイアログでキャンセル
//		util.errorDialog(e);
	}
});	

Facebook.addEventListener('logout', function(e) {
	Ti.API.debug('[event]Facebook.logout:');
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.clearCookies('https://login.facebook.com');
	tabGroup.close();
	customTab.close();
	loginFlag = false;
	loginFbButton.show();
});

 