// フォト

exports.createWindow = function(_type, _articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginId = model.getLoginId();

	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 5;

//	var userData = model.getUser(_articleData.userId);
	var userData = null;

	// 友人データ取得
	model.getCloudUser(_articleData.userId, function(e) {
		Ti.API.debug('[func]getCloudUser.callback:');
		if (e.success) {
			userData = e.userList[0];
		} else {
			util.errorDialog(e);
		}
	});

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

		// コメントリストの取得
		model.getCloudCommentList({
			userId: loginId,
			postId: _articleData.id
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]getCloudCommentList.callback:');
				if (e.reviews.length > 0) {
//					var commentList = model.getCommentList(_articleData.no, null, commentCount);
					commentListView = Ti.UI.createView(style.photoCommentListView);
					commentRow.add(commentListView);
					for (var i=0; i<e.reviews.length; i++) {
						var review = e.reviews[i];
						var user = review.user;
						var commentView = Ti.UI.createView(style.photoCommentView);
						commentListView.add(commentView);
						var commentUserIconView = Ti.UI.createView(style.photoCommentUserIconView);
						commentView.add(commentUserIconView);
						var commentUserIconImage = Ti.UI.createImageView(style.photoCommentUserIconImage);
						commentUserIconImage.image = user.photo.urls.square_75;
						commentUserIconView.add(commentUserIconImage);
						var textView = Ti.UI.createView(style.photoCommentTextView);
						commentView.add(textView);
						var nameLabel = Ti.UI.createLabel(style.photoCommentNameLabel);
						if (user.custom_fields && user.custom_fields.name != null) {
							nameLabel.text = user.custom_fields.name; 
						} else {
							nameLabel.text = user.first_name + ' ' + user.last_name;
						}
						textView.add(nameLabel);
						var textLabel = Ti.UI.createLabel(style.photoCommentTextLabel);
						textLabel.text = review.content;
						textView.add(textLabel);
						var timeLabel = Ti.UI.createLabel(style.photoCommentTimeLabel);
						if (review.custom_fields && review.custom_fields.postDate != null) {
							timeLabel.text = util.getFormattedDateTime(util.getDate(review.custom_fields.postDate));
						}
						textView.add(timeLabel);
					}

				} else {
					if (commentRow.getChildren().length > 0) {
						commentRow.remove(commentListView);				
					}
				}
	
			} else {
				util.errorDialog(e);
			}
		});
	};

	// コメントの追加
	var addComment = function() {
		if (commentField.value != '') {
			var date = util.getFormattedNowDateTime();
			var commentData = {
				no: _articleData.no, 
				seq: null, 
				user: loginId, 
				date: date, 
				text: commentField.value
			};
			// コメントリストに追加
			model.addCloudCommentList({
				postId: _articleData.id,
				comment: commentField.value,
				date: date
			}, function(e) {
				Ti.API.debug('[func]addCommentList.callback:');						
				if (e.success) {
					Ti.API.debug('Success:');
					model.addCommentList(commentData);
					updateComment();
					commentField.value = '';
					commentField.blur();
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {id:_articleData.id, like:0, comment:1});
					}

				} else {
					util.errorDialog(e);
				}
			});

		} else {
			commentField.blur();
		}
	};

