// カメラ

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winCamera.createWindow:');
	Ti.API.debug('_type:' + _type);


	// 写真の表示
	var showPhotoView = function(_image) {
		Ti.API.debug('[func]showPhotoView:');
		articleImage.image = _image;
		var scale = Ti.Platform.displayCaps.platformWidth / _image.width;
//		articleScrollView.zoomScale = scale;
//		articleScrollView.minZoomScale = scale;
		var offsetY = ( _image.height * scale - Ti.Platform.displayCaps.platformWidth * 3 / 4 ) / 2;
		articleScrollView.contentOffset = {x:0, y:offsetY};
		articleScrollView.show();
		label.text = 'width:' + _image.width + '/ height:' + _image.height;
		label.text += '/ scale:' + scale + '/ offsetY:' + offsetY;
	};

	// 写真撮影
	var startCamera = function() {
		Ti.API.debug('[func]startCamera:');
		Titanium.Media.showCamera({
			success:function(e) {
				Ti.API.debug('success:');
				showPhotoView(e.media);
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
			saveToPhotoGallery: true,
		});
	};

	// アルバムから取得
	var pickupPhoto = function() {
		Ti.API.debug('[func]pickupPhoto:');

		Ti.Media.openPhotoGallery({
			success: function(e) {
				Ti.API.debug('success:');
				showPhotoView(e.media);
			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				articleImage.image = 'images/photo/today_sakura2.jpg';
				showPhotoView(articleImage.toBlob());
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

	// 投稿ボタンの表示
	var postButton = Titanium.UI.createButton(style.commonPlusButton);
	cameraWin.rightNavButton = postButton;

	// 撮影時のオーバーレイ
	var overlayView = Titanium.UI.createView(style.cameraOverlayView);
	var frameView = Titanium.UI.createView(style.cameraFrameView);
	overlayView.add(frameView);

	var articleScrollView = Titanium.UI.createScrollView(style.cameraArticleScrollView);
	var articleImage = Ti.UI.createImageView(style.cameraArticleImage);
	articleScrollView.add(articleImage);
	articleScrollView.hide();
	cameraWin.add(articleScrollView);

	var spaceView = Titanium.UI.createView(style.cameraSpaceView);
	cameraWin.add(spaceView);

	var label = Titanium.UI.createLabel({top:0, left:0, color:'black'});
	spaceView.add(label);

	if (_type == "camera") {
		startCamera();
		
	} else if (_type == "photo") {
		pickupPhoto();
	}


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		cameraWin.close({animated:true});
	});	

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');
//		var photoImage = editImage(articleImage.toBlob());
		var photoImage = articleScrollView.toImage();
		var cameraPostWin = win.createCameraPostWindow(_userData, photoImage);
		cameraPostWin.prevWin = cameraWin;
		win.openTabWindow(cameraPostWin);
	});

	// 更新用イベント
	cameraWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]cameraWin.refresh:');
		cameraWin.prevWin.fireEvent('refresh');
	});

	return cameraWin;
}
