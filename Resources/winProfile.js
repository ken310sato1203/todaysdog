// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfile.createWindow:');

	var loginUser = model.getLoginUser();
	// 多重クリック防止
	var clickEnable = true;

	// countRowの取得
	var getProfileCountRow = function() {
		Ti.API.debug('[func]getProfileCountRow:');

		// カウント数の表示
		var countRow = Titanium.UI.createTableViewRow(style.profileCountTableRow);
		var countView = Ti.UI.createView(style.profileCountView);
		countRow.add(countView);

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
			// acsでfriends/searchを他ユーザで403エラーになるため一旦クリックできないようにする
			if (_userData.user == loginUser.user) {
				if (_userData.follower > 0) {
					countFollowerView.backgroundColor = '#dedede';
					var type = "follower";
					var userListWin = win.createUserListWindow(type, _userData);
					userListWin.prevWin = profileWin;
					win.openTabWindow(userListWin, {animated:true});
					countFollowerView.backgroundColor = 'white';
				}
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
			// acsでfriends/searchを他ユーザで403エラーになるため一旦クリックできないようにする
			if (_userData.user == loginUser.user) {
				if (_userData.follow > 0) {
					countFollowView.backgroundColor = '#dedede';
					var type = "follow";
					var userListWin = win.createUserListWindow(type, _userData);
					userListWin.prevWin = profileWin;
					win.openTabWindow(userListWin, {animated:true});
					countFollowView.backgroundColor = 'white';
				}
			}
		});

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

/*	
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

		// ユーザデータの取得
		model.getCloudUser(_userData.id, function(e) {
			Ti.API.debug('[func]getCloudUser.callback:');
			if (e.success) {
				var user = e.users[0];
				_userData.follower = user.friend_counts.followers;
				_userData.follow = user.friend_counts.following;
				countFollowerLabel.text = _userData.follower;
				countFollowLabel.text = _userData.follow;
			} else {
				util.errorDialog(e);
			}
		});

/*
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
*/

		return countRow;
	};

	// infoRowの取得
	var getProfileInfoRow = function() {
		Ti.API.debug('[func]getProfileInfoRow:');

		// プロフィール情報の表示
		var infoRow = Titanium.UI.createTableViewRow(style.profileInfoTableRow);
		var infoRowView = Ti.UI.createView(style.profileInfoRowView);
		infoRow.add(infoRowView);
		// アイコンの表示
		var iconView = Ti.UI.createView(style.profileIconView);
		infoRowView.add(iconView);

		var iconImage = Ti.UI.createImageView(style.profileIconImage);
		iconImage.image = _userData.icon;
		iconView.add(iconImage);
		profileWin.iconImage = iconImage;

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
								win.openTabWindow(cameraWin, {animated:true});
								target.opacity = 1.0;
								clickEnable = true;
								break;
							case 1:
								var cameraWin = win.createCameraWindow('icon_select', _userData);
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
	
		var nameView = Ti.UI.createView(style.profileInfoNameView);
 		infoRowView.add(nameView);

		if (loginUser.id == _userData.id) {
		 		followButton.title = '編集する';
		} else {
			if (model.checkLocalFriendsList(loginUser.id, _userData.id)) {
		 		followButton.title = 'フォロー中';
			} else {
		 		followButton.title = 'フォローする';
			}
		}
		infoRowView.add(followButton);

		if (_userData.name != '') {
			var nameLabel = Ti.UI.createLabel(style.profileInfoNameLabel);
			nameLabel.text = _userData.name;
			nameView.add(nameLabel);
		}
		var userLabel = Ti.UI.createLabel(style.profileInfoUserLabel);
		userLabel.text = _userData.user;
		nameView.add(userLabel);

		if (_userData.breed != '') {
			var breedLabel = Ti.UI.createLabel(style.profileInfoBreedLabel);
			breedLabel.text = _userData.breed;
			nameView.add(breedLabel);
		}
		if (_userData.birth != '' || _userData.sex != '') {
			var birthLabel = Ti.UI.createLabel(style.profileInfoBirthLabel);
			if (_userData.sex == '') {
				birthLabel.text = _userData.birth;
			} else if (_userData.birth == '') {
				birthLabel.text = _userData.sex;
			} else {
				birthLabel.text = util.getFormattedYMD(_userData.birth) + '生まれの' + _userData.sex;
			}
			nameView.add(birthLabel);
		}

		if (_userData.memo != '') {
			var memoLabel = Ti.UI.createLabel(style.profileInfoMemoLabel);
			memoLabel.text = _userData.memo;
			nameView.add(memoLabel);
		}

		return infoRow;
	};
	
	// 記事の取得
	var getPhotoListArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getPhotoListArticleTableRow:');
		var articleRow = Ti.UI.createTableViewRow(style.profileInfoTableRow);
		var articleListView = Ti.UI.createView(style.profileArticleListView);
		articleRow.add(articleListView);
		
		var rowNum = (_articleList.length < 4) ? _articleList.length : 4;
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.profileArticleView);
			articleListView.add(articleView);
			var photoImage = Ti.UI.createImageView(style.profilePhotoImage);
			photoImage.width = ( (Ti.Platform.displayCaps.platformWidth) / rowNum ) + 'dp',
			photoImage.image = _articleList[i].photo;

			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			articleView.add(photoImage);

			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
