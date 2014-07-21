// ユーザ一覧

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winUserList.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginUser = model.getLoginUser();

	// ユーザ一覧の表示件数
	var userCount = 9;
	// 前回更新時に読み込んだ記事の最終インデックス
	var prevUserIndex = null;
	// 次回更新時に読み込むべきユーザ一覧があるかどうかのフラグ
	var nextUserFlag = false;

	// 記事データの取得ページ
	var searchPage = 1;
	// 記事データの取得件数
	var searchCount = 6;
	// 更新時に読み込むフラグ
	var nextSearchFlag = true;
	
	// ユーザ一覧の行の追加
	var getUserTableRow = function(_userList) {
		Ti.API.debug('[func]getUserTableRow:');
		var userRow = Ti.UI.createTableViewRow(style.userListUserTableRow);
		var userListView = Ti.UI.createView(style.userListUserListView);
		userRow.add(userListView);
		
		for (var i=0; i<_userList.length; i++) {	
			Ti.API.debug('_userList[i].user:' + _userList[i].user);
			var userView = Ti.UI.createView(style.userListUserView);
			userListView.add(userView);
			var iconView = Ti.UI.createView(style.userListIconView);
			// カスタムプロパティにユーザデータを格納
			iconView.userData = _userList[i];
//			iconView.backgroundImage = _userList[i].icon;
			userView.add(iconView);
			var iconImage = Ti.UI.createImageView(style.userListIconImage);
			iconImage.image = _userList[i].icon;
			iconView.add(iconImage);

			var textLabel = Ti.UI.createLabel(style.userListTextLabel);
			if (_userList[i].name != '') {
				textLabel.text = _userList[i].name + '\n' + _userList[i].user;
			} else {
				textLabel.text = _userList[i].user;				
			}
			
			userView.add(textLabel);

			// 各ユーザ一覧のタップでプロフィール画面へ遷移
			iconView.addEventListener('click',function(e){
				Ti.API.debug('[event]iconView.click:');
				if (e.source.userData.id != loginUser.id) {
					e.source.opacity = 0.5;
					var profileWin = win.createProfileWindow(e.source.userData);
					win.openTabWindow(profileWin, {animated:true});
					e.source.opacity = 1.0;
				}
			});

			if (_userList[i].id != loginUser.id) {
				// 「フォローする」未フォローユーザをフォローするボタン
				var followButton = Titanium.UI.createButton(style.userFollowButton);
				userView.add(followButton);
				followButton.id = _userList[i].id;
				var followButtonLabel = Ti.UI.createLabel(style.userFollowButtonLabel);
				followButton.add(followButtonLabel);
	
				if (model.checkLocalFriendsList(loginUser.id, _userList[i].id)) {
					followButton.backgroundColor = '#dedede';
					followButton.clickFlag = true;
					followButtonLabel.text = 'フォロー中';
				} else {
					followButtonLabel.text = 'フォローする';
				}

				// 「フォロー中」「フォローする」ボタン
				followButton.addEventListener('click', function(e){
					Ti.API.debug('[event]followButton.click:');
					e.source.enabled = false;

					if (e.source.clickFlag) {
						var alertDialog = Titanium.UI.createAlertDialog({
						    title: 'フォローを解除しますか？',
				//		    message: 'フォローを解除しますか？',
							buttonNames: ['キャンセル','OK'],
						    cancel: 1,
						});
						alertDialog.addEventListener('click',function(alert){
							// OKの場合
							if(alert.index == 1){
								actInd.show();
								tabGroup.add(actInd);

								var source = e.source;
								// 友人の削除
								model.removeCloudFriends(source.id, function(e) {
									Ti.API.debug('[func]removeCloudFriends.callback:');
									if (e.success) {
										model.removeLocalFriendsList(loginUser.id, source.id);
										source.backgroundColor = 'white';
										source.getChildren()[0].text = 'フォローする';
									} else {
										util.errorDialog(e);
									}
									actInd.hide();
									source.clickFlag = false;
								});
							}
						});
						alertDialog.show();	
	
					} else {
						actInd.show();
						tabGroup.add(actInd);
						
						var source = e.source;
						// 友人の追加
						model.addCloudFriends(source.id, function(e) {
							Ti.API.debug('[func]addCloudFriends.callback:');
							if (e.success) {
								model.addLocalFriendsList(loginUser.id, [source]);
								source.backgroundColor = '#dedede';
								source.getChildren()[0].text = 'フォロー中';
							} else {
								util.errorDialog(e);
							}
							actInd.hide();
							source.clickFlag = true;
						});
					}

					e.source.enabled = true;
				});
			}
		}
		
		return userRow;
	};

	// 「続きを読む」ボタンの追加
	var appendNextButton = function() {
		Ti.API.debug('[func]appendNextButton:');
		var nextRow = Ti.UI.createTableViewRow(style.userListNextTableRow);
		userListTableView.appendRow(nextRow);
	
		var nextView = Ti.UI.createView(style.userListNextView);
		nextRow.add(nextView);
	
		// 「続きを読む」ボタンをテーブルに追加	
		var nextButton = Ti.UI.createButton(style.userListNextButton);
		nextView.add(nextButton);
		
		// 「続きを読む」ボタンをタップした場合、続きのユーザ一覧を追加してからボタンを削除
		nextButton.addEventListener('click', function(e) {
			updateUserList();
		});		
	};

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var noDataTableRow = Ti.UI.createTableViewRow(style.userListNoDataTableRow);
		var noDataView = Ti.UI.createView(style.userListNoDataView);
		noDataTableRow.add(noDataView);	
		var noDataLabel = Ti.UI.createLabel(style.userListNoDataLabel);
		noDataView.add(noDataLabel);
		userListTableView.appendRow(noDataTableRow);
	};

	// ユーザ一覧の追加
	var appendUser = function(_userList) {
		Ti.API.debug('[func]appendUser:');
		// 「続きを読む」ボタンを押した場合、削除するボタンのインデックスを取得
		var deleteRowIndex = null;
		if (nextUserFlag) {
			deleteRowIndex = userListTableView.data[0].rowCount - 1;
		}

		// 取得したユーザ一覧が表示件数以下の場合
		if (_userList.length < userCount + 1) {
			// 取得したユーザ一覧をテーブルに追加
			userListTableView.appendRow(getUserTableRow(_userList));
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextUserFlag) {
				userListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きのユーザ一覧がないフラグを設定
			nextUserFlag = false;

		// 取得したユーザ一覧が表示件数より1件多い場合、「続きを読む」ボタンを表示
		} else {
			// 多く取得した1件のデータを削除
			_userList.pop();
			// 取得したユーザ一覧をテーブルに追加
			userListTableView.appendRow(getUserTableRow(_userList), {animated:true});
			// 「続きを読む」ボタンを追加
			appendNextButton();
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextUserFlag) {
				userListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きのユーザ一覧があるフラグを設定
			nextUserFlag = true;
		}
	};

	// ユーザ一覧の更新
	var updateUserList = function() {
		Ti.API.debug('[func]updateUserList:');

		// 検索のユーザ一覧
		if (_type == "search") {
			if (searchField.value != '') {
				model.searchCloudFriends({
					name: searchField.value,
					page: searchPage,
					count: searchCount
				}, function(e) {
					Ti.API.debug('[func]searchCloudFriends.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUser(e.userList);
							searchPage++;
						} else {
							if (searchPage == 1) {
								appendNoDataLabel();
							}
							nextSearchFlag = false;							
						}
			
					} else {
						util.errorDialog(e);
					}
				});				
			}

		} else {
			// フォロワのユーザ一覧
			if (_type == "follower") {
				model.getCloudFollower({
					userId: _userData.id,
					page: searchPage,
					count: searchCount
				}, function(e) {
					Ti.API.debug('[func]getCloudFollower.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUser(e.userList);
							searchPage++;
						} else {
							if (searchPage == 1) {
								appendNoDataLabel();
							}
							nextSearchFlag = false;							
						}
			
					} else {
						util.errorDialog(e);
					}
				});

			// フォローのユーザ一覧
			} else if (_type == "follow") {
				model.getCloudFollow({
					userId: _userData.id,
					page: searchPage,
					count: searchCount
				}, function(e) {
					Ti.API.debug('[func]getCloudFollow.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUser(e.userList);
							searchPage++;
						} else {
							if (searchPage == 1) {
								appendNoDataLabel();
							}
							nextSearchFlag = false;							
						}
			
					} else {
						util.errorDialog(e);
					}
				});
			}	

		}
	};
	
