// フォト

exports.createWindow = function(_type, _articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginId = model.getLoginId();

	// 初回読み込み時
	var initFlag = true;
	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 5;
	//  ユーザデータ
	var userData = null;

	// ライクボタンクリック時の処理
	var clickLikeStampImage = function(e) {
		Ti.API.debug('[func]clickLikeStampImage:');
		// 多重クリック防止
		listView.touchEnabled = false;
		var item = listSection.getItemAt(e.itemIndex);

		if (likeStampImage.clickFlag) {
			// ライクの削除
			likeStampImage.image = 'images/icon/b_like_before.png';
			item.photoLikeStampImage = likeStampImage;
			listSection.updateItemAt(e.itemIndex, item);

			model.removeCloudLikeList({
				postId: _articleData.id,
				reviewId: likeStampImage.reviewId
			}, function(e) {
				Ti.API.debug('[func]removeCloudLikeList.callback:');
				if (e.success) {
					Ti.API.debug('Success:');
					likeStampImage.clickFlag = false;
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:-1, comment:0});
					}

					// ローカルから削除
					model.removeLocalLikeList({
						userId: loginId,
						article: _articleData.id
					});
			
				} else {
					util.errorDialog(e);
					likeStampImage.image = 'images/icon/b_like_after.png';
					item.photoLikeStampImage = likeStampImage;
					listSection.updateItemAt(e.itemIndex, item);
				}
				listView.touchEnabled = true;
			});

		} else {
			// ライクの追加
			likeStampImage.image = 'images/icon/b_like_after.png';
			item.photoLikeStampImage = likeStampImage;
			listSection.updateItemAt(e.itemIndex, item);

			model.addCloudLikeList({
				postId: _articleData.id,
				articleData: _articleData,
			}, function(e) {
				Ti.API.debug('[func]addCloudLikeList.callback:');						
				if (e.success) {
					Ti.API.debug('Success:');
					likeStampImage.clickFlag = true;
					likeStampImage.reviewId = e.reviews[0].id;
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:1, comment:0});
					}

					// ローカルに登録
					var likeList = [{user:loginId, article:_articleData.id, review:e.reviews[0].id}];
					model.addLocalLikeList(likeList);
	
				} else {
					util.errorDialog(e);
					likeStampImage.image = 'images/icon/b_like_before.png';
					item.photoLikeStampImage = likeStampImage;
					listSection.updateItemAt(e.itemIndex, item);
				}
				listView.touchEnabled = true;
			});
		}
	};

	// コメントクリック時の処理
	var clickCommentActionView = function(e) {
		Ti.API.debug('[func]clickCommentActionView:');
		listView.touchEnabled = false;
		var item = listSection.getItemAt(e.itemIndex);
		item.photoCommentActionView.backgroundColor = 'white';
		listSection.updateItemAt(e.itemIndex, item);
		dummyField.focus();
		item.photoCommentActionView.backgroundColor = '#f5f5f5';
		listSection.updateItemAt(e.itemIndex, item);
		listView.touchEnabled = true;
	};

	// コメントリストの更新
	var updateComment = function() {
		Ti.API.debug('[func]updateComment:');
		// 初回のみコメントの読み込み中を表示
		if (initFlag) {
			var loadItem = [{
				template: 'load',
				photoCommentLoadLabel: {
					text: '読み込み中',
					hegiht: '20dp'
				},
			}];
			listSection.appendItems(loadItem);
		}

		// コメントリストの取得
		model.getCloudCommentList({
			userId: loginId,
			postId: _articleData.id
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]getCloudCommentList.callback:');
				if (e.reviews.length > 0) {
					for (var i=0; i<e.reviews.length; i++) {
						var review = e.reviews[i];
						var user = review.user;

						var name = '';
						if (user.custom_fields && user.custom_fields.name != null) {
							name = user.custom_fields.name; 
						} else {
							name = user.first_name + ' ' + user.last_name;
						}

						var time = '';
						if (review.custom_fields && review.custom_fields.postDate != null) {
							time = util.getFormattedDateTime(util.getDate(review.custom_fields.postDate));
						}

						var commentItem = [{
							template: 'comment',		
							photoCommentUserIconView: {
								backgroundImage: user.photo.urls.square_75,
							},
							photoCommentNameLabel: {
								text: name,
							},
							photoCommentTextLabel: {
								text: review.content,
							},
							photoCommentTimeLabel: {
								text: time,
							}
						}];
						listSection.appendItems(commentItem);
					
					}

					var bottomItem = [{
						template: 'bottom',
					}];
					listSection.appendItems(bottomItem);					
				}

				// 初回のみコメントの読み込み中を削除
				if (initFlag) {
					// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
					var item = listSection.getItemAt(2);			
					item.photoCommentLoadLabel.text = '';
					item.photoCommentLoadLabel.height = '0dp';
					listSection.updateItemAt(2, item);
					initFlag = false;
				}
	
			} else {
				util.errorDialog(e);
			}
		});
	};

	// コメントの追加
	var addComment = function() {
		if (commentField.value != '') {

			actInd.show();
			tabGroup.add(actInd);

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
				Ti.API.debug('[func]addCloudCommentList.callback:');						
				if (e.success) {
					Ti.API.debug('Success:');
					updateComment();
					commentField.value = '';
					commentField.blur();
					if (photoWin.prevWin != null) {
						photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:0, comment:1});
					}

				} else {
					util.errorDialog(e);
				}
				actInd.hide();
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
	titleIconImage.image = _articleData.icon;
	titleIconView.add(titleIconImage);

	// ユーザデータの取得
	model.getCloudUser(_articleData.userId, function(e) {
		Ti.API.debug('[func]getCloudUser.callback:');
		if (e.success) {
			userData = e.userList[0];
			titleIconImage.touchEnabled = true;
		} else {
			util.errorDialog(e);
		}
	});

	var nameView = Ti.UI.createView(style.photoTitleNameView);
	titleView.add(nameView);
	if (_articleData.name != '') {
		var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
		titleNameLabel.text = _articleData.name;
		nameView.add(titleNameLabel);
	}
	var titleUserLabel = Ti.UI.createLabel(style.photoTitleUserLabel);
	titleUserLabel.text = _articleData.user;
	nameView.add(titleUserLabel);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoWin.leftNavButton = backButton;

	// ライクボタンの表示
	var likeStampImage = {};
	if (_type == "friends") {
		var likeReviewId = model.getLocalLikeReviewId({
			userId: loginId,
			article: _articleData.id
		});
		if (likeReviewId != null) {
			likeStampImage.image = 'images/icon/b_like_after.png';
			likeStampImage.clickFlag = true;
			likeStampImage.reviewId = likeReviewId;
		}
		likeStampImage.visible = true;

/*
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
				likeStampImage.visible = true;
	
			} else {
				util.errorDialog(e);
			}
		});
*/
	}

	// コメントフィールドの表示
	var commentField = Ti.UI.createTextField(style.photoCommentField);
	var dummyField = Ti.UI.createTextField(style.photoCommentField);
	dummyField.top = '-50dp';
	dummyField.keyboardToolbar = [commentField];
	photoWin.add(dummyField);

	dummyField.addEventListener('focus',function(e){
		Ti.API.debug('[event]dummyField.focus:');
		commentField.focus();
	});	

	// コメントフィールドでキーボード確定でコメントリストに追加
	commentField.addEventListener('return',function(e){
		Ti.API.debug('[event]commentField.return:');
		addComment();
	});

	var articleListTemplate = {
		properties: style.photoArticleList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'photoArticleView',
			properties: style.photoArticleView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'photoPhotoView',
				properties: style.photoPhotoView,
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'photoPhotoImage',
					properties: style.photoPhotoImage,
					events: {
						click: function(e) {
							// 画像クリックでコメントフィールドのフォーカスを外す
							commentField.blur();
						}
					},
				}]
			},{
				type: 'Ti.UI.View',
				bindId: 'photoArticleTextView',
				properties: style.photoArticleTextView,
				childTemplates: [{
					type: 'Ti.UI.View',
					bindId: 'photoTextView',
					properties: style.photoTextView,
					childTemplates: [{
						type: 'Ti.UI.Label',
						bindId: 'photoTextLabel',
						properties: style.photoTextLabel,
					},{
						type: 'Ti.UI.Label',
						bindId: 'photoTimeLabel',
						properties: style.photoTimeLabel,
					}]
				},{
					type: 'Ti.UI.ImageView',
					bindId: 'photoLikeStampImage',
					properties: style.photoLikeStampImage,
					events: {
						click: clickLikeStampImage
					},
				}]
			}]
		}]
	};
	var actionListTemplate = {
		properties: style.photoActionList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'photoActionView',
			properties: style.photoActionView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'photoCommentActionView',
				properties: style.photoCommentActionView,
				events: {
					click: clickCommentActionView
				},
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'photoCommentActionImage',
					properties: style.photoCommentActionImage,
				},{
					type: 'Ti.UI.Label',
					bindId: 'photoCommentActionLabel',
					properties: style.photoCommentActionLabel,
				}]
			},{
				type: 'Ti.UI.View',
				bindId: 'photoShareActionView',
				properties: style.photoShareActionView,
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'photoShareActionImage',
					properties: style.photoShareActionImage,
				},{
					type: 'Ti.UI.Label',
					bindId: 'photoShareActionLabel',
					properties: style.photoShareActionLabel,
				}]
			}]
		}]
	};
	var loadListTemplate = {
		properties: style.photoCommentLoadList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'photoCommentLoadLabel',
			properties: style.photoCommentLoadLabel,
		}]
	};
	var commentListTemplate = {
		properties: style.photoCommentList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'photoCommentView',
			properties: style.photoCommentView,
			childTemplates: [{
				type: 'Ti.UI.View',
				bindId: 'photoCommentUserIconView',
				properties: style.photoCommentUserIconView,
			},{
				type: 'Ti.UI.View',
				bindId: 'photoCommentTextView',
				properties: style.photoCommentTextView,
				childTemplates: [{
					type: 'Ti.UI.Label',
					bindId: 'photoCommentNameLabel',
					properties: style.photoCommentNameLabel,
				},{
					type: 'Ti.UI.Label',
					bindId: 'photoCommentTextLabel',
					properties: style.photoCommentTextLabel,
				},{
					type: 'Ti.UI.Label',
					bindId: 'photoCommentTimeLabel',
					properties: style.photoCommentTimeLabel,
				}]
			}]
		}]
	};
	var bottomListTemplate = {
		properties: style.photoBottomList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'photoCommentBottomView',
			properties: style.photoCommentBottomView,
		}]
	};
	
	var listView = Ti.UI.createListView(style.photoTableListView);
	listView.templates = {
		'article': articleListTemplate,
		'action': actionListTemplate,
		'load': loadListTemplate,
		'comment': commentListTemplate,
		'bottom': bottomListTemplate
   };
	
	var listSection = Ti.UI.createListSection();
	listView.setSections([listSection]);
	photoWin.add(listView);

	var articleItem = [{
		template: 'article',		
		photoPhotoImage: {
			image: _articleData.photo
		},
		photoTextLabel: {
			text: _articleData.text
		},
		photoTimeLabel: {
			text: _articleData.date
		},
		photoLikeStampImage: likeStampImage
	}];

	listSection.appendItems(articleItem);

	var actionItem = [{
		template: 'action',		
		photoCommentActionView: {
		},
		photoShareActionView: {
		}
	}];

	listSection.appendItems(actionItem);

	if (_type == "friends") {
		// 初回読み込み時に、コメントリストの更新
		updateComment();
	}

// ---------------------------------------------------------------------

	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		photoWin.close({animated:true});
	});

	// タイトルアイコンのクリックでプロフィールを表示
	titleIconImage.addEventListener('click',function(e){
		Ti.API.debug('[event]titleIconImage.click:');
		if (userData.id != loginId) {
			titleIconImage.opacity = 0.5;
			var profileWin = win.createProfileWindow(userData);
			win.openTabWindow(profileWin, {animated:true});
			titleIconImage.opacity = 1.0;
		}
	});

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
			photoWin.close({animated:true});
		}
	});

	return photoWin;
};
