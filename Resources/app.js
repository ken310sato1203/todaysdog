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

	model.setLoginId(_userData.id);
	Ti.App.Properties.setString('userId', _userData.id);
	if(_userData.name != '') {
		Ti.App.Properties.setString(_userData.id + 'name', _userData.name);
	}
	
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

	// diaryWinの今日の日スクロールが、なぜか25日以降の場合、一番下までスクロールしないので、
	// createした後に再作成することで対応
	var diaryWin = win.getTab("diaryTab").window;
	diaryWin.fireEvent('refresh');
	
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

var initFollowList = function(_userData) {
	Ti.API.debug('[func]initFollowList:');
	// 友人データの初期化
//	model.dropLocalFriendsList();
	model.createLocalFriendsList();

	var countLocalFriendsList = model.getCountLocalFriendsList(_userData.id);
	if (countLocalFriendsList == 0) {
		model.getCloudFollow({
			userId: _userData.id,
			page: 1,
			count: 5000
		}, function(e) {
			Ti.API.debug('[func]getCloudFollower.callback:');
			if (e.success) {
				model.addLocalFriendsList(_userData.id, e.userList);
	
			} else {
				util.errorDialog(e);
			}
		});
	}
};

var initArticle = function(_userData) {
	Ti.API.debug('[func]initArticle:');
	// 記事データの初期化
//	model.dropLocalArticleList();
	model.createLocalArticleList();

	var countLocalArticleList = model.getCountLocalArticleList(_userData.id);
	if (countLocalArticleList == 0) {
		model.getAllCloudArticleList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getAllCloudArticleList.callback:');
			if (e.success) {
				// ローカルDBに登録
				model.addLocalArticleList(e.articleList);

			} else {
				util.errorDialog(e);
			}
		});
	}
};

var initLikeArticle = function(_userData) {
	Ti.API.debug('[func]initLikeArticle:');
	// ライクデータの初期化
//	model.dropLocalLikeList();
	model.createLocalLikeList();

	var countLocalLikeList = model.getCountLocalLikeList(_userData.id);
	if (countLocalLikeList == 0) {
		model.getAllCloudLikeList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getAllCloudLikeList.callback:');
			if (e.success) {
				// ローカルDBに登録
				model.addLocalLikeList(e.likeList);

			} else {
				util.errorDialog(e);
			}
		});
	}
};

var initStamp = function(_userData) {
	Ti.API.debug('[func]initStamp:');
	// スタンプデータの初期化
//	model.dropLocalStampList();
	model.createLocalStampList();

//	model.dropLocalStampHistoryList();
	model.createLocalStampHistoryList();

	var countStamp = model.getCountLocalStampList(_userData.id);
	var countHistory = model.getCountLocalStampHistoryList(_userData.id);

	if (countStamp == 0 || countHistory == 0) {
		model.getAllCloudStampList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getAllCloudStampList.callback:');
			if (e.success) {

				if (countStamp == 0) {
					// ローカルDBに登録
					model.addLocalStampList(e.stampList);
				}

				if (countHistory == 0) {
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
				}

			} else {
				util.errorDialog(e);
			}
		});
	}
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
			
			// 友人データの初期化
			initFollowList(userData);
			// 記事データの初期化
			initArticle(userData);
			// ライクデータの初期化
			initLikeArticle(userData);
			// スタンプデータの初期化
			initStamp(userData);

			// 通知設定の初期化
//			if(! Ti.App.Properties.getString(userData.id + '_' + 'notice')) {
//				Ti.App.Properties.setString(userData.id + '_' + 'notice', '17:18');
//			}
	
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

// アプリがバックグラウンドに変わった時に実行
var service = Ti.App.iOS.registerBackgroundService({url:'background.js'});

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

 