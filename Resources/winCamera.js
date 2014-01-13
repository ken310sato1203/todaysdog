// カメラ

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winCamera.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 画像のリサイズ・切り抜き
	var editImage = function(_image) {
		Ti.API.debug('[func]editImage:');
		var croppedImage = null;
		if (_type == 'photo_camera') {
//			var resizedImage = _image.imageAsResized(640, _image.height * 640 / _image.width);
			var resizedImage = _image.imageAsResized(1280, _image.height * 1280 / _image.width);
			croppedImage = resizedImage.imageAsCropped({
				width: resizedImage.width, 
				height: resizedImage.width * 3 / 4,
				x: 0, y: 200
			});
		} else {
//			var resizedImage = _image.imageAsResized(640, _image.height * 640 / _image.width);
			var resizedImage = _image.imageAsResized(1280, _image.height * 1280 / _image.width);
			croppedImage = resizedImage.imageAsCropped({
//				width: 640,
				width: 1280,
//				height: 640,
				height: 1280,
				x: 0, y: 100
			});
		}
		return croppedImage;
	};

	// 写真投稿画面のオープン
	var openCameraPostWindow = function(_image) {
		Ti.API.debug('[func]openCameraPostWindow:');
		var cameraPostWin = win.createCameraPostWindow(_type, _userData, _image);
		cameraPostWin.prevWin = cameraWin;
		win.openTabWindow(cameraPostWin, {animated:false});
	};

	// 写真撮影
	var startCamera = function() {
		Ti.API.debug('[func]startCamera:');
		Titanium.Media.showCamera({
			success:function(e) {
				Ti.API.debug('success:');
				openCameraPostWindow(editImage(e.media));
			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				cameraWin.close({animated:true});
			},
			error: function(e) {
				Ti.API.debug('error:');
			},
			mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
			showControls: true,
			overlay: overlayView,
			// 縦サイズが撮影前後で変わらないように設定
			transform: Ti.UI.create2DMatrix().scale(1),
			allowEditing: false,
			saveToPhotoGallery: false,
		});
	};

	// アルバムから取得
	var pickupPhoto = function() {
		Ti.API.debug('[func]pickupPhoto:');

		Ti.Media.openPhotoGallery({
			success: function(e) {
				Ti.API.debug('success:');
				var scale = Ti.Platform.displayCaps.platformWidth / e.media.width;
				if (_type == 'photo_camera' || _type == 'photo_select') {
					var offsetY = ( e.media.height * scale - Ti.Platform.displayCaps.platformWidth * 3 / 4 ) / 2;
				} else {
					var offsetY = ( e.media.height * scale - Ti.Platform.displayCaps.platformWidth ) / 2;
				}
				articleScrollView.setContentOffset({x:0, y:offsetY}, {animated:false});
				articleImage.image = e.media;
				cameraWin.backgroundColor = 'white';
			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				cameraWin.close({animated:true});
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

	// 次へボタンの表示
	var postButton = Titanium.UI.createButton(style.cameraNextButton);
	cameraWin.rightNavButton = postButton;

	// 写真の表示
	var articleScrollView = Titanium.UI.createScrollView(style.cameraArticleScrollView);
	if (_type == 'photo_camera' || _type == 'photo_select') {
		articleScrollView.width = Ti.Platform.displayCaps.platformWidth + 'dp';
		articleScrollView.height = (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp';
	} else {
		articleScrollView.width = Ti.Platform.displayCaps.platformWidth + 'dp';
		articleScrollView.height = Ti.Platform.displayCaps.platformWidth + 'dp';		
	}
	var articleImage = Ti.UI.createImageView(style.cameraArticleImage);
	articleScrollView.add(articleImage);
	cameraWin.add(articleScrollView);

	// 撮影時のオーバーレイ
	var overlayView = Titanium.UI.createView(style.cameraOverlayView);
	var frameView = Titanium.UI.createView(style.cameraFrameView);
	if (_type == 'photo_camera' || _type == 'photo_select') {
		frameView.top = '100dp';
		frameView.width = Ti.Platform.displayCaps.platformWidth + 'dp';
		frameView.height = (Ti.Platform.displayCaps.platformWidth * 3 / 4) + 'dp';
	} else {
		frameView.top = '50dp';
		frameView.width = Ti.Platform.displayCaps.platformWidth + 'dp';
		frameView.height = Ti.Platform.displayCaps.platformWidth + 'dp';		
	}
	overlayView.add(frameView);

	if (_type == 'photo_camera' || _type == 'icon_camera') {
		startCamera();
		
	} else if (_type == 'photo_select' || _type == 'icon_select') {
		pickupPhoto();
	}


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		if (_type == 'photo_select' || _type == 'icon_select') {
			articleImage.image = null;
			pickupPhoto();
		}
	});	

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');
		if (_type == 'photo_select' || _type == 'icon_select') {
			var photoImage = articleScrollView.toImage();
			var cameraPostWin = win.createCameraPostWindow(_type, _userData, photoImage);
			cameraPostWin.prevWin = cameraWin;
			win.openTabWindow(cameraPostWin, {animated:true});
		}
	});

	// 撮影用イベント
	cameraWin.addEventListener('openCamera', function(e){
		Ti.API.debug('[event]cameraWin.openCamera:');
		if (_type == "photo_camera" || _type == 'icon_camera') {
			startCamera();	
		}
	});
/*
	// 更新用イベント
	cameraWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]cameraWin.refresh:');
		cameraWin.prevWin.fireEvent('refresh');
	});
*/
	return cameraWin;
};
