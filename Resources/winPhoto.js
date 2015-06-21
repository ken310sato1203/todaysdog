// フォト

exports.createWindow = function(_type, _articleData){
	Ti.API.debug('[func]winPhoto.createWindow:');
	Ti.API.debug('_type:' + _type);

	var loginUser = model.getLoginUser();

	// 初回読み込み時
	var initFlag = true;
	// blur用
	var commentField = null;

	// 記事データの取得件数
	var articleCount = 10;
	var articleLastId = null;
	// 続きを読むフラグ
	var nextArticleFlag = false;
	var nextTarget = null;

	// コメント上限数
	var commentMax = 10;

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
			if (user.custom_fields && user.custom_fields.name != null && user.custom_fields.name != '') {
				nameValue = user.custom_fields.name;
			} else {
//				nameValue = user.first_name + ' ' + user.last_name;
				nameValue = (user.username.indexOf('@') > 0) ? user.username.substring(0,user.username.indexOf('@')) : user.username;
			}

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
				nameValue = loginUser.name;
			} else {
				nameValue = loginUser.user;
			}
			time = review.time;
			commentUserId = loginUser.id;
		}
		
		var newColor = 'white';
		if ( review.newFlag ) {
			newColor = '#87CEFA';
		}

		var commentItem = [{
			template: 'comment',
			userId: commentUserId,
			reviewId: review.id,
			photoCommentFrameView: {
				backgroundColor: newColor,
			},
			photoCommentUserIconView: {
//				backgroundImage: icon,
			},
			photoCommentUserIconImage: {
				image: icon,
			},
			photoCommentNameLabel: {
				text: nameValue,
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
/*
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
*/
		// コメントリストの取得
		model.getCloudCommentList({
			lastId: articleLastId,
			userId: loginUser.id,
			postId: _articleData.id,
			count: articleCount,
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]getCloudCommentList.callback:');
				if (e.reviews.length > 0) {
					for (var i=0; i<e.reviews.length; i++) {
						listSection.appendItems(getCommentItem(e.reviews[i]));					
					}
				}

				if (nextTarget != null) {
					// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
					listSection.updateItemAt(nextTarget.index, nextTarget.item);
					nextTarget = null;
				};

				if (e.meta.total_results <= articleCount) {
					nextArticleFlag = false;
				} else {
					nextArticleFlag = true;
					var nextItem = [{
						template: 'next',
						photoCommentNextLabel: {
							text: '続きを読む',
						},
					}];
					listSection.appendItems(nextItem, {animationStyle: Titanium.UI.iPhone.RowAnimationStyle.FADE});
					// 最後の記事のIDを保管
					articleLastId = e.reviews[e.reviews.length-1].id;
				}

/*
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
*/	
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
				var review = {
					user:null, 
					content:text, 
					id:e.reviews[0].id,
					time:util.getFormattedNowDateTime(),
					newFlag: true
				};
				// コメント入力の直下に追加
				listSection.insertItemsAt(2, getCommentItem(review), {animated: true});
//				listSection.insertItemsAt(listSection.items.length, getCommentItem(review), {animated: true});
				listView.scrollToItem(0, 2, {animated: true});

				actInd.hide();
				text = '';
				_articleData.comment++;
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
	var titleUserLabel = Ti.UI.createLabel(style.photoTitleUserLabel);
	titleUserLabel.text = _articleData.user;
	if (_articleData.name != '') {
		var titleNameLabel = Ti.UI.createLabel(style.photoTitleNameLabel);
		titleNameLabel.text = _articleData.name;
		nameView.add(titleNameLabel);
		titleUserLabel.height = '16dp';
	}
	nameView.add(titleUserLabel);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	photoWin.leftNavButton = backButton;

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

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
				}],
				events: {
					'click': function (e) {
						Ti.API.debug('[event]photoPhotoView.click:');
						if ( blurCommentField() == false ) {
							photoWin.close({animated:true});
						}
					}
				}

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
						'click': function(e) {
							// テキストフィールド入力中でないかチェック
							if ( blurCommentField() == false ) {
								clickLikeStampImage(e);
							}
						}
					}
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
						'focus': function(e) {
							if (_articleData.comment == commentMax) {
								var alertDialog = Titanium.UI.createAlertDialog({
									title: '投稿できるコメントは\n最大20件です。',
									buttonNames: ['OK'],
								});
								alertDialog.show();
								
							} else {
								commentField = e.source;
								commentField.focusFlag = true;
							}
						},
						'return': function(e) {
							if (e.source.value != '') {
								addComment(e.source.value);
								e.source.value = '';
								blurCommentField();
							}
						}
					}
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
			bindId: 'photoCommentFrameView',
			properties: style.photoCommentFrameView,
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
					}],
					events: {
						'click': function (e) {
							Ti.API.debug('[event]photoCommentUserIconView.click:');
							var item = e.section.getItemAt(e.itemIndex);
							if (item.userId != loginUser.id) {
								listView.touchEnabled = false;
								// ユーザデータの取得
								model.getCloudUser(item.userId, function(e) {
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
					}
	
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
						}]
					},{
						type: 'Ti.UI.Label',
						bindId: 'photoCommentTextLabel',
						properties: style.photoCommentTextLabel,
						events: {
							'click': function (e) {
								Ti.API.debug('[event]photoCommentTextLabel.click:');
								if ( blurCommentField() == false ) {
									photoWin.close({animated:true});
								}
							}
						}
					},{
						type: 'Ti.UI.Label',
						bindId: 'photoCommentTimeLabel',
						properties: style.photoCommentTimeLabel,
					}]
				}]
			}]
		}],
		events: {
			'longpress': function (e) {
				Ti.API.debug('[event]photoCommentView.longpress:');
				var item = e.section.getItemAt(e.itemIndex);
	
				// 削除できるのは自分のコメントのみ
				if (item.userId == loginUser.id) {
					listView.touchEnabled = false;
					var targetView = e.source;
					targetView.backgroundColor = '#dedede';
					var deleteIndex = e.itemIndex;
	
					var alertDialog = Titanium.UI.createAlertDialog({
						title: 'コメントを削除しますか？',
						buttonNames: ['キャンセル','OK'],
						cancel: 1
					});
					alertDialog.show();
			
					alertDialog.addEventListener('click',function(alert){
						// OKの場合
						if(alert.index == 1){
							model.removeCloudCommentList({
								postId: _articleData.id,
								reviewId: item.reviewId
							}, function(e) {
								Ti.API.debug('[func]removeCloudCommentList.callback:');
								if (e.success) {
									Ti.API.debug('Success:');
									listSection.deleteItemsAt(deleteIndex, 1, {animated:true});
	
									_articleData.comment--;
									if (photoWin.prevWin != null) {
										photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:0, comment:-1});
									}
				
								} else {
									util.errorDialog(e);
								}
								targetView.backgroundColor = 'white';
								listView.touchEnabled = true;
							});
	
						} else {
								targetView.backgroundColor = 'white';
								listView.touchEnabled = true;
						}
					});
				}
			}
		}
	};
	var nextListTemplate = {
		properties: style.photoCommentNextList,
		childTemplates: [{
			type: 'Ti.UI.Label',
			bindId: 'photoCommentNextLabel',
			properties: style.photoCommentNextLabel,
		}],
		events: {
			'click': function (e) {
				Ti.API.debug('[event]photoCommentNextList.click:');
				listView.touchEnabled = false;
				var item = e.section.getItemAt(e.itemIndex);
				// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
				item.photoCommentNextLabel.text = '';
				item.photoCommentNextLabel.height = '0dp';
				nextTarget = {index:e.itemIndex, item:item};
				updateComment();
				listView.touchEnabled = true;
			}
		}		
	};
