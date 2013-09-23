// 犬とも一覧

exports.createWindow = function(_type, _userData, _year, _month) {
	Ti.API.debug('[func]winFriends.createWindow:');
	Ti.API.debug('_type:' + _type);

	var year = null;
	var month = null;
	var day = null;
	var hour = null;
	var weekday = null;

	// 記事データの取得ページ
	var articlePage = 1;
	// 記事データの取得件数
	var articleCount = 6;
	// 記事データの取得開始日（n日前）
	var articleDay = 30;
	// 更新時に読み込むフラグ
	var nextArticleFlag = true;

	// リフレッシュ時用格納リスト
	var refreshTarget = [];

// ---------------------------------------------------------------------

	// 日時の更新
	var updateTime = function() {
		Ti.API.debug('[func]updateTime:');
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth() + 1;
		day = now.getDate();
//		day = Math.floor(Math.random() * 2) + 1;
		hour = now.getHours();
		weekday = util.diary.weekday[now.getDay()];
	};

	// 日時の更新
	var getDateView = function(_date) {
		Ti.API.debug('[func]getDateView:');
		var dateView = Ti.UI.createView(style.friendsDateView);
		var dateLabel = Ti.UI.createLabel(style.friendsDateLabel);
		dateLabel.text = _date.year + '/' + _date.month + '/' + _date.day;
		dateView.add(dateLabel);
		
		return dateView;
	};

	// フォローユーザの記事の取得
	var getFriendsArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getFriendsArticleTableRow:');
		var articleRow = Ti.UI.createTableViewRow(style.friendsArticleTableRow);
		var articleListView = Ti.UI.createView(style.friendsArticleListView);
		articleRow.add(articleListView);
		
		var checkDate = null;
		
		for (var i=0; i<_articleList.length; i++) {	

			var date = util.getDateElement(_articleList[i].date);
			if (checkDate == null || date.year != checkDate.year || date.month != checkDate.month || date.day != checkDate.day) {
				articleListView.add(getDateView(date));
				checkDate = {year:date.year, month:date.month, day:date.day};					
			}

			var articleView = Ti.UI.createView(style.friendsArticleView);
			// カスタムプロパティに記事データを格納
			articleView.articleData = _articleList[i];
			articleListView.add(articleView);
			var userIconView = Ti.UI.createView(style.friendsUserIconView);
			articleView.add(userIconView);
			var userIconImage = Ti.UI.createImageView(style.friendsUserIconImage);
			userIconImage.image = _articleList[i].icon;
			userIconView.add(userIconImage);

			var textView = Ti.UI.createView(style.friendsTextView);
			articleView.add(textView);

			var nameView = Ti.UI.createView(style.friendsNameView);
			textView.add(nameView);
			if (_articleList[i].name != '') {
				var nameLabel = Ti.UI.createLabel(style.friendsNameLabel);
				nameLabel.text = _articleList[i].name;
				nameView.add(nameLabel);
			}
			var userLabel = Ti.UI.createLabel(style.friendsUserLabel);
			userLabel.text = '@' + _articleList[i].user;
			nameView.add(userLabel);

			var textLabel = Ti.UI.createLabel(style.friendsTextLabel);
			textLabel.text = _articleList[i].text;
			textView.add(textLabel);
			var timeView = Ti.UI.createView(style.friendsTimeView);
			textView.add(timeView);
			var timeLabel = Ti.UI.createLabel(style.friendsTimeLabel);
			timeLabel.text = date.hour + ":" + date.minute;
			timeView.add(timeLabel);

			var countView = Ti.UI.createView(style.friendsCountView);
			timeView.add(countView);

			var likeImage = Ti.UI.createImageView(style.friendsLikeIconImage);
			var likeLabel = Ti.UI.createLabel(style.friendsLikeLabel);
			likeLabel.text = _articleList[i].like;
			countView.add(likeImage);
			countView.add(likeLabel);

			var commentImage = Ti.UI.createImageView(style.friendsCommentIconImage);				
			var commentLabel = Ti.UI.createLabel(style.friendsCommentLabel);
			commentLabel.text = _articleList[i].comment;
			countView.add(commentImage);
			countView.add(commentLabel);

			// リフレッシュ時に更新する対象を特定するために格納
			refreshTarget.push({id:_articleList[i].id, like:likeLabel, comment:commentLabel});
			
			// 各記事のタップでフォト画面へ遷移
			articleView.addEventListener('click',function(e){
				Ti.API.debug('[event]articleView.click:');
				var type = "friends";
				var photoWin = win.createPhotoWindow(type, e.source.articleData);
				photoWin.prevWin = friendsWin;
				win.openTabWindow(photoWin, {animated:true});
			});
		}
		return articleRow;
	};


	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var noDataTableRow = Ti.UI.createTableViewRow(style.friendsNoDataTableRow);
		var noDataView = Ti.UI.createView(style.friendsNoDataView);
		noDataTableRow.add(noDataView);	
		var noDataLabel = Ti.UI.createLabel(style.friendsNoDataLabel);
		noDataView.add(noDataLabel);
		friendsTableView.appendRow(noDataTableRow);
	};


	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 日時の更新
		updateTime();

		// 今日の友人データ取得
		model.getCloudFriends(_userData.id, function(e) {
			Ti.API.debug('[func]getCloudFriends.callback:');
			if (e.success) {
				// 友人リストを保管
				var idList = [];
				var followList = [];
				for (var i=0; i<e.userList.length; i++) {
					idList.push(e.userList[i].id);
					followList.push({userId: _userData.id, follow: e.userList[i].id});
				}
				model.setFollowList(followList);
				_userData.follow = followList.length;
				// 自分を追加
				idList.push(_userData.id);
				// 今日の記事データ取得
				model.getCloudArticle({
					idList: idList,
					year: year,
					month: month,
					day: day - articleDay,
					page: articlePage,
					count: articleCount
				}, function(e) {
					Ti.API.debug('[func]getCloudArticle.callback:');
					if (e.success) {
						if (e.articleList.length > 0) {
							// 取得した記事をテーブルに追加
							friendsTableView.appendRow(getFriendsArticleTableRow(e.articleList), {animated:true});
							articlePage++;
						} else {
							if (articlePage == 1) {
								appendNoDataLabel();
							}
							nextArticleFlag = false;							
						}
			
					} else {
						util.errorDialog(e);
					}
				});

			} else {
				util.errorDialog(e);
			}
		});
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
	var titleView = null;
	var titleLabel = null;

	// 友人を検索するボタン
	var searchButton = Titanium.UI.createButton(style.friendsSearchButton);
	friendsWin.rightNavButton = searchButton;

	var friendsTableView = Ti.UI.createTableView(style.friendsTableView);
	friendsTableView.headerPullView = getTableHeader();
	friendsWin.add(friendsTableView);

	// ビューの更新
	updateArticle();

