// スタンプ投稿

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStampPost.createWindow:');

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	var postWin = Ti.UI.createWindow(style.stampPostWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampPostTitleLabel);	
	postWin.titleControl = titleLabel;

	// 投稿ボタンの表示
	var postButton = Titanium.UI.createButton(style.stampPostButton);
	postWin.rightNavButton = postButton;
	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');

		var alertDialog = Titanium.UI.createAlertDialog({
			title: '投稿しますか？',
			buttonNames: ['OK','キャンセル'],
			cancel: 1
		});
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
			// OKの場合
			if(alert.index == 0){
				actInd.show();
				tabGroup.add(actInd);
				// 処理を書く
				
				setTimeout(function(){
					actInd.hide();
					postWin.close();
				},2000);
			}
		});
	});

	var postView = Titanium.UI.createView(style.stampPostView);
	postWin.add(postView);

	var postImage = Titanium.UI.createImageView(style.stampPostImage);
	postImage.image = 'images/icon/diary_' + _stampData.stamp + '.png';
	postView.add(postImage);

	var postTextArea = Ti.UI.createTextArea(style.stampPostTextArea);
	postView.add(postTextArea);

	postTextArea.addEventListener('focus',function(e){
		if (e.source.value == e.source.hintText) {
			e.source.value = "";
			e.source.color = "black";
		}
	});
	postTextArea.addEventListener('blur',function(e){
		if (e.source.value == "") {
			e.source.value = e.source.hintText;
			e.source.color = "gray";
		}
	});


	var historyList = model.getStampHistoryList(_stampData.stamp);
	var historyRowList = [];
	if (historyList != null) {
		for (var i=0; i<historyList.length; i++) {
			var historyRow = Titanium.UI.createTableViewRow(style.stampHistoryTableRow);
			historyRowList.push(historyRow);
//			var historyView = Titanium.UI.createView(style.stampHistoryView);
//			historyRow.add(historyView);
			var historyLabel = Ti.UI.createLabel(style.stampHistoryLabel);
			historyLabel.text = historyList[i];
			historyRow.add(historyLabel);
		}
	}

	var historyTableView = Ti.UI.createTableView(style.stampHistoryTableView);
	historyTableView.data = historyRowList;
	postWin.add(historyTableView);

	// 履歴クリックでチェックし入力テキストにコピー
	historyTableView.addEventListener('click',function(e){
		Ti.API.debug('[event]historyTableView.click:');
		var tableRow = historyTableView.data[0].rows;
		if (tableRow != null) {
			for (var i=0; i<tableRow.length; i++) {
				tableRow[i].hasCheck = false;
			}
		}
		e.row.hasCheck = true;
		postTextArea.value = historyList[e.index];
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	postWin.addEventListener('click',function(e){
		Ti.API.debug('[event]postWin.click:');
		postTextArea.blur();
	});

	return postWin;
}