// ---------------------------------------------------------------------

	var photoWin = Ti.UI.createWindow(style.photoWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	photoWin.titleControl = titleView;

	var titleIconView = Ti.UI.createView(style.photoTitleIconView);
	titleView.add(titleIconView);
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
//	titleIconImage.image = 'images/icon/i_' + _articleData.userId + '.png';
	titleIconImage.image = _articleData.icon;
	titleIconView.add(titleIconImage);

	var nameView = Ti.UI.createView(style.photoTitleNameView);
	titleView.add(nameView);
	if (_articleData.name != '') {
		var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
		titleNameLabel.text = _articleData.name;
		nameView.add(titleNameLabel);
	}
	var titleUserLabel = Ti.UI.createLabel(style.photoTitleUserLabel);
	titleUserLabel.text = '@' + _articleData.user;
	nameView.add(titleUserLabel);


	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoWin.leftNavButton = backButton;

	var photoTableView = Ti.UI.createTableView(style.photoTableView);
	photoWin.add(photoTableView);

	// 記事の表示
	var articleRow = Ti.UI.createTableViewRow(style.photoArticleTableRow);
	photoTableView.appendRow(articleRow);
	var articleView = Ti.UI.createView(style.photoArticleView);
	articleRow.add(articleView);

	var photoView = Ti.UI.createView(style.photoPhotoView);
	articleView.add(photoView);
	var photoImage = Ti.UI.createImageView(style.photoPhotoImage);

/*
	var photoFile  = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + 'photo/' + _articleData.no + '.jpg');
	if (photoFile.exists()) {
		photoImage.image = photoFile.nativePath;
	} else {
		photoImage.image = 'images/photo/' + _articleData.no + '.jpg';		
	}
*/	
	photoImage.image = _articleData.photo;

	// カスタムプロパティに記事データを格納
	photoImage.articleData = _articleData;
	photoView.add(photoImage);

	var articleTextView = Ti.UI.createView(style.photoArticleTextView);
	articleView.add(articleTextView);
	var textView = Ti.UI.createView(style.photoTextView);
	articleTextView.add(textView);

/*
	var nameLabel = Ti.UI.createLabel(style.photoNameLabel);
	nameLabel.text = _articleData.name;
	textView.add(nameLabel);
*/
	var textLabel = Ti.UI.createLabel(style.photoTextLabel);
	textLabel.text = _articleData.text;			
	var timeLabel = Ti.UI.createLabel(style.photoTimeLabel);
	timeLabel.text = _articleData.date;
	textView.add(textLabel);
	textView.add(timeLabel);

	// ライクボタンの表示
	var likeStampImage = Ti.UI.createImageView(style.photoLikeStampImage);
	if (_type == "friends") {
		likeStampImage.touchEnabled = true;
	}
	articleTextView.add(likeStampImage);

	// ライクリストの取得
	model.getCloudLikeList({
		userId: loginId,
		postId: _articleData.id
	}, function(e) {
		if (e.success) {
			Ti.API.debug('[func]getCloudLikeList.callback:');			
			if (e.reviews.length > 0) {
				likeStampImage.image = 'images/icon/b_like_after.png';
				likeStampImage.clickFlag = true;
				likeStampImage.reviewId = e.reviews[0].id;
			}

		} else {
			util.errorDialog(e);
		}
	});

	if (_type == "friends") {
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

		// コメントリストの表示
		var commentRow = Ti.UI.createTableViewRow(style.photoCommentTableRow);
		photoTableView.appendRow(commentRow);
		var commentListView = null;
		
		// 初回読み込み時に、コメントリストの更新
		updateComment();
	
		// コメントフィールドの表示
		var postButton = Ti.UI.createButton(style.photoCommentPostButton);
		var postImage = Ti.UI.createImageView(style.photoCommentPostImage);
		postButton.add(postImage);
		var commentField = Ti.UI.createTextField(style.photoCommentField);
		var dummyField = Ti.UI.createTextField(style.photoCommentField);
		dummyField.top = '-50dp';
		dummyField.keyboardToolbar = [commentField, postButton];
		photoWin.add(dummyField);

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
	
		postButton.addEventListener('click',function(e){
			Ti.API.debug('[event]postButton.click:');
			addComment();
		});
	
		// コメントフィールドでキーボード確定でコメントリストに追加
		commentField.addEventListener('return',function(e){
			Ti.API.debug('[event]commentField.return:');
			addComment();
		});

		// 画像クリックでコメントフィールドのフォーカスを外す
		photoView.addEventListener('click',function(e){
			Ti.API.debug('[event]articleView.click:');
			commentField.blur();
		});

	}

// ---------------------------------------------------------------------

	// ライクボタンのクリックでライクリストに追加
	likeStampImage.addEventListener('click',function(e){
		Ti.API.debug('[event]likeStampImage.click:');
		e.source.enabled = false;
		if (e.source.clickFlag) {
			// ライクの削除
			model.removeCloudLikeList({
				postId: _articleData.id,
				reviewId: e.source.reviewId
			}, function(e) {
				Ti.API.debug('[func]removeCloudLikeList.callback:');						
				if (e.success) {
					Ti.API.debug('Success:');
					model.removeLikeList(_articleData.no, loginId);
					likeStampImage.image = 'images/icon/b_like_before.png';
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {id:_articleData.id, like:-1, comment:0});
					}
			
				} else {
					util.errorDialog(e);
				}
			});
			e.source.clickFlag = false;

		} else {
			// ライクの追加
			model.addCloudLikeList(_articleData.id, function(e) {
				Ti.API.debug('[func]addCloudLikeList.callback:');						
				if (e.success) {
					Ti.API.debug('Success:');
					var likeData = {no:_articleData.no, user:loginId, date:util.getFormattedNowDateTime()};			
					model.addLikeList(likeData);
					likeStampImage.image = 'images/icon/b_like_after.png';
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {id:_articleData.id, like:1, comment:0});
					}
	
				} else {
					util.errorDialog(e);
				}
			});
			e.source.clickFlag = true;
		}

		e.source.enabled = true;
	});

	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		photoWin.close({animated:true});
	});

	// タイトルアイコンのクリックでプロフィールを表示
	titleIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]titleIconImage.click:');
		e.source.opacity = 0.5;
		var profileWin = win.createProfileWindow(userData);
		win.openTabWindow(profileWin, {animated:true});
		e.source.opacity = 1.0;
	});

/*
	// コメント編集を反映
	photoWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]photoWin.refresh:');
		// コメントリストの更新
		updateComment();
	});
*/

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
			photoWin.close({animated:true});
		}
	});
/*
	// クローズ時に前の画面を更新
	photoWin.addEventListener('close',function(e){
		Ti.API.debug('[event]photoWin.close:');
		if (photoWin.prevWin != null) {
			photoWin.prevWin.fireEvent('refresh', {articleData:_articleData});
		}
	});	
*/
	return photoWin;
};
