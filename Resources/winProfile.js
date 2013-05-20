// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]profileWinProfile.createWindow:');

	var profileWin = Ti.UI.createWindow(style.profileWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileTitleLabel);	
	titleView.add(titleLabel);
	profileWin.titleControl = titleView;

	// 「保存」自分のプロフィールを編集するボタン
	var saveButton = Titanium.UI.createButton(style.profileSaveButton);
	// 「フォロー中」フォローユーザを解除するボタン
	var unfollowButton = Titanium.UI.createButton(style.profileUnfollowButton);
	// 「フォローする」未フォローユーザをフォローするボタン
	var followButton = Titanium.UI.createButton(style.profileFollowButton);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	if (loginId == _userData.user) {
		profileWin.rightNavButton = saveButton;
	} else if (model.checkFollowList(loginId, _userData.user)) {
		profileWin.rightNavButton = unfollowButton;
	} else {
		profileWin.rightNavButton = followButton;
	}
	
	var profileScrollView = Ti.UI.createScrollView(style.profileScrollView);
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
	profileScrollView.add(profileTableView);
	profileWin.add(profileScrollView);

	var profileRowList = [];
	
	var profileCountRow = Titanium.UI.createTableViewRow(style.profileCountTableRow);
	profileRowList.push(profileCountRow);
	var countView = Ti.UI.createView(style.profileCountView);
	profileCountRow.add(countView);

	// アイコンの表示
	var iconView = Ti.UI.createView(style.profileIconView);
	countView.add(iconView);
	var iconImage = Ti.UI.createImageView(style.profileIconImage);
	iconImage.image = 'images/icon/' + _userData.user + '.jpg';
	iconView.add(iconImage);

	// フォト数の表示
	var countPhotoView = Ti.UI.createView(style.profileCountPhotoView);
	countView.add(countPhotoView);
	var countPhotoLabel = Ti.UI.createLabel(style.profileCountPhotoLabel);
	countPhotoLabel.text = _userData.photo;
	var countPhotoUnitLabel = Ti.UI.createLabel(style.profileCountPhotoUnitLabel);
	countPhotoView.add(countPhotoLabel);
	countPhotoView.add(countPhotoUnitLabel);

	// ライク数の表示
	var countLikeView = Ti.UI.createView(style.profileCountLikeView);
	countView.add(countLikeView);
	var countLikeLabel = Ti.UI.createLabel(style.profileCountLikeLabel);
	countLikeLabel.text = _userData.like;
	var countLikeUnitLabel = Ti.UI.createLabel(style.profileCountLikeUnitLabel);
	countLikeView.add(countLikeLabel);
	countLikeView.add(countLikeUnitLabel);

	// フォロワー数の表示
	var countFollowerView = Ti.UI.createView(style.profileCountFollowerView);
	countView.add(countFollowerView);
	var countFollowerLabel = Ti.UI.createLabel(style.profileCountFollowerLabel);
	countFollowerLabel.text = _userData.follower;
	var countFollowerUnitLabel = Ti.UI.createLabel(style.profileCountFollowerUnitLabel);
	countFollowerView.add(countFollowerLabel);
	countFollowerView.add(countFollowerUnitLabel);

	// フォロー数の表示
	var countFollowView = Ti.UI.createView(style.profileCountFollowView);
	countView.add(countFollowView);
	var countFollowLabel = Ti.UI.createLabel(style.profileCountFollowLabel);
	countFollowLabel.text = _userData.follow;
	var countFollowUnitLabel = Ti.UI.createLabel(style.profileCountFollowUnitLabel);
	countFollowView.add(countFollowLabel);
	countFollowView.add(countFollowUnitLabel);

	// ユーザIDのフィールドを表示
	var userRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(userRow);
	userRow.objectName = 'user';
	var userView = Ti.UI.createView(style.profileListItemView);
	userRow.add(userView);
	var userLabel = Ti.UI.createLabel(style.profileListItemLabel);
	userLabel.text = 'ユーザID';
	var userField = Ti.UI.createTextField(style.profileListValueField);
	userField.value = _userData.user;
	userView.add(userLabel);
	userView.add(userField);

	// 名前のフィールドを表示
	var nameRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(nameRow);
	nameRow.objectName = 'name';
	var nameView = Ti.UI.createView(style.profileListItemView);
	nameRow.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.profileListItemLabel);
	nameLabel.text = '名前';
	var nameField = Ti.UI.createTextField(style.profileListValueField);
	nameField.value = _userData.name;
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 犬種のフィールドを表示
	var breedRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(breedRow);
	breedRow.objectName = 'breed';
	var breedView = Ti.UI.createView(style.profileListItemView);
	breedRow.add(breedView);
	var breedLabel = Ti.UI.createLabel(style.profileListItemLabel);
	breedLabel.text = '犬種';
	var breedField = Ti.UI.createTextField(style.profileListValueField);
	breedField.value = _userData.breed;
	breedView.add(breedLabel);
	breedView.add(breedField);

	// 性別のフィールドを表示
	var sexRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(sexRow);
	sexRow.objectName = 'sex';
	var sexView = Ti.UI.createView(style.profileListItemView);
	sexRow.add(sexView);
	var sexLabel = Ti.UI.createLabel(style.profileListItemLabel);
	sexLabel.text = '性別';
	var sexField = Ti.UI.createTextField(style.profileListValueField);
	sexField.value = _userData.sex;
	sexField.enabled = false;
	sexView.add(sexLabel);
	sexView.add(sexField);

	// 誕生日のフィールドを表示
	var birthRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(birthRow);
	birthRow.objectName = 'birth';
	var birthView = Ti.UI.createView(style.profileListItemView);
	birthRow.add(birthView);
	var birthLabel = Ti.UI.createLabel(style.profileListItemLabel);
	birthLabel.text = '誕生日';
	var birthField = Ti.UI.createTextField(style.profileListValueField);
	birthField.value = _userData.birth;
	birthField.enabled = false;
	birthView.add(birthLabel);
	birthView.add(birthField);

	// 居住地のフィールドを表示
	var locationRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(locationRow);
	locationRow.objectName = 'location';
	var locationView = Ti.UI.createView(style.profileListItemView);
	locationRow.add(locationView);
	var locationLabel = Ti.UI.createLabel(style.profileListItemLabel);
	locationLabel.text = '居住地';
	var locationField = Ti.UI.createTextField(style.profileListValueField);
	locationField.value = _userData.location;
	locationView.add(locationLabel);
	locationView.add(locationField);

	// 特徴のフィールドを表示
	var featureRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(featureRow);
	featureRow.objectName = 'feature';
	var featureView = Ti.UI.createView(style.profileListItemView);
	featureRow.add(featureView);
	var featureLabel = Ti.UI.createLabel(style.profileListItemLabel);
	featureLabel.text = '特徴';
	var featureField = Ti.UI.createTextField(style.profileListValueField);
	featureField.value = _userData.feature;
	featureView.add(featureLabel);
	featureView.add(featureField);

	// 性格のフィールドを表示
	var characterRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(characterRow);
	characterRow.objectName = 'character';
	var characterView = Ti.UI.createView(style.profileListItemView);
	characterRow.add(characterView);
	var characterLabel = Ti.UI.createLabel(style.profileListItemLabel);
	characterLabel.text = '性格';
	var characterField = Ti.UI.createTextField(style.profileListValueField);
	characterField.value = _userData.character;
	characterView.add(characterLabel);
	characterView.add(characterField);

	// フィールドを設定
	profileTableView.data = profileRowList;

	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

	// 性別の選択ビューを表示
	var sexPickerView = Titanium.UI.createView(style.profileListPickerView);
	profileWin.add(sexPickerView);

	var sexPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileListPickerToolbar);
	sexPickerView.add(sexPickerToolbar);
	var sexCancel = Titanium.UI.createButton(style.profileListCancelButton);
	var sexSpacer = Titanium.UI.createButton(style.profileListSpacerButton); 
	var sexDone = Titanium.UI.createButton(style.profileListDoneButton); 
	sexPickerToolbar.setItems([sexCancel,sexSpacer,sexDone]);

	var sexPicker = Titanium.UI.createPicker(style.profileListPicker);
	sexPickerView.add(sexPicker);	
	var sexList = model.getSexList();
	for (var i=0; i<sexList.length; i++) {
		sexPicker.add(Titanium.UI.createPickerRow({title:sexList[i].value}));
	}

	sexCancel.addEventListener('click', function(e){
		sexPickerView.animate(slideOut);			
	});
	sexDone.addEventListener('click', function(e){
		sexField.value = sexPicker.getSelectedRow(0).title;
		sexPickerView.animate(slideOut);
	});

	// 誕生日の選択ビューを表示
	var birthPickerView = Titanium.UI.createView(style.profileListPickerView);
	profileWin.add(birthPickerView);
	var birthPicker = Ti.UI.createPicker(style.profileListDatePicker);
	birthPicker.value = new Date();
	birthPickerView.add(birthPicker);

	var birthPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileListPickerToolbar);
	birthPickerView.add(birthPickerToolbar);
	var birthCancel = Titanium.UI.createButton(style.profileListCancelButton);
	var birthSpacer = Titanium.UI.createButton(style.profileListSpacerButton); 
	var birthDone = Titanium.UI.createButton(style.profileListDoneButton); 
	birthPickerToolbar.setItems([birthCancel,birthSpacer,birthDone]);
	var targetBirth = null;

	birthCancel.addEventListener('click', function(e){
		birthPickerView.animate(slideOut);
	});
	birthDone.addEventListener('click', function(e){
		if (targetBirth != null) {
			birthField.value = util.getFormattedDate(targetBirth);
		}
		birthPickerView.animate(slideOut);
	});
	birthPicker.addEventListener('change',function(e){
	    targetBirth = e.value;
	});

