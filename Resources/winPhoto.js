// フォト

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');

	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 5;

	var userData = model.getUser(_articleData.user);

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

	// コメントリストの更新
	var updateComment = function() {
		Ti.API.debug('[func]updateComment:');
		var count = model.getCommentCount(_articleData.no);
		var children = commentTableRow.getChildren();

		if (count > 0) {
			var commentList = model.getCommentList(_articleData.no, null, commentCount);
			commentCountLabel.text = ' x ' + count;
			if (children.length > 0) {
				commentTableRow.remove(commentListView);				
			}
			commentCountView.show();
		
			commentListView = Ti.UI.createView(style.photoCommentListView);
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

		} else {
			commentCountView.hide();
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
	// カスタムプロパティに記事データを格納
	photoImage.articleData = _articleData;
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
	// コメントリストの表示
	var commentTableRow = Ti.UI.createTableViewRow(style.photoCommentTableRow);
	photoTableView.appendRow(commentTableRow);
	var commentListView = null;
	
	// 初回読み込み時に、コメントリストの更新
	updateComment();

// ---------------------------------------------------------------------
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

	var flexSpace = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var doneButton = Ti.UI.createButton({
		systemButton:Ti.UI.iPhone.SystemButton.DONE
	});

	doneButton.addEventListener('click',function(e){
		Ti.API.debug('[event]doneButton.click:');
		if (commentField.value != '') {
			addComment();
			commentField.value = '';
		}
		commentField.blur();			
	});

	var commentField = Ti.UI.createTextField(style.photoCommentField);
	var dummyField = Ti.UI.createTextField(style.photoCommentField);
	dummyField.top = '-50dp';
	dummyField.keyboardToolbar = [flexSpace,commentField,doneButton];
	photoWin.add(dummyField);

	// コメントボタンのクリックでライクリストに追加
	commentButton.addEventListener('click',function(e){
		Ti.API.debug('[event]commentButton.click:');
		e.source.enabled = false;
		e.source.backgroundColor = '#dedede';

		dummyField.focus();

		e.source.backgroundColor = 'white';
		e.source.enabled = true;
	});

	dummyField.addEventListener('focus',function(e){
		Ti.API.debug('[event]dummyField.focus:');
		commentField.focus();
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


	commentCountIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]commentCountIconImage.click:');
		var commentListWin = win.createCommentListWindow(_articleData);
		commentListWin.prevWin = photoWin;
		win.openTabWindow(commentListWin);
	});


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
