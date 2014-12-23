// フォト

exports.createWindow = function(_type, _articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginUser = model.getLoginUser();

	// 初回読み込み時
	var initFlag = true;
	// ライクリストの表示件数
	var likeCount = 5;
	// コメントリストの表示件数
	var commentCount = 5;
	// blur用
	var commentField = null;

	// テキストフィールドのblurの処理
	var blurCommentField = function() {
		Ti.API.debug('[func]blurCommentField:');
		if (commentField && commentField.focusFlag) {
			commentField.blur();
			commentField.focusFlag = false;
			return true;
		} else {
			return false;
		}
	};

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
						userId: loginUser.id,
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
					var likeList = [{user:loginUser.id, article:_articleData.id, review:e.reviews[0].id}];
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

/*
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
*/

	// コメントデータの取得
	var getCommentItem = function(review) {
		Ti.API.debug('[func]getCommentItem:');
		
		var icon = '';
		var nameValue = '';
		var userValue = '';
		var time = '';
		var commentUserId = null;
		if (review.user) {
			var user = review.user;
			if (user.photo != null && user.photo.urls != null) {
				icon = user.photo.urls.square_75; 
			}	
			if (user.custom_fields && user.custom_fields.name != null) {
				nameValue = user.custom_fields.name + ' ';
			}
			userValue = user.first_name + ' ' + user.last_name;
			if (review.custom_fields && review.custom_fields.postDate != null) {
//				time = util.getFormattedDateTime(util.getDate(review.custom_fields.postDate));
				var date = util.getDateElement(review.custom_fields.postDate);
				time = date.year + '/' + date.month + '/' + date.day + ' ' + date.hour + ":" + date.minute;
			}
			commentUserId = user.id;

		} else {
			// コメント追加時
			icon = loginUser.icon;
			if (loginUser.name != '') {
				nameValue = loginUser.name + ' ';
			}
			userValue = loginUser.user;
			time = review.time;
			commentUserId = loginUser.id;
		}

		var commentItem = [{
			template: 'comment',
			commentUserId: commentUserId,
			photoCommentUserIconView: {
//				backgroundImage: icon,
			},
			photoCommentUserIconImage: {
				image: icon,
			},
			photoCommentNameLabel: {
				text: nameValue,
			},
			photoCommentUserLabel: {
				text: userValue,
			},
			photoCommentTextLabel: {
				text: review.content,
			},
			photoCommentTimeLabel: {
				text: time,
			}
		}];
		
		return commentItem;
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
			userId: loginUser.id,
			postId: _articleData.id
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]getCloudCommentList.callback:');
				if (e.reviews.length > 0) {
					for (var i=0; i<e.reviews.length; i++) {
						listSection.appendItems(getCommentItem(e.reviews[i]));					
					}
				}
				var bottomItem = [{
					template: 'bottom',
				}];
				listSection.appendItems(bottomItem);					

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
	var addComment = function(text) {
		Ti.API.debug('[func]addComment:');
		actInd.show();
		tabGroup.add(actInd);

		var date = util.getFormattedNowDateTime();
		var commentData = {
			no: _articleData.no, 
			seq: null, 
			user: loginUser.id, 
			date: date, 
			text: text
		};
		// コメントリストに追加
		model.addCloudCommentList({
			postId: _articleData.id,
			comment: text,
			date: date,
			ownerId: _articleData.userId,
			reviewedPhoto: _articleData.photo
		}, function(e) {
			Ti.API.debug('[func]addCloudCommentList.callback:');						
			if (e.success) {
				Ti.API.debug('Success:');
				var review = {user:null, content:null};
				review.content = text;
				review.time = util.getFormattedNowDateTime();
				// bottomの前に追加
				listSection.insertItemsAt(listSection.items.length - 1, getCommentItem(review));
				listView.scrollToItem(listView.sections.length - 1, listSection.items.length - 1);

				actInd.hide();
				text = '';
				if (photoWin.prevWin != null) {
					photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:0, comment:1});
				}

			} else {
				actInd.hide();
				util.errorDialog(e);
			}
		});
	};

// ---------------------------------------------------------------------

	var photoWin = Ti.UI.createWindow(style.photoWin);

	// タイトルの表示
	var titleView = Ti.UI.createView(style.photoTitleView);
	photoWin.titleControl = titleView;

	var titleIconView = Ti.UI.createView(style.photoTitleIconView);
