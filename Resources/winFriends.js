// わんとも

exports.createWindow = function(_type, _userData, _year, _month) {
	Ti.API.debug('[func]winFriends.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 今日の日時
	var now = null;
	// 日付の見出しチェック
	var checkDate = null;

	// 記事データの取得ページ
	var articlePage = 1;
	// 記事データの取得件数
	var articleCount = 10;
	var articleLastId = null;
	// 記事データの取得開始日（n日前）
	var articleDay = 60;
	// 続きを読むフラグ
	var nextArticleFlag = false;
	var nextTarget = null;

	// 未読フラグ
	var lastArticleDate = null;
	var unreadFlag = true;

// ---------------------------------------------------------------------

	// 記事の追加
	var appendArticleList = function(_articleList) {
		Ti.API.debug('[func]appendArticleList:');
		// 最新記事である1ページ目を取得する時に最後の既読記事を更新
		if ( articlePage == 1 ) {
			unreadFlag = true;
			lastArticleDate = util.getDate(Ti.App.Properties.getString(_userData.id + '_' + 'lastArticleDate'));
			// アプリ起動時には、最後の既読記事の更新は行わず、タブをクリックした時に行うためにwin.jsで更新、pullで更新する時も
			if (util.getDate(_articleList[0].date) > lastArticleDate) {
				tabGroup.articleUpdateFlag = true;
				tabGroup.lastArticle = _articleList[0];
			}
		}

		for (var i=0; i<_articleList.length; i++) {	
			// 未読マークの表示
			if (unreadFlag) {
				if (util.getDate(_articleList[i].date) <= lastArticleDate) { unreadFlag = false; }
	//			if (unreadFlag) { unreadCount++; }
			}

			var date = util.getDateElement(_articleList[i].date);
			if (checkDate == null || date.year != checkDate.year || date.month != checkDate.month || date.day != checkDate.day) {
				checkDate = {year:date.year, month:date.month, day:date.day};					

				var dateItem = [{
					template: 'date',
					friendsDateLabel: {
//						text: date.year + '/' + date.month + '/' + date.day,
						// 先頭０を外すため１をかける
						text: (date.month * 1) + '月' + (date.day * 1) + '日',
					},
				}];
				listSection.appendItems(dateItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});

			}

			// ローカル画像があれば差し替える			
			if (_articleList[i].userId == _userData.id) {
				var fileName = _userData.id + "_" + _articleList[i].date.substring(0,10);
				if (model.checkLocalImage(util.local.photoPath, fileName)) {
					 _articleList[i].photo = util.local.photoPath + fileName + '.png';
				}
			}
			var nameValue = '';
			if (_articleList[i].name != '') {
				nameValue = _articleList[i].name;
			} else {
				nameValue = _articleList[i].user;
			}
			
			var photoWidth = style.commonSize.screenWidth - 40;
			var photoHeight = photoWidth / 2;
			var photoTop = ( photoWidth - photoHeight) / 2 * -1;
			
			var articleItem = [{
				template: 'article',
				articleData: _articleList[i],
				friendsUnreadView: {
					height: (photoHeight + 52) + 'dp',
					visible: unreadFlag,
				},
				friendsPhotoView: {
					height: photoHeight + 'dp',
				},
				friendsPhotoImage: {
					top: photoTop + 'dp',
					width: photoWidth + 'dp',
					image: _articleList[i].photo,
				},
				friendsUserIconImage: {
					image: _articleList[i].icon,
				},
				friendsNameLabel: {
					text: nameValue,
				},
				friendsTextLabel: {
					text: _articleList[i].text,
				},
				friendsLikeIconImage: {
					visible: (_articleList[i].like > 0) ? true : false,
				},
				friendsLikeLabel: {
					visible: (_articleList[i].like > 0) ? true : false,
					text: (_articleList[i].like < 100) ? _articleList[i].like : 99,
				},
				friendsCommentIconImage: {
					visible: (_articleList[i].comment > 0) ? true : false,
				},
				friendsCommentLabel: {
					visible: (_articleList[i].comment > 0) ? true : false,
					text: (_articleList[i].comment < 100) ? _articleList[i].comment : 99,
				},

/*
				friendsUserIconView: {
//					backgroundImage: _articleList[i].photo,
				},
				friendsUserIconImage: {
					image: _articleList[i].photo,
				},
				friendsNameLabel: {
					text: nameValue,
				},
*/
/*				
				friendsUserLabel: {
					text: _articleList[i].user,
//					text: (_articleList[i].user.indexOf('@') > 0) ? _articleList[i].user.substring(0,_articleList[i].user.indexOf('@')) : _articleList[i].user,
				},
				friendsTextLabel: {
					text: _articleList[i].text,
				},
				friendsTimeLabel: {
					text: date.hour + ":" + date.minute,
				},
*/
			}];
			listSection.appendItems(articleItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});

/*
			// winPhotoで画像がすぐに表示されるよう、winFriendsでロードしておく（画面上には表示しない）
            var preloadImage = Ti.UI.createImageView(style.friendsPreloadImage);
            preloadImage.image = _articleList[i].photo;
            friendsWin.add(preloadImage);
*/
		}
	};

	// 記事がない場合の追加
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');

		var noDataItem = [{
			template: 'nodata',
			// ( 全体の高さ - ステータスバー(20) - ヘッダ(44) - フッタ(44) )
			friendsNoDataView: {
				top: ( (style.commonSize.screenHeight - 108) / 2 - 70 ) + 'dp',
			},
			friendsNoDataLabel: {
				text: 'わんこ写真の投稿は\nありませんでした', 
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
		var followList = [];

		if (idList) {
			listView.touchEnabled = false;
			for (var i=0; i<idList.length; i++) {
				followList.push({userId: _userData.id, follow: idList[i]});
			}
			_userData.follow = followList.length;
			// 自分を追加
			idList.push(_userData.id);
			var startDate = new Date(now.year, now.month-1, now.day - articleDay);
			// 記事データの取得
			model.getCloudTodayArticle({
				lastId: articleLastId,
				idList: idList,
				date: startDate,
				count: articleCount
			}, function(e) {
				Ti.API.debug('[func]getCloudTodayArticle.callback:');

				if (e.success) {
					if (e.articleList.length > 0) {
						// 記事を追加
						appendArticleList(e.articleList);
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
								friendsNextLabel: {
									text: '続きを読む',
								},
							}];
							listSection.appendItems(nextItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
							// 最後の記事のIDを保管
							articleLastId = e.posts[e.posts.length-1].id;

						}
					} else {
						if (articlePage == 1) {
							appendNoDataLabel();
						}
					}
					listView.touchEnabled = true;
		
				} else {
					listView.touchEnabled = true;
					util.errorDialog(e);
				}
			});			

			// コメント数の取得
			var lastCommentDate = Ti.App.Properties.getString(_userData.id + '_' + 'lastCommentDate');
			if (lastCommentDate != null) {

				// 1ヶ月前以降のデータを取得
				var now = util.getDateElement(new Date());
				var limitDate = new Date(now.year, now.month-1 - 1, now.day);
				var startDate = (util.getDate(lastCommentDate) > limitDate) ? lastCommentDate : limitDate;

				model.getCloudAllCommentListCount({
					userId: _userData.id,
					date: startDate
				}, function(e) {
					Ti.API.debug('[func]getCloudAllCommentListCount.callback:');
					if (e.success) {
						if (e.reviews.length > 0) {
							commentCountLabel.text = '×' + e.reviews.length;
						} else {
							commentCountLabel.text = '';							
						}
		
					} else {
						util.errorDialog(e);
					}
				});
			}
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
	var friendsWin = Ti.UI.createWindow(style.friendsWin);
	// タイトルの表示
	var titleView = Ti.UI.createLabel(style.friendsTitleLabel);
	friendsWin.titleControl = titleView;

	// コメントを参照するボタン
	var commentButtonView = Titanium.UI.createView(style.friendsCommentButtonView);
	friendsWin.leftNavButton = commentButtonView;
	var commentButton = Titanium.UI.createButton(style.friendsCommentButton);
	commentButtonView.add(commentButton);
	var commentCountLabel = Ti.UI.createLabel(style.friendsCommentCountLabel);
	commentButtonView.add(commentCountLabel);

	// 友人を検索するボタン
	var searchButton = Titanium.UI.createButton(style.friendsSearchButton);
	friendsWin.rightNavButton = searchButton;

	var dateListTemplate = {
		properties: style.friendsDataList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'friendsDateLabel',
			properties: style.friendsDateLabel
		}]
	};

	var articleListTemplate = {
		properties: style.friendsArticleList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'friendsUnreadView',
			properties: style.friendsUnreadView
		},{
			type: 'Ti.UI.View',
			bindId: 'friendsArticleView',
			properties: style.friendsArticleView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'friendsPhotoView',
				properties: style.friendsPhotoView,
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'friendsPhotoImage',
					properties: style.friendsPhotoImage,
				}]
			},{
				type: 'Ti.UI.View',
				bindId: 'friendsArticleTextView',
				properties: style.friendsArticleTextView,
				childTemplates: [{
					type: 'Ti.UI.View',
					bindId: 'friendsUserIconView',
					properties: style.friendsUserIconView,
					childTemplates: [{
						type: 'Ti.UI.ImageView',
						bindId: 'friendsUserIconImage',
						properties: style.friendsUserIconImage
					}]
				},{
					type: 'Ti.UI.View',
					bindId: 'friendsTextView',
					properties: style.friendsTextView,
					childTemplates: [{
						type: 'Ti.UI.Label',
						bindId: 'friendsNameLabel',
						properties: style.friendsNameLabel,
					},{
						type: 'Ti.UI.Label',
						bindId: 'friendsTextLabel',
						properties: style.friendsTextLabel,
					}]
				},{
					type: 'Ti.UI.View',
					bindId: 'friendsCountView',
					properties: style.friendsCountView,
					childTemplates: [{
						type: 'Ti.UI.ImageView',
						bindId: 'friendsLikeIconImage',
						properties: style.friendsLikeIconImage
					},{
						type: 'Ti.UI.Label',
						bindId: 'friendsLikeLabel',
						properties: style.friendsLikeLabel
					},{
						type: 'Ti.UI.ImageView',
						bindId: 'friendsCommentIconImage',
						properties: style.friendsCommentIconImage
					},{
						type: 'Ti.UI.Label',
						bindId: 'friendsCommentLabel',
						properties: style.friendsCommentLabel
					}]
				}]
			}]
