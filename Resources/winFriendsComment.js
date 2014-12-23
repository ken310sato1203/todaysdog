// コメント

exports.createWindow = function(_type, _userData, _year, _month) {
	Ti.API.debug('[func]winFriendsComment.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 今日の日時
	var now = null;
	// 日付の見出しチェック
	var checkDate = null;

	// 記事データの取得ページ
	var articlePage = 1;
	// 記事データの取得件数ß
	var articleCount = 10;
	// 記事データの取得開始日（n日前）
	var articleDay = 60;
	// 続きを読むフラグ
	var nextArticleFlag = false;
	var nextTarget = null;

	// 未読フラグ
	var lastArticleId = null;
	var unreadFlag = true;

	// 多重更新防止
	var updateEnable = true;

// ---------------------------------------------------------------------

	// 記事の追加
	var appendArticleList = function(_articleList) {
		Ti.API.debug('[func]appendArticleList:');
		// 最新記事である1ページ目を取得する時に最後の既読記事を更新
		if ( articlePage == 1 ) {
			unreadFlag = true;
			lastArticleId = Ti.App.Properties.getString(_userData.id + '_' + 'lastCommentId');
			// アプリ起動時には、最後の既読記事の更新は行わず、タブをクリックした時に行うためにwin.jsで更新、pullで更新する時も
			if (lastArticleId != _articleList[0].id) {
				tabGroup.lastComment = _articleList[0];
				Ti.App.Properties.setString(_userData.id + '_' + 'lastCommentId', tabGroup.lastComment.id);
			}
		}

		for (var i=0; i<_articleList.length; i++) {	
			// 未読マークの表示
			if ( _articleList[i].id == lastArticleId) { unreadFlag = false; }
//			if (unreadFlag) { unreadCount++; }

			var date = util.getDateElement(_articleList[i].date);
			var nameValue = '';
			if (_articleList[i].name != '') {
				nameValue = _articleList[i].name + ' ';
			}
			var articleItem = [{
				articleData: _articleList[i],
				template: 'article',
				friendsCommentUnreadView: {
					visible: unreadFlag,
				},
				friendsCommentUserIconView: {
//					backgroundImage: _articleList[i].icon,
				},
				friendsCommentUserIconImage: {
					image: _articleList[i].icon,
				},
				friendsCommentNameLabel: {
					text: nameValue,
				},
				friendsCommentUserLabel: {
					text: _articleList[i].user,
				},
				friendsCommentTextLabel: {
					text: _articleList[i].text,
				},
				friendsCommentTimeLabel: {
					text: date.year + '/' + date.month + '/' + date.day + ' ' + date.hour + ":" + date.minute,
				},
			}];
			listSection.appendItems(articleItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});

/*
			// winPhotoで画像がすぐに表示されるよう、winFriendsでロードしておく（画面上には表示しない）
            var preloadImage = Ti.UI.createImageView(style.friendsPreloadImage);
            preloadImage.image = _articleList[i].photo;
            friendsCommentWin.add(preloadImage);
*/
		}
	};

	// 記事がない場合の追加
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');

		var noDataItem = [{
			template: 'nodata',
			friendsCommentNoDataLabel: {
				text: 'コメントはありませんでした',
			},
		}];

		listSection.appendItems(noDataItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
	};

	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 日時の更新
		now = util.getDateElement(new Date());

		// 友人リスト
		var idList = model.getLocalFriendsList(_userData.id);

		if (idList) {

			// コメントの取得
			model.getAllCloudCommentList({
				userId: _userData.id,
				idList: idList,
				year: now.year,
				month: now.month,
				day: now.day - articleDay,
				page: articlePage,
				count: articleCount
			}, function(e) {
				Ti.API.debug('[func]getAllCloudCommentList.callback:');

				if (e.success) {
					if (e.articleList.length > 0) {
						// 記事を追加
						appendArticleList(e.articleList);
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
								friendsCommentNextLabel: {
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
				updateEnable = true;
			});			
		}

	};

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
	
// ---------------------------------------------------------------------
	var friendsCommentWin = Ti.UI.createWindow(style.friendsCommentWin);
	// タイトルの表示
	var titleView = Ti.UI.createLabel(style.friendsCommentTitleLabel);
	friendsCommentWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	friendsCommentWin.leftNavButton = backButton;

	var dateListTemplate = {
		properties: style.friendsCommentDataList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'friendsCommentDateLabel',
			properties: style.friendsCommentDateLabel
		}]
	};

	var articleListTemplate = {
		properties: style.friendsCommentArticleList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'friendsCommentView',
			properties: style.friendsCommentView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'friendsCommentUnreadView',
				properties: style.friendsCommentUnreadView
			},{
				type: 'Ti.UI.View',
				bindId: 'friendsCommentUserIconView',
				properties: style.friendsCommentUserIconView,
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'friendsCommentUserIconImage',
					properties: style.friendsCommentUserIconImage,
				}]
            },{
				type: 'Ti.UI.View',
				bindId: 'friendsCommentTextView',
				properties: style.friendsCommentTextView,
				childTemplates: [{
					type: 'Ti.UI.View',
					bindId: 'friendsCommentNameView',
					properties: style.friendsCommentNameView,
					childTemplates: [{
						type: 'Ti.UI.Label',
						bindId: 'friendsCommentNameLabel',
						properties: style.friendsCommentNameLabel,
					},{
						type: 'Ti.UI.Label',
						bindId: 'friendsCommentUserLabel',
						properties: style.friendsCommentUserLabel
					}]
				},{
					type: 'Ti.UI.Label',
					bindId: 'friendsCommentTextLabel',
					properties: style.friendsCommentTextLabel,
				},{
					type: 'Ti.UI.Label',
					bindId: 'friendsCommentTimeLabel',
					properties: style.friendsCommentTimeLabel,
				}]
			}]
		}]
	};

	var nextListTemplate = {
		properties: style.friendsCommentNextList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'friendsCommentNextLabel',
			properties: style.friendsCommentNextLabel,
		}]
	};
	var noDataListTemplate = {
		properties: style.friendsCommentNoDataList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'friendsCommentNoDataLabel',
			properties: style.friendsCommentNoDataLabel,
		}]
	};	
	var listView = Ti.UI.createListView(style.friendsCommentTableListView);
	listView.templates = {
		'article': articleListTemplate,
		'date': dateListTemplate,
		'next': nextListTemplate,
		'nodata': noDataListTemplate
   };
	
	var listSection = Ti.UI.createListSection();
	listView.setSections([listSection]);
	friendsCommentWin.add(listView);

	// ビューの更新
	updateArticle();
	
	listView.pullView = getTableHeader();


	// 友人リスト
	var idList = model.getLocalFriendsList(_userData.id);

	model.getAllCloudCommentList({
		userId: _userData.id,
		idList: idList
	}, function(e) {
		Ti.API.debug('[func]getAllCloudCommentList.callback:');
		if (e.success) {
			Ti.API.debug('[func]getAllCloudCommentList.success:');

		} else {
			util.errorDialog(e);
		}
	});

		
