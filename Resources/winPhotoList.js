// フォト一覧

exports.createWindow = function(_type, _userData, _year, _month) {
	Ti.API.debug('[func]winPhotoList.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 記事リストの表示件数
	var articleCount = 9;
	// 前回更新時に読み込んだ記事の最終インデックス
	var prevArticleIndex = null;
	// 次回更新時に読み込むべき記事があるかどうかのフラグ
	var nextArticleFlag = false;

	// リフレッシュ時用格納リスト
	var refreshTarget = [];

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

			var photoFile  = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + 'photo/' + _articleList[i].no + '.jpg');
			if (photoFile.exists()) {
				photoImage.image = photoFile.nativePath;
			} else {
				photoImage.image = 'images/photo/' + _articleList[i].no + '.jpg';
			}

			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			articleView.add(photoImage);
/*
			var textLabel = Ti.UI.createLabel(style.photoListTextLabel);
			textLabel.text = '@' + _articleList[i].location;
			articleView.add(textLabel);
*/					
			
			// フォトにタップでフォト拡大画面を表示
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
				var type = "photoList";
				var photoWin = win.createPhotoWindow(type, e.source.articleData);
				photoWin.prevWin = photoListWin;
				win.openTabWindow(photoWin, {animated:true});
			});
		}		
		return articleTableRow;
	};

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

			// リフレッシュ時に更新する対象を特定するために格納
			refreshTarget.push({no:_articleList[i].no, likeLabel:likeLabel, commentLabel:commentLabel});
			
			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
				var type = "photoList";
				var photoWin = win.createPhotoWindow(type, e.source.articleData);
				photoWin.prevWin = photoListWin;
				win.openTabWindow(photoWin, {animated:true});
			});
		}		
		return articleTableRow;
	};

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
	};

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var nextTableRow = Ti.UI.createTableViewRow(style.photoListNextTableRow);
		photoListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.photoListNextView);
		nextTableRow.add(nextView);
	
		var noDataLabel = Ti.UI.createLabel(style.photoListNoDataLabel);
		nextView.add(noDataLabel);
	};

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
			if (_type == "follow") {
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
			if (_type == "follow") {
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
	};

	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 前回取得した最後のインデックス以降を取得
		// 「続きを読む」ボタンの表示判定のため、表示件数より1件多い条件で取得
		var articleList = model.getArticleList(_type, _userData, prevArticleIndex, articleCount + 1);
		if (articleList == null || articleList.length == 0) {
			// 1件も取得できなかった場合
			appendNoDataLabel();		
			// 次回更新用に続きの記事がないフラグを設定
			nextArticleFlag = false;
		} else {
			appendArticle(articleList);
			// 次回更新用に取得した最後のインデックスを設定
			prevArticleIndex = articleList[articleList.length-1].no;
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
	var photoListWin = Ti.UI.createWindow(style.photoListWin);
	var titleView = null;
	var titleLabel = null;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoListWin.leftNavButton = backButton;

	// 更新ボタン
	var updateButton = Titanium.UI.createButton(style.photoListUpdateButton);
	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	if (_type == "all") {
		// 全ユーザのフォト一覧
		titleLabel = Ti.UI.createLabel(style.photoListTodayTitleLabel);	
		photoListWin.titleControl = titleLabel;
//		photoListWin.rightNavButton = updateButton;

	} else 	if (_type == "follow") {
		// フォローユーザのフォト一覧
		titleLabel = Ti.UI.createLabel(style.photoListFirendsTitleLabel);	
		photoListWin.titleControl = titleLabel;
//		photoListWin.rightNavButton = updateButton;
		articleCount = 8;

	} else 	if (_type == "user") {
		// 指定ユーザのフォト一覧
		titleView = Ti.UI.createView(style.photoListTitleView);
		titleLabel = Ti.UI.createLabel(style.photoListPhotoTitleLabel);	
		titleView.add(titleLabel);		
		photoListWin.titleControl = titleView;

	} else 	if (_type == "like") {
		// ライクなフォト一覧
		titleView = Ti.UI.createView(style.photoListTitleView);
		titleLabel = Ti.UI.createLabel(style.photoListLikeTitleLabel);	
		titleView.add(titleLabel);		
		photoListWin.titleControl = titleView;
	}

	var photoListTableView = Ti.UI.createTableView(style.photoListTableView);
	photoListTableView.headerPullView = getTableHeader();
	photoListWin.add(photoListTableView);

	// ビューの更新
	updateArticle();


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		photoListWin.close({animated:true});
	});	

	// 「更新」ボタン
	updateButton.addEventListener('click', function(e){
		Ti.API.debug('[event]updateButton.click:');
		actInd.show();
		tabGroup.add(actInd);

    	resetPullHeader();
		photoListTableView.data = [];
    	prevArticleIndex = null;
    	nextArticleFlag = false;
    	updateArticle();

		setTimeout(function(){
			actInd.hide();
		},2000);
	});

	// ライク・コメント編集を反映
	photoListWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]photoListWin.refresh:');
		for (var i=0; i<refreshTarget.length; i++) {
			if (refreshTarget[i].no == e.articleData.no) {
				refreshTarget[i].likeLabel.text = model.getLikeCount(e.articleData.no);
				refreshTarget[i].commentLabel.text = model.getCommentCount(e.articleData.no);
				break;
			}
		}
	});

	// 右スワイプで前の画面に戻る
	photoListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoListWin.swipe:');
		if (e.direction == 'right') {
			photoListWin.close({animated:true});
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
	photoListTableView.addEventListener('scroll',function(e){
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
	photoListTableView.addEventListener('dragEnd',function(e){
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
				photoListTableView.data = [];
		    	prevArticleIndex = null;
		    	nextArticleFlag = false;
	        	updateArticle();
	        }, 2000);
	    }
	});

	return photoListWin;
}