/*
		},{
			type: 'Ti.UI.View',
			bindId: 'friendsSeparateView',
			properties: style.friendsSeparateView,
*/
		}]

/*
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'friendsUnreadView',
			properties: style.friendsUnreadView
		},{
			type: 'Ti.UI.View',
			bindId: 'friendsUserIconView',
			properties: style.friendsUserIconView,
			childTemplates: [{
				type: 'Ti.UI.ImageView',
				bindId: 'friendsUserIconImage',
				properties: style.friendsUserIconImage
			}]
		},{
			type: 'Ti.UI.View',
			bindId: 'friendsNameView',
			properties: style.friendsNameView,
			childTemplates: [{
				type: 'Ti.UI.Label',
				bindId: 'friendsNameLabel',
				properties: style.friendsNameLabel,
			},{
				type: 'Ti.UI.Label',
				bindId: 'friendsUserLabel',
				properties: style.friendsUserLabel
			}]
		},{
			type: 'Ti.UI.Label',
			bindId: 'friendsTextLabel',
			properties: style.friendsTextLabel
		},{
			type: 'Ti.UI.Label',
			bindId: 'friendsTimeLabel',
			properties: style.friendsTimeLabel
		},{
		}]
*/
	};

	var nextListTemplate = {
		properties: style.friendsNextList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'friendsNextLabel',
			properties: style.friendsNextLabel,
		}]
	};
	var noDataListTemplate = {
		properties: style.friendsNoDataList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'friendsNoDataView',
			properties: style.friendsNoDataView,
			childTemplates: [{
				type: 'Ti.UI.Label',
				bindId: 'friendsNoDataLabel',
				properties: style.friendsNoDataLabel,
			},{
				type: 'Ti.UI.ImageView',
				bindId: 'friendsNoDataImage',
				properties: style.friendsNoDataImage,
			}]
		}]
	};	
	var listView = Ti.UI.createListView(style.friendsTableListView);
	listView.templates = {
		'article': articleListTemplate,
		'date': dateListTemplate,
		'next': nextListTemplate,
		'nodata': noDataListTemplate
   };
	
	var listSection = Ti.UI.createListSection();
	listView.setSections([listSection]);
	friendsWin.add(listView);

	// ビューの更新
	updateArticle();
	
	listView.pullView = getTableHeader();
		
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
		listView.touchEnabled = false;
		var item = e.section.getItemAt(e.itemIndex);

		if (item.template == 'article') {
			// like、comment数の更新用indexを付加
			item.articleData.index = e.itemIndex;
			var photoWin = win.createPhotoWindow('friends', item.articleData);
			photoWin.prevWin = friendsWin;
			win.openTabWindow(photoWin, {animated:true});			
			// 未読マークを外す
			item.friendsUnreadView.visible = false;
			listSection.updateItemAt(e.itemIndex, item);
			listView.touchEnabled = true;

		} else if (item.template == 'next') {
			// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
			item.friendsNextLabel.text = '';
			item.friendsNextLabel.height = '0dp';
			nextTarget = {index:e.itemIndex, item:item};
			updateArticle();
			listView.touchEnabled = true;
		} else {
			listView.touchEnabled = true;
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

			// 未読記事の更新
			if (tabGroup.articleUpdateFlag) {
				tabGroup.articleUpdateFlag = false;
				Ti.App.Properties.setString(_userData.id + '_' + 'lastArticleDate', tabGroup.lastArticle.date);
			}
			updateArticle();
			resetPullView();
		}, 2000);
	});

