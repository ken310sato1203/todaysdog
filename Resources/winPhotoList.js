// フォト一覧

exports.createWindow = function(_userData) {
	Ti.API.debug('[func]winPhotoList.createWindow:');
	Ti.API.debug('_userData.user:' + _userData.user);

	// 記事リストの表示件数
	var articleCount = 9;
	// 更新時に読み込んだ記事の最終インデックス（一番古い記事）
	var lastArticleIndex = null;
	// 次回更新時に読み込むべき記事があるかどうかのフラグ
	var nextArticleFlag = false;

	var win = Ti.UI.createWindow(style.photoListWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoListTitleView);
	var titleLabel = Ti.UI.createLabel(style.photoListTitleLabel);	
	titleView.add(titleLabel);
	win.titleControl = titleView;

	var photoListTableView = Ti.UI.createTableView(style.photoListTableView);
	win.add(photoListTableView);

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
				model.setTargetArticleData(e.source.articleData);
				var photoWin = window.createPhotoWindow();
				// グローバル変数tabGroupを参照してWindowオープン
				tabGroup.activeTab.open(photoWin,{animated:true});
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
		var articleList = model.getArticleList(_userData.user, lastArticleIndex, articleCount + 1);
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

	return win;
}