// ---------------------------------------------------------------------
	var userListWin = Ti.UI.createWindow(style.userListWin);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	var titleView = Ti.UI.createView(style.userListTitleView);
	var titleLabel = Ti.UI.createLabel(style.userListTitleLabel);
	titleView.add(titleLabel);
	userListWin.titleControl = titleView;

	// 検索入力欄
	var userListSearchTableView = Ti.UI.createTableView(style.userListSearchTableView);
	var searchRow = Ti.UI.createTableViewRow(style.userListSearchTableRow);
	userListSearchTableView.appendRow(searchRow);	
	var searchView = Ti.UI.createView(style.userListSearchView);
	searchRow.add(searchView);
	var searchField = Ti.UI.createTextField(style.userListSearchField);
	searchView.add(searchField);

	// フォロワのユーザ一覧
	if (_type == "follower") {
		titleLabel.text = 'フォロワー';

	// フォローのユーザ一覧
	} else 	if (_type == "follow") {
		titleLabel.text = 'フォロー中';

	// 検索のユーザ一覧
	} else 	if (_type == "search") {
		titleLabel.text = 'わんとも検索';
		// 検索入力欄を表示
		userListWin.add(userListSearchTableView);
	}

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	userListWin.leftNavButton = backButton;

	var userListTableView = Ti.UI.createTableView(style.userListTableView);
	userListWin.add(userListTableView);

	// 初回読み込み時に、ユーザ一覧を更新
	updateUserList();

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		userListWin.close({animated:true});
	});	

	// 右スワイプで前の画面に戻る
	userListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]userListWin.swipe:');
		if (e.direction == 'right') {
			userListWin.close({animated:true});
		}
	});

	// クローズ時に前の画面を更新
	userListWin.addEventListener('close',function(e){
		Ti.API.debug('[event]userListWin.close:');
		if (userListWin.prevWin != null) {
			userListWin.prevWin.fireEvent('refresh');
		}
	});	

	// 検索入力の送信ボタンをクリック
	searchField.addEventListener('return',function(e){
		Ti.API.debug('[event]searchField.return:');
		userListTableView.data = [];
    	searchPage = 1;
    	nextSearchFlag = true;
		updateUserList();
	});

	// スクロールの一番下で発生するイベント
	userListTableView.addEventListener('scrollEnd',function(){
        Ti.API.debug('[event]userListTableView.scrollEnd:');
		if (nextSearchFlag) {
			updateUserList();
		}
	});

	return userListWin;
};