// ---------------------------------------------------------------------

	// コメントボタン
	commentButtonView.addEventListener('click', function(e){
		Ti.API.debug('[event]commentButtonView.click:');
		var friendsCommentWin = win.createFriendsCommentWindow(_userData);
		friendsCommentWin.prevWin = friendsWin;
		win.openTabWindow(friendsCommentWin, {animated:true});
		commentCountLabel.text = '';
	});

	// 設定ボタン
	searchButton.addEventListener('click', function(e){
		Ti.API.debug('[event]searchButton.click:');
		var friendsConfigWin = win.createFriendsConfigWindow(_userData);
		friendsConfigWin.prevWin = friendsWin;
		win.openTabWindow(friendsConfigWin, {animated:true});
	});

	// ライク・コメント編集を反映
	friendsWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]friendsWin.refresh:');
		if (e.index != null) {
			var item = listSection.getItemAt(e.index);
			item.friendsLikeLabel.text += e.like;
			item.friendsCommentLabel.text += e.comment;
			if (item.friendsLikeLabel.text > 0) {
				item.friendsLikeLabel.visible = true;
				item.friendsLikeIconImage.visible = true;
			} else {
				item.friendsLikeLabel.visible = false;
				item.friendsLikeIconImage.visible = false;
			}
			if (item.friendsCommentLabel.text > 0) {
				item.friendsCommentLabel.visible = true;
				item.friendsCommentIconImage.visible = true;
			} else {
				item.friendsCommentLabel.visible = false;
				item.friendsCommentIconImage.visible = false;
			}
			listSection.updateItemAt(e.index, item);

		} else {
			articlePage = 1;
			nextArticleFlag = false;
			listSection.setItems([], {animated:false});

			// 未読記事の更新
			if (tabGroup.articleUpdateFlag) {
				tabGroup.articleUpdateFlag = false;
				Ti.App.Properties.setString(_userData.id + '_' + 'lastArticleDate', tabGroup.lastArticle.date);
			}
			updateArticle();
		}
	});

	// 右スワイプで前の画面に戻る
	friendsWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]friendsWin.swipe:');
		if (e.direction == 'right') {
			friendsWin.close({animated:true});
		}
	});
	// 記事の追加
	friendsWin.addEventListener('insert', function(e){
		Ti.API.debug('[event]friendsWin.insert:');
		listView.fireEvent('pullend');
		
	});

	return friendsWin;
};
