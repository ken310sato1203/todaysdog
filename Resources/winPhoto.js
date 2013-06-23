// フォト

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');

	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 5;

	var userData = model.getUser(_articleData.user);

/*
	// ライクリストの更新
	var updateLike = function() {
		Ti.API.debug('[func]updateLike:');
		var count = model.getLikeCount(_articleData.no);
		var children = likeTableRow.getChildren();

		if (count > 0) {
			var likeList = model.getLikeList(_articleData.no, likeCount);
			likeCountLabel.text = ' x ' + count;
			if (children.length > 0) {
				likeTableRow.remove(likeListView);				
			}
			likeCountView.show();

			// ライクがない場合に間を詰めるため1dpにしていた高さを変更
			likeCountTableRow.height = Ti.UI.SIZE;
			likeTableRow.height = Ti.UI.SIZE;
			likeListView = Ti.UI.createView(style.photoLikeListView);
			likeTableRow.add(likeListView);

			for (var i=0; i<likeCount; i++) {
				var likeView = Ti.UI.createView(style.photoLikeView);
				likeListView.add(likeView);					
				if (i < likeList.length) {
					var likeUserIconImage = Ti.UI.createImageView(style.photoLikeUserIconImage);
					likeUserIconImage.image = 'images/icon/' + likeList[i].user + '.jpg';						
					likeView.add(likeUserIconImage);					
				} else {
					var likeIconImage = Ti.UI.createImageView(style.photoLikeIconImage);
					likeView.add(likeIconImage);						
				}
			}

		} else {
			likeCountView.hide();
			if (children.length > 0) {
				likeTableRow.remove(likeListView);				
			}
			likeCountTableRow.height = '1dp';
			likeTableRow.height = '1dp';
		}
	};
*/

	// コメントリストの更新
	var updateComment = function() {
		Ti.API.debug('[func]updateComment:');
		var count = model.getCommentCount(_articleData.no);
		var children = commentTableRow.getChildren();

		if (count > 0) {
			var commentList = model.getCommentList(_articleData.no, null, commentCount);
/*
			commentCountLabel.text = ' x ' + count;
			if (children.length > 0) {
				commentTableRow.remove(commentListView);				
			}
			commentCountView.show();
*/
			commentListView = Ti.UI.createView(style.photoCommentListView);
			commentTableRow.add(commentListView);

			for (var i=0; i<commentList.length; i++) {
				var commentView = Ti.UI.createView(style.photoCommentView);
				commentListView.add(commentView);
				var commentUserIconImage = Ti.UI.createImageView(style.photoCommentUserIconImage);
				commentUserIconImage.image = 'images/icon/' + commentList[i].user + '.png';						
				commentView.add(commentUserIconImage);					

/*
				var commentLabel = Ti.UI.createLabel(style.photoCommentLabel);
				commentLabel.text = commentList[i].user + '\n' + commentList[i].text;
				commentView.add(commentLabel);
*/
				var textView = Ti.UI.createView(style.photoCommentTextView);
				commentView.add(textView);
				var nameLabel = Ti.UI.createLabel(style.photoCommentNameLabel);
				nameLabel.text = commentList[i].user;
				textView.add(nameLabel);
				var textLabel = Ti.UI.createLabel(style.photoCommentTextLabel);
				textLabel.text = commentList[i].text;
				textView.add(textLabel);
				var timeLabel = Ti.UI.createLabel(style.photoCommentTimeLabel);
//				var date = util.getDateElement(commentList[i].date);
//				timeLabel.text = date.hour + ":" + date.minute + ":" + date.second;
				timeLabel.text = commentList[i].date;
				textView.add(timeLabel);
			}

		} else {
//			commentCountView.hide();
			if (children.length > 0) {
				commentTableRow.remove(commentListView);				
			}
		}
	};

	// コメントの追加
	var addComment = function() {
		var commentData = {
			no:_articleData.no, 
			seq:null, 
			user:model.getLoginId(), 
			date:util.getFormattedNowDateTime(), 
			text:commentField.getValue()
		};
		model.addCommentList(commentData);
		updateComment();
	};