// ---------------------------------------------------------------------

	// 「検索」ボタン
	searchButton.addEventListener('click', function(e){
		Ti.API.debug('[event]searchButton.click:');
		var type = "search";
		var userListWin = win.createUserListWindow(type, _userData);
		userListWin.prevWin = friendsWin;
		win.openTabWindow(userListWin, {animated:true});
	});

	// ライク・コメント編集を反映
	friendsWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]friendsWin.refresh:');
		if(e.id) {
			for (var i=0; i<refreshTarget.length; i++) {
				if (refreshTarget[i].id == e.id) {
					refreshTarget[i].like.text = refreshTarget[i].like.text + e.like;
					refreshTarget[i].comment.text = refreshTarget[i].comment.text + e.comment;
					break;
				}
			}
		}
	});

	// 右スワイプで前の画面に戻る
	friendsWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]friendsWin.swipe:');
		if (e.direction == 'right') {
			friendsWin.close({animated:true});
		}
	});

	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(_tableView){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    _tableView.headerPullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    _tableView.headerPullView.updateIndicator.hide();
	    _tableView.headerPullView.updateArrowImage.transform=Ti.UI.create2DMatrix();
	    _tableView.headerPullView.updateArrowImage.show();
	    _tableView.headerPullView.pullLabel.text = 'Pull down to refresh...';
	    _tableView.setContentInsets({top:0}, {animated:true});
	};
	 
	// スクロールで発生するイベント
	friendsTableView.addEventListener('scroll',function(e){
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        e.source.headerPullView.updateArrowImage.animate({transform:unrotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        e.source.headerPullView.updateArrowImage.animate({transform:rotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	friendsTableView.addEventListener('dragEnd',function(e){
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        e.source.headerPullView.pullLabel.text = 'Updating...';
	        e.source.headerPullView.updateArrowImage.hide();
	        e.source.headerPullView.updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader(e.source);
				// ビューの更新
				friendsTableView.data = [];
		    	articlePage = 1;
		    	nextArticleFlag = true;
	        	updateArticle();
	        }, 2000);
	    }
	});

	// スクロールの一番下で発生するイベント
	friendsTableView.addEventListener('scrollEnd',function(){
        Ti.API.debug('[event]friendsTableView.scrollEnd:');
		if (nextArticleFlag) {
			updateArticle();
		}
	});
	
	return friendsWin;
};
