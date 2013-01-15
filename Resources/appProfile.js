// プロフィール

exports.createWindow = function(style, model, util){
	Ti.API.debug('[func]appProfile.createWindow:');

	// ログインユーザの取得
	var userId = model.getLoginId();
	// 記事データの取得
	var articleData = model.getTargetArticleData();
	// ユーザデータの取得
	var userData = model.getTargetUserData();

	var win = Ti.UI.createWindow(style.profileWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileTitleLabel);	
	titleView.add(titleLabel);
	win.titleControl = titleView;
	
	if (userId == userData.user) {
		// 「保存」自分のプロフィールを編集するボタン
		win.rightNavButton = Titanium.UI.createButton(style.profileSaveButton);		
	} else if (model.checkFollowUser(userId, userData.user)) {
		// 「フォロー中」フォローユーザを解除するボタン
		win.rightNavButton = Titanium.UI.createButton(style.profileUnfollowButton);
	} else {
		// 「フォローする」未フォローユーザをフォローするボタン
		win.rightNavButton = Titanium.UI.createButton(style.profileFollowButton);		
	}
	
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
//	win.add(profileTableView);

	var profileScrollView = Ti.UI.createScrollView(style.profileScrollView);
	profileScrollView.add(profileTableView);
	win.add(profileScrollView);

	var profileRowList = [];
	
	// アイコンと各件数の表示
	var profileCountRow = Titanium.UI.createTableViewRow(style.profileCountTableRow);
	profileRowList.push(profileCountRow);
	var countView = Ti.UI.createView(style.profileCountView);
	profileCountRow.add(countView);

	var iconView = Ti.UI.createView(style.profileIconView);
	countView.add(iconView);
	var iconImage = Ti.UI.createImageView(style.profileIconImage);
	iconImage.image = 'images/icon/' + articleData.user + '.jpg';
	iconView.add(iconImage);

	var countPhotoView = Ti.UI.createView(style.profileCountPhotoView);
	countView.add(countPhotoView);
	var countPhotoLabel = Ti.UI.createLabel(style.profileCountPhotoLabel);
	countPhotoLabel.text = userData.photo;
	var countPhotoUnitLabel = Ti.UI.createLabel(style.profileCountPhotoUnitLabel);
	countPhotoView.add(countPhotoLabel);
	countPhotoView.add(countPhotoUnitLabel);

	var countLikeView = Ti.UI.createView(style.profileCountLikeView);
	countView.add(countLikeView);
	var countLikeLabel = Ti.UI.createLabel(style.profileCountLikeLabel);
	countLikeLabel.text = userData.like;
	var countLikeUnitLabel = Ti.UI.createLabel(style.profileCountLikeUnitLabel);
	countLikeView.add(countLikeLabel);
	countLikeView.add(countLikeUnitLabel);

	var countFollowerView = Ti.UI.createView(style.profileCountFollowerView);
	countView.add(countFollowerView);
	var countFollowerLabel = Ti.UI.createLabel(style.profileCountFollowerLabel);
	countFollowerLabel.text = userData.follower;
	var countFollowerUnitLabel = Ti.UI.createLabel(style.profileCountFollowerUnitLabel);
	countFollowerView.add(countFollowerLabel);
	countFollowerView.add(countFollowerUnitLabel);

	var countFollowView = Ti.UI.createView(style.profileCountFollowView);
	countView.add(countFollowView);
	var countFollowLabel = Ti.UI.createLabel(style.profileCountFollowLabel);
	countFollowLabel.text = userData.follow;
	var countFollowUnitLabel = Ti.UI.createLabel(style.profileCountFollowUnitLabel);
	countFollowView.add(countFollowLabel);
	countFollowView.add(countFollowUnitLabel);

	// ユーザIDのフィールドを表示
	var userRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(userRow);
	userRow.className = 'user';
	var userView = Ti.UI.createView(style.profileListItemView);
	userRow.add(userView);
	var userLabel = Ti.UI.createLabel(style.profileListItemLabel);
	userLabel.text = 'ユーザID';
	var userField = Ti.UI.createTextField(style.profileListValueField);
	userField.value = userData.user;
	userView.add(userLabel);
	userView.add(userField);

	// 名前のフィールドを表示
	var nameRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(nameRow);
	nameRow.className = 'name';
	var nameView = Ti.UI.createView(style.profileListItemView);
	nameRow.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.profileListItemLabel);
	nameLabel.text = '名前';
	var nameField = Ti.UI.createTextField(style.profileListValueField);
	nameField.value = userData.name;
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 犬種のフィールドを表示
	var breedRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(breedRow);
	breedRow.className = 'breed';
	var breedView = Ti.UI.createView(style.profileListItemView);
	breedRow.add(breedView);
	var breedLabel = Ti.UI.createLabel(style.profileListItemLabel);
	breedLabel.text = '犬種';
	var breedField = Ti.UI.createTextField(style.profileListValueField);
	breedField.value = userData.breed;
	breedView.add(breedLabel);
	breedView.add(breedField);

	// 性別のフィールドを表示
	var sexRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(sexRow);
	sexRow.className = 'sex';
	var sexView = Ti.UI.createView(style.profileListItemView);
	sexRow.add(sexView);
	var sexLabel = Ti.UI.createLabel(style.profileListItemLabel);
	sexLabel.text = '性別';
	var sexField = Ti.UI.createTextField(style.profileListValueField);
	sexField.value = userData.sex;
	sexField.enabled = false;
	sexView.add(sexLabel);
	sexView.add(sexField);

	// 誕生日のフィールドを表示
	var birthRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(birthRow);
	birthRow.className = 'birth';
	var birthView = Ti.UI.createView(style.profileListItemView);
	birthRow.add(birthView);
	var birthLabel = Ti.UI.createLabel(style.profileListItemLabel);
	birthLabel.text = '誕生日';
	var birthField = Ti.UI.createTextField(style.profileListValueField);
	birthField.value = userData.birth;
	birthField.enabled = false;
	birthView.add(birthLabel);
	birthView.add(birthField);

	// 居住地のフィールドを表示
	var locationRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(locationRow);
	locationRow.className = 'location';
	var locationView = Ti.UI.createView(style.profileListItemView);
	locationRow.add(locationView);
	var locationLabel = Ti.UI.createLabel(style.profileListItemLabel);
	locationLabel.text = '居住地';
	var locationField = Ti.UI.createTextField(style.profileListValueField);
	locationField.value = userData.location;
	locationView.add(locationLabel);
	locationView.add(locationField);

	// 特徴のフィールドを表示
	var featureRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(featureRow);
	featureRow.className = 'feature';
	var featureView = Ti.UI.createView(style.profileListItemView);
	featureRow.add(featureView);
	var featureLabel = Ti.UI.createLabel(style.profileListItemLabel);
	featureLabel.text = '特徴';
	var featureField = Ti.UI.createTextField(style.profileListValueField);
	featureField.value = userData.feature;
	featureView.add(featureLabel);
	featureView.add(featureField);

	// 性格のフィールドを表示
	var characterRow = Titanium.UI.createTableViewRow(style.profileListTableRow);
	profileRowList.push(characterRow);
	characterRow.className = 'character';
	var characterView = Ti.UI.createView(style.profileListItemView);
	characterRow.add(characterView);
	var characterLabel = Ti.UI.createLabel(style.profileListItemLabel);
	characterLabel.text = '性格';
	var characterField = Ti.UI.createTextField(style.profileListValueField);
	characterField.value = userData.character;
	characterView.add(characterLabel);
	characterView.add(characterField);

	// フィールドを設定
	profileTableView.data = profileRowList;

	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

	// 性別の選択ビューを表示
	var sexPickerView = Titanium.UI.createView(style.profileListPickerView);
	win.add(sexPickerView);

	var sexPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileListPickerToolbar);
	sexPickerView.add(sexPickerToolbar);
	var sexCancel =  Titanium.UI.createButton(style.profileListCancelButton);
	var sexSpacer =  Titanium.UI.createButton(style.profileListSpacerButton); 
	var sexDone =  Titanium.UI.createButton(style.profileListDoneButton); 
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
	win.add(birthPickerView);
	var birthPicker = Ti.UI.createPicker(style.profileListDatePicker);
	birthPicker.value = new Date();
	birthPickerView.add(birthPicker);

	var birthPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileListPickerToolbar);
	birthPickerView.add(birthPickerToolbar);
	var birthCancel =  Titanium.UI.createButton(style.profileListCancelButton);
	var birthSpacer =  Titanium.UI.createButton(style.profileListSpacerButton); 
	var birthDone =  Titanium.UI.createButton(style.profileListDoneButton); 
	birthPickerToolbar.setItems([birthCancel,birthSpacer,birthDone]);
	var targetBirth = null;

	birthCancel.addEventListener('click', function(e){
		birthPickerView.animate(slideOut);
	});
	birthDone.addEventListener('click', function(e){
		birthField.value = util.getFormattedDate(targetBirth);
		birthPickerView.animate(slideOut);
	});
	birthPicker.addEventListener('change',function(e){
	    targetBirth = e.value;
	});

	// 選択したフィールド名を保管
	var selectedName = null;
	// フィールドをクリックで入力フィールド・選択ビューを表示
	profileTableView.addEventListener('click', function(e){
		Ti.API.debug('[func]profileTableView.click:');
		// 自分のプロフィールは編集できる
		if (userId == userData.user) {
			var targetName = e.rowData.className;
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

	});

	return win;
}
