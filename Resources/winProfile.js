// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfile.createWindow:');

	var loginUser = model.getLoginUser();
	// 多重クリック防止
	var clickEnable = true;

	// Viewの取得
	var getProfileRowList = function() {
		Ti.API.debug('[func]getProfileRowList:');
		var rowList = [];
	
		// カウント数の表示
		var profileCountRow = Titanium.UI.createTableViewRow(style.profileCountTableRow);
		rowList.push(profileCountRow);
		var countView = Ti.UI.createView(style.profileCountView);
		profileCountRow.add(countView);

		// アイコンの表示
		var iconView = Ti.UI.createView(style.profileIconView);
//		iconView.backgroundImage = _userData.icon;
		countView.add(iconView);

		var iconImage = Ti.UI.createImageView(style.profileIconImage);
		iconImage.image = _userData.icon;
		iconView.add(iconImage);

		// アイコンをクリック
		iconView.addEventListener('click',function(e){
			Ti.API.debug('[event]iconView.click:');
			if (_userData.id == loginUser.id) {
				var target = e.source;
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					target.opacity = 0.5;
	
					var dialog = Titanium.UI.createOptionDialog({
						options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
						cancel:2
					});
					dialog.show();
		
					dialog.addEventListener('click',function(e) {
						Ti.API.debug('[event]dialog.click:');
						switch( e.index ) {
							case 0:
								var cameraWin = win.createCameraWindow('icon_camera', _userData);
								cameraWin.prevWin = profileWin;
								win.openTabWindow(cameraWin, {animated:true});
								target.opacity = 1.0;
								clickEnable = true;
								break;
							case 1:
								var cameraWin = win.createCameraWindow('icon_select', _userData);
								cameraWin.prevWin = profileWin;
								win.openTabWindow(cameraWin, {animated:true});
								target.opacity = 1.0;
								clickEnable = true;
								break;
							case 2:
								target.opacity = 1.0;
								clickEnable = true;
								break;
						}
					});
				}
			}
		});			
	
		// フォト数の表示
		var countPhotoView = Ti.UI.createView(style.profileCountDataView);
		countView.add(countPhotoView);
		var countPhotoLabel = Ti.UI.createLabel(style.profileCountDataLabel);
		countPhotoLabel.text = _userData.photo;
		var countPhotoUnitLabel = Ti.UI.createLabel(style.profileCountDataUnitLabel);
		countPhotoUnitLabel.text = '投稿数';
		countPhotoView.add(countPhotoLabel);
		countPhotoView.add(countPhotoUnitLabel);
	
		// フォト数をクリックでフォト一覧を表示
		countPhotoView.addEventListener('click', function(e){
			Ti.API.debug('[event]countPhotoView.click:');
			if (_userData.photo > 0) {
				countPhotoView.backgroundColor = '#dedede';
				var type = "user";
				var photoListWin = win.createPhotoListWindow(type, _userData);
				win.openTabWindow(photoListWin, {animated:true});
				countPhotoView.backgroundColor = 'white';
			}
		});

/*	
		// ライクの記事情報がreviewから１回では取得できないので表示しないことに
		// ライク数の表示
		var countLikeView = Ti.UI.createView(style.profileCountLikeView);
		countView.add(countLikeView);
		var countLikeLabel = Ti.UI.createLabel(style.profileCountLikeLabel);
		countLikeLabel.text = _userData.like;
		var countLikeUnitLabel = Ti.UI.createLabel(style.profileCountLikeUnitLabel);
		countLikeView.add(countLikeLabel);
		countLikeView.add(countLikeUnitLabel);
	
		// ライク数をクリックでフォト一覧を表示
		countLikeView.addEventListener('click', function(e){
			Ti.API.debug('[event]countLikeView.click:');
			if (_userData.like > 0) {
				countLikeView.backgroundColor = '#dedede';
				var type = "like";
				var photoListWin = win.createPhotoListWindow(type, _userData);
				win.openTabWindow(photoListWin, {animated:true});
				countLikeView.backgroundColor = 'white';
			}
		});
*/
	
		// フォロワー数の表示
		var countFollowerView = Ti.UI.createView(style.profileCountDataView);
		countView.add(countFollowerView);
		var countFollowerLabel = Ti.UI.createLabel(style.profileCountDataLabel);
		countFollowerLabel.text = _userData.follower;
		var countFollowerUnitLabel = Ti.UI.createLabel(style.profileCountDataUnitLabel);
		countFollowerUnitLabel.text = 'フォロワー';
		countFollowerView.add(countFollowerLabel);
		countFollowerView.add(countFollowerUnitLabel);
	
		// フォロワ数をクリックでユーザ一覧を表示
		countFollowerView.addEventListener('click', function(e){
			Ti.API.debug('[event]countFollowerView.click:');
			if (_userData.follower > 0) {
				countFollowerView.backgroundColor = '#dedede';
				var type = "follower";
				var userListWin = win.createUserListWindow(type, _userData);
				userListWin.prevWin = profileWin;
				win.openTabWindow(userListWin, {animated:true});
				countFollowerView.backgroundColor = 'white';
			}
		});
	
		// フォロー数の表示
		var countFollowView = Ti.UI.createView(style.profileCountDataView);
		countView.add(countFollowView);
		var countFollowLabel = Ti.UI.createLabel(style.profileCountDataLabel);
		countFollowLabel.text = _userData.follow;
		var countFollowUnitLabel = Ti.UI.createLabel(style.profileCountDataUnitLabel);
		countFollowUnitLabel.text = 'フォロー中';
		countFollowView.add(countFollowLabel);
		countFollowView.add(countFollowUnitLabel);
	
		// フォロー数をクリックでユーザ一覧を表示
		countFollowView.addEventListener('click', function(e){
			Ti.API.debug('[event]countFollowView.click:');
			if (_userData.follow > 0) {
				countFollowView.backgroundColor = '#dedede';
				var type = "follow";
				var userListWin = win.createUserListWindow(type, _userData);
				userListWin.prevWin = profileWin;
				win.openTabWindow(userListWin, {animated:true});
				countFollowView.backgroundColor = 'white';
			}
		});
	
		// プロフィール情報の表示
		var profileInfoRow = Titanium.UI.createTableViewRow(style.profileInfoTableRow);
		rowList.push(profileInfoRow);

		var infoRowView = Ti.UI.createView(style.profileInfoRowView);
		profileInfoRow.add(infoRowView);

		var photoView = Ti.UI.createView(style.profilePhotoView);
		infoRowView.add(photoView);
		var photoImage = Ti.UI.createImageView(style.profilePhotoImage);
		photoView.add(photoImage);
	
		var infoView = Ti.UI.createView(style.profileInfoView);
 		infoRowView.add(infoView);

