// フォト一覧

exports.createWindow = function(_listType, _userData) {
	Ti.API.debug('[func]winPhotoList.createWindow:');
	Ti.API.debug('_listType:' + _listType);

	// 記事リストの表示件数
	var articleCount = 9;
	// 更新時に読み込んだ記事の最終インデックス（一番古い記事）
	var lastArticleIndex = null;
	// 次回更新時に読み込むべき記事があるかどうかのフラグ
	var nextArticleFlag = false;
	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	var photoListWin = Ti.UI.createWindow(style.photoListWin);

	// ユーザの指定がない場合、全ユーザのフォト一覧用タイトルを表示
	if (_listType == "all") {
		var titleLabel = Ti.UI.createLabel(style.photoListTodayTitleLabel);	
		photoListWin.titleControl = titleLabel;
	} else 	if (_listType == "user") {
		var titleView = Ti.UI.createView(style.photoListTitleView);
		var titleLabel = Ti.UI.createLabel(style.photoListPhotoTitleLabel);	
		titleView.add(titleLabel);		
		photoListWin.titleControl = titleView;
	}

	var photoListTableView = Ti.UI.createTableView(style.photoListTableView);
	photoListWin.add(photoListTableView);

	// ユーザの指定がない場合、全ユーザのフォト一覧をスクロールで更新
	if (_listType == "all") {
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
	}

	// 記事の行の追加
	var getArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getArticleTableRow:');
		var articleTableRow = Ti.UI.createTableViewRow(style.photoListArticleTableRow);
		var articleListView = Ti.UI.createView(style.photoListArticleListView);
		articleTableRow.add(articleListView);
		
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.photoListArticleView);
			var photoImage = Ti.UI.createImageView(style.photoListPhotoImage);
			photoImage.image = 'images/photo/' + _articleList[i].no + '.jpg';
			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			var textLabel = Ti.UI.createLabel(style.photoListTextLabel);
			textLabel.text = '@' + _articleList[i].loc;
					
			articleView.add(photoImage);
			articleView.add(textLabel);
			articleListView.add(articleView);
			
			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]articleView.click:');
				e.source.opacity = 0.5;
				var photoWin = win.createPhotoWindow(e.source.articleData);
				// グローバル変数tabGroupを参照してWindowオープン
				tabGroup.activeTab.open(photoWin,{animated:true});
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
			photoListTableView.appendRow(getArticleTableRow(_articleList));
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
			photoListTableView.appendRow(getArticleTableRow(_articleList), {animated:true});
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
		var articleList = model.getArticleList(_listType, _userData, lastArticleIndex, articleCount + 1);
		if (articleList == null) {
			// 1件も取得できなかった場合
			appendNoDataLabel();		
			// 次回更新用に続きの記事がないフラグを設定
			nextArticleFlag = false;
		} else {
			appendArticle(articleList);
			// 次回更新用に取得した最後のインデックスを設定
			lastArticleIndex = articleList[articleList.length-1].no;
		}
	}
	// 初回読み込み時に、記事を更新
	updateArticle();

	// ユーザの指定がない場合、全ユーザのフォト一覧をスクロールで更新
	if (_listType == "all") {
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
			    	lastArticleIndex = null;
			    	nextArticleFlag = false;
		        	updateArticle();
		        }, 2000);
		    }
		});
	}

	// 右スワイプで前の画面に戻る
	photoListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoListWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(photoListWin);
		}
	});
	
	return photoListWin;
}
