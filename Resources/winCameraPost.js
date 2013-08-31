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
		textArea.blur();
	});

	// 投稿時のロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');

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

				if (_type == 'photo_camera' || _type == 'photo_select') {
					// ローカルに画像を保存
					var dirPath = Ti.Filesystem.applicationDataDirectory + 'photo/';
					var fileName = _userData.id;
					model.saveLocalImage(postImage.toBlob(), dirPath, fileName);

					var articleData = {
						id: null, 
						no: _userData.id, 
						user: _userData.user, 
						date: util.getFormattedNowDateTime(), 
						text: textArea.value, 
						photo: dirPath + fileName + '.png',
						like: "0",
						comment: "0"};
					model.postCloudArticle({
						date: articleData.date, 
						text: articleData.text,
						photo: postImage.toBlob(),
						post: _userData.post
					}, function(e) {
						Ti.API.debug('[func]postCloudArticle.callback:');
						if (e.success) {
//							model.addArticleList(articleData);
							_userData.today = articleData;
							if (cameraPostWin.prevWin != null) {
								cameraPostWin.prevWin.fireEvent('refresh');
								cameraPostWin.prevWin.close();
							}
							cameraPostWin.close({animated:true});

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
							if (cameraPostWin.prevWin != null) {
								cameraPostWin.prevWin.fireEvent('refresh');
								cameraPostWin.prevWin.close();
							}
							cameraPostWin.close({animated:true});

						} else {
							util.errorDialog(e);
						}
						actInd.hide();
					});
				}
			}
		});
	});

	// 入力ボックスにフォーカス
	textArea.addEventListener('focus',function(e){
		if (e.source.value == e.source.hintText) {
			e.source.value = "";
			e.source.color = "black";
		}
	});
	// 入力ボックスにフォーカスが外れる
	textArea.addEventListener('blur',function(e){
		if (e.source.value == "") {
			e.source.value = e.source.hintText;
			e.source.color = "gray";
		}
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	cameraPostWin.addEventListener('click',function(e){
		Ti.API.debug('[event]cameraPostWin.click:');
		textArea.blur();
	});

	return cameraPostWin;
};
