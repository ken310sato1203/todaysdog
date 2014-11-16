// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfileEdit.createWindow:');

	var loginUser = model.getLoginUser();

	// 名前フィールドのチェック
	var checkNameField = function() {
		Ti.API.debug('[func]checkNameField:');
		if (nameField.value != _userData.name) {
			nameField.color = '#e74c3c';
		} else {
			nameField.color = '#000';
		}
	};
	// 犬種フィールドのチェック
	var checkBreedField = function() {
		Ti.API.debug('[func]checkBreedField:');
		if (breedField.value != _userData.breed) {
			breedField.color = '#e74c3c';
		} else {
			breedField.color = '#000';
		}
	};
	// 性別フィールドのチェック
	var checkSexField = function() {
		Ti.API.debug('[func]checkSexField:');
		if (sexValue.text != _userData.sex) {
			sexValue.color = '#e74c3c';
		} else {
			sexValue.color = '#000';
		}
	};
	// 誕生日フィールドのチェック
	var checkBirthField = function() {
		Ti.API.debug('[func]checkBirthField:');
		if (birthValue.text != _userData.birth) {
			birthValue.color = '#e74c3c';
		} else {
			birthValue.color = '#000';
		}
	};
	// メモフィールドのチェック
	var checkMemoField = function() {
		Ti.API.debug('[func]checkMemoField:');
		if (memoField.value != _userData.memo) {
			memoField.color = '#e74c3c';
		} else {
			memoField.color = '#000';
		}
	};

// ---------------------------------------------------------------------

	var profileEditWin = Ti.UI.createWindow(style.profileEditWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileEditTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileEditTitleLabel);	
	titleView.add(titleLabel);
	profileEditWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	profileEditWin.leftNavButton = backButton;

	// 「保存」自分のプロフィールを編集するボタン
	var saveButton = Titanium.UI.createButton(style.profileSaveButton);
	profileEditWin.rightNavButton = saveButton;
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});
	
	var profileEditTableView = Ti.UI.createTableView(style.profileEditTableView);
	profileEditWin.add(profileEditTableView);

	var profileEditRowList = [];

	var listView = Ti.UI.createView(style.profileEditListView);
	profileEditWin.add(listView);
	
	// 名前のフィールドを表示
	var nameRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(nameRow);
	nameRow.objectName = 'name';
	var nameView = Ti.UI.createView(style.profileEditListItemView);
//	nameRow.add(nameView);
	nameView.objectName = 'name';
	listView.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	nameLabel.text = '名前';
	var nameField = Ti.UI.createTextField(style.profileEditListValueField);
	nameField.maxLength = 12;
	nameField.value = _userData.name;
	nameField.objectName = 'name';
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 入力チェック
	nameField.addEventListener('return',function(e){
		Ti.API.debug('[event]nameField.return:');
		checkNameField();
	});
	nameField.addEventListener('blur',function(e){
		Ti.API.debug('[event]nameField.blur:');
		checkNameField();
	});

	// 犬種のフィールドを表示
	var breedRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(breedRow);
	breedRow.objectName = 'breed';
	var breedView = Ti.UI.createView(style.profileEditListItemView);
//	breedRow.add(breedView);
	breedView.objectName = 'breed';
	listView.add(breedView);
	var breedLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	breedLabel.text = '犬種';
	var breedField = Ti.UI.createTextField(style.profileEditListValueField);
	breedField.maxLength = 20;
	breedField.value = _userData.breed;
	breedField.objectName = 'breed';
	breedView.add(breedLabel);
	breedView.add(breedField);

	// 入力チェック
	breedField.addEventListener('return',function(e){
		Ti.API.debug('[event]breedField.return:');
		checkBreedField();
	});
	breedField.addEventListener('blur',function(e){
		Ti.API.debug('[event]breedField.blur:');
		checkBreedField();
	});

	// 性別のフィールドを表示
	var sexRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(sexRow);
	sexRow.objectName = 'sex';
	var sexView = Ti.UI.createView(style.profileEditListItemView);
