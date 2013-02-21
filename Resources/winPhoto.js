// フォト

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');

	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 10;

	var userData = model.getUser(_articleData.user);
	var photoWin = Ti.UI.createWindow(style.photoWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
	titleIconImage.image = 'images/icon/' + _articleData.user + '.jpg';

	var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
	titleNameLabel.text = _articleData.user + '\n@' + _articleData.location;
	titleView.add(titleIconImage);
	titleView.add(titleNameLabel);
	photoWin.titleControl = titleView;

	var photoTableView = Ti.UI.createTableView(style.photoTableView);
	photoWin.add(photoTableView);

	// 記事の表示
	var articleView = Ti.UI.createView(style.photoArticleView);
	var articleTableRow = Ti.UI.createTableViewRow(style.photoArticleTableRow);
	articleTableRow.add(articleView);
	photoTableView.appendRow(articleTableRow);					
	var photoImage = Ti.UI.createImageView(style.photoPhotoImage);
	photoImage.image = 'images/photo/' + _articleData.no + '.jpg';
	var textLabel = Ti.UI.createLabel(style.photoTextLabel);
	textLabel.text = _articleData.date.substring(0,10) + '\n' + _articleData.text;			
	articleView.add(photoImage);
	articleView.add(textLabel);

	var photoButtonView = Ti.UI.createView(style.photoButtonView);
	articleView.add(photoButtonView);

	// ライクボタンの表示
	var likeButton = Ti.UI.createButton(style.photoLikeButton);
	if (model.checkLikeList(_articleData.no, model.getLoginId())) {
		likeButton.backgroundColor = '#dedede';
		likeButton.clickFlag = true;
	}
	var likeButtonIconImage = Ti.UI.createImageView(style.photoLikeButtonIconImage);
	likeButton.add(likeButtonIconImage);
	var likeButtonLabel = Ti.UI.createLabel(style.photoLikeButtonLabel);
	likeButton.add(likeButtonLabel);
	photoButtonView.add(likeButton);

	// コメントボタンの表示
	var commentButton = Ti.UI.createButton(style.photoCommentButton);
	var commentButtonIconImage = Ti.UI.createImageView(style.photoCommentButtonIconImage);
	commentButton.add(commentButtonIconImage);
	var commentButtonLabel = Ti.UI.createLabel(style.photoCommentButtonLabel);
	commentButton.add(commentButtonLabel);
	photoButtonView.add(commentButton);

	// ライクリストの更新
	var updateLike = function() {
		Ti.API.debug('[func]updateLike:');
		var likeList = model.getLikeList(_articleData.no, likeCount);
		Ti.API.debug('likeList:' + likeList);

		if (likeList.length > 0) {
			var likeCountTableRow = Ti.UI.createTableViewRow(style.photoLikeCountTableRow);
			photoTableView.appendRow(likeCountTableRow);
			var likeCountView = Ti.UI.createView(style.photoLikeCountView);
			likeCountTableRow.add(likeCountView);
			var likeCountIconImage = Ti.UI.createImageView(style.photoLikeCountIconImage);
			likeCountView.add(likeCountIconImage);						
			var likeCountLabel = Ti.UI.createLabel(style.photoLikeCountLabel);
			likeCountLabel.text = ' x ' + likeList.length;
			likeCountView.add(likeCountLabel);

			// ライクリストの表示
			var likeTableRow = Ti.UI.createTableViewRow(style.photoLikeTableRow);
			photoTableView.appendRow(likeTableRow);
			var likeListView = Ti.UI.createView(style.photoLikeListView);
			likeTableRow.add(likeListView);

			for (var i=0; i<likeCount; i++) {
				var likeView = Ti.UI.createView(style.photoLikeView);
				likeListView.add(likeView);					
				if (i < likeList.length) {
					var likeUserIconImage = Ti.UI.createImageView(style.photoLikeUserIconImage);
					likeUserIconImage.image = 'images/icon/' + likeList[i].user + '.jpg';						
					likeView.add(likeUserIconImage);					
				} else {
					if (i != likeCount - 1) {
						var likeIconImage = Ti.UI.createImageView(style.photoLikeIconImage);
						likeView.add(likeIconImage);						
					} else {
						var likeMoreLabel = Ti.UI.createLabel(style.photoLikeMoreLabel);
						likeView.add(likeMoreLabel);						
					}
				}
			}
		}
	}
	// 初回読み込み時に、ライクリストの更新
	updateLike();

	// コメントリストの更新
	var updateComment = function() {
		Ti.API.debug('[func]updateComment:');
		var commentList = model.getCommentList(_articleData.no, commentCount);
		Ti.API.debug('commentList:' + commentList);

		if (commentList.length > 0) {
			var commentCountTableRow = Ti.UI.createTableViewRow(style.photoCommentCountTableRow);
			photoTableView.appendRow(commentCountTableRow);
			var commentCountView = Ti.UI.createView(style.photoCommentCountView);
			commentCountTableRow.add(commentCountView);
			var commentCountIconImage = Ti.UI.createImageView(style.photoCommentCountIconImage);
			commentCountView.add(commentCountIconImage);						
			var commentCountLabel = Ti.UI.createLabel(style.photoCommentCountLabel);
			commentCountLabel.text = ' x ' + commentList.length;
			commentCountView.add(commentCountLabel);
		
			// コメントリストの表示
			var commentTableRow = Ti.UI.createTableViewRow(style.photoCommentTableRow);
			photoTableView.appendRow(commentTableRow);

			commentTableRow.height = Ti.UI.SIZE;
			var commentListView = Ti.UI.createView(style.photoCommentListView);
			commentTableRow.add(commentListView);
			for (var i=0; i<commentList.length; i++) {
				var commentView = Ti.UI.createView(style.photoCommentView);
				commentListView.add(commentView);
				var commentUserIconImage = Ti.UI.createImageView(style.photoCommentUserIconImage);
				commentUserIconImage.image = 'images/icon/' + commentList[i].user + '.jpg';						
				commentView.add(commentUserIconImage);					
				var commentLabel = Ti.UI.createLabel(style.photoCommentLabel);
				commentLabel.text = commentList[i].user + '\n' + commentList[i].text;
				commentView.add(commentLabel);
			}
		}
	}
	// 初回読み込み時に、コメントリストの更新
	updateComment();

/*
	// コメントフィールドの表示
	var commentFieldTableRow = Ti.UI.createTableViewRow(style.photoCommentFieldTableRow);
	photoTableView.appendRow(commentFieldTableRow);
	var commentFieldView = Ti.UI.createView(style.photoCommentView);
	commentFieldTableRow.add(commentFieldView);
	var commentIconImage = Ti.UI.createImageView(style.photoCommentIconImage);
	commentFieldView.add(commentIconImage);
	var commentField = Ti.UI.createTextField(style.photoCommentField);
	commentFieldView.add(commentField);
*/

	// フォトにタップでフォト拡大画面を表示
	photoImage.addEventListener('click',function(e){
		Ti.API.debug('[event]photoImage.click:');
		var photoFullWin = Titanium.UI.createWindow(style.photoPhotoFullWin);
		var photoFullImage = Ti.UI.createImageView(style.photoPhotoFullImage);
		photoFullImage.image = 'images/photo/' + _articleData.no + '.jpg';
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

	// ライクボタンのクリックでライクリストに追加
	likeButton.addEventListener('click',function(e){
		Ti.API.debug('[event]likeButton.click:');
		e.source.enabled = false;

		if (e.source.clickFlag) {
			// ライクを解除する処理を書く
			model.removeLikeList(_articleData.no, model.getLoginId());
			e.source.backgroundColor = 'white';
			e.source.clickFlag = false;
		} else {
			var likeData = {no:_articleData.no, user:model.getLoginId(), date:util.getFormattedNowDateTime()};			
			model.addLikeList(likeData);
			e.source.backgroundColor = '#dedede';
			e.source.clickFlag = true;
		}

		updateLike();
		e.source.enabled = true;
	});

	// コメントボタンのクリックでライクリストに追加
	commentButton.addEventListener('click',function(e){
		Ti.API.debug('[event]commentButton.click:');
		e.source.enabled = false;
		e.source.backgroundColor = '#dedede';

		var commentListWin = win.createCommentListWindow(_articleData);
		win.openWindow(photoWin, commentListWin);

		e.source.backgroundColor = 'white';
		e.source.enabled = true;
	});

/*
	// コメントフィールドでキーボード確定でコメントリストに追加
	commentField.addEventListener('return',function(e){
		Ti.API.debug('[event]commentField.return:');
		var no = _articleData.no;
		var user = model.getLoginId();
		var date = util.getFormattedNowDateTime();
		var text = commentField.getValue();
		
		var commentData = {no:no, user:user, date:date, text:text};
		model.addCommentList(commentData);
		updateComment();
		commentField.value = "";
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	photoTableView.addEventListener('click',function(e){
		Ti.API.debug('[event]photoTableView.click:');
		commentField.blur();
	});
*/
	// タイトルアイコンのクリックでプロフィールを表示
	titleIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]titleIconImage.click:');
		var profileWin = win.createProfileWindow(userData);
		win.openWindow(photoWin, profileWin);
	});

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(photoWin);
		}
	});

	return photoWin;
}