/*
				var type = "photoList";
				var photoWin = win.createPhotoWindow(type, e.source.articleData);
				photoWin.prevWin = photoListWin;
				win.openTabWindow(photoWin, {animated:true});
*/
				var target = e.source;
				target.opacity = 0.5;
				var photoWin = Ti.UI.createWindow(style.photoListFullPhotoWin);
				var photoView = Ti.UI.createView(style.photoListFullPhotoView);
				photoWin.add(photoView);
				var photoImage = Ti.UI.createImageView(style.photoListFullPhotoImage);
				photoImage.image = target.articleData.photo;
				photoView.add(photoImage);
				var photoTimeLabel = Ti.UI.createLabel(style.photoListFullPhotoTimeLabel);
				photoTimeLabel.text = util.getFormattedMD(target.articleData.date);
				photoView.add(photoTimeLabel);
				var photoTextLabel = Ti.UI.createLabel(style.photoListFullPhotoTextLabel);
				photoTextLabel.text = target.articleData.text;
				photoView.add(photoTextLabel);
				photoWin.open({
					modal: true,
				    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
				    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
				});

				// フォト拡大画面にタップで戻る
				photoWin.addEventListener('click',function(e){
					Ti.API.debug('[event]photoWin.click:');
					photoWin.close();				
				});

				target.opacity = 1.0;
			});
		}

		return articleRow;
	};

	// 記事の更新
	var updatePhoto = function() {
		Ti.API.debug('[func]updatePhoto:');
		var startDate = new Date(2014, 1-1, 1);
		// 今日の記事データ取得
		model.getCloudTodayArticle({
			idList: [_userData.id],
			date: startDate,
			page: 1,
			count: 16
		}, function(e) {
			Ti.API.debug('[func]getCloudTodayArticle.callback:');
			if (e.success) {
				if (e.articleList.length > 0) {
					// 取得した記事をテーブルに追加
					profileTableView.appendRow(getPhotoListArticleTableRow(e.articleList), {animated:true});
					var bottomRow = Ti.UI.createTableViewRow(style.profileInfoTableRow);
					var bottomImage = Ti.UI.createImageView(style.profileBottomImage);
					bottomRow.add(bottomImage);
//					bottomRow.height = '44dp';
					profileTableView.appendRow(bottomRow, {animated:false});
				}
	
			} else {
				util.errorDialog(e);
			}
		});
	};

	// Viewの取得
	var getProfileRowList = function() {
		Ti.API.debug('[func]getProfileRowList:');
		var rowList = [];
		var profileInfoRow = getProfileInfoRow();
		rowList.push(profileInfoRow);
/*		
		if (loginUser.id == _userData.id) {
			var profileCountRow = getProfileCountRow();
			rowList.push(profileCountRow);
		}
*/
		return rowList;
	};	
	
// ---------------------------------------------------------------------

	var profileWin = Ti.UI.createWindow(style.profileWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileTitleLabel);	
	titleView.add(titleLabel);
	profileWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);

	// プロフィールを編集するボタン
	var editButton = Titanium.UI.createButton(style.profileEditButton);
	// フォローボタン
	var followButton = Titanium.UI.createButton(style.profileFollowButton);
	// 設定ボタン
	var configButton = Titanium.UI.createButton(style.profileConfigButton);
	if (loginUser.id == _userData.id) {
		profileWin.rightNavButton = configButton;
	} else {
		profileWin.leftNavButton = backButton;
	}

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	
	// プロフィールの表示
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
	profileTableView.setData(getProfileRowList());
	profileWin.add(profileTableView);

	// 投稿写真の更新
	updatePhoto();

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

	// フォローボタン
	followButton.addEventListener('click', function(e){
		Ti.API.debug('[event]followButton.click:');
		followButton.enabled = false;

		if (followButton.title == '編集する') {
			var profileEditWin = win.createProfileEditWindow(_userData);
			profileEditWin.prevWin = null;
			win.openTabWindow(profileEditWin, {animated:true});
			followButton.enabled = true;
		
		} else {
			actInd.show();
			tabGroup.add(actInd);
			if (followButton.title == 'フォローする') {
				// 友人の追加
				model.addCloudFriends(_userData.id, function(e) {
					Ti.API.debug('[func]addCloudFriends.callback:');
					if (e.success) {
						model.addLocalFriendsList(loginUser.id, [_userData]);
				 		followButton.title = 'フォロー中';
						actInd.hide();
						followButton.enabled = true;
					} else {
						actInd.hide();
						followButton.enabled = true;
						util.errorDialog(e);
					}
				});
			} else {
				var alertDialog = Titanium.UI.createAlertDialog({
				    title: 'フォローを解除しますか？',
		//		    message: 'フォローを解除しますか？',
					buttonNames: ['キャンセル','OK'],
				    cancel: 1
				});
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
						 		followButton.title = 'フォローする';
								actInd.hide();
								followButton.enabled = true;
							} else {
								actInd.hide();
								followButton.enabled = true;
								util.errorDialog(e);
							}
						});
					} else {
						actInd.hide();
						followButton.enabled = true;
					}
				});
			}
		}
	});

	// プロフィール編集を反映
	profileWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileWin.refresh:');
		// ビューの再作成
//		profileWin.remove(profileTableView);
//		profileTableView = getProfileRowList();
//		profileWin.add(profileTableView);

		if (e.icon) {
			profileWin.iconImage.image = e.icon;
		} else {
			profileTableView.setData(getProfileRowList());
		}

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
