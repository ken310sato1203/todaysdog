// プロフィール

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfileEdit.createWindow:');

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
	var saveButton = Titanium.UI.createButton(style.commonPlusButton);
	profileEditWin.rightNavButton = saveButton;
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	
	var profileEditTableView = Ti.UI.createTableView(style.profileEditTableView);
	profileEditWin.add(profileEditTableView);

	var profileEditRowList = [];


	// アイコンのフィールドを表示
	var iconRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(iconRow);
	iconRow.objectName = 'icon';
	var iconView = Ti.UI.createView(style.profileEditListItemView);
	iconRow.add(iconView);
	var iconLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	iconLabel.text = 'アイコン';
	var iconImage = Ti.UI.createImageView(style.profileEditIconImage);
	iconImage.image = 'images/icon/' + _userData.user + '.jpg';
	var circleImage = Ti.UI.createImageView(style.profileEditIconImage);
	circleImage.image = 'images/icon/circle.png';
	iconView.add(iconLabel);
	iconView.add(iconImage);
	iconView.add(circleImage);

	// カバー写真のフィールドを表示
	var coverRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(coverRow);
	coverRow.objectName = 'cover';
	var coverView = Ti.UI.createView(style.profileEditListItemView);
	coverRow.add(coverView);
	var coverLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	coverLabel.text = 'カバー写真';
	var coverImage = Ti.UI.createImageView(style.profileEditCoverImage);
	coverImage.image = 'images/photo/A0010.jpg';
	coverView.add(coverLabel);
	coverView.add(coverImage);

	// カバー写真をクリック
	coverImage.addEventListener('click', function(e){
		Ti.API.debug('[event]coverImage.click:');

		Titanium.Media.openPhotoGallery({
			success : function(event) {
				var photo = event.media.imageAsThumbnail(100);//100はサムネイル写真のサイズを設定する（１００＊１００)
			},
			error : function(error) {
			},
			cancel : function() {
				// キャンセル時の挙動
			},
			// 選択直後に拡大縮小移動をするか否かのフラグ
			allowEditing : false,
			// 選択可能なメディア種別を配列で指定
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	});


	// 名前のフィールドを表示
	var nameRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(nameRow);
	nameRow.objectName = 'name';
	var nameView = Ti.UI.createView(style.profileEditListItemView);
	nameRow.add(nameView);
	var nameLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	nameLabel.text = '名前';
	var nameField = Ti.UI.createTextField(style.profileEditListValueField);
	nameField.value = _userData.name;
	nameView.add(nameLabel);
	nameView.add(nameField);

	// 犬種のフィールドを表示
	var breedRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(breedRow);
	breedRow.objectName = 'breed';
	var breedView = Ti.UI.createView(style.profileEditListItemView);
	breedRow.add(breedView);
	var breedLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	breedLabel.text = '犬種';
	var breedField = Ti.UI.createTextField(style.profileEditListValueField);
	breedField.value = _userData.breed;
	breedView.add(breedLabel);
	breedView.add(breedField);

	// 性別のフィールドを表示
	var sexRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(sexRow);
	sexRow.objectName = 'sex';
	var sexView = Ti.UI.createView(style.profileEditListItemView);
	sexRow.add(sexView);
	var sexLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	sexLabel.text = '性別';
	var sexField = Ti.UI.createTextField(style.profileEditListValueField);
	sexField.value = _userData.sex;
	sexView.add(sexLabel);
	sexView.add(sexField);

	// 誕生日のフィールドを表示
	var birthRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(birthRow);
	birthRow.objectName = 'birth';
	var birthView = Ti.UI.createView(style.profileEditListItemView);
	birthRow.add(birthView);
	var birthLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	birthLabel.text = '誕生日';
	var birthField = Ti.UI.createTextField(style.profileEditListValueField);
	birthField.value = _userData.birth;
	birthView.add(birthLabel);
	birthView.add(birthField);

	// メモのフィールドを表示
	var memoRow = Titanium.UI.createTableViewRow(style.profileEditListTableRow);
	profileEditRowList.push(memoRow);
	memoRow.objectName = 'memo';
	var memoView = Ti.UI.createView(style.profileEditListItemView);
	memoRow.add(memoView);
	var memoLabel = Ti.UI.createLabel(style.profileEditListItemLabel);
	memoLabel.text = '自己紹介';
	var memoField = Ti.UI.createTextArea(style.profileEditListTextArea);
	memoField.value = _userData.memo;
	memoView.add(memoLabel);
	memoView.add(memoField);

	// フィールドを設定
	profileEditTableView.data = profileEditRowList;

	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

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
		sexField.value = sexPicker.getSelectedRow(0).title;
		sexPickerView.animate(slideOut);
	});

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
		profileEditWin.close({animated:true});
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
		_userData.memo = memoField.value;

		// _userDataは、modelのuserListの参照なので上記の値セットで反映される。下記はDBに反映するようの処理。
		model.updateUserList(_userData);

		setTimeout(function(){
			actInd.hide();
		},2000);
	});

	// 選択したフィールド名を保管
	var selectedName = null;
	// フィールドをクリックで入力フィールド・選択ビューを表示
	profileEditTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]profileEditTableView.click:');

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
				} else if (targetName == "memo"){
					memoField.focus();
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
					} else if (selectedName == "memo"){
						memoField.blur();
					}				
				}				
				selectedName = targetName;
			}
		}

	});

	// プロフィール編集を反映
	profileEditWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]profileEditWin.refresh:');

	});

	// 右スワイプで前の画面に戻る
	profileEditWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]profileEditWin.swipe:');
		if (e.direction == 'right') {
			profileEditWin.close({animated:true});
		}
	});

	// オープン時の処理
	profileEditWin.addEventListener('open',function(e){
		Ti.API.debug('[event]profileEditWin.open:');
	});

	return profileEditWin;
}
