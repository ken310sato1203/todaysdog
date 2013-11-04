// 設定

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winProfileConfig.createWindow:');

	var loginId = model.getLoginId();

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

	// タイトルを表示
	var titleRow = Titanium.UI.createTableViewRow(style.profileConfigListTableRow);
	profileConfigRowList.push(titleRow);
	titleRow.objectName = 'title';
	var titleView = Ti.UI.createView(style.profileConfigListTitleView);
	titleRow.add(titleView);
	var titleLabel = Ti.UI.createLabel(style.profileConfigListTitleLabel);
	titleLabel.text = 'その他';
	titleView.add(titleLabel);

	// フィールドを表示
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
		if (e.rowData.objectName == "logout"){
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
