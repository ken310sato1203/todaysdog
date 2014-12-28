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
Facebook.permissions = ['offline_access', 'publish_stream'];
// iOS6以降、facebookのシングルサインオンに対応するためforceDialogAuthはfalseにすべきとあるが
// authorizeがGET系のみとなり、reauthorizeで再度POST系の認証をする必要があるため、trueとしシングルサインオンには対応しない
Facebook.forceDialogAuth = true;

// ログイン状態の時に、facebook側でログアウトした場合
// Facebook.loggedInはtureなのに、loginイベントが発火してしまうため、
// loginFlagで制御する
var loginFlag = false;

// 起動初回時のdiaryWinのスクロール、timeWinのオープンするためのフラグ
var initDiaryFlag = true;

// ロード用画面
var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

// ---------------------------------------------------------------------
var openMainWindow = function(_userData) {
	Ti.API.debug('[func]openMainWindow:');

	model.setLoginUser(_userData);
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
	customTab = win.getCustomTabWin();
	customTab.open();
	
	// diaryWinの更新でtimeWinを表示させておく
	win3.fireEvent('refresh');

/*	
	// アプリを閉じた時
	Ti.App.addEventListener('pause',function(e){
		Ti.API.debug('[event]App.pause:');
		var friendsWin = win.getTab("friendsTab").window;
		friendsWin.fireEvent('refresh');
	});


	// アプリを一度閉じ、再度開いた時
	Ti.App.addEventListener('resume',function(e){
		Ti.API.debug('[event]App.resume:');
	});

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

	var countLocalFriendsList = model.getLocalFriendsListCount(_userData.id);
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

	var countLocalArticleList = model.getLocalArticleListCount(_userData.id);
	if (countLocalArticleList == 0) {
		model.getCloudAllArticleList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudAllArticleList.callback:');
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

	var countLocalLikeList = model.getLocalLikeListCount(_userData.id);
	if (countLocalLikeList == 0) {
		model.getCloudAllLikeList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudAllLikeList.callback:');
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

	var countStamp = model.getLocalStampListCount(_userData.id);
	var countHistory = model.getLocalStampHistoryListCount(_userData.id);

	if (countStamp == 0 || countHistory == 0) {
		model.getCloudAllStampList({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudAllStampList.callback:');
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
			if(! Ti.App.Properties.getString(userData.id + '_' + 'notice')) {
				Ti.App.Properties.setString(userData.id + '_' + 'notice', '18:00');
			}
			// 未読設定の初期化
			if(! Ti.App.Properties.getString(userData.id + '_' + 'lastCommentDate')) {
				Ti.App.Properties.setString(userData.id + '_' + 'lastCommentDate', '2014/01/01 00:00');
			}
	
			// メインウィンドウの表示
			openMainWindow(userData);

		} else {
			util.errorDialog(e);
		}
	});
	
	setTimeout(function(){
		actInd.hide();
	}, 2000);
};

// ---------------------------------------------------------------------

var loginWin = Ti.UI.createWindow(style.loginWin);
var loginFbButton = Facebook.createLoginButton(style.loginFacebookButton);
loginFbButton.style = Facebook.BUTTON_STYLE_WIDE;
loginFbButton.hide();
loginWin.add(loginFbButton);
loginWin.open();	

if ( Facebook.loggedIn ) {
	loginFlag = true;
	loginFacebook();
} else {
	loginFbButton.show();
}

/* バックグラウンド処理がうまくいかない場合があるのでやめる。
var OS_MAJOR = parseInt(Ti.Platform.version.split('.')[0], 10);
if (Ti.Platform.name == 'iPhone OS' && OS_MAJOR >= 7) {
	// iOS 7 以上
	// バックグラウンドで定期的に実行
	var interval = Ti.App.iOS.BACKGROUNDFETCHINTERVAL_MIN;
	interval = 60;
	Ti.App.iOS.setMinimumBackgroundFetchInterval(interval);
	Ti.App.iOS.addEventListener('backgroundfetch', function (e) {
		// バッジ（最新記事件数）の更新
		model.updateCloudNewArticleCount(function(e) {
			Ti.API.debug('[func]updateCloudNewArticleCount.callback:');
			if (e.success) {
				Ti.UI.iPhone.appBadge = (e.articleCount == 0) ? null : e.articleCount;
				// タブバーをカスタマイズしているのでタブにバッジをつけるのは難しい
	//			tabGroup.tabs[0].setBadge(badgeCount);
	
			} else {
				util.errorDialog(e);
			}
		});

        // イベントハンドラの最後で呼び出し必須
        Ti.App.iOS.endBackgroundHandler(e.handlerId);
	});
}
*/

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



