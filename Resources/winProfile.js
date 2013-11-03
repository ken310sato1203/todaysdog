// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfile.createWindow:');

	var loginId = model.getLoginId();

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
		countView.add(iconView);
		var iconImage = Ti.UI.createImageView(style.profileIconImage);
		iconImage.image = _userData.icon;
		iconView.add(iconImage);

		// アイコンをクリック
		iconView.addEventListener('click',function(e){
			Ti.API.debug('[event]iconView.click:');
			if (_userData.id == loginId) {
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
							break;
						case 1:
							var cameraWin = win.createCameraWindow('icon_select', _userData);
							cameraWin.prevWin = profileWin;
							win.openTabWindow(cameraWin, {animated:true});
							break;
					}
				});
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
	
		var infoView = Ti.UI.createView(style.profileInfoView);
		profileInfoRow.add(infoView);

		if (_userData.name != '') {
			var nameLabel = Ti.UI.createLabel(style.profileInfoLabel);
			nameLabel.text = _userData.name;
			infoView.add(nameLabel);
		}
		var userLabel = Ti.UI.createLabel(style.profileInfoLabel);
		userLabel.text = '@' + _userData.user;
		infoView.add(userLabel);
	
		var breedLabel = Ti.UI.createLabel(style.profileInfoLabel);
		breedLabel.text = _userData.breed;
		infoView.add(breedLabel);
		var birthLabel = Ti.UI.createLabel(style.profileInfoLabel);
		birthLabel.text = _userData.birth + ' ' + _userData.sex;
		infoView.add(birthLabel);
		var memoLabel = Ti.UI.createLabel(style.profileInfoLabel);
		memoLabel.text = _userData.memo;
		infoView.add(memoLabel);

		var profilePhotoRow = Titanium.UI.createTableViewRow(style.profilePhotoTableRow);
		rowList.push(profilePhotoRow);
		var photoView = Ti.UI.createView(style.profilePhotoView);
		profilePhotoRow.add(photoView);				
		var photoImage = Ti.UI.createImageView(style.profilePhotoImage);
		photoView.add(photoImage);
	
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

	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var getTableHeader = function() {
		Ti.API.debug('[func]getTableHeader:');

		var tableHeader = Ti.UI.createView(style.commonTableHeader);
		var headerBorder = Ti.UI.createView(style.commonHeaderBorder);
		tableHeader.add(headerBorder);
		var updateArrowImage = Ti.UI.createImageView(style.commonUpdateArrowImage);
		tableHeader.add(updateArrowImage);
		var pullLabel = Ti.UI.createLabel(style.commonPullLabel);
		tableHeader.add(pullLabel);
		var lastUpdatedLabel = Ti.UI.createLabel(style.commonLastUpdatedLabel);
		lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
		tableHeader.add(lastUpdatedLabel);
		var updateIndicator = Ti.UI.createActivityIndicator(style.commonUpdateIndicator);
		tableHeader.add(updateIndicator);

		// 参照用
		tableHeader.updateArrowImage = updateArrowImage;
		tableHeader.pullLabel = pullLabel;
		tableHeader.lastUpdatedLabel = lastUpdatedLabel;
		tableHeader.updateIndicator = updateIndicator;
		
		return tableHeader;
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
	var exitButton = Titanium.UI.createButton(style.profileExitButton);
	var b1 = Titanium.UI.createButton({title:'Left Nav'});
	if (loginId == _userData.id) {
		profileWin.rightNavButton = exitButton;
		// tabGroupではleftNavButtonが使えない
//		profileWin.leftNavButton = editButton;
		titleView.add(editButton);
		titleView.add(titleLabel);

	} else {
		profileWin.leftNavButton = backButton;
		titleView.add(titleLabel);
		if (model.checkFollowList(loginId, _userData.id)) {
			profileWin.rightNavButton = unfollowButton;
		} else {
			profileWin.rightNavButton = followButton;
		}
	}

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
	profileTableView.headerPullView = getTableHeader();
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
		win.openTabWindow(profileEditWin, {animated:true});

	});

	// ログアウトボタンをクリック
	exitButton.addEventListener('click', function(e){
		Ti.API.debug('[event]exitButton.click:');
		var alertDialog = Titanium.UI.createAlertDialog({
			title: 'ログアウトしますか？',
			buttonNames: ['キャンセル','OK'],
			cancel: 1
		});
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
			Ti.API.debug('[event]alertDialog.click:');						
			// OKの場合
			if(alert.index == 1){
				Ti.Facebook.logout();
				tabGroup.close();
				customTab.close();
				loginFbButton.show();
			}
		});
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
		alertDialog.show();
		unfollowButton.enabled = true;

		alertDialog.addEventListener('click',function(alert){
		    // OKの場合
		    if(alert.index == 1){
				actInd.show();
				tabGroup.add(actInd);
				model.removeFollowList(loginId, _userData.id);
		
				setTimeout(function(){
					profileWin.rightNavButton = followButton;
					actInd.hide();
					countFollowerLabel.text = _userData.follower;
				},2000);		        
		    }
		});
	});

	// 「フォローする」ボタン
	followButton.addEventListener('click', function(e){
		Ti.API.debug('[event]followButton.click:');
		followButton.enabled = false;
		actInd.show();
		tabGroup.add(actInd);
		model.addFollowList(loginId, _userData.id);

		setTimeout(function(){
			unfollowButton.enabled = true;
			profileWin.rightNavButton = unfollowButton;
			actInd.hide();
			countFollowerLabel.text = _userData.follower;
		},2000);
		followButton.enabled = true;
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

	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(_tableView){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    _tableView.headerPullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    _tableView.headerPullView.updateIndicator.hide();
	    _tableView.headerPullView.updateArrowImage.transform=Ti.UI.create2DMatrix();
	    _tableView.headerPullView.updateArrowImage.show();
	    _tableView.headerPullView.pullLabel.text = 'Pull down to refresh...';
	    _tableView.setContentInsets({top:0}, {animated:true});
	};
	 
	// スクロールで発生するイベント
	profileTableView.addEventListener('scroll',function(e){
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        e.source.headerPullView.updateArrowImage.animate({transform:unrotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        e.source.headerPullView.updateArrowImage.animate({transform:rotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	profileTableView.addEventListener('dragEnd',function(e){
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        e.source.headerPullView.pullLabel.text = 'Updating...';
	        e.source.headerPullView.updateArrowImage.hide();
	        e.source.headerPullView.updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader(e.source);
				// ビューの再作成
//				profileWin.remove(profileTableView);
//				profileTableView = getProfileRowList();
//				profileWin.add(profileTableView);

				profileTableView.setData(getProfileRowList());

	        }, 2000);
	    }
	});

	return profileWin;
};
