// カメラ投稿

exports.createWindow = function(_type, _userData, _photoImage){
	Ti.API.debug('[func]winCameraPost.createWindow:');
	Ti.API.debug('_type:' + _type);

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
						var dirPath = Ti.Filesystem.applicationDataDirectory + 'photo/';
						var fileName = _userData.id + "_" + nowDate;
						model.saveLocalImage(postImage.toBlob(), dirPath, fileName);
	
						var articleData = {
							id: null, 
//							no: _userData.id, 
							userId: _userData.id, 
							date: nowDateTime, 
							text: textArea.value, 
							photo: dirPath + fileName + '.png',
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
	
							} else {
								util.errorDialog(e);
							}
							actInd.hide();
						});
						
					} else {
						// ローカルに画像を保存
						var dirPath = Ti.Filesystem.applicationDataDirectory + 'icon/';
						var fileName = _userData.id;
						model.saveLocalImage(postImage.toBlob(), dirPath, fileName);
						model.updateCloudUserIcon({icon: postImage.toBlob()}, function(e) {
							Ti.API.debug('[func]updateCloudUserIcon.callback:');
							if (e.success) {
								_userData.icon = dirPath + fileName + '.png';

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