/*
	var bottomListTemplate = {
		properties: style.photoBottomList,
		childTemplates: [{
			type: 'Ti.UI.View',
			bindId: 'photoCommentBottomView',
			properties: style.photoCommentBottomView,
		}]
	};
*/	
	var listView = Ti.UI.createListView(style.photoTableListView);
	listView.templates = {
		'article': articleListTemplate,
		'action': actionListTemplate,
		'load': loadListTemplate,
		'comment': commentListTemplate,
		'next': nextListTemplate,
//		'bottom': bottomListTemplate
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

	listView.addEventListener('click', function(e){
		Ti.API.debug('[event]listView.click:');
		var item = e.section.getItemAt(e.itemIndex);
	});
/*
	listView.addEventListener('itemclick', function(e){
		Ti.API.debug('[event]listView.itemclick:');
		var item = e.section.getItemAt(e.itemIndex);

		if (item.template == 'article') {
			if( e.bindId == 'photoPhotoImage'
//				|| e.bindId == 'photoArticleTextView'
//				|| e.bindId == 'photoTextView'
//				|| e.bindId == 'photoTimeLabel'
//				|| e.bindId == 'photoTextLabel'
				) {
				// テキストフィールド入力中でないかチェック
				if ( blurCommentField() == false ) {
					photoWin.close({animated:true});
				}
			}

		} else if (item.template == 'comment' && e.bindId == 'photoCommentUserIconImage') {

			if (item.userId != loginUser.id) {
				listView.touchEnabled = false;
				// ユーザデータの取得
				model.getCloudUser(item.userId, function(e) {
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

		} else if (item.template == 'next') {
			listView.touchEnabled = false;
			// 続きを読むの行をdeleteだとうまくいかないのでupdateで高さを0にし、追加後に反映
			item.photoCommentNextLabel.text = '';
			item.photoCommentNextLabel.height = '0dp';
			nextTarget = {index:e.itemIndex, item:item};
			updateComment();
			listView.touchEnabled = true;
		}
	});

	listView.addEventListener('longpress', function(e){
		Ti.API.debug('[event]listView.longpress:');
		var item = e.section.getItemAt(e.itemIndex);

		if (item.template == 'comment') {
			if (_articleData.userId != loginUser.id) {
				var alertDialog = Titanium.UI.createAlertDialog({
					title: 'コメントを削除しますか？',
					buttonNames: ['キャンセル','OK'],
					cancel: 1
				});
				alertDialog.show();
		
				alertDialog.addEventListener('click',function(alert){
					// OKの場合
					if(alert.index == 1){
						listView.touchEnabled = false;

						model.removeCloudCommentList({
							postId: _articleData.id,
							reviewId: item.reviewId
						}, function(e) {
							Ti.API.debug('[func]removeCloudCommentList.callback:');
							if (e.success) {
								Ti.API.debug('Success:');
								listSection.deleteItemsAt(e.itemIndex, 1);

								if (photoWin.prevWin != null) {
									photoWin.prevWin.fireEvent('refresh', {index:_articleData.index, like:0, comment:-1});
								}
			
							} else {
								util.errorDialog(e);
							}
							listView.touchEnabled = true;
						});
					}
				});
			}
		}
	});
*/
	return photoWin;
};
