// コメント一覧

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winCommentList.createWindow:');

	var loginId = model.getLoginId();

	// コメント一覧の表示件数
	var commentCount = 5;
	// 前回更新時に読み込んだ記事の最終インデックス
	var prevCommentIndex = null;
	// 次回更新時に読み込むべきコメント一覧があるかどうかのフラグ
	var nextUserFlag = false;

	// コメント一覧の行の追加
	var getUserTableRow = function(_commentList) {
		Ti.API.debug('[func]getUserTableRow:');
		var userTableRow = Ti.UI.createTableViewRow(style.commentListUserTableRow);
		var commentListView = Ti.UI.createView(style.commentListUserListView);
		userTableRow.add(commentListView);
//		var animation = Titanium.UI.createAnimation();
		
		for (var i=0; i<_commentList.length; i++) {	
			Ti.API.debug('_commentList[i].user:' + _commentList[i].user);
			var userView = Ti.UI.createView(style.commentListUserView);
			commentListView.add(userView);
			var userImage = Ti.UI.createImageView(style.commentListIconImage);
			userImage.image = 'images/icon/i_' + _commentList[i].userId + '.jpg';
			// カスタムプロパティにコメントデータを格納
			userImage.commentData = _commentList[i];
			var textLabel = Ti.UI.createLabel(style.commentListTextLabel);
			textLabel.text = _commentList[i].userId + '\n' + _commentList[i].text;
					
			userView.add(userImage);
			userView.add(textLabel);

			if (_articleData.userId == loginId || _commentList[i].userId == loginId) {
				// 削除ボタン
				var deleteButton = Ti.UI.createButton(style.commentListDeleteButton);
				// カスタムプロパティにコメントデータを格納
				deleteButton.commentData = _commentList[i];
				userView.add(deleteButton);
				userView.deleteButton = deleteButton;
	
				// 左スワイプで削除ボタンを表示
				userView.addEventListener('swipe',function(e){
					Ti.API.debug('[event]userView.swipe:');
	//				animation.right = 95;
					var target = null;
					if (e.source.objectName == "commentListUserView") {
						target = e.source;						
					} else {
						// view上にあるimage、labelの場合
						Ti.API.debug('e.source.getParent():' + e.source.getParent());
						target = e.source.getParent();
					}
	
					Ti.API.debug('e.direction:' + e.direction);
					if (e.direction == 'left') {
	//					target.animate(animation);
						// 削除ボタンを表示
						target.deleteButton.show();
					} else if (e.direction == 'right') {
						if ( target.deleteButton.visible == true ) {
							// 削除ボタンを隠す
							target.deleteButton.hide();
						} else {
							// 前の画面に戻る
							commentListWin.close({animated:true});
						}
					}
				});
	
				// 削除ボタンでコメント削除
				deleteButton.addEventListener('click',function(e){
					Ti.API.debug('[event]deleteButton.click:');
					Ti.API.debug('e.source:' + e.source);
					Ti.API.debug('e.source.getParent():' + e.source.getParent());
					var deleteView = e.source.getParent();
					deleteView.getParent().remove(deleteView);
					model.removeCommentList(loginId, e.source.commentData.no, e.source.commentData.seq);
				});
			}

		}
		
		return userTableRow;
	};

	// 「続きを読む」ボタンの追加
	var appendNextButton = function() {
		Ti.API.debug('[func]appendNextButton:');
		var nextTableRow = Ti.UI.createTableViewRow(style.commentListNextTableRow);
		commentListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.commentListNextView);
		nextTableRow.add(nextView);
	
		// 「続きを読む」ボタンをテーブルに追加	
		var nextButton = Ti.UI.createButton(style.commentListNextButton);
		nextView.add(nextButton);
		
		// 「続きを読む」ボタンをタップした場合、続きのコメント一覧を追加してからボタンを削除
		nextButton.addEventListener('click', function(e) {
			updateCommentList();
		});		
	};

	// データなしラベルの追加	
	var appendNoDataLabel = function() {
		Ti.API.debug('[func]appendNoDataLabel:');
		var nextTableRow = Ti.UI.createTableViewRow(style.commentListNextTableRow);
		commentListTableView.appendRow(nextTableRow);
	
		var nextView = Ti.UI.createView(style.commentListNextView);
		nextTableRow.add(nextView);
	
		var noDataLabel = Ti.UI.createLabel(style.commentListNoDataLabel);
		nextView.add(noDataLabel);
	};

	// コメント一覧の追加
	var appendComment = function(_commentList) {
		Ti.API.debug('[func]appendComment:');
		// 「続きを読む」ボタンを押した場合、削除するボタンのインデックスを取得
		var deleteRowIndex = null;
		if (nextUserFlag) {
			deleteRowIndex = commentListTableView.data[0].rowCount - 1;
		}

		// 取得したコメント一覧が表示件数以下の場合
		if (_commentList.length < commentCount + 1) {
			// 取得したコメント一覧をテーブルに追加
			commentListTableView.appendRow(getUserTableRow(_commentList));
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextUserFlag) {
				commentListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きのコメント一覧がないフラグを設定
			nextUserFlag = false;

		// 取得したコメント一覧が表示件数より1件多い場合、「続きを読む」ボタンを表示
		} else {
			// 多く取得した1件のデータを削除
			_commentList.pop();
			// 取得したコメント一覧をテーブルに追加
			commentListTableView.appendRow(getUserTableRow(_commentList), {animated:true});
			// 「続きを読む」ボタンを追加
			appendNextButton();
			// 「続きを読む」ボタンをタップした場合、ボタンを削除
			if (nextUserFlag) {
				commentListTableView.deleteRow(deleteRowIndex);
			}
			// 次回更新用に続きのコメント一覧があるフラグを設定
			nextUserFlag = true;
		}
	};

	// コメント一覧の更新
	var updateCommentList = function() {
		Ti.API.debug('[func]updateCommentList:');
		// 前回取得した最後のインデックス以降を取得
		// 「続きを読む」ボタンの表示判定のため、表示件数より1件多い条件で取得
		var commentList = null;

		commentList = model.getCommentList(_articleData.no, prevCommentIndex, commentCount + 1);

		if (commentList == null || commentList.length == 0) {
			// 1件も取得できなかった場合
			appendNoDataLabel();		
			// 次回更新用に続きのコメント一覧がないフラグを設定
			nextUserFlag = false;
		} else {
			appendComment(commentList);
			// 次回更新用に取得した最後のインデックスを設定
			Ti.API.debug('commentList:' + commentList);
			Ti.API.debug('commentList.length:' + commentList.length);
			prevCommentIndex = commentList[commentList.length-1].no;
		}
	};


