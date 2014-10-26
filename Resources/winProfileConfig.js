// 設定

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfileConfig.createWindow:');

	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

	var profileConfigWin = Ti.UI.createWindow(style.profileConfigWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.profileConfigTitleView);
	var titleLabel = Ti.UI.createLabel(style.profileConfigTitleLabel);	
	titleView.add(titleLabel);
	profileConfigWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	profileConfigWin.leftNavButton = backButton;

	var profileConfigTableView = Ti.UI.createTableView(style.profileConfigTableView);
	profileConfigWin.add(profileConfigTableView);

	var profileConfigRowList = [];

	// プロフィールを表示
	var profileRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(profileRow);
	profileRow.objectName = 'profile';
	var profileView = Ti.UI.createView(style.profileConfigListTitleView);
	profileRow.add(profileView);
	var profileLabel = Ti.UI.createLabel(style.profileConfigListTitleLabel);
	profileLabel.text = 'プロフィール';
	profileView.add(profileLabel);

	// 編集フィールドを表示
	var editRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(editRow);
	editRow.objectName = 'edit';
	var editView = Ti.UI.createView(style.profileConfigListItemView);
	editRow.add(editView);
	var editLabel = Ti.UI.createLabel(style.profileConfigListItemLabel);
	editLabel.text = 'プロフィールを編集する';
	editView.add(editLabel);

	// その他を表示
	var etcRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(etcRow);
	etcRow.objectName = 'etc';
	var titleView = Ti.UI.createView(style.profileConfigListTitleView);
	etcRow.add(titleView);
	var titleLabel = Ti.UI.createLabel(style.profileConfigListTitleLabel);
	titleLabel.text = 'その他';
	titleView.add(titleLabel);

	// 通知フィールドを表示
	var noticeRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(noticeRow);
	noticeRow.objectName = 'notice';
	var noticeView = Ti.UI.createView(style.profileConfigListItemView);
	noticeRow.add(noticeView);
	var noticeLabel = Ti.UI.createLabel(style.profileConfigListItemLabel);
	noticeLabel.text = 'お知らせ時間';
	var hourField = Ti.UI.createTextField(style.profileConfigListValueField);
	hourField.value = Ti.App.Properties.getString(_userData.id + '_' + 'notice');
	noticeView.add(noticeLabel);
	noticeView.add(hourField);

	// 時間選択
	var hourPickerView = Titanium.UI.createView(style.profileConfigListPickerView);
	profileConfigWin.add(hourPickerView);

	var hourPicker = Ti.UI.createPicker(style.profileConfigListHourPicker);
	hourPickerView.add(hourPicker);

	var selectHour = [
		{title:'00:00',value:'0'},
		{title:'01:00',value:'1'},
		{title:'02:00',value:'2'},
		{title:'03:00',value:'3'},
		{title:'04:00',value:'4'},
		{title:'05:00',value:'5'},
		{title:'06:00',value:'6'},
		{title:'07:00',value:'7'},
		{title:'08:00',value:'8'},
		{title:'09:00',value:'9'},
		{title:'10:00',value:'10'},
		{title:'11:00',value:'11'},
		{title:'12:00',value:'12'},
		{title:'13:00',value:'13'},
		{title:'14:00',value:'14'},
		{title:'15:00',value:'15'},
		{title:'16:00',value:'16'},
		{title:'17:00',value:'17'},
		{title:'18:00',value:'18'},
		{title:'19:00',value:'19'},
		{title:'20:00',value:'20'},
		{title:'21:00',value:'21'},
		{title:'22:00',value:'22'},
		{title:'23:00',value:'23'}];
	var picherRowList = new Array(selectHour.length);

	for (var i=0; i<picherRowList.length; i++) {
		picherRowList[i] = Ti.UI.createPickerRow(selectHour[i]);
	}
	hourPicker.add(picherRowList);

	var hourPickerToolbar =  Titanium.UI.iOS.createToolbar(style.profileConfigListPickerToolbar);
	hourPickerView.add(hourPickerToolbar);
	var hourCancel = Titanium.UI.createButton(style.profileConfigListCancelButton);
	var hourSpacer = Titanium.UI.createButton(style.profileConfigListSpacerButton); 
	var hourDone = Titanium.UI.createButton(style.profileConfigListDoneButton); 
	hourPickerToolbar.setItems([hourCancel,hourSpacer,hourDone]);
	var selectedIndex = null;

	hourCancel.addEventListener('click', function(e){
		hourPickerView.animate(slideOut);
	});
	hourDone.addEventListener('click', function(e){
		if (selectedIndex != null) {
			hourValue = util.getFormattedHour(selectedIndex);
			hourField.value = hourValue;
			
			// 通知設定の更新
			Ti.App.Properties.setString(_userData.id + '_' + 'notice', hourValue);
			Ti.App.Properties.setString(_userData.id + '_' + 'config', util.getFormattedNowDate());
		}
		hourPickerView.animate(slideOut);
	});
	hourPicker.addEventListener('change',function(e){
	    selectedIndex = e.rowIndex;
	});

	// ログアウトフィールドを表示
	var logoutRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(logoutRow);
	logoutRow.objectName = 'logout';
	var logoutView = Ti.UI.createView(style.profileConfigListItemView);
	logoutRow.add(logoutView);
	var logoutLabel = Ti.UI.createLabel(style.profileConfigListItemLabel);
	logoutLabel.text = 'ログアウト';
	logoutView.add(logoutLabel);

	// フィールドを設定
	profileConfigTableView.data = profileConfigRowList;

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		profileConfigWin.close({animated:true});
	});

	// 右スワイプで前の画面に戻る
	profileConfigWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]profileConfigWin.swipe:');
		if (e.direction == 'right') {
			profileConfigWin.close({animated:true});
		}
	});

	// フィールドをクリック
	profileConfigTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]profileConfigTableView.click:');
		if (e.rowData.objectName == "edit"){
			var profileEditWin = win.createProfileEditWindow(_userData);
			profileEditWin.prevWin = profileConfigWin;
			win.openTabWindow(profileEditWin, {animated:true});
			
		} else if (e.rowData.objectName == "notice"){
			hourPicker.setSelectedRow(0, util.getHour(hourField.value));
			// アニメーションがうまく動かないので時間遅らせて表示
			setTimeout(function() {
				hourPickerView.animate(slideIn);
			}, 100);			

		} else if (e.rowData.objectName == "logout"){
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
					Facebook.logout();
				}
			});
		}
	});

	return profileConfigWin;
};
