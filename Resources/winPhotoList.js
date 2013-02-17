// フォト一覧

exports.createWindow = function(_listType, _userData) {
	Ti.API.debug('[func]winPhotoList.createWindow:');
	Ti.API.debug('_listType:' + _listType);

	// 記事リストの表示件数
	var articleCount = 9;
	// 前回更新時に読み込んだ記事の最終インデックス
	var prevArticleIndex = null;
	// 次回更新時に読み込むべき記事があるかどうかのフラグ
	var nextArticleFlag = false;
	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	var photoListWin = Ti.UI.createWindow(style.photoListWin);
	var titleView = null;
	var titleLabel = null;

	// 全ユーザのフォト一覧
	if (_listType == "all") {
		titleLabel = Ti.UI.createLabel(style.photoListTodayTitleLabel);	
		photoListWin.titleControl = titleLabel;

	// フォローユーザのフォト一覧
	} else 	if (_listType == "follow") {
		titleLabel = Ti.UI.createLabel(style.photoListFirendsTitleLabel);	
		photoListWin.titleControl = titleLabel;
		articleCount = 8;

	// 指定ユーザのフォト一覧
	} else 	if (_listType == "user") {
		titleView = Ti.UI.createView(style.photoListTitleView);
		titleLabel = Ti.UI.createLabel(style.photoListPhotoTitleLabel);	
		titleView.add(titleLabel);		
		photoListWin.titleControl = titleView;

	// ライクなフォト一覧
	} else 	if (_listType == "like") {
		titleView = Ti.UI.createView(style.photoListTitleView);
		titleLabel = Ti.UI.createLabel(style.photoListLikeTitleLabel);	
		titleView.add(titleLabel);		
		photoListWin.titleControl = titleView;
	}

	var photoListTableView = Ti.UI.createTableView(style.photoListTableView);
	photoListWin.add(photoListTableView);

	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var tableHeader = Ti.UI.createView(style.tableHeader);
	var headerBorder = Ti.UI.createView(style.photoListHeaderBorder);
	tableHeader.add(headerBorder);
	var updateArrowImage = Ti.UI.createImageView(style.photoListUpdateArrowImage);
	tableHeader.add(updateArrowImage);
	var pullLabel = Ti.UI.createLabel(style.photoListPullLabel);
	tableHeader.add(pullLabel);
	var lastUpdatedLabel = Ti.UI.createLabel(style.photoListLastUpdatedLabel);
	lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	tableHeader.add(lastUpdatedLabel);
	var updateIndicator = Ti.UI.createActivityIndicator(style.photoListUpdateIndicator);
	tableHeader.add(updateIndicator);
	photoListTableView.headerPullView = tableHeader;		

	// 記事の取得
	var getArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getArticleTableRow:');
		var articleTableRow = Ti.UI.createTableViewRow(style.photoListArticleTableRow);
		var articleListView = Ti.UI.createView(style.photoListArticleListView);
		articleTableRow.add(articleListView);
		
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.photoListArticleView);
			articleListView.add(articleView);
			var photoImage = Ti.UI.createImageView(style.photoListPhotoImage);
			photoImage.image = 'images/photo/' + _articleList[i].no + '.jpg';
			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			var textLabel = Ti.UI.createLabel(style.photoListTextLabel);
			textLabel.text = '@' + _articleList[i].location;
					
			articleView.add(photoImage);
			articleView.add(textLabel);
			
			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
				e.source.opacity = 0.5;
				var photoWin = win.createPhotoWindow(e.source.articleData);
				win.openWindow(photoListWin, photoWin);
				e.source.opacity = 1.0;
			});
		}		
		return articleTableRow;
	}

	// フォローユーザの記事の取得
	var getFriendsArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getFriendsArticleTableRow:');
		var articleTableRow = Ti.UI.createTableViewRow(style.photoListArticleTableRow);
		var articleListView = Ti.UI.createView(style.photoListFriendsArticleListView);
		articleTableRow.add(articleListView);
		
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.photoListFriendsArticleView);
			articleListView.add(articleView);
			var photoImage = Ti.UI.createImageView(style.photoListFriendsPhotoImage);
			photoImage.image = 'images/photo/' + _articleList[i].no + '.jpg';
			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			articleView.add(photoImage);

			var nameLabel = Ti.UI.createLabel(style.photoListFriendsNameLabel);
			nameLabel.text = _articleList[i].user;
			var textLabel = Ti.UI.createLabel(style.photoListFriendsTextLabel);
			textLabel.text = _articleList[i].text;
			articleView.add(nameLabel);
			articleView.add(textLabel);

			var countView = Ti.UI.createView(style.photoListFriendsCountView);
			articleView.add(countView);

			var likeImage = Ti.UI.createImageView(style.photoListFriendsLikeIconImage);
			var likeLabel = Ti.UI.createLabel(style.photoListFriendsLikeLabel);
			likeLabel.text = _articleList[i].like;
			var commentImage = Ti.UI.createImageView(style.photoListFriendsCommentIconImage);				
			var commentLabel = Ti.UI.createLabel(style.photoListFriendsCommentLabel);
			commentLabel.text = _articleList[i].comment;
			countView.add(likeImage);
			countView.add(likeLabel);
			countView.add(commentImage);
			countView.add(commentLabel);
			
			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
				e.source.opacity = 0.5;
				var photoWin = win.createPhotoWindow(e.source.articleData);
				win.openWindow(photoListWin, photoWin);
				e.source.opacity = 1.0;
			});
		}		
		return articleTableRow;
	}

	// 「続きを読む」ボタンの追加
	var appendNextButton = function() {
		Ti.API.debug('[func]appendNextButton:');
		var nextTableRow = Ti.UI.createTableViewRow(style.photoListNextTableRow);
		photoListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.photoListNextView);
		nextTableRow.add(nextView);
	
		// 「続きを読む」ボタンをテーブルに追加	
		var nextButton = Ti.UI.createButton(style.photoListNextButton);
		nextView.add(nextButton);
		
		// 「続きを読む」ボタンをタップした場合、続きの記事を追加してからボタンを削除
		nextButton.addEventListener('click', function(e) {
			updateArticle();
		});		
	}

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var nextTableRow = Ti.UI.createTableViewRow(style.photoListNextTableRow);
		photoListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.photoListNextView);
		nextTableRow.add(nextView);
	
		var noDataLabel = Ti.UI.createLabel(style.photoListNoDataLabel);
		nextView.add(noDataLabel);
	}	

	// 記事の追加
	var appendArticle = function(_articleList) {
		Ti.API.debug('[func]appendArticle:');
		// 「続きを読む」ボタンを押した場合、削除するボタンのインデックスを取得
		var deleteRowIndex = null;
		if (nextArticleFlag) {
			deleteRowIndex = photoListTableView.data[0].rowCount - 1;
		}

		// 取得した記事が表示件数以下の場合
		if (_articleList.length < articleCount + 1) {
			// 取得した記事をテーブルに追加
			if (_listType == "follow") {
				photoListTableView.appendRow(getFriendsArticleTableRow(_articleList));
			} else {
				photoListTableView.appendRow(getArticleTableRow(_articleList));				
			}
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextArticleFlag) {
				photoListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きの記事がないフラグを設定
			nextArticleFlag = false;

		// 取得した記事が表示件数より1件多い場合、「続きを読む」ボタンを表示
		} else {
			// 多く取得した1件のデータを削除
			_articleList.pop();
			// 取得した記事をテーブルに追加
			if (_listType == "follow") {
				photoListTableView.appendRow(getFriendsArticleTableRow(_articleList), {animated:true});
			} else {
				photoListTableView.appendRow(getArticleTableRow(_articleList), {animated:true});				
			}
			// 「続きを読む」ボタンを追加
			appendNextButton();
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextArticleFlag) {
				photoListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きの記事があるフラグを設定
			nextArticleFlag = true;
		}
	}

	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 前回取得した最後のインデックス以降を取得
		// 「続きを読む」ボタンの表示判定のため、表示件数より1件多い条件で取得
		var articleList = model.getArticleList(_listType, _userData, prevArticleIndex, articleCount + 1);
		if (articleList == null) {
			// 1件も取得できなかった場合
			appendNoDataLabel();		
			// 次回更新用に続きの記事がないフラグを設定
			nextArticleFlag = false;
		} else {
			appendArticle(articleList);
			// 次回更新用に取得した最後のインデックスを設定
			prevArticleIndex = articleList[articleList.length-1].no;
		}
	}
	// 初回読み込み時に、記事を更新
	updateArticle();

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    updateIndicator.hide();
	    updateArrowImage.transform=Ti.UI.create2DMatrix();
	    updateArrowImage.show();
	    pullLabel.text = 'Pull down to refresh...';
	    photoListTableView.setContentInsets({top:0}, {animated:true});
	}
	 
	// スクロールで発生するイベント
	photoListTableView.addEventListener('scroll',function(e){
//        	Ti.API.debug('[event]scroll:');
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        updateArrowImage.animate({transform:unrotate, duration:180});
	        pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        updateArrowImage.animate({transform:rotate, duration:180});
	        pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	photoListTableView.addEventListener('dragEnd',function(e){
//	        Ti.API.debug('[event]dragEnd:');
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        pullLabel.text = 'Updating...';
	        updateArrowImage.hide();
	        updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader();
		    	photoListTableView.data = [];
		    	prevArticleIndex = null;
		    	nextArticleFlag = false;
	        	updateArticle();
	        }, 2000);
	    }
	});

	// 右スワイプで前の画面に戻る
	photoListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoListWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(photoListWin);
		}
	});
	
	return photoListWin;
}