// ---------------------------------------------------------------------
	var commentListWin = Ti.UI.createWindow(style.commentListWin);

	var titleView = Ti.UI.createView(style.commentListTitleView);
	var titleLabel = Ti.UI.createLabel(style.commentListTitleLabel);
	titleView.add(titleLabel);		
	commentListWin.titleControl = titleView;

	var commentListTableView = Ti.UI.createTableView(style.commentListTableView);
	commentListWin.add(commentListTableView);

	// 初回読み込み時に、コメント一覧を更新
	updateCommentList();

// ---------------------------------------------------------------------
	// 右スワイプで前の画面に戻る
	commentListWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]commentListWin.swipe:');
		Ti.API.debug('e.source.objectName:' + e.source.objectName);
		if (e.direction == 'right') {
			if (e.source.objectName != "commentListUserView" 
				&& e.source.objectName != "commentListIconImage"
				&& e.source.objectName != "commentListTextLabel") {
				commentListWin.close({animated:true});
			}
		}
	});

	// クローズ時に前の画面を更新
	commentListWin.addEventListener('close',function(e){
		Ti.API.debug('[event]commentListWin.close:');
		if (commentListWin.prevWin != null) {
			commentListWin.prevWin.fireEvent('refresh', {articleData:_articleData});
		}
	});	

	return commentListWin;
};