//		var nameView = Ti.UI.createView(style.profileInfoNameView);
//		infoView.add(nameView);
		
		if (_userData.name != '') {
			var nameLabel = Ti.UI.createLabel(style.profileInfoNameLabel);
			nameLabel.text = _userData.name;
			infoView.add(nameLabel);
		}
		var userLabel = Ti.UI.createLabel(style.profileInfoUserLabel);
		userLabel.text = _userData.user;
		infoView.add(userLabel);
	
		if (_userData.breed != '') {
			var breedLabel = Ti.UI.createLabel(style.profileInfoBreedLabel);
			breedLabel.text = _userData.breed;
			infoView.add(breedLabel);
		}
		if (_userData.birth != '' || _userData.sex != '') {
			var birthLabel = Ti.UI.createLabel(style.profileInfoBirthLabel);
			if (_userData.sex == '') {
				birthLabel.text = _userData.birth;
			} else if (_userData.birth == '') {
				birthLabel.text = _userData.sex;
			} else {
				birthLabel.text = util.getFormattedDateJapan(_userData.birth) + '生まれの' + _userData.sex;
			}
			infoView.add(birthLabel);
		}

		if (_userData.memo != '') {
			var memoLabel = Ti.UI.createLabel(style.profileInfoMemoLabel);
			memoLabel.text = _userData.memo;
			infoView.add(memoLabel);
		}
	
		// フォトコレクションの取得
		model.getCloudPhotoCollection({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudPhotoCollection.callback:');
			if (e.success) {
				for (var i = 0; i < e.collections.length; i++) {
					var collection = e.collections[i];
					if (collection.name == 'post') {
						// フォト数の更新
						_userData.photo = collection.counts.total_photos;
						countPhotoLabel.text = _userData.photo;

						// カバー写真の更新
						if (_userData.photo > 0) {
							var coverIndex = Math.floor(Math.random() * _userData.photo);
							model.getCloudPhoto({
								collection: collection.id,
								page: coverIndex+1,
								count: 1
							}, function(e) {
								Ti.API.debug('[func]getCloudPhoto.callback:');
								if (e.success) {
									if (e.photos) {
										photoImage.image = e.photos[0].urls.original;
									}
								} else {
									util.errorDialog(e);
								}
							});
						}
/*
					// LikeがAPIでサポートされてないのでPhotoCollectionsを使わずReviewsから取得
					} else if (collection.name == 'like') {
						_userData.like = collection.counts.total_photos;
						countLikeLabel.text = _userData.like;
*/
					}
				}

			} else {
				util.errorDialog(e);
			}
		});

/*
		// ライク数の取得
		model.getCloudLikeCollection({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudLikeCollection.callback:');
			if (e.success) {
				_userData.like = e.reviews.length;
				countLikeLabel.text = _userData.like;
					
			} else {
				util.errorDialog(e);
			}
		});
*/
		// フォロワー数の取得
		model.getCloudFollowerCount({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudFollowerCount.callback:');
			if (e.success) {
				_userData.follower = e.users.length;
				countFollowerLabel.text = _userData.follower;
			} else {
				util.errorDialog(e);
			}
		});
		// フォロー数の取得
		model.getCloudFollowCount({
			userId: _userData.id
		}, function(e) {
			Ti.API.debug('[func]getCloudFollowCount.callback:');
			if (e.success) {
				_userData.follow = e.users.length;
				countFollowLabel.text = _userData.follow;
			} else {
				util.errorDialog(e);
			}
		});

		return rowList;
	};