//	titleIconView.backgroundImage = _articleData.icon;
	titleView.add(titleIconView);
	titleView.titleIconView = titleIconView;
	var titleIconImage = Ti.UI.createImageView(style.photoTitleIconImage);
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
	titleUserLabel.text = _articleData.user;
	nameView.add(titleUserLabel);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoWin.leftNavButton = backButton;

	// ライクボタンの表示
	var likeStampImage = {};
	if (_type == "friends") {
		var likeReviewId = model.getLocalLikeReviewId({
			userId: loginUser.id,
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
			userId: loginUser.id,
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
/*
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
*/
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
						click: blurCommentField
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
					events: {
						click: blurCommentField
					},
					childTemplates: [{
						type: 'Ti.UI.Label',
						bindId: 'photoTimeLabel',
						properties: style.photoTimeLabel,
					},{
						type: 'Ti.UI.Label',
						bindId: 'photoTextLabel',
						properties: style.photoTextLabel,
					}]
				},{
					type: 'Ti.UI.ImageView',
					bindId: 'photoLikeStampImage',
					properties: style.photoLikeStampImage,
					events: {
						click: function(e) {
							// テキストフィールド入力中でないかチェック
							if ( blurCommentField() == false ) {
								clickLikeStampImage(e);
							}
						},
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
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'photoCommentActionImage',
					properties: style.photoCommentActionImage,
				},{
					type: 'Ti.UI.TextField',
					bindId: 'photoCommentField',
					properties: style.photoCommentField,
					events: {
						focus: function(e) {
							commentField = e.source;
							commentField.focusFlag = true;
						},
						return: function(e) {
							if (e.source.value != '') {
								addComment(e.source.value);
								e.source.value = '';
								blurCommentField();
							}
						}
					},
				}]
/*			},{
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
*/
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
				childTemplates: [{
					type: 'Ti.UI.ImageView',
					bindId: 'photoCommentUserIconImage',
					properties: style.photoCommentUserIconImage,
				}]
            },{
				type: 'Ti.UI.View',
				bindId: 'photoCommentTextView',
				properties: style.photoCommentTextView,
				childTemplates: [{
					type: 'Ti.UI.View',
					bindId: 'photoCommentNameView',
					properties: style.photoCommentNameView,
					childTemplates: [{
						type: 'Ti.UI.Label',
						bindId: 'photoCommentNameLabel',
						properties: style.photoCommentNameLabel,
					},{
						type: 'Ti.UI.Label',
						bindId: 'photoCommentUserLabel',
						properties: style.photoCommentUserLabel
					}]
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
		photoTimeLabel: {
			text: util.getFormattedMD(_articleData.date)
		},
		photoTextLabel: {
			text: _articleData.text
		},
		photoLikeStampImage: likeStampImage
	}];

	listSection.appendItems(articleItem);

	var actionItem = [{
		template: 'action',		
		photoCommentActionView: {
//		},
//		photoShareActionView: {
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

	// タイトルクリックでプロフィールを表示
	titleView.addEventListener('click',function(e){
		Ti.API.debug('[event]titleView.click:');
		if (e.source.objectName == 'photoTitleIconView' || e.source.objectName == 'photoTitleNameView') {
			if (_articleData.userId != loginUser.id) {
				titleIconView.touchEnabled = false;
				// ユーザデータの取得
				model.getCloudUser(_articleData.userId, function(e) {
					Ti.API.debug('[func]getCloudUser.callback:');
					if (e.success) {
						if (e.userList[0]) {
							titleView.titleIconView.opacity = 0.5;
							var profileWin = win.createProfileWindow(e.userList[0]);
							win.openTabWindow(profileWin, {animated:true});
							titleView.titleIconView.opacity = 1.0;
							titleIconView.touchEnabled = true;
						}

					} else {
						util.errorDialog(e);
						titleIconView.touchEnabled = true;
					}
				});
			}
		}
	});

	// 右スワイプで前の画面に戻る
	photoWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]photoWin.swipe:');
		if (e.direction == 'right') {
			photoWin.close({animated:true});
		}
	});

	listView.addEventListener('itemclick', function(e){
		Ti.API.debug('[event]listView.itemclick:');
		var item = e.section.getItemAt(e.itemIndex);
		if (item.template == 'comment' && e.bindId == 'photoCommentUserIconImage') {
			if (item.commentUserId != loginUser.id) {
				listView.touchEnabled = false;
				// ユーザデータの取得
				model.getCloudUser(item.commentUserId, function(e) {
					Ti.API.debug('[func]getCloudUser.callback:');
					if (e.success) {
						if (e.userList[0]) {
							item.photoCommentUserIconView.opacity = 0.5;
							var profileWin = win.createProfileWindow(e.userList[0]);
							win.openTabWindow(profileWin, {animated:true});
							item.photoCommentUserIconView.opacity = 1.0;
							listView.touchEnabled = true;
						}
	
					} else {
						util.errorDialog(e);
						listView.touchEnabled = true;
					}
				});
			}
		}
	});

	return photoWin;
};
