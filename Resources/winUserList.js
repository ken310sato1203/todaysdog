// ユーザ一覧

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winUserList.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginUser = model.getLoginUser();

	// 記事データの取得ページ
	var articlePage = 1;
	// 記事データの取得件数
	var articleCount = 1;
	var articleLastId = null;
	// 続きを読むフラグ
	var nextArticleFlag = false;
	var nextTarget = null;

	// ユーザの追加
	var appendUserList = function(_userList) {
		Ti.API.debug('[func]appendUserList:');

		for (var i=0; i<_userList.length; i++) {	

//			if (_userList[i].id != loginUser.id) {	
				var followText = 'フォローする';
				var followTextColor = '#e74c3c';
				var followColor = 'white';
				var followType = 'follow';
				var followVisible = true;

				if (_userList[i].id == loginUser.id) {
						followVisible = false;

				} else {
					if (model.checkLocalFriendsList(loginUser.id, _userList[i].id)) {
						followText = 'フォロー中';
						followTextColor = '#000';
						followColor = '#dedede';
						followType = 'unfollow';
					}
				}
	
				var userItem = [{
					template: 'user',
					userData: _userList[i],
					userListIconImage: {
						image: _userList[i].icon,
					},
					userListNameView: {
						top: (_userList[i].name != '') ? '16dp' : '8dp',
						width: (style.commonSize.screenWidth - (54+95+40)) + 'dp',
					},
					userListNameLabel: {
						text: _userList[i].name,
					},
					userListUserLabel: {
						text: _userList[i].user,
					},
					userListFollowButton: {
						backgroundColor: followColor,
						type: followType,
						visible: followVisible,
					},
					userListFollowButtonLabel: {
						text: followText,
						color: followTextColor,
					},
				}];

				listSection.appendItems(userItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
//			}
		}
	};
	
	// ユーザがない場合の追加
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');

		var nodataText = '';
		if (_type == "search") {
			nodataText = 'この名前で始まるわんともは\n見つかりませんでした';
		} else if (_type == "follower") {
			nodataText = 'フォローされているわんともは\n見つかりませんでした';
		} else if (_type == "follow") {
			nodataText = 'フォローしているわんともは\n見つかりませんでした';
		}
		var noDataItem = [{
			template: 'nodata',
			// ( 全体の高さ - ステータスバー(20) - ヘッダ(44) - フッタ(44) )
			userListNoDataView: {
				top: ( (style.commonSize.screenHeight - 108) / 2 - 70 ) + 'dp',
			},
			userListNoDataLabel: {
				text: nodataText,
			}
		}];

		listSection.appendItems(noDataItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
	};	

	// フォロー処理
	var changeFollow = function(e) {
		Ti.API.debug('[func]changeFollow:');
		var item = e.section.getItemAt(e.itemIndex);
		item.index = e.itemIndex;
		item.userListFollowButton.touchEnabled = false;
		listView.touchEnabled = false;

		if (item.userListFollowButton.type == 'unfollow') {
			var alertDialog = Titanium.UI.createAlertDialog({
			    title: 'フォローを解除しますか？',
	//		    message: 'フォローを解除しますか？',
				buttonNames: ['キャンセル','OK'],
			    cancel: 1,
			});
			alertDialog.addEventListener('click',function(alert){
				// OKの場合
				if(alert.index == 1){
					actInd.show();
					tabGroup.add(actInd);

					// 友人の削除
					model.removeCloudFriends(item.userData.id, function(e) {
						Ti.API.debug('[func]removeCloudFriends.callback:');
						if (e.success) {
							model.removeLocalFriendsList(loginUser.id, item.userData.id);
							item.userListFollowButton.backgroundColor = 'white';
							item.userListFollowButtonLabel.text = 'フォローする';
							item.userListFollowButtonLabel.color = '#e74c3c';
							item.userListFollowButton.type = 'follow';
							item.userListFollowButton.touchEnabled = true;
							listView.touchEnabled = true;
							listSection.updateItemAt(item.index, item);
							actInd.hide();
						} else {
							item.userListFollowButton.touchEnabled = true;
							listView.touchEnabled = true;
							actInd.hide();
							util.errorDialog(e);
						}
					});
				} else {
					listView.touchEnabled = true;
				}
			});
			alertDialog.show();	

		} else {
			actInd.show();
			tabGroup.add(actInd);
			
			// 友人の追加
			model.addCloudFriends(item.userData.id, function(e) {
				Ti.API.debug('[func]addCloudFriends.callback:');
				if (e.success) {
					model.addLocalFriendsList(loginUser.id, [item.userData]);
					item.userListFollowButton.backgroundColor = '#dedede';
					item.userListFollowButtonLabel.text = 'フォロー中';
					item.userListFollowButtonLabel.color = '#000';
					item.userListFollowButton.type = 'unfollow';
					item.userListFollowButton.touchEnabled = true;
					listView.touchEnabled = true;
					listSection.updateItemAt(item.index, item);
					actInd.hide();
				} else {
					item.userListFollowButton.touchEnabled = true;
					listView.touchEnabled = true;
					actInd.hide();
					util.errorDialog(e);
				}
			});
		}
	};	


	// ユーザ一覧の更新
	var updateUserList = function() {
		Ti.API.debug('[func]updateUserList:');

		// 検索のユーザ一覧
		if (_type == "search") {
			if (searchField.value != '') {
				model.searchCloudFriends({
					lastId: articleLastId,
					name: searchField.value,
					count: articleCount
				}, function(e) {
					Ti.API.debug('[func]searchCloudFriends.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUserList(e.userList);
							if (nextTarget != null) {
								// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
								listSection.updateItemAt(nextTarget.index, nextTarget.item);
								nextTarget = null;
							};
	
							if (e.meta.total_results <= articleCount) {
								nextArticleFlag = false;
							} else {
								articlePage++;
								nextArticleFlag = true;
								var nextItem = [{
									template: 'next',
									userListNextLabel: {
										text: '続きを読む',
									},
								}];
								listSection.appendItems(nextItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
								// 最後の記事のIDを保管
								articleLastId = e.users[e.users.length-1].id;

							}
						} else {
							if (articlePage == 1) {
								appendNoDataLabel();
							}
						}
			
					} else {
						util.errorDialog(e);
					}
				});				
			}

		} else {
			// フォロワのユーザ一覧
			if (_type == "follower") {
				model.getCloudFollower({
					userId: _userData.id,
					page: articlePage,
					count: articleCount
				}, function(e) {
					Ti.API.debug('[func]getCloudFollower.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUserList(e.userList);
							if (nextTarget != null) {
								// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
								listSection.updateItemAt(nextTarget.index, nextTarget.item);
								nextTarget = null;
							};
	
							if (e.meta.total_pages == articlePage) {
								nextArticleFlag = false;
							} else if (e.meta.total_pages > articlePage) {
								articlePage++;
								nextArticleFlag = true;
								var nextItem = [{
									template: 'next',
									userListNextLabel: {
										text: '続きを読む',
									},
								}];
								listSection.appendItems(nextItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
							}
						} else {
							if (articlePage == 1) {
								appendNoDataLabel();
							}
						}
			
					} else {
						util.errorDialog(e);
					}
				});

			// フォローのユーザ一覧
			} else if (_type == "follow") {
				model.getCloudFollow({
					userId: _userData.id,
					page: articlePage,
					count: articleCount
				}, function(e) {
					Ti.API.debug('[func]getCloudFollow.callback:');
					if (e.success) {
						if (e.userList.length > 0) {
							appendUserList(e.userList);
							if (nextTarget != null) {
								// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
								listSection.updateItemAt(nextTarget.index, nextTarget.item);
								nextTarget = null;
							};
	
							if (e.meta.total_pages == articlePage) {
								nextArticleFlag = false;
							} else if (e.meta.total_pages > articlePage) {
								articlePage++;
								nextArticleFlag = true;
								var nextItem = [{
									template: 'next',
									userListNextLabel: {
										text: '続きを読む',
									},
								}];
								listSection.appendItems(nextItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
							}
						} else {
							if (articlePage == 1) {
								appendNoDataLabel();
							}
						}
			
					} else {
						util.errorDialog(e);
					}
				});
			}	

		}
	};

/*	
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
*/	
// ---------------------------------------------------------------------
	var userListWin = Ti.UI.createWindow(style.userListWin);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	var titleView = Ti.UI.createView(style.userListTitleView);
	var titleLabel = Ti.UI.createLabel(style.userListTitleLabel);
	titleView.add(titleLabel);
	userListWin.titleControl = titleView;

	// 検索入力欄
	var userListSearchTableView = Ti.UI.createTableView(style.userListSearchTableView);
	var searchRow = Ti.UI.createTableViewRow(style.userListSearchTableRow);
	userListSearchTableView.appendRow(searchRow);	
	var searchView = Ti.UI.createView(style.userListSearchItemView);
	searchRow.add(searchView);
	var searchField = Ti.UI.createTextField(style.userListSearchField);
	searchView.add(searchField);

	// フィールドをクリック
	searchView.addEventListener('click', function(e){
		Ti.API.debug('[event]searchView.click:');
		searchField.focus();
	});

	// フォロワのユーザ一覧
	if (_type == "follower") {
		titleLabel.text = 'フォロワー';

	// フォローのユーザ一覧
	} else 	if (_type == "follow") {
		titleLabel.text = 'フォロー中';

	// 検索のユーザ一覧
	} else 	if (_type == "search") {
		titleLabel.text = 'わんとも検索';
		// 検索入力欄を表示
		userListWin.add(userListSearchTableView);
		if (_userData.searchWord) {
			searchField.value = _userData.searchWord;
		}
	}

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	userListWin.leftNavButton = backButton;

	var userListTemplate = {
		properties: style.userListUserList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'userListUserView',
			properties: style.userListUserView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'userListIconView',
				properties: style.userListIconView,
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'userListIconImage',
					properties: style.userListIconImage
				}]
			},{
				type: 'Ti.UI.View',
				bindId: 'userListNameView',
				properties: style.userListNameView,
				childTemplates: [{
					type: 'Ti.UI.Label',
					bindId: 'userListNameLabel',
					properties: style.userListNameLabel,
				},{
					type: 'Ti.UI.Label',
					bindId: 'userListUserLabel',
					properties: style.userListUserLabel,
				}]
			},{
				type: 'Ti.UI.Button',
				bindId: 'userListFollowButton',
				properties: style.userListFollowButton,
				events: {
					click: function(e) {
						Ti.API.debug('[event]userListFollowButton.click:');
						changeFollow(e);
					},
				},
				childTemplates: [{
					type: 'Ti.UI.Label',
					bindId: 'userListFollowButtonLabel',
					properties: style.userListFollowButtonLabel
				}],
			}]
		},{
			type: 'Ti.UI.View',
			bindId: 'userListSeparateView',
			properties: style.userListSeparateView,
		}]
	};

	var nextListTemplate = {
		properties: style.userListNextList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'userListNextLabel',
			properties: style.userListNextLabel,
		}]
	};
	var noDataListTemplate = {
		properties: style.userListNoDataList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'userListNoDataView',
			properties: style.userListNoDataView,
			childTemplates: [{
				type: 'Ti.UI.Label',
				bindId: 'userListNoDataLabel',
				properties: style.userListNoDataLabel,
			},{
				type: 'Ti.UI.ImageView',
				bindId: 'userListNoDataImage',
				properties: style.userListNoDataImage,
			}]
		}]
	};		
	var listView = Ti.UI.createListView(style.userListTableListView);
	listView.templates = {
		'user': userListTemplate,
		'next': nextListTemplate,
		'nodata': noDataListTemplate
   };
	
	var listSection = Ti.UI.createListSection();
	listView.setSections([listSection]);
	userListWin.add(listView);

	// ビューの更新
	updateUserList();
	