//	sexRow.add(sexView);
	sexView.objectName = 'sex';
	listView.add(sexView);
	var sexLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	sexLabel.text = '性別';
	var sexValue = Ti.UI.createLabel(style.profileEditListValueLabel);
	sexValue.text = _userData.sex;
	sexView.add(sexLabel);
	sexView.add(sexValue);

	// 性別の選択ビューを表示
	var sexPickerView = Titanium.UI.createView(style.profileEditListPickerView);
	profileEditWin.add(sexPickerView);

	var sexPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileEditListPickerToolbar);
	sexPickerView.add(sexPickerToolbar);
	var sexCancel = Titanium.UI.createButton(style.profileEditListCancelButton);
	var sexSpacer = Titanium.UI.createButton(style.profileEditListSpacerButton); 
	var sexDone = Titanium.UI.createButton(style.profileEditListDoneButton); 
	sexPickerToolbar.setItems([sexCancel,sexSpacer,sexDone]);

	var sexPicker = Titanium.UI.createPicker(style.profileEditListPicker);
	sexPickerView.add(sexPicker);	
	var sexList = model.getSexList();
	for (var i=0; i<sexList.length; i++) {
		sexPicker.add(Titanium.UI.createPickerRow({title:sexList[i].value}));
	}

	sexCancel.addEventListener('click', function(e){
		sexPickerView.animate(slideOut);			
	});
	sexDone.addEventListener('click', function(e){
		sexValue.text = sexPicker.getSelectedRow(0).title;
		checkSexField();
		sexPickerView.animate(slideOut);
	});

	// 誕生日のフィールドを表示
	var birthRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(birthRow);
	birthRow.objectName = 'birth';
	var birthView = Ti.UI.createView(style.profileEditListItemView);
//	birthRow.add(birthView);
	birthView.objectName = 'birth';
	listView.add(birthView);
	var birthLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	birthLabel.text = '誕生日';
	var birthValue = Ti.UI.createLabel(style.profileEditListValueLabel);
	birthValue.text = _userData.birth;
	birthView.add(birthLabel);
	birthView.add(birthValue);

	// 誕生日の選択ビューを表示
	var birthPickerView = Titanium.UI.createView(style.profileEditListPickerView);
	profileEditWin.add(birthPickerView);
	var birthPicker = Ti.UI.createPicker(style.profileEditListDatePicker);
	birthPicker.value = new Date();
	birthPickerView.add(birthPicker);

	var birthPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileEditListPickerToolbar);
	birthPickerView.add(birthPickerToolbar);
	var birthCancel = Titanium.UI.createButton(style.profileEditListCancelButton);
	var birthSpacer = Titanium.UI.createButton(style.profileEditListSpacerButton); 
	var birthDone = Titanium.UI.createButton(style.profileEditListDoneButton); 
	birthPickerToolbar.setItems([birthCancel,birthSpacer,birthDone]);
	var targetBirth = null;

	birthCancel.addEventListener('click', function(e){
		birthPickerView.animate(slideOut);
	});
	birthDone.addEventListener('click', function(e){
		if (targetBirth != null) {
			birthValue.text = util.getFormattedDate(targetBirth);
			checkBirthField();
		}
		birthPickerView.animate(slideOut);
	});
	birthPicker.addEventListener('change',function(e){
	    targetBirth = e.value;
	});

	// メモのフィールドを表示
	var memoRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(memoRow);
	memoRow.objectName = 'memo';
	var memoView = Ti.UI.createView(style.profileEditListItemView);
