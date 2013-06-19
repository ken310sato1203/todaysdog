// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]profileWinProfile.createWindow:');

	var profileWin = Ti.UI.createWindow(style.profileWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileTitleLabel);	
	titleView.add(titleLabel);
	profileWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	profileWin.leftNavButton = backButton;

	// 「保存」自分のプロフィールを編集するボタン
	var saveButton = Titanium.UI.createButton(style.profileSaveButton);
	profileWin.rightNavButton = saveButton;
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	
	var profileScrollView = Ti.UI.createScrollView(style.profileScrollView);
	var profileTableView = Ti.UI.createTableView(style.profileTableView);
	profileScrollView.add(profileTableView);
	profileWin.add(profileScrollView);

	var profileRowList = [];

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
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		profileWin.close();
	});

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

	// プロフィール編集を反映
	profileWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileWin.refresh:');

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