// ---------------------------------------------------------------------

	var profileWin = Ti.UI.createWindow(style.profileWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileTitleLabel);	
	profileWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);

	// プロフィールを編集するボタン
	var editButton = Titanium.UI.createButton(style.profileEditButton);
	// フォローユーザを解除するボタン
	var unfollowButton = Titanium.UI.createButton(style.profileUnfollowButton);
	// 未フォローユーザをフォローするボタン
	var followButton = Titanium.UI.createButton(style.profileFollowButton);
	//  ログアウトボタン
	var configButton = Titanium.UI.createButton(style.profileConfigButton);
	var b1 = Titanium.UI.createButton({title:'Left Nav'});
	if (loginUser.id == _userData.id) {
		profileWin.rightNavButton = configButton;
		// tabGroupではleftNavButtonが使えない
//		profileWin.leftNavButton = editButton;
		titleView.add(editButton);
		titleView.add(titleLabel);

	} else {
		profileWin.leftNavButton = backButton;
		titleView.add(titleLabel);
		if (model.checkLocalFriendsList(loginUser.id, _userData.id)) {
			profileWin.rightNavButton = unfollowButton;
		} else {
			profileWin.rightNavButton = followButton;
		}
	}

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
	profileTableView.setData(getProfileRowList());
	profileWin.add(profileTableView);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		profileWin.close({animated:true});
	});	

	// 「編集」ボタン
	editButton.addEventListener('click', function(e){
		Ti.API.debug('[event]editButton.click:');
		var profileEditWin = win.createProfileEditWindow(_userData);
		profileEditWin.prevWin = profileWin;
//		win.openTabWindow(profileEditWin, {animated:true});
		// 下から表示させるため、modalでウィンドウを表示。
		// titleControlが表示されなかったので、NavigationWindowを使用。
		var navWin = Ti.UI.iOS.createNavigationWindow({
			modal: true,
			window: profileEditWin
		});
		profileEditWin.nav = navWin;
		navWin.open();
	});

	// 設定ボタンをクリック
	configButton.addEventListener('click', function(e){
		Ti.API.debug('[event]configButton.click:');
		var profileConfigWin = win.createProfileConfigWindow(_userData);
		profileConfigWin.prevWin = profileWin;
		win.openTabWindow(profileConfigWin, {animated:true});
	});	

	// 「フォロー中」ボタン
	unfollowButton.addEventListener('click', function(e){
		Ti.API.debug('[event]unfollowButton.click:');
		unfollowButton.enabled = false;
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'フォローを解除しますか？',
//		    message: 'フォローを解除しますか？',
			buttonNames: ['キャンセル','OK'],
		    cancel: 1
		});
		unfollowButton.enabled = false;
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
		    // OKの場合
		    if(alert.index == 1){
				actInd.show();
				tabGroup.add(actInd);
				// 友人の削除
				model.removeCloudFriends(_userData.id, function(e) {
					Ti.API.debug('[func]removeCloudFriends.callback:');
					if (e.success) {
						model.removeLocalFriendsList(loginUser.id, _userData.id);
						profileWin.rightNavButton = followButton;
//						countFollowerLabel.text = _userData.follower;
						actInd.hide();
						followButton.enabled = true;
					} else {
						actInd.hide();
						followButton.enabled = true;
						util.errorDialog(e);
					}
				});		
		    }
			unfollowButton.enabled = true;
		});
	});

	// 「フォローする」ボタン
	followButton.addEventListener('click', function(e){
		Ti.API.debug('[event]followButton.click:');
		followButton.enabled = false;
		actInd.show();
		tabGroup.add(actInd);

		// 友人の追加
		model.addCloudFriends(_userData.id, function(e) {
			Ti.API.debug('[func]addCloudFriends.callback:');
			if (e.success) {
				model.addLocalFriendsList(loginUser.id, [_userData]);
				unfollowButton.enabled = true;
				profileWin.rightNavButton = unfollowButton;
//				countFollowerLabel.text = _userData.follower;
				actInd.hide();
				followButton.enabled = true;
			} else {
				actInd.hide();
				followButton.enabled = true;
				util.errorDialog(e);
			}
		});
	});

	// プロフィール編集を反映
	profileWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileWin.refresh:');
		// ビューの再作成
//		profileWin.remove(profileTableView);
//		profileTableView = getProfileRowList();
//		profileWin.add(profileTableView);

		profileTableView.setData(getProfileRowList());

		if (profileWin.prevWin != null) {
			profileWin.prevWin.fireEvent('refresh');
		}
	});

	// 右スワイプで前の画面に戻る
	profileWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]profileWin.swipe:');
		if (e.direction == 'right') {
			profileWin.close({animated:true});
		}
	});

	// オープン時の処理
	profileWin.addEventListener('open',function(e){
		Ti.API.debug('[event]profileWin.open:');
	});

	return profileWin;
};
