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

		if (_type == 'photo_camera') {
/*
			var resizedImage = _image.imageAsResized(640, _image.height * 640 / _image.width);
			croppedImage = resizedImage.imageAsCropped({
				width: resizedImage.width, 
				height: resizedImage.width * 3 / 4,
				x: 0, 
				y: 200
			});
			return croppedImage;
*/
			var resizedImage = _image.imageAsResized(_image.width, _image.height);
			croppedImage = resizedImage.imageAsCropped({
				width: resizedImage.width, 
//				height: resizedImage.width * 3 / 4,
				height: resizedImage.width,
				x: 0, 
				y: 100 * ( _image.width / style.commonSize.screenWidth )
			});
			if (_image.width > 640) {
//				return croppedImage.imageAsResized(640, 480);
				return croppedImage.imageAsResized(640, 640);
			} else {
				return croppedImage;
			}

		} else if (_type == 'icon_camera') {
/*
			var resizedImage = _image.imageAsResized(640, _image.height * 640 / _image.width);
			croppedImage = resizedImage.imageAsCropped({
				width: resizedImage.width, 
				height: resizedImage.width,
				x: 0, 
				y: 140
			});
			return croppedImage;
*/
			var resizedImage = _image.imageAsResized(_image.width, _image.height);
			croppedImage = resizedImage.imageAsCropped({
				width: resizedImage.width, 
				height: resizedImage.width,
				x: 0, 
				y: 50 * ( _image.width / style.commonSize.screenWidth )
			});
			if (_image.width > 640) {
				return croppedImage.imageAsResized(640, 640);
			} else {
				return croppedImage;
			}

		} else if (_type == 'photo_select') {
			// 先にリサイズすると、切り取る座標が変わってしまい、
			// 切取りを先にするとバグで反転してしまう、リサイズすると反転しないので、同じサイズでリサイズ
			var resizedImage = null;
			var cropSize = null;
			if (_image.height > _image.width) {
				resizedImage = _image.imageAsResized(style.commonSize.screenWidth, _image.height * (style.commonSize.screenWidth / _image.width));
				cropSize = resizedImage.width;
			} else {
				resizedImage = _image.imageAsResized(_image.width * (style.commonSize.screenWidth / _image.height), style.commonSize.screenWidth);
				cropSize = resizedImage.height;
			}
			croppedImage = resizedImage.imageAsCropped({
				width: cropSize, 
				height: cropSize,
				x: offsetX,
				y: offsetY
			});
//			if (_image.width > 640) {
//				return croppedImage.imageAsResized(640, 480);
//				return croppedImage.imageAsResized(640, 640);
//			} else {
				return croppedImage;
//			}

/*
			// imageAsCroppedすると反転するバグがあり、同じサイズでimageAsResizedをしておく反転しない
			croppedImage = _image.imageAsResized(_image.width, _image.height).imageAsCropped({
				width: _image.width, 
				height: _image.width * 3 / 4,
				x: offsetX, y: offsetY * ( _image.width / style.commonSize.screenWidth )
			});
			if (_image.width > 640) {
				return croppedImage.imageAsResized(640, 480);
			} else {
				return croppedImage;
			}
*/
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
				// 写真の真ん中に合わせる
				var scale = 1.0;
				if (e.media.height > e.media.width) {
					articleImage.width = style.commonSize.screenWidth + 'dp';
					articleImage.height = Ti.UI.SIZE;
					scale = style.commonSize.screenWidth / e.media.width;
					offsetX = 0;
					offsetY = ( e.media.height * scale - style.commonSize.screenWidth) / 2;
				} else {
					articleImage.width = Ti.UI.SIZE;
					articleImage.height = style.commonSize.screenWidth + 'dp';
					scale = style.commonSize.screenWidth / e.media.height;
					offsetX = ( e.media.width * scale - style.commonSize.screenWidth) / 2;
					offsetY = 0;
				}
				articleScrollView.setContentOffset({x:offsetX, y:offsetY}, {animated:false});
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
	frameView.top = frameSpace + 'dp';
	frameView.width = style.commonSize.screenWidth + 'dp';
	frameView.height = style.commonSize.screenWidth + 'dp';

	if (_type == 'photo_camera') {
		titleLabel.text = '取り込み中';
		overlayView.add(frameView);

	} else if (_type == 'icon_camera') {
		titleLabel.text = '取り込み中';
		overlayView.add(frameView);

	} else if (_type == 'photo_select') {
		titleLabel.text = 'わんこ写真';
		cameraWin.rightNavButton = selectButton;
		cameraWin.add(frameView);
	}

	if (_type == 'photo_camera' || _type == 'icon_camera') {
		startCamera();
		
	} else if (_type == 'photo_select') {
		pickupPhoto();
	}


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		if (_type == 'photo_select') {
			articleImage.image = null;
			pickupPhoto();
		}
	});	

	// 選択ボタンをクリック
	selectButton.addEventListener('click', function(e){
		Ti.API.debug('[event]selectButton.click:');
		if (_type == 'photo_select') {
			openCameraPostWindow(editImage(articleImage.toBlob()));
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
/*
	// 更新用イベント
	cameraWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]cameraWin.refresh:');
		cameraWin.prevWin.fireEvent('refresh');
	});
*/
	return cameraWin;
};
