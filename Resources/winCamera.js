// カメラ

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winCamera.createWindow:');
	Ti.API.debug('_type:' + _type);

	var offsetX = 0;
	var offsetY = 0;
	var currentScale = 1;

	// 画像のリサイズ・切り抜き
	var editImage = function(_image) {
		Ti.API.debug('[func]editImage:');
		var croppedImage = null;
		var cropSize = 0;
		var cropX = 0;
//		var cropY = 50;
		// iOS7の場合
		var cropY = 0;

		if ( _image.height > _image.width ) {
			cropSize = _image.width;
		} else {
			cropSize = _image.height;
		}
		if (_type == 'photo_select' || _type == 'icon_select') {
			cropX = offsetX;
			cropY = offsetY;
		}

		// imageAsCroppedすると反転するバグがあり、同じサイズでimageAsResizedをしておく反転しない
		var resizedImage = _image.imageAsResized(_image.width, _image.height);
		croppedImage = resizedImage.imageAsCropped({
			width: cropSize, 
			height: cropSize,
			x: cropX * ( _image.height / style.commonSize.screenWidth ),
			y: cropY * ( _image.width / style.commonSize.screenWidth )
		});

		if (cropSize > 640) {
			return croppedImage.imageAsResized(640, 640);
		} else {
			return croppedImage;
		}

	};

	// 写真投稿画面のオープン
	var openCameraPostWindow = function(_image) {
		Ti.API.debug('[func]openCameraPostWindow:');
		var cameraPostWin = win.createCameraPostWindow(_type, _userData, _image);
		cameraPostWin.prevWin = cameraWin;
		win.openTabWindow(cameraPostWin, {animated:true});
	};

	// 写真撮影
	var startCamera = function() {
		Ti.API.debug('[func]startCamera:');
		Titanium.Media.showCamera({
			success:function(e) {
				Ti.API.debug('success:');
				var cameraImage = editImage(e.media);
				if (_type == 'icon_camera') {
					cameraWin.add(actBackView);
					actInd.show();
					tabGroup.add(actInd);

					// ローカルに画像を保存
					var fileName = _userData.id;
					model.saveLocalImage(cameraImage, util.local.iconPath, fileName);
		
					model.updateCloudUserIcon({
						user: _userData.user,
						icon: cameraImage
					}, function(e) {
						Ti.API.debug('[func]updateCloudUserIcon.callback:');
						if (e.success) {
							_userData.icon = util.local.iconPath + fileName + '.png';
							cameraWin.close({animated:true});
							// profileWinの更新
							var profileWin = win.getTab("profileTab").window;
							profileWin.addEventListener('refresh', function(){
								actInd.hide();
								actBackView.hide();
						    });
							profileWin.fireEvent('refresh', {icon:_userData.icon});
		
						} else {
							actInd.hide();
							actBackView.hide();
							util.errorDialog(e);
						}
					});

				} else {
					openCameraPostWindow(cameraImage);
				}
			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				cameraWin.close({animated:false});
			},
			error: function(e) {
				Ti.API.debug('error:');
				util.errorDialog(e);
			},
			mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
//			showControls: true,
			overlay: overlayView,
			// 縦サイズが撮影前後で変わらないように設定
			transform: Ti.UI.create2DMatrix().scale(1),
			// iOS7の場合
			// 編集画面を省略してfalseにするとボタンを押しても次へ進めなくなるのでtrue
			allowEditing: true,
			saveToPhotoGallery: false,
		});
	};

	// アルバムから取得
	var pickupPhoto = function() {
		Ti.API.debug('[func]pickupPhoto:');

		Ti.Media.openPhotoGallery({
			success: function(e) {
				Ti.API.debug('success:');
				var pickupImage = e.media;
				// 写真の真ん中に合わせる
				var scale = 1.0;
				if (pickupImage.height > pickupImage.width) {
					articleImage.width = style.commonSize.screenWidth + 'dp';
					articleImage.height = Ti.UI.SIZE;
					scale = style.commonSize.screenWidth / pickupImage.width;
					offsetX = 0;
					offsetY = ( pickupImage.height * scale - style.commonSize.screenWidth) / 2;
				} else {
					articleImage.width = Ti.UI.SIZE;
					articleImage.height = style.commonSize.screenWidth + 'dp';
					scale = style.commonSize.screenWidth / pickupImage.height;
					offsetX = ( pickupImage.width * scale - style.commonSize.screenWidth) / 2;
					offsetY = 0;
				}
				articleScrollView.setContentOffset({x:offsetX, y:offsetY}, {animated:false});
				articleImage.image = pickupImage;
				cameraWin.backgroundColor = 'white';

			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				cameraWin.close({animated:false});
			},
			error: function(e) {
				Ti.API.debug('error:');
			},
			mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
			// 縦サイズが撮影前後で変わらないように設定
			transform: Ti.UI.create2DMatrix().scale(1),
			allowEditing: false,
			saveToPhotoGallery: false,
		});
	};

