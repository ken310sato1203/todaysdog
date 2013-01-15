// 今日のわんこ

var photoWin = require('appPhoto');

exports.createWindow = function(style, model, util) {
	Ti.API.debug('[func]appToday.createWindow:');

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

	var win = Ti.UI.createWindow(style.todayWin);
	var titleLabel = Ti.UI.createLabel(style.todayTitleLabel);	
	win.titleControl = titleLabel;
	var todayTableView = Ti.UI.createTableView(style.todayTableView);
	win.add(todayTableView);

	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var tableHeader = Ti.UI.createView(style.tableHeader);
	var headerBorder = Ti.UI.createView(style.todayHeaderBorder);
	tableHeader.add(headerBorder);
	var updateArrowImage = Ti.UI.createImageView(style.todayUpdateArrowImage);
	tableHeader.add(updateArrowImage);
	var pullLabel = Ti.UI.createLabel(style.todayPullLabel);
	tableHeader.add(pullLabel);
	var lastUpdatedLabel = Ti.UI.createLabel(style.todayLastUpdatedLabel);
	lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	tableHeader.add(lastUpdatedLabel);
	var updateIndicator = Ti.UI.createActivityIndicator(style.todayUpdateIndicator);
	tableHeader.add(updateIndicator);
	todayTableView.headerPullView = tableHeader;

	// 記事の行の追加
	var getArticleTableRow = function(_articleList) {
		Ti.API.debug('[func]getArticleTableRow:');
		var articleTableRow = Ti.UI.createTableViewRow(style.todayArticleTableRow);
		var articleListView = Ti.UI.createView(style.todayArticleListView);
		articleTableRow.add(articleListView);
		
		for (var i=0; i<_articleList.length; i++) {	
			var articleView = Ti.UI.createView(style.todayArticleView);
			var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
			photoImage.image = 'images/photo/' + _articleList[i].no + '.jpg';
			// カスタムプロパティに記事データを格納
			photoImage.articleData = _articleList[i];
			var textLabel = Ti.UI.createLabel(style.todayTextLabel);
			textLabel.text = '@' + _articleList[i].loc;
					
			articleView.add(photoImage);
			articleView.add(textLabel);
			articleListView.add(articleView);
			
			// 各記事のタップでフォト画面へ遷移
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]articleView.click:');
				model.setTargetArticleData(e.source.articleData);
				var win = photoWin.createWindow(style, model, util);
				// グローバル変数tabGroupを参照してWindowオープン
				tabGroup.tabs[0].open(win,{animated:true});
			});
		}
		
		return articleTableRow;
	}

	// 「続きを読む」ボタンの追加
	var appendNextButton = function() {
		Ti.API.debug('[func]appendNextButton:');
		var nextTableRow = Ti.UI.createTableViewRow(style.todayNextTableRow);
		todayTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.todayNextView);
		nextTableRow.add(nextView);
	
		// 「続きを読む」ボタンをテーブルに追加	
		var nextButton = Ti.UI.createButton(style.todayNextButton);
		nextView.add(nextButton);
		
		// 「続きを読む」ボタンをタップした場合、続きの記事を追加してからボタンを削除
		nextButton.addEventListener('click', function(e) {
			updateArticle();
		});		
	}

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var nextTableRow = Ti.UI.createTableViewRow(style.todayNextTableRow);
		todayTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.todayNextView);
		nextTableRow.add(nextView);
	
		var noDataLabel = Ti.UI.createLabel(style.todayNoDataLabel);
		nextView.add(noDataLabel);
	}	

	// 記事の追加
	var appendArticle = function(_articleList) {
		Ti.API.debug('[func]appendArticle:');
		// 「続きを読む」ボタンを押した場合、削除するボタンのインデックスを取得
		var deleteRowIndex = null;
		if (nextArticleFlag) {
			deleteRowIndex = todayTableView.data[0].rowCount - 1;
		}

		// 取得した記事が表示件数以下の場合
		if (_articleList.length < articleCount + 1) {
			// 取得した記事をテーブルに追加
			todayTableView.appendRow(getArticleTableRow(_articleList));
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextArticleFlag) {
				todayTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きの記事がないフラグを設定
			nextArticleFlag = false;

		// 取得した記事が表示件数より1件多い場合、「続きを読む」ボタンを表示
		} else {
			// 多く取得した1件のデータを削除
			_articleList.pop();
			// 取得した記事をテーブルに追加
			todayTableView.appendRow(getArticleTableRow(_articleList), {animated:true});
			// 「続きを読む」ボタンを追加
			appendNextButton();
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextArticleFlag) {
				todayTableView.deleteRow(deleteRowIndex);
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
		var articleList = model.getArticleList(null, lastArticleIndex, articleCount + 1);
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

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    updateIndicator.hide();
	    updateArrowImage.transform=Ti.UI.create2DMatrix();
	    updateArrowImage.show();
	    pullLabel.text = 'Pull down to refresh...';
	    todayTableView.setContentInsets({top:0}, {animated:true});
	}
	 
	// スクロールで発生するイベント
	todayTableView.addEventListener('scroll',function(e){
//        Ti.API.debug('[event]scroll:');
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
	todayTableView.addEventListener('dragEnd',function(e){
//        Ti.API.debug('[event]dragEnd:');
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
		    	todayTableView.data = [];
		    	lastArticleIndex = null;
		    	nextArticleFlag = false;
	        	updateArticle();
	        }, 2000);
	    }
	});

	
	return win;
}