//	memoRow.add(memoView);
	memoView.objectName = 'memo';
	listView.add(memoView);
	var memoLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	memoLabel.text = '自己紹介';
	var memoField = Ti.UI.createTextArea(style.profileEditListTextArea);
	memoField.value = _userData.memo;
	memoView.add(memoLabel);
	memoView.add(memoField);

	// 入力チェック
	memoField.addEventListener('return',function(e){
		Ti.API.debug('[event]memoField.return:');
		checkMemoField();
	});
	memoField.addEventListener('blur',function(e){
		Ti.API.debug('[event]memoField.blur:');
		checkMemoField();
	});

	// フィールドを設定
	profileEditTableView.data = profileEditRowList;

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		
		if (nameField.color != '#000' || 
			breedField.color != '#000' || 
			sexValue.color != '#000' || 
			birthValue.color != '#000' || 
			memoField.color != '#000' ) {
			var alertDialog = Titanium.UI.createAlertDialog({
				title: '変更が保存されていません',
				message: 'このまま取り消しますか？',
				buttonNames: ['いいえ','はい'],
				cancel: 1
			});
			alertDialog.show();
	
			alertDialog.addEventListener('click',function(alert){
				Ti.API.debug('[event]alertDialog.click:');						
				// OKの場合
				if (alert.index == 1) {
					// NavigationWindowを使用しているため、navWinを閉じる。
//					profileEditWin.nav.close({animated:true});
					profileEditWin.close({animated:true});
				}
			});

		} else {
			// NavigationWindowを使用しているため、navWinを閉じる。
//			profileEditWin.nav.close({animated:true});			
			profileEditWin.close({animated:true});
		}
	});

	// 右スワイプで前の画面に戻る
	profileEditWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]profileEditWin.swipe:');
		if (e.direction == 'right') {
			backButton.fireEvent('click');
		}
	});

	// 「保存」ボタン
	saveButton.addEventListener('click', function(e){
		Ti.API.debug('[event]saveButton.click:');
		saveButton.enabled = false;
		actInd.show();
		tabGroup.add(actInd);
		
		_userData.name = nameField.value;
		_userData.breed = breedField.value;
		_userData.sex = sexValue.text;
		_userData.birth = birthValue.text;
		_userData.memo = memoField.value;

		// ユーザデータの更新
		model.updateCloudUser({
			name: _userData.name,
			breed: _userData.breed,
			sex: _userData.sex,
			birth: _userData.birth,
			memo: _userData.memo
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]updateCloudUser.callback:');
				// profileWinの更新
				var profileWin = win.getTab("profileTab").window;
				profileWin.fireEvent('refresh');
				actInd.hide();
				// NavigationWindowを使用しているため、navWinを閉じる。
//				profileEditWin.nav.close({animated:true});
				if (profileEditWin.prevWin != null) {
					profileEditWin.prevWin.close({animated:false});
				}
				profileEditWin.close({animated:true});
				saveButton.enabled = true;

			} else {
				actInd.hide();
				saveButton.enabled = true;
				util.errorDialog(e);
			}
		});
	});

	// 選択したフィールド名を保管
	var selectedName = null;

	// フィールドをクリックで入力フィールド・選択ビューを表示
	listView.addEventListener('click', function(e){
		Ti.API.debug('[event]listView.click:');
		var targetName = e.source.objectName;
		if (targetName != selectedName){

			if (selectedName == "name"){
				nameField.blur();
			} else if (selectedName == "breed"){
				breedField.blur();
			} else if (selectedName == "sex"){
				sexPickerView.animate(slideOut);
			} else if (selectedName == "birth"){
				birthPickerView.animate(slideOut);
			} else if (selectedName == "memo"){
				memoField.blur();
			}

			if (targetName == "name"){
				nameField.focus();
			} else if (targetName == "breed"){
				breedField.focus();
			} else if (targetName == "sex"){
				var sexList = model.getSexList();
				var selectedIndex = null;
				for (var i=0; i<sexList.length; i++) {
					if (sexList[i].value == sexValue.text){
						selectedIndex = i;
					}
				}
				sexPicker.setSelectedRow(0, selectedIndex);
				sexPickerView.animate(slideIn);
	
			} else if (targetName == "birth"){
				Ti.API.debug('birthValue.text:' + birthValue.text);
				birthPicker.value = util.getDate(birthValue.text);
				birthPickerView.animate(slideIn);
			} else if (targetName == "memo"){
				memoField.focus();
			}
			selectedName = targetName;
		}
	});


	// フィールドをクリックで入力フィールド・選択ビューを表示
	profileEditTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]profileEditTableView.click:');
		var targetName = e.rowData.objectName;
		if (targetName != null){
			// 選択していたフィールドを閉じる
			if (selectedName != targetName){
				if (selectedName == "name"){
					nameField.blur();
				} else if (selectedName == "breed"){
					breedField.blur();
				} else if (selectedName == "sex"){
					sexPickerView.animate(slideOut);
				} else if (selectedName == "birth"){
					birthPickerView.animate(slideOut);
				} else if (selectedName == "memo"){
					memoField.blur();
				}
			}
			selectedName = targetName;

			// 選択したフィールドを開ける
			if (targetName == "name"){
//				nameField.focus();
			} else if (targetName == "breed"){
				breedField.focus();
			} else if (targetName == "sex"){
				var sexList = model.getSexList();
				var selectedIndex = null;
				for (var i=0; i<sexList.length; i++) {
					if (sexList[i].value == sexValue.text){
						selectedIndex = i;
					}
				}
				sexPicker.setSelectedRow(0, selectedIndex);
				sexPickerView.animate(slideIn);
	
			} else if (targetName == "birth"){
				Ti.API.debug('birthValue.text:' + birthValue.text);
				birthPicker.value = util.getDate(birthValue.text);
				birthPickerView.animate(slideIn);
			} else if (targetName == "memo"){
				memoField.focus();
			}
		}
	});

	// プロフィール編集を反映
	profileEditWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileEditWin.refresh:');

	});

	return profileEditWin;
};
