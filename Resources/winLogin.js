// ログイン

exports.createWindow = function(){
	Ti.API.debug('[func]winLogin.createWindow:');

	// 多重クリック防止
	var clickEnable = true;

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
		tabGroup.open();
	
		// カスタムタブを上から表示
		customTab = win.getCustomTabWin();
		customTab.open();
		
		// diaryWinの更新でtimeWinを表示させておく
		win3.fireEvent('refresh');
	
		// バッジの初期化
//		Titanium.UI.iPhone.setAppBadge('0');
	
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
	
	var login = function(params) {
		Ti.API.debug('[func]login:');
	
		actInd.show();
		loginWin.add(actInd);
	
		model.loginCloudUser(params, function (e) {
			if (e.success) {
				loginWin.hide();
				var user = e.users[0];
				var userData = {
					id: user.id,
					user: user.username,
					photo: 0,
					like: 0,
					follow: 0,
					follower: 0, 
					name: '',
					breed: '',
					sex: '',
					birth: '', 
					memo: '',
					post: null,
					like: null,
					icon: null,
//					icon: 'http://graph.facebook.com/' + custom_fields.external_accounts[0].external_id + '/picture?type=normal',
//					icon: 'http://graph.facebook.com/maki.oshika.9/picture?type=normal',
				};
				if (user.custom_fields) {
					if (user.custom_fields.name != null)  { userData.name = user.custom_fields.name; }
					if (user.custom_fields.breed != null) { userData.breed = user.custom_fields.breed; }
					if (user.custom_fields.sex != null)   { userData.sex = user.custom_fields.sex; }
					if (user.custom_fields.birth != null) { userData.birth = user.custom_fields.birth; }
					if (user.custom_fields.memo != null)  { userData.memo = user.custom_fields.memo; }
					if (user.custom_fields.post != null)  { userData.post = user.custom_fields.post; }
					if (user.custom_fields.like != null)  { userData.like = user.custom_fields.like; }
				}
				if (user.photo) {
					userData.icon = user.photo.urls.small_240;
				}
	
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
				if(Ti.App.Properties.hasProperty(userData.id + '_' + 'notice') == false) {
					Ti.App.Properties.setString(userData.id + '_' + 'notice', '18:00');
				}
				// 未読設定の初期化
				if(Ti.App.Properties.hasProperty(userData.id + '_' + 'lastCommentDate') == false) {
					Ti.App.Properties.setString(userData.id + '_' + 'lastCommentDate', '2014/01/01 00:00');
				}
				// 最新記事日時の初期化
				if(Ti.App.Properties.hasProperty(userData.id + '_' + 'lastArticleDate') == false) {
					Ti.App.Properties.setString(userData.id + '_' + 'lastArticleDate', '2014/01/01 00:00');
				}

				// 自動ログイン用のセッション
				if (e.type == 'email') {
					Ti.App.Properties.setString('session', Cloud.sessionId);
				}
		
				// メインウィンドウの表示
				openMainWindow(userData);
	
			} else {
				if (e.type == 'email' && (e.code == 400 || e.code == 401)) {
					util.alertDialog('正しいメールアドレスまたはパスワードを入力してください');
			   } else {
					util.errorDialog(e);
			   }
			}
		});
		
		setTimeout(function(){
			actInd.hide();
		}, 2000);
	};

// ---------------------------------------------------------------------

	var loginWin = Ti.UI.createWindow(style.loginWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.loginTitleLabel);	
	loginWin.titleControl = titleLabel;

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

/*
	var loginFbButton = Facebook.createLoginButton(style.loginFacebookButton);
	loginFbButton.style = Facebook.BUTTON_STYLE_WIDE;
	loginWin.add(loginFbButton);
*/
	
	var listView = Ti.UI.createView(style.loginListView);
	loginWin.add(listView);

	// facebookボタンのフィールドを表示
	var facebookView = Ti.UI.createView(style.loginListItemView);
	facebookView.backgroundColor = '#3B5998';
	facebookView.objectName = 'login';
	listView.add(facebookView);
	var facebookLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	facebookLabel.color = 'white';
	facebookLabel.text = 'Facebookでログイン';
	facebookView.add(facebookLabel);

	facebookView.addEventListener('click',function(e){
		Ti.API.debug('[event]facebookView.click:');
		loginWindow.hide();
		Facebook.authorize();
	});

	// またはのフィールドを表示
	var orLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	orLabel.color = '#696969';
	orLabel.text = 'または';
	listView.add(orLabel);

	// 名前のフィールドを表示
	var nameView = Ti.UI.createView(style.loginListItemView);
	nameView.top = '4dp';
	nameView.objectName = 'name';
	listView.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.loginListItemLabel);
	nameLabel.text = 'メールアドレス';
	var nameField = Ti.UI.createTextField(style.loginListValueField);
	nameField.returnKeyType = Ti.UI.RETURNKEY_NEXT;
	nameField.maxLength = 200;
	nameField.objectName = 'name';
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 名前フィールドのチェック
	var checkNameField = function() {
		Ti.API.debug('[func]checkNameField:');
		if (nameField.value != '') {
			nameLabel.hide();
		} else {
			nameLabel.show();
		}
	};
	nameField.addEventListener('click',function(e){
		Ti.API.debug('[event]nameField.click:');
		nameLabel.hide();
	});
	nameField.addEventListener('return',function(e){
		Ti.API.debug('[event]nameField.return:');
		passField.focus();
	});
	nameField.addEventListener('blur',function(e){
		Ti.API.debug('[event]nameField.blur:');
		checkNameField();
	});

	// パスワードのフィールドを表示
	var passView = Ti.UI.createView(style.loginListItemView);
	passView.objectName = 'pass';
	listView.add(passView);
	var passLabel = Ti.UI.createLabel(style.loginListItemLabel);
	passLabel.text = 'パスワード';
	var passField = Ti.UI.createTextField(style.loginListValueField);
	passField.maxLength = 50;
	passField.objectName = 'pass';
	passField.passwordMask = true;
	passView.add(passLabel);
	passView.add(passField);

	// パスワードフィールドのチェック
	var checkPassField = function() {
		Ti.API.debug('[func]checkPassField:');
		if (passField.value != '') {
			passLabel.hide();
		} else {
			passLabel.show();
		}
	};
	passField.addEventListener('focus',function(e){
		Ti.API.debug('[event]passField.focus:');
		passLabel.hide();
	});
	passField.addEventListener('return',function(e){
		Ti.API.debug('[event]passField.return:');
		loginView.fireEvent('click');
	});
	passField.addEventListener('blur',function(e){
		Ti.API.debug('[event]passField.blur:');
		checkPassField();
	});
	
	// ログインボタンのフィールドを表示
	var loginView = Ti.UI.createView(style.loginListItemView);
	loginView.top = '9dp';
	loginView.backgroundColor = '#e74c3c';
	loginView.objectName = 'login';
	listView.add(loginView);
	var loginLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	loginLabel.color = 'white';
	loginLabel.text = 'メールアドレスでログイン';
	loginView.add(loginLabel);

	loginView.addEventListener('click',function(e){
		Ti.API.debug('[event]loginView.click:');
		nameField.blur();
		passField.blur();
		login({
			type: 'email',
			email: nameField.value,
			pass: passField.value
		});
		passField.value = '';
	});

	// パスワードリセット
	var resetView = Ti.UI.createView(style.registListItemView);
	resetView.backgroundColor = '#eeeeee';
	listView.add(resetView);
	var resetLabel = Ti.UI.createLabel(style.registListButtonItemLabel);
	resetLabel.color = '#696969';
	resetLabel.text = 'パスワードを忘れた場合';
	listView.add(resetLabel);

	resetLabel.addEventListener('click',function(e){
		Ti.API.debug('[event]backLabel.click:');
		if (clickEnable) {
			clickEnable = false;
			var target = e.source;
			target.opacity = 0.5;
			var registWin = win.createRegistWindow('reset');
			registWin.open({
				modal: true,
			    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
//			    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,
			    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			});

			target.opacity = 1.0;
			clickEnable = true;
		}
	});

	// 新規ボタンのフィールドを表示
	var newView = Ti.UI.createView(style.loginListItemView);
	newView.top = '9dp';
//	newView.backgroundColor = '#e74c3c';
	newView.objectName = 'new';
	listView.add(newView);
	var newLabel = Ti.UI.createLabel(style.loginListButtonItemLabel);
	newLabel.text = 'メールアドレスで新規登録';
	newView.add(newLabel);

	newView.addEventListener('click',function(e){
		Ti.API.debug('[event]newView.click:');
		if (clickEnable) {
			clickEnable = false;
			var target = e.source;
			target.opacity = 0.5;
			var registWin = win.createRegistWindow('regist');
			registWin.open({
				modal: true,
			    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
//			    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,
			    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			});

			target.opacity = 1.0;
			clickEnable = true;
		}
	});

	loginWin.addEventListener('click',function(e){
		Ti.API.debug('[event]loginWin.click:');
		nameField.blur();
		passField.blur();
	});


// ---------------------------------------------------------------------
	
	loginWin.addEventListener('email_login', function(e) {
		Ti.API.debug('[event]loginWin.email_login:');
		login({
			type: 'session'
		});
	});

	loginWin.addEventListener('facebook_login', function(e) {
		Ti.API.debug('[event]loginWin.facebook_login:');
		login({
			type: 'facebook',
			token: Facebook.accessToken
		});
	});

	return loginWin;
};