// ---------------------------------------------------------------------

	var photoWin = Ti.UI.createWindow(style.photoWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
	titleIconImage.image = 'images/icon/' + _articleData.user + '.png';

	var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
	titleNameLabel.text = userData.name + '\n@' + userData.user;
	titleView.add(titleIconImage);
	titleView.add(titleNameLabel);
	photoWin.titleControl = titleView;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoWin.leftNavButton = backButton;

	var photoTableView = Ti.UI.createTableView(style.photoTableView);
	photoWin.add(photoTableView);

	// 記事の表示
	var articleTableRow = Ti.UI.createTableViewRow(style.photoArticleTableRow);
	photoTableView.appendRow(articleTableRow);
	var articleView = Ti.UI.createView(style.photoArticleView);
	articleTableRow.add(articleView);

	var photoView = Ti.UI.createView(style.photoPhotoView);
	articleView.add(photoView);
	var photoImage = Ti.UI.createImageView(style.photoPhotoImage);
	photoImage.image = 'images/photo/' + _articleData.no + '.jpg';
	// カスタムプロパティに記事データを格納
	photoImage.articleData = _articleData;
	photoView.add(photoImage);

	var articleTextView = Ti.UI.createView(style.photoArticleTextView);
	articleView.add(articleTextView);
	var textView = Ti.UI.createView(style.photoTextView);
	articleTextView.add(textView);

	var nameLabel = Ti.UI.createLabel(style.photoNameLabel);
	nameLabel.text = _articleData.user;
	var textLabel = Ti.UI.createLabel(style.photoTextLabel);
	textLabel.text = _articleData.text;			
	var timeLabel = Ti.UI.createLabel(style.photoTimeLabel);
	timeLabel.text = _articleData.date;
	textView.add(nameLabel);
	textView.add(textLabel);
	textView.add(timeLabel);

	var likeStampImage = Ti.UI.createImageView(style.photoLikeStampImage);
	articleTextView.add(likeStampImage);

	// ライクボタンの表示
	if (model.checkLikeList(_articleData.no, model.getLoginId())) {
		likeStampImage.image = 'images/icon/b_like_after.png';
		likeStampImage.clickFlag = true;
	}

	// ライクボタンのクリックでライクリストに追加
	likeStampImage.addEventListener('click',function(e){
		Ti.API.debug('[event]likeStampImage.click:');
		e.source.enabled = false;

		if (e.source.clickFlag) {
			// ライクを解除する処理を書く
			model.removeLikeList(_articleData.no, model.getLoginId());
			likeStampImage.image = 'images/icon/b_like_before.png';
			e.source.clickFlag = false;
		} else {
			var likeData = {no:_articleData.no, user:model.getLoginId(), date:util.getFormattedNowDateTime()};			
			model.addLikeList(likeData);
			likeStampImage.image = 'images/icon/b_like_after.png';
			e.source.clickFlag = true;
		}

//		updateLike();
		e.source.enabled = true;
	});

	var actionView = Ti.UI.createView(style.photoActionView);
	articleView.add(actionView);
	// コメント
	var commentActionView = Ti.UI.createView(style.photoCommentActionView);
	actionView.add(commentActionView);
	var commentActionImage = Ti.UI.createImageView(style.photoCommentActionImage);
	commentActionView.add(commentActionImage);
	var commentActionLabel = Ti.UI.createLabel(style.photoCommentActionLabel);
	commentActionView.add(commentActionLabel);
	// シェア
	var shareActionView = Ti.UI.createView(style.photoShareActionView);
	actionView.add(shareActionView);
	var shareActionImage = Ti.UI.createImageView(style.photoShareActionImage);
	shareActionView.add(shareActionImage);
	var shareActionLabel = Ti.UI.createLabel(style.photoShareActionLabel);
	shareActionView.add(shareActionLabel);


/*
	// コメントボタンの表示
	var commentButton = Ti.UI.createButton(style.photoCommentButton);
	var commentButtonIconImage = Ti.UI.createImageView(style.photoCommentButtonIconImage);
	commentButton.add(commentButtonIconImage);
	var commentButtonLabel = Ti.UI.createLabel(style.photoCommentButtonLabel);
	commentButton.add(commentButtonLabel);
//	photoButtonView.add(commentButton);

	// ライク数の表示
	var likeCountTableRow = Ti.UI.createTableViewRow(style.photoLikeCountTableRow);
	photoTableView.appendRow(likeCountTableRow);
	var likeCountView = Ti.UI.createView(style.photoLikeCountView);
	likeCountTableRow.add(likeCountView);
	var likeCountIconImage = Ti.UI.createImageView(style.photoLikeCountIconImage);
	likeCountView.add(likeCountIconImage);
	var likeCountLabel = Ti.UI.createLabel(style.photoLikeCountLabel);
	likeCountView.add(likeCountLabel);

	// ライクリストの表示
	var likeTableRow = Ti.UI.createTableViewRow(style.photoLikeTableRow);
	photoTableView.appendRow(likeTableRow);
	var likeListView = null;

	// 初回読み込み時に、ライクリストの更新
	updateLike();

	// コメント数の表示
	var commentCountTableRow = Ti.UI.createTableViewRow(style.photoCommentCountTableRow);
	photoTableView.appendRow(commentCountTableRow);
	var commentCountView = Ti.UI.createView(style.photoCommentCountView);
	commentCountTableRow.add(commentCountView);
	var commentCountIconImage = Ti.UI.createImageView(style.photoCommentCountIconImage);
	commentCountView.add(commentCountIconImage);						
	var commentCountLabel = Ti.UI.createLabel(style.photoCommentCountLabel);
	commentCountView.add(commentCountLabel);
*/

	// コメントリストの表示
	var commentTableRow = Ti.UI.createTableViewRow(style.photoCommentTableRow);
	photoTableView.appendRow(commentTableRow);
	var commentListView = null;
	
	// 初回読み込み時に、コメントリストの更新
	updateComment();

	// コメントフィールドの表示
	var flexSpace = Ti.UI.createButton({systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var doneButton = Ti.UI.createButton({systemButton:Ti.UI.iPhone.SystemButton.DONE});
	var commentField = Ti.UI.createTextField(style.photoCommentField);
	var dummyField = Ti.UI.createTextField(style.photoCommentField);
	dummyField.top = '-50dp';
	dummyField.keyboardToolbar = [flexSpace,commentField,doneButton];
	photoWin.add(dummyField);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		photoWin.close();
	});

	// フォトにタップでフォト拡大画面を表示
	photoImage.addEventListener('click',function(e){
		Ti.API.debug('[event]photoImage.click:');
		var photoFullWin = Titanium.UI.createWindow(style.photoPhotoFullWin);
		var photoFullImage = Ti.UI.createImageView(style.photoPhotoFullImage);
		photoFullImage.image = 'images/photo/' + e.source.articleData.no + '.jpg';
		photoFullWin.add(photoFullImage);

		photoFullWin.open({
			modal: true,
		    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		    navBarHidden: true
		});

		// フォト拡大が面にタップで戻る
		photoFullImage.addEventListener('click',function(e){
			Ti.API.debug('[event]photoFullImage.click:');
			photoFullWin.close();				
		});
	});

	// コメントボタンのクリック
	commentActionView.addEventListener('click',function(e){
		Ti.API.debug('[event]commentActionView.click:');
		e.source.enabled = false;
		e.source.backgroundColor = 'white';
		dummyField.focus();
		e.source.backgroundColor = '#f5f5f5';
		e.source.enabled = true;
	});

	dummyField.addEventListener('focus',function(e){
		Ti.API.debug('[event]dummyField.focus:');
		commentField.focus();
	});	

	doneButton.addEventListener('click',function(e){
		Ti.API.debug('[event]doneButton.click:');
		if (commentField.value != '') {
			addComment();
			commentField.value = '';
		}
		commentField.blur();			
	});

	// コメントフィールドでキーボード確定でコメントリストに追加
	commentField.addEventListener('return',function(e){
		Ti.API.debug('[event]commentField.return:');
		if (commentField.value != '') {
			addComment();
			commentField.value = '';
		}
		commentField.blur();			
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	photoTableView.addEventListener('click',function(e){
		Ti.API.debug('[event]photoTableView.click:');
		commentField.blur();
	});

/*
	commentCountIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]commentCountIconImage.click:');
		var commentListWin = win.createCommentListWindow(_articleData);
		commentListWin.prevWin = photoWin;
		win.openTabWindow(commentListWin);
	});
*/

	// タイトルアイコンのクリックでプロフィールを表示
	titleIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]titleIconImage.click:');
		e.source.opacity = 0.5;
		var profileWin = win.createProfileWindow(userData);
		win.openTabWindow(profileWin);
		e.source.opacity = 1.0;
	});

	// コメント編集を反映
	photoWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]photoWin.refresh:');
		// コメントリストの更新
		updateComment();
	});

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
//			tabGroup.activeTab.close(photoWin);
			photoWin.close();
		}
	});

	// クローズ時に前の画面を更新
	photoWin.addEventListener('close',function(e){
		Ti.API.debug('[event]photoWin.close:');
		if (photoWin.prevWin != null) {
			photoWin.prevWin.fireEvent('refresh', {articleData:_articleData});
		}
	});	

	return photoWin;
}