//	listView.pullView = getTableHeader();

// ---------------------------------------------------------------------
/*	
	function resetPullView(){
		listView.pullView.updateIndicator.hide();    
		listView.pullView.updateArrowImage.show();
		listView.pullView.pullLabel.text = 'Pull down to refresh...';
		listView.pullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
		listView.setContentInsets({top:0}, {animated:true});
	}
	
	listView.addEventListener('pull', function(e){
		if (e.active == false) {
			listView.pullView.pullLabel.text = 'Pull down to refresh...';
		} else {
			listView.pullView.pullLabel.text = 'Release to refresh...';
		}
	});
	listView.addEventListener('pullend', function(e){
		listView.pullView.pullLabel.text = 'Updating...';
		listView.pullView.updateArrowImage.hide();
		listView.pullView.updateIndicator.show();
		listView.setContentInsets({top:80}, {animated:true});
		setTimeout(function(){
			articlePage = 1;
			nextArticleFlag = false;
			listSection.setItems([], {animated:false});

			updateUserList();
			resetPullView();
		}, 2000);
	});
*/
	
// ---------------------------------------------------------------------
	// ユーザをクリック
	listView.addEventListener('itemclick', function(e){
		Ti.API.debug('[event]listView.itemclick:');
		listView.touchEnabled = false;
		var item = e.section.getItemAt(e.itemIndex);

		if (item.template == 'user') {
//			if (e.bindId == 'userListUserView') {
				if (item.userData.id != loginUser.id) {
//					item.userListIconView.opacity = 0.5;
					var profileWin = win.createProfileWindow(item.userData);
					win.openTabWindow(profileWin, {animated:true});
//					item.userListIconView.opacity = 1.0;
				}
//			}
			listView.touchEnabled = true;

		} else if (item.template == 'next') {
			// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
			item.userListNextLabel.text = '';
			item.userListNextLabel.height = '0dp';
			nextTarget = {index:e.itemIndex, item:item};
			updateUserList();
			listView.touchEnabled = true;
		} else {
			listView.touchEnabled = true;
		}
	});

	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		userListWin.close({animated:true});
	});	

	// 右スワイプで前の画面に戻る
	userListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]userListWin.swipe:');
		if (e.direction == 'right') {
			userListWin.close({animated:true});
		}
	});

	// クローズ時に前の画面を更新
	userListWin.addEventListener('close',function(e){
		Ti.API.debug('[event]userListWin.close:');
		if (userListWin.prevWin != null) {
			userListWin.prevWin.fireEvent('refresh');
		}
	});	

	// 検索入力の送信ボタンをクリック
	searchField.addEventListener('return',function(e){
		Ti.API.debug('[event]searchField.return:');
		articleLastId = null;
		articlePage = 1;
		nextArticleFlag = false;
		listSection.setItems([], {animated:false});
		updateUserList();
	});

	return userListWin;
};