// ---------------------------------------------------------------------
	var cameraWin = Ti.UI.createWindow(style.cameraWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.cameraTitleLabel);	
	cameraWin.titleControl = titleLabel;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	cameraWin.leftNavButton = backButton;

	// 選択ボタンの表示
	var selectButton = Titanium.UI.createButton(style.cameraSelectButton);

	var articleScrollView = Titanium.UI.createScrollView(style.cameraArticleScrollView);

	// フレーム余白 ＝ ( 全体の高さーフレームの高さー（ステータスバー(20)＋タイトルバー(44)＋下のタブ(44)) ) / 2
	var frameSpace = ( style.commonSize.screenHeight - style.commonSize.screenWidth - 108 ) / 2;
	// フレームの上部余白部分
	var frameHeadView = Titanium.UI.createView(style.cameraFrameSpaceView);
	frameHeadView.height = frameSpace + 'dp';
	articleScrollView.add(frameHeadView);

	// 写真の表示
	var articleImage = Ti.UI.createImageView(style.cameraArticleImage);
	articleScrollView.add(articleImage);
	cameraWin.add(articleScrollView);

	// フレームの下部余白部分
	var frameFooterView = Titanium.UI.createView(style.cameraFrameSpaceView);
	// 下のタブ(44) + 上部余白
	frameFooterView.height = (44 + frameSpace) + 'dp';
	articleScrollView.add(frameFooterView);

	// 撮影時のオーバーレイ
	var overlayView = Titanium.UI.createView(style.cameraOverlayView);
	// フレーム
	var frameView = Titanium.UI.createView(style.cameraFrameView);

	if (_type == 'photo_camera') {
		titleLabel.text = '取り込み中';
//		frameView.top = '50dp';
		// iOS7の場合
		frameView.top = '88dp';
		overlayView.add(frameView);

	} else if (_type == 'icon_camera') {
		titleLabel.text = '取り込み中';
//		frameView.top = '50dp';
		// iOS7の場合
		frameView.top = '88dp';
		frameView.borderRadius = (Ti.Platform.displayCaps.platformWidth / 2) + 'dp';
		overlayView.add(frameView);

	} else if (_type == 'photo_select') {
		titleLabel.text = 'わんこ写真';
		frameView.top = frameSpace + 'dp';
		cameraWin.add(frameView);
		selectButton.title = '選択',
		cameraWin.rightNavButton = selectButton;

	} else if (_type == 'icon_select') {
		titleLabel.text = 'わんこ写真';
		frameView.top = frameSpace + 'dp';
		frameView.borderRadius = (Ti.Platform.displayCaps.platformWidth / 2) + 'dp';
		cameraWin.add(frameView);
		selectButton.title = '登録',
		cameraWin.rightNavButton = selectButton;
	}

	if (_type == 'photo_camera' || _type == 'icon_camera') {
		startCamera();
		
	} else if (_type == 'photo_select' || _type == 'icon_select') {
		pickupPhoto();
	}

	// 投稿時のロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	var actBackView = Titanium.UI.createView(style.commonActivityBackView);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		if (_type == 'photo_select' || _type == 'icon_select') {
			articleImage.image = null;
			pickupPhoto();
		}
	});	

	// 選択ボタンをクリック
	selectButton.addEventListener('click', function(e){
		Ti.API.debug('[event]selectButton.click:');
		var postImage = editImage(articleImage.toBlob());
		if (_type == 'photo_select') {
			openCameraPostWindow(postImage);

		} else if (_type == 'icon_select') {
			selectButton.enabled = false;
			cameraWin.add(actBackView);
			actInd.show();
			tabGroup.add(actInd);

			// ローカルに画像を保存
			var fileName = _userData.id;
			model.saveLocalImage(postImage, util.local.iconPath, fileName);

			model.updateCloudUserIcon({
				user: _userData.user,
				icon: postImage
			}, function(e) {
				Ti.API.debug('[func]updateCloudUserIcon.callback:');
				if (e.success) {
					_userData.icon = util.local.iconPath + fileName + '.png';
					cameraWin.close({animated:true});
					// profileWinの更新
					var profileWin = win.getTab("profileTab").window;
					profileWin.addEventListener('refresh', function(){
						actInd.hide();
						actBackView.hide();
						selectButton.enabled = true;
				    });
					profileWin.fireEvent('refresh', {icon:_userData.icon});

				} else {
					actInd.hide();
					actBackView.hide();
					selectButton.enabled = true;
					util.errorDialog(e);
				}
			});
		}
	});

	// スクロールイベント
	articleScrollView.addEventListener('scroll', function(e){
		Ti.API.debug('[event]articleScrollView.scroll:');
		offsetX = e.x;
		offsetY = e.y;		
	});

/*
	// 拡大縮小イベント ※ピンチ後の画像修正が難しいのでやめる
	articleScrollView.addEventListener('pinch', function(e){
		Ti.API.debug('[event]articleScrollView.pinch:');
		Ti.API.info('scale=' + e.scale);
		currentScale = e.scale;
	});
*/
	// 撮影用イベント
	cameraWin.addEventListener('openCamera', function(e){
		Ti.API.debug('[event]cameraWin.openCamera:');
		if (_type == "photo_camera" || _type == 'icon_camera') {
			startCamera();	
		}
	});

	return cameraWin;
};
