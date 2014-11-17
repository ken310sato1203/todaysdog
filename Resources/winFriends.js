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
	// 記事データの取得開始日（n日前）
	var articleDay = 60;
	// 続きを読むフラグ
	var nextArticleFlag = false;
	var nextTarget = null;

	// 多重更新防止
	var updateEnable = true;

// ---------------------------------------------------------------------

	// 日時の更新
	var getDateView = function(_date) {
		Ti.API.debug('[func]getDateView:');
		var dateView = Ti.UI.createView(style.friendsDateView);
		var dateLabel = Ti.UI.createLabel(style.friendsDateLabel);
		dateLabel.text = _date.year + '/' + _date.month + '/' + _date.day;
		dateView.add(dateLabel);
		
		return dateView;
	};

	// 記事の追加
	var appendArticleList = function(_articleList) {
		Ti.API.debug('[func]appendArticleList:');

		for (var i=0; i<_articleList.length; i++) {	

			// 未読件数取得のため、最新の記事の日付を保存
			if ( i == 0 ) {
				Ti.UI.iPhone.setAppBadge(null);
				Ti.App.Properties.setString(_userData.id + '_' + 'articleId', _articleList[i].id);
				Ti.App.Properties.setString(_userData.id + '_' + 'articleDate', _articleList[i].date);
				Ti.UI.iPhone.appBadge = null;
			}

			var date = util.getDateElement(_articleList[i].date);
			if (checkDate == null || date.year != checkDate.year || date.month != checkDate.month || date.day != checkDate.day) {
				checkDate = {year:date.year, month:date.month, day:date.day};					

				var dateItem = [{
					template: 'date',
					friendsDateLabel: {
						text: date.year + '/' + date.month + '/' + date.day,
					},
				}];
				listSection.appendItems(dateItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});

			}

			var nameValue = '';
			if (_articleList[i].name != '') {
				nameValue = _articleList[i].name + ' ';
			}
			var articleItem = [{
				articleData: _articleList[i],
				template: 'article',
				friendsUserIconView: {
//					backgroundImage: _articleList[i].photo,
				},
				friendsUserIconImage: {
					image: _articleList[i].photo,
				},
				friendsNameLabel: {
					text: nameValue,
				},
				friendsUserLabel: {
					text: _articleList[i].user,
				},
				friendsTextLabel: {
					text: _articleList[i].text,
				},
				friendsTimeLabel: {
					text: date.hour + ":" + date.minute,
				},
				friendsLikeLabel: {
					text: _articleList[i].like,
				},
				friendsCommentLabel: {
					text: _articleList[i].comment,
				},
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
			friendsNoDataLabel: {
				text: '投稿された記事はありませんでした',
			},
		}];

		listSection.appendItems(noDataItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
	};

	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 日時の更新
		now = util.getDateElement(new Date());

		// 友人リストを保管
		var idList = model.getLocalFriendsList(_userData.id);
		var followList = [];

		if (idList) {
			for (var i=0; i<idList.length; i++) {
				followList.push({userId: _userData.id, follow: idList[i]});
			}
			_userData.follow = followList.length;
			// 自分を追加
			idList.push(_userData.id);
			// 今日の記事データ取得
			model.getCloudTodayArticle({
				idList: idList,
				year: now.year,
				month: now.month,
				day: now.day - articleDay,
				page: articlePage,
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

						if (e.meta.total_pages == articlePage) {
							nextArticleFlag = false;
						} else if (e.meta.total_pages > articlePage) {
							articlePage++;
							nextArticleFlag = true;
							var nextItem = [{
								template: 'next',
								friendsNextLabel: {
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
	var friendsWin = Ti.UI.createWindow(style.friendsWin);
	// タイトルの表示
	var titleView = Ti.UI.createLabel(style.friendsTitleLabel);
	friendsWin.titleControl = titleView;

	// 友人を検索するボタン
	var configButton = Titanium.UI.createButton(style.friendsConfigButton);
	friendsWin.rightNavButton = configButton;

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
            },{
                    type: 'Ti.UI.View',
                    bindId: 'friendsSeparateView',
                    properties: style.friendsSeparateView,
            }]
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
			type: 'Ti.UI.Label',
			bindId: 'friendsNoDataLabel',
			properties: style.friendsNoDataLabel,
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
		if (updateEnable) {
			var item = e.section.getItemAt(e.itemIndex);
	
			if (item.template == 'article') {
				updateEnable = false;
				var type = "friends";
				// like、comment数の更新用indexを付加
				item.articleData.index = e.itemIndex;
				var photoWin = win.createPhotoWindow(type, item.articleData);
				photoWin.prevWin = friendsWin;
				win.openTabWindow(photoWin, {animated:true});			
				updateEnable = true;
	
			} else if (item.template == 'next') {
				updateEnable = false;
				// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
				item.friendsNextLabel.text = '';
				item.friendsNextLabel.height = '0dp';
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

	// 設定ボタン
	configButton.addEventListener('click', function(e){
		Ti.API.debug('[event]configButton.click:');
		var friendsConfigWin = win.createFriendsConfigWindow(_userData);
		friendsConfigWin.prevWin = friendsWin;
		win.openTabWindow(friendsConfigWin, {animated:true});
	});

	// ライク・コメント編集を反映
	friendsWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]friendsWin.refresh:');
		if(e.index != null) {
			var item = listSection.getItemAt(e.index);
			item.friendsLikeLabel.text += e.like;
			item.friendsCommentLabel.text += e.comment;
			listSection.updateItemAt(e.index, item);
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
