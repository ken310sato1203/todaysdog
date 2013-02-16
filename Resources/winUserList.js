// ユーザ一覧

exports.createWindow = function(_listType, _userData){
	Ti.API.debug('[func]winUserList.createWindow:');
	Ti.API.debug('_listType:' + _listType);

	// ユーザ一覧の表示件数
	var userCount = 9;
	// 更新時に読み込んだユーザ一覧の最終インデックス（一番古いユーザ）
	var lastUserIndex = null;
	// 次回更新時に読み込むべきユーザ一覧があるかどうかのフラグ
	var nextUserFlag = false;
	
	var userListWin = Ti.UI.createWindow(style.userListWin);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.profileActivityIndicator);

	var titleView = null;
	var titleLabel = null;

	// フォロワのユーザ一覧
	if (_listType == "follower") {
		titleView = Ti.UI.createView(style.userListTitleView);
		titleLabel = Ti.UI.createLabel(style.userListFollowerTitleLabel);	
		titleView.add(titleLabel);		
		userListWin.titleControl = titleView;

	// フォローのユーザ一覧
	} else 	if (_listType == "follow") {
		titleView = Ti.UI.createView(style.userListTitleView);
		titleLabel = Ti.UI.createLabel(style.userListFollowTitleLabel);	
		titleView.add(titleLabel);		
		userListWin.titleControl = titleView;
	}

	var userListTableView = Ti.UI.createTableView(style.userListTableView);
	userListWin.add(userListTableView);

	// ユーザ一覧の行の追加
	var getUserTableRow = function(_userList) {
		Ti.API.debug('[func]getUserTableRow:');
		var userTableRow = Ti.UI.createTableViewRow(style.userListUserTableRow);
		var userListView = Ti.UI.createView(style.userListUserListView);
		userTableRow.add(userListView);
		
		for (var i=0; i<_userList.length; i++) {	
		Ti.API.debug('_userList[i].user:' + _userList[i].user);
			var userView = Ti.UI.createView(style.userListUserView);
			userListView.add(userView);
			var userImage = Ti.UI.createImageView(style.userListIconImage);
			userImage.image = 'images/icon/' + _userList[i].user + '.jpg';
			// カスタムプロパティにユーザ一覧データを格納
			userImage.userData = _userList[i];
			var textLabel = Ti.UI.createLabel(style.userListTextLabel);
			textLabel.text = _userList[i].user + '\n' + _userList[i].name;
					
			userView.add(userImage);
			userView.add(textLabel);

			// 各ユーザ一覧のタップでフォト画面へ遷移
			userImage.addEventListener('click',function(e){
				Ti.API.debug('[event]userImage.click:');
				e.source.opacity = 0.5;
				var userWin = win.createPhotoWindow(e.source.userData);
				win.openWindow(userListWin, userWin);
				e.source.opacity = 1.0;
			});

			if (_userList[i].user != loginId) {
				// 「フォローする」未フォローユーザをフォローするボタン
				var followButton = Titanium.UI.createButton(style.userFollowButton);
				userView.add(followButton);
				followButton.user = _userList[i].user;
				var followButtonLabel = Ti.UI.createLabel(style.userFollowButtonLabel);
				followButton.add(followButtonLabel);
	
				if (model.checkFollowList(loginId, _userList[i].user)) {
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
						    buttonNames: ['OK','キャンセル'],
						    cancel: 1,
						});
						alertDialog.addEventListener('click',function(alert){
							// OKの場合
							if(alert.index == 0){
								actInd.show();
								tabGroup.add(actInd);
								// プロフィールのフォロー数を更新
								var loginData = model.getUser(loginId);
								model.removeFollowList(loginId, e.source.user);
										
								setTimeout(function(){
									actInd.hide();
									e.source.backgroundColor = 'white';
									e.source.clickFlag = false;
									e.source.getChildren()[0].text = 'フォローする';
								},2000);		        
							}
						});
						alertDialog.show();	
	
					} else {
						actInd.show();
						tabGroup.add(actInd);
						// プロフィールのフォロー数を更新
						var loginData = model.getUser(loginId);
						model.addFollowList(loginId, e.source.user);
				
						setTimeout(function(){
							actInd.hide();
							e.source.backgroundColor = '#dedede';
							e.source.clickFlag = true;
							e.source.getChildren()[0].text = 'フォロー中';
						},2000);					
					}

					e.source.enabled = true;
				});
			}
		}
		
		return userTableRow;
	}

	// 「続きを読む」ボタンの追加
	var appendNextButton = function() {
		Ti.API.debug('[func]appendNextButton:');
		var nextTableRow = Ti.UI.createTableViewRow(style.userListNextTableRow);
		userListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.userListNextView);
		nextTableRow.add(nextView);
	
		// 「続きを読む」ボタンをテーブルに追加	
		var nextButton = Ti.UI.createButton(style.userListNextButton);
		nextView.add(nextButton);
		
		// 「続きを読む」ボタンをタップした場合、続きのユーザ一覧を追加してからボタンを削除
		nextButton.addEventListener('click', function(e) {
			updateUser();
		});		
	}

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var nextTableRow = Ti.UI.createTableViewRow(style.userListNextTableRow);
		userListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.userListNextView);
		nextTableRow.add(nextView);
	
		var noDataLabel = Ti.UI.createLabel(style.userListNoDataLabel);
		nextView.add(noDataLabel);
	}	

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
	}

	// ユーザ一覧の更新
	var updateUserList = function() {
		Ti.API.debug('[func]updateUserList:');
		// 前回取得した最後のインデックス以降を取得
		// 「続きを読む」ボタンの表示判定のため、表示件数より1件多い条件で取得
		var userList = null;
		// フォロワのユーザ一覧
		if (_listType == "follower") {
//			userList = model.getUserList(_listType, _userData, lastUserIndex, userCount + 1);
			userList = model.getFollowerList(_userData.user);
		} else if (_listType == "follow") {
			userList = model.getFollowList(_userData.user);
		}

		if (userList == null) {
			// 1件も取得できなかった場合
			appendNoDataLabel();		
			// 次回更新用に続きのユーザ一覧がないフラグを設定
			nextUserFlag = false;
		} else {
			appendUser(userList);
			// 次回更新用に取得した最後のインデックスを設定
			Ti.API.debug('userList:' + userList);
			Ti.API.debug('userList.length:' + userList.length);
			lastUserIndex = userList[userList.length-1].no;
		}
	}
	// 初回読み込み時に、ユーザ一覧を更新
	updateUserList();

	// 右スワイプで前の画面に戻る
	userListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]userListWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(userListWin);
		}
	});

	// クローズ時に前の画面を更新
	userListWin.addEventListener('close',function(e){
		Ti.API.debug('[event]userListWin.close:');
		tabPrevWin.fireEvent('refresh');
	});	

	return userListWin;
}
