// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfile.createWindow:');

	var loginId = model.getLoginId();

	// Viewの取得
	var getProfileTableView = function() {
		Ti.API.debug('[func]getProfileTableView:');
		var targetView = Ti.UI.createTableView(style.profileTableView);
		var rowList = [];
	
		// カウント数の表示
		var profileCountRow = Titanium.UI.createTableViewRow(style.profileCountTableRow);
		rowList.push(profileCountRow);
		var countView = Ti.UI.createView(style.profileCountView);
		profileCountRow.add(countView);

		// フォト数の表示
		var countPhotoView = Ti.UI.createView(style.profileCountPhotoView);
		countView.add(countPhotoView);
		var countPhotoLabel = Ti.UI.createLabel(style.profileCountPhotoLabel);
		countPhotoLabel.text = _userData.photo;
		var countPhotoUnitLabel = Ti.UI.createLabel(style.profileCountPhotoUnitLabel);
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
	
		// フォロワー数の表示
		var countFollowerView = Ti.UI.createView(style.profileCountFollowerView);
		countView.add(countFollowerView);
		var countFollowerLabel = Ti.UI.createLabel(style.profileCountFollowerLabel);
		countFollowerLabel.text = _userData.follower;
		var countFollowerUnitLabel = Ti.UI.createLabel(style.profileCountFollowerUnitLabel);
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
		var countFollowView = Ti.UI.createView(style.profileCountFollowView);
		countView.add(countFollowView);
		var countFollowLabel = Ti.UI.createLabel(style.profileCountFollowLabel);
		countFollowLabel.text = _userData.follow;
		var countFollowUnitLabel = Ti.UI.createLabel(style.profileCountFollowUnitLabel);
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
	
		var iconImage = Ti.UI.createImageView(style.profileIconImage);
		iconImage.image = 'images/icon/' + _userData.user + '.png';
		infoView.add(iconImage);
		var infoTextView = Ti.UI.createView(style.profileInfoTextView);
		infoView.add(infoTextView);
	
		var nameLabel = Ti.UI.createLabel(style.profileNameLabel);
		nameLabel.text = _userData.name;
		infoTextView.add(nameLabel);
		var userLabel = Ti.UI.createLabel(style.profileUserLabel);
		userLabel.text = '@' + _userData.user;
		infoTextView.add(userLabel);
	
		var breedLabel = Ti.UI.createLabel(style.profileBreedLabel);
		breedLabel.text = _userData.breed + ' ' + _userData.sex;
		infoTextView.add(breedLabel);
		var birthLabel = Ti.UI.createLabel(style.profileBirthLabel);
		birthLabel.text = _userData.birth;
		infoTextView.add(birthLabel);
		var memoLabel = Ti.UI.createLabel(style.profileMemoLabel);
		memoLabel.text = _userData.memo;
		infoTextView.add(memoLabel);
	
		// カバー写真の表示
		var profilePhotoRow = Titanium.UI.createTableViewRow(style.profilePhotoTableRow);
		rowList.push(profilePhotoRow);
		var photoView = Ti.UI.createView(style.profilePhotoView);
		profilePhotoRow.add(photoView);
	
		var photoImage = Ti.UI.createImageView(style.profilePhotoImage);
		photoImage.image = 'images/photo/A0010.jpg';
		photoView.add(photoImage);

		targetView.setData(rowList);
		return targetView;
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
	profileWin.leftNavButton = backButton;

	// プロフィールを編集するボタン
	var editButton = Titanium.UI.createButton(style.profileEditButton);
	// フォローユーザを解除するボタン
	var unfollowButton = Titanium.UI.createButton(style.profileUnfollowButton);
	// 未フォローユーザをフォローするボタン
	var followButton = Titanium.UI.createButton(style.profileFollowButton);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	if (loginId == _userData.user) {
		profileWin.rightNavButton = editButton;
	} else if (model.checkFollowList(loginId, _userData.user)) {
		profileWin.rightNavButton = unfollowButton;
	} else {
		profileWin.rightNavButton = followButton;
	}
	
	var profileTableView = getProfileTableView();
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

	// 「フォロー中」ボタン
	unfollowButton.addEventListener('click', function(e){
		Ti.API.debug('[event]unfollowButton.click:');
		unfollowButton.enabled = false;
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'フォローを解除しますか？',
//		    message: 'フォローを解除しますか？',
		    buttonNames: ['OK','キャンセル'],
		    cancel: 1
		});
		alertDialog.show();
		unfollowButton.enabled = true;

		alertDialog.addEventListener('click',function(alert){
		    // OKの場合
		    if(alert.index == 0){
				actInd.show();
				tabGroup.add(actInd);
				model.removeFollowList(loginId, _userData.user);
		
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
		model.addFollowList(loginId, _userData.user);

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
		profileWin.remove(profileTableView);
		profileTableView = getProfileTableView();
		profileWin.add(profileTableView);

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
}
