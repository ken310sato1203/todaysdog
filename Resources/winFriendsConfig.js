// わんとも設定

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winFriendsConfig.createWindow:');

	var friendsConfigWin = Ti.UI.createWindow(style.friendsConfigWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.friendsConfigTitleView);
	var titleLabel = Ti.UI.createLabel(style.friendsConfigTitleLabel);	
	titleView.add(titleLabel);
	friendsConfigWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	friendsConfigWin.leftNavButton = backButton;

	var friendsConfigTableView = Ti.UI.createTableView(style.friendsConfigTableView);
	friendsConfigWin.add(friendsConfigTableView);

	var friendsConfigRowList = [];

	// わんともを表示
	var friendsRow = Titanium.UI.createTableViewRow(style.friendsConfigListTableRow);
	friendsConfigRowList.push(friendsRow);
	var friendsView = Ti.UI.createView(style.friendsConfigListTitleView);
	friendsRow.add(friendsView);
	var friendsLabel = Ti.UI.createLabel(style.friendsConfigListTitleLabel);
	friendsLabel.text = 'わんとも';
	friendsView.add(friendsLabel);

	// フォロー中を表示
	var followRow = Titanium.UI.createTableViewRow(style.friendsConfigListTableRow);
	friendsConfigRowList.push(followRow);
	followRow.objectName = 'follow';
	var followView = Ti.UI.createView(style.friendsConfigListItemView);
	followRow.add(followView);
	var followLabel = Ti.UI.createLabel(style.friendsConfigListItemLabel);
	followLabel.text = 'フォロー中';
	followView.add(followLabel);

	// フォロワーを表示
	var followerRow = Titanium.UI.createTableViewRow(style.friendsConfigListTableRow);
	friendsConfigRowList.push(followerRow);
	followerRow.objectName = 'follower';
	var followerView = Ti.UI.createView(style.friendsConfigListItemView);
	followerRow.add(followerView);
	var followerLabel = Ti.UI.createLabel(style.friendsConfigListItemLabel);
	followerLabel.text = 'フォロワー';
	followerView.add(followerLabel);

	// 検索を表示
	var friendsRow = Titanium.UI.createTableViewRow(style.friendsConfigListTableRow);
	friendsConfigRowList.push(friendsRow);
	var friendsView = Ti.UI.createView(style.friendsConfigListTitleView);
	friendsRow.add(friendsView);
	var friendsLabel = Ti.UI.createLabel(style.friendsConfigListTitleLabel);
	friendsLabel.text = '検索';
	friendsView.add(friendsLabel);

	// 探すを表示
	var searchRow = Titanium.UI.createTableViewRow(style.friendsConfigListTableRow);
	friendsConfigRowList.push(searchRow);
	searchRow.objectName = 'search';
	var searchView = Ti.UI.createView(style.friendsConfigListItemView);
	searchRow.add(searchView);
	var searchField = Ti.UI.createTextField(style.friendsConfigListValueField);
	searchView.add(searchField);

	
	// フィールドを設定
	friendsConfigTableView.data = friendsConfigRowList;

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		friendsConfigWin.close({animated:true});
	});

	// 右スワイプで前の画面に戻る
	friendsConfigWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]friendsConfigWin.swipe:');
		if (e.direction == 'right') {
			friendsConfigWin.close({animated:true});
		}
	});

	// フィールドをクリック
	friendsConfigTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]friendsConfigTableView.click:');
		if (e.rowData.objectName == "follower" || e.rowData.objectName == "follow"){
			var userListWin = win.createUserListWindow(e.rowData.objectName, _userData);
			userListWin.prevWin = friendsConfigWin;
			win.openTabWindow(userListWin, {animated:true});
		} else if (e.rowData.objectName == "search"){
			searchField.focus();
		}
	});

	// 検索入力の送信ボタンをクリック
	searchField.addEventListener('return',function(e){
		Ti.API.debug('[event]searchField.return:');
		if (searchField.value != '') {
			_userData.searchWord = searchField.value;
			var userListWin = win.createUserListWindow('search', _userData);
			userListWin.prevWin = friendsConfigWin;
			win.openTabWindow(userListWin, {animated:true});
		}
	});
	
	return friendsConfigWin;
};