// ---------------------------------------------------------------------
	// 「保存」ボタン
	saveButton.addEventListener('click', function(e){
		Ti.API.debug('[event]saveButton.click:');
		actInd.show();
		tabGroup.add(actInd);
		
		_userData.name = nameField.value;
		_userData.breed = breedField.value;
		_userData.sex = sexField.value;
		_userData.birth = birthField.value;
		_userData.location = locationField.value;
		_userData.feature = featureField.value;
		_userData.character = characterField.value;

		// _userDataは、modelのuserListの参照なので上記の値セットで反映される。下記はDBに反映するようの処理。
		model.updateUserList(_userData);

		setTimeout(function(){
			actInd.hide();
		},2000);
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

	// 選択したフィールド名を保管
	var selectedName = null;
	// フィールドをクリックで入力フィールド・選択ビューを表示
	profileTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]profileTableView.click:');

		// 自分のプロフィールは編集できる
		if (loginId == _userData.user) {
			if (e.rowData.objectName != null){
				var targetName = e.rowData.objectName;
				Ti.API.debug('targetName:' + targetName);
				Ti.API.debug('selectedName:' + selectedName);
				if (targetName == "user"){
					userField.focus();
				} else if (targetName == "name"){
					nameField.focus();
				} else if (targetName == "breed"){
					breedField.focus();
				} else if (targetName == "sex"){
					var sexList = model.getSexList();
					var selectedIndex = null;
					for (var i=0; i<sexList.length; i++) {
						if (sexList[i].value == sexField.value){
							selectedIndex = i;
						}
					}
					sexPicker.setSelectedRow(0, selectedIndex);
					sexPickerView.animate(slideIn);
		
				} else if (targetName == "birth"){
					Ti.API.debug('birthField.value:' + birthField.value);
					birthPicker.value = util.getDate(birthField.value);
					birthPickerView.animate(slideIn);
				} else if (targetName == "location"){
					locationField.focus();
				} else if (targetName == "feature"){
					featureField.focus();
				} else if (targetName == "character"){
					characterField.focus();
				}				
		
				if (selectedName != targetName){
					if (selectedName == "user"){
						userField.blur();
					} else if (selectedName == "name"){
						nameField.blur();
					} else if (selectedName == "breed"){
						breedField.blur();
					} else if (selectedName == "sex"){
						sexPickerView.animate(slideOut);
					} else if (selectedName == "birth"){
						birthPickerView.animate(slideOut);
					} else if (selectedName == "location"){
						locationField.blur();
					} else if (selectedName == "feature"){
						featureField.blur();
					} else if (selectedName == "character"){
						characterField.blur();
					}				
				}				
				selectedName = targetName;
			}
		}

	});


	// フォト数をクリックでフォト一覧を表示
	countPhotoView.addEventListener('click', function(e){
		Ti.API.debug('[event]countPhotoView.click:');
		if (_userData.photo > 0) {
			countPhotoView.backgroundColor = '#dedede';
			var type = "user";
			var photoListWin = win.createPhotoListWindow(type, _userData);
			win.openTabWindow(photoListWin);
			countPhotoView.backgroundColor = 'white';
		}
	});

	// ライク数をクリックでフォト一覧を表示
	countLikeView.addEventListener('click', function(e){
		Ti.API.debug('[event]countLikeView.click:');
		if (_userData.like > 0) {
			countLikeView.backgroundColor = '#dedede';
			var type = "like";
			var photoListWin = win.createPhotoListWindow(type, _userData);
			win.openTabWindow(photoListWin);
			countLikeView.backgroundColor = 'white';
		}
	});

	// フォロワ数をクリックでユーザ一覧を表示
	countFollowerView.addEventListener('click', function(e){
		Ti.API.debug('[event]countFollowerView.click:');
		if (_userData.follower > 0) {
			countFollowerView.backgroundColor = '#dedede';
			var type = "follower";
			var userListWin = win.createUserListWindow(type, _userData);
			userListWin.prevWin = profileWin;
			win.openTabWindow(userListWin);
			countFollowerView.backgroundColor = 'white';
		}
	});

	// フォロー数をクリックでユーザ一覧を表示
	countFollowView.addEventListener('click', function(e){
		Ti.API.debug('[event]countFollowView.click:');
		if (_userData.follow > 0) {
			countFollowView.backgroundColor = '#dedede';
			var type = "follow";
			var userListWin = win.createUserListWindow(type, _userData);
			userListWin.prevWin = profileWin;
			win.openTabWindow(userListWin);
			countFollowView.backgroundColor = 'white';
		}
	});

	// プロフィール編集を反映
	profileWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileWin.refresh:');

		countLikeLabel.text = e.userData.like;
		countFollowerLabel.text = e.userData.follower;
		countFollowLabel.text = e.userData.follow;
		nameField.value = e.userData.name;
		breedField.value = e.userData.breed;
		sexField.value = e.userData.sex;
		birthField.value = e.userData.birth;
		locationField.value = e.userData.location;
		featureField.value = e.userData.feature;
		characterField.value = e.userData.character;
	});

	// 右スワイプで前の画面に戻る
	profileWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]profileWin.swipe:');
		if (e.direction == 'right') {
//			tabGroup.activeTab.close(profileWin);
			profileWin.close();
		}
	});

	// オープン時の処理
	profileWin.addEventListener('open',function(e){
		Ti.API.debug('[event]profileWin.open:');
	});

	return profileWin;
}