// ---------------------------------------------------------------------
	
	function resetPullView(){
		listView.pullView.updateIndicator.hide();    
		listView.pullView.updateArrowImage.show();
		listView.pullView.pullLabel.text = 'Pull down to refresh...';
		listView.pullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
		listView.setContentInsets({top:0}, {animated:true});
	}

	listView.addEventListener('itemclick', function(e){
		Ti.API.debug('[event]listView.itemclick:');
		if (updateEnable) {
			var item = e.section.getItemAt(e.itemIndex);
	
			if (item.template == 'article') {
				updateEnable = false;
				var type = "friends";

				// レビュー記事の取得
				model.getCloudArticlePost({
					postId: item.articleData.reviewedId
				}, function(e) {
					Ti.API.debug('[func]getCloudArticlePost.callback:');
					if (e.success) {
						var photoWin = win.createPhotoWindow(type, e.articleList[0]);
						photoWin.prevWin = friendsCommentWin;
						win.openTabWindow(photoWin, {animated:true});			
						updateEnable = true;
						// 未読マークを外す
						item.friendsCommentUnreadView.visible = false;
						listSection.updateItemAt(e.itemIndex, item);

					} else {
						util.errorDialog(e);
					}
				});
	
			} else if (item.template == 'next') {
				updateEnable = false;
				// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
				item.friendsCommentNextLabel.text = '';
				item.friendsCommentNextLabel.height = '0dp';
				nextTarget = {index:e.itemIndex, item:item};
				updateArticle();
			}
		}
	});
	
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
			updateArticle();
			resetPullView();
		}, 2000);
	});

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		friendsCommentWin.close({animated:true});
	});

	// 右スワイプで前の画面に戻る
	friendsCommentWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]friendsCommentWin.swipe:');
		if (e.direction == 'right') {
			friendsCommentWin.close({animated:true});
		}
	});

	return friendsCommentWin;
};
