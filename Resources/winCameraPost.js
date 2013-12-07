// カメラ投稿

exports.createWindow = function(_type, _userData, _photoImage){
	Ti.API.debug('[func]winCameraPost.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 通知設定の更新
	var updateNotice = function() {
		Ti.API.debug('[func]updateNotice:');
		// 通知設定の初期化
		Ti.App.iOS.cancelAllLocalNotifications();
		
		var userId = _userData.id;
		var message = '今日のワンコを写真に撮ろう！';
		var name = _userData.name;
		if (name) {
			message = "今日の「" +name + "」さんを写真に撮ろう！";
		}
		var hour = '18:00';
		var notice = Ti.App.Properties.getString(userId + '_' + 'notice');
		if (notice) {
			hour = notice;
		}
		// 通知を明日に設定変更
		var now = new Date();
		var time = String.format("%04.0f/%02.0f/%02.0f ", now.getFullYear(), now.getMonth() + 1, now.getDate() + 1) + hour;	
		
		Ti.App.iOS.scheduleLocalNotification({
			alertBody: message,
			alertAction: 'OK',
			date: new Date(time),
			repeat: 'daily'
		});	
	};

// ---------------------------------------------------------------------
	var cameraPostWin = Ti.UI.createWindow(style.cameraPostWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.cameraPostTitleLabel);	
	cameraPostWin.titleControl = titleLabel;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	cameraPostWin.leftNavButton = backButton;

	// 投稿ボタンの表示
	var postButton = Titanium.UI.createButton(style.commonPlusButton);
	cameraPostWin.rightNavButton = postButton;

	var postScrollView = Titanium.UI.createScrollView(style.cameraPostScrollView);
	cameraPostWin.add(postScrollView);
	var postView = Titanium.UI.createView(style.cameraPostView);
	postScrollView.add(postView);

	var iconView = null;
	var postImage = null;
	var	textArea = Ti.UI.createTextArea(style.cameraPostTextArea);

	if (_type == 'photo_camera' || _type == 'photo_select') {
		postImage = Titanium.UI.createImageView(style.cameraPostImage);
		postImage.image = _photoImage;
		postView.add(postImage);
		postView.add(textArea);
	} else {
		postScrollView.backgroundColor = 'white';
		iconView = Titanium.UI.createView(style.cameraPostIconView);
		postScrollView.add(iconView);
		postImage = Titanium.UI.createImageView(style.cameraPostIconImage);
		postImage.image = _photoImage;
		iconView.add(postImage);
	}

	// 投稿時のロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		if (cameraPostWin.prevWin != null) {
			cameraPostWin.prevWin.fireEvent('openCamera');
		}
		cameraPostWin.close({animated:true});
	});	

	textArea.addEventListener('focus',function(e){
		if (e.source.value == e.source.hintText) {
			e.source.value = "";
			e.source.color = "black";
		}
	});
	textArea.addEventListener('blur',function(e){
		if (e.source.value == "") {
			e.source.value = e.source.hintText;
			e.source.color = "gray";
		}
	});
	// 入力ボックスでリターンでフォーカスを外す
	textArea.addEventListener('return',function(e){
		Ti.API.debug('[event]textArea.return:');
		e.source.value = e.source.value.replace(/\n+$/g,'');
		textArea.blur();
		postButton.fireEvent('click');
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	cameraPostWin.addEventListener('click',function(e){
		Ti.API.debug('[event]cameraPostWin.click:');
		textArea.blur();
	});

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');

		if (textArea.value == textArea.hintText || textArea.value == "") {
			var commentDialog = Titanium.UI.createAlertDialog({
				title: 'コメントを入力してください',
				buttonNames: ['OK'],
			});
			commentDialog.show();
		} else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title: '投稿しますか？',
				buttonNames: ['キャンセル','OK'],
				cancel: 1
			});
			alertDialog.show();
	
			alertDialog.addEventListener('click',function(alert){
				// OKの場合
				if(alert.index == 1){
					actInd.show();
					tabGroup.add(actInd);
	
					if (_type == 'photo_camera' || _type == 'icon_camera') {
						// カメラロールに画像を保存する
						Titanium.Media.saveToPhotoGallery(postImage.toBlob(), {
							success : function(e) {
								Ti.API.debug('success:');
							},
							error : function(e) {
								Ti.API.debug('error:');
							}
						});
					}
	
					// todayWinの更新
					var todayWin = win.getTab("todayTab").window;

					if (_type == 'photo_camera' || _type == 'photo_select') {
						// ローカルに画像を保存
						var now = new Date();
						var nowDate = util.getFormattedDate(now);
						var nowDateTime = util.getFormattedDateTime(now);
						var fileName = _userData.id + "_" + nowDate;
						model.saveLocalImage(postImage.toBlob(), util.local.photoPath, fileName);
	
						var articleData = {
							id: null, 
//							no: _userData.id, 
							userId: _userData.id, 
							date: nowDateTime, 
							text: textArea.value, 
							photo: util.local.photoPath + fileName + '.png',
							like: "0",
							comment: "0"
						};
						model.addCloudArticle({
							articleData: articleData,
							photo: postImage.toBlob()
						}, function(e) {
							Ti.API.debug('[func]addCloudArticle.callback:');
							if (e.success) {
								// ローカルに登録
								model.addLocalArticleList([e.articleData]);
								_userData.today = e.articleData;

								// 遷移前の画面を閉じる
								if (cameraPostWin.prevWin != null) {
									cameraPostWin.prevWin.close();
								}
								// todayWinの更新
								todayWin.fireEvent('refresh');
								todayWin.addEventListener('refresh', function(){
									cameraPostWin.close({animated:false});
							    });
							    
							    // 通知設定の更新
							    updateNotice();
	
							} else {
								util.errorDialog(e);
							}
							actInd.hide();
						});
						
					} else {
						// ローカルに画像を保存
						var fileName = _userData.id;
						model.saveLocalImage(postImage.toBlob(), util.local.iconPath, fileName);
						model.updateCloudUserIcon({icon: postImage.toBlob()}, function(e) {
							Ti.API.debug('[func]updateCloudUserIcon.callback:');
							if (e.success) {
								_userData.icon = util.local.iconPath + fileName + '.png';

								// 遷移前の画面を閉じる
								if (cameraPostWin.prevWin != null) {
									cameraPostWin.prevWin.close();
								}
								// todayWinの更新
								todayWin.fireEvent('refresh');
								todayWin.addEventListener('refresh', function(){
									cameraPostWin.close({animated:false});
							    });
	
							} else {
								util.errorDialog(e);
							}
							actInd.hide();
						});
					}
				}
			});			
		}
	});

	return cameraPostWin;
};
