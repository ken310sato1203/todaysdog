// フォト一覧

exports.createWindow = function(_type, _userData, _year, _month) {
	Ti.API.debug('[func]winPhotoList.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 記事データの取得ページ
	var articlePage = 1;
	// 記事データの取得件数
	var articleCount = 15;
	// 記事データの取得開始日（n日前）
	var articleDay = 30;
	// 更新時に読み込むフラグ
	var nextArticleFlag = true;

	// リフレッシュ時用格納リスト
	var refreshTarget = [];

// ---------------------------------------------------------------------

	// 記事の取得
	var getPhotoListArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getPhotoListArticleTableRow:');
		var articleRow = Ti.UI.createTableViewRow(style.photoListArticleTableRow);
		var articleListView = Ti.UI.createView(style.photoListArticleListView);
		articleRow.add(articleListView);
		
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.photoListArticleView);
			articleListView.add(articleView);
			var photoImage = Ti.UI.createImageView(style.photoListPhotoImage);
			photoImage.image = _articleList[i].photo;

			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			articleView.add(photoImage);

			// 各記事のタップでフォト画面へ遷移
			articleView.addEventListener('click',function(e){
				Ti.API.debug('[event]articleView.click:');
				var type = "photoList";
				var photoWin = win.createPhotoWindow(type, e.source.articleData);
				photoWin.prevWin = photoListWin;
				win.openTabWindow(photoWin, {animated:true});
			});
		}
		return articleRow;
	};


	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var noDataTableRow = Ti.UI.createTableViewRow(style.photoListNoDataTableRow);
		var noDataView = Ti.UI.createView(style.photoListNoDataView);
		noDataTableRow.add(noDataView);	
		var noDataLabel = Ti.UI.createLabel(style.photoListNoDataLabel);
		noDataView.add(noDataLabel);
		photoListTableView.appendRow(noDataTableRow);
	};


	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		// 今日の記事データ取得
		model.getCloudTodayArticle({
			idList: [_userData.id],
			year: 2013,
			month: 1,
			day: 1,
			page: articlePage,
			count: articleCount
		}, function(e) {
			Ti.API.debug('[func]getCloudTodayArticle.callback:');
			if (e.success) {
				if (e.articleList.length > 0) {
					// 取得した記事をテーブルに追加
					photoListTableView.appendRow(getPhotoListArticleTableRow(e.articleList), {animated:true});
					if (e.meta.total_pages == articlePage) {
						nextArticleFlag = false;
					} else if (e.meta.total_pages > articlePage) {
						articlePage++;
					}
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

	var titleView = Ti.UI.createView(style.photoListTitleView);
	var titleLabel = Ti.UI.createLabel(style.photoListPhotoTitleLabel);	
	titleView.add(titleLabel);
	photoListWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoListWin.leftNavButton = backButton;

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
		    	articlePage = 1;
		    	nextArticleFlag = true;
	        	updateArticle();
	        }, 2000);
	    }
	});

	// スクロールの一番下で発生するイベント
	photoListTableView.addEventListener('scrollEnd',function(){
        Ti.API.debug('[event]photoListTableView.scrollEnd:');
		if (nextArticleFlag) {
			updateArticle();
		}
	});
	
	return photoListWin;
};
