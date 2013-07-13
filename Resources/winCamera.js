// カメラ

exports.createWindow = function(_type, _userData){
	Ti.API.debug('[func]winCamera.createWindow:');
	Ti.API.debug('_type:' + _type);

	// 画像のリサイズ・切り抜き
	var editImage = function(_image) {
		Ti.API.debug('[func]editImage:');
		var resizedImage = _image.imageAsResized(
			Ti.Platform.displayCaps.platformWidth, 
			Ti.Platform.displayCaps.platformWidth * (_image.height / _image.width)
		);
		var croppedImage = resizedImage.imageAsCropped({
			width: Ti.Platform.displayCaps.platformWidth, 
			height: (Ti.Platform.displayCaps.platformWidth * 3 / 4)
		});
		return croppedImage;
	};

	// 写真撮影
	var startCamera = function() {
		Ti.API.debug('[func]startCamera:');
		Titanium.Media.showCamera({
			success:function(e) {
				Ti.API.debug('success:');
				articleImage.image = editImage(e.media);
				articleView.show();
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
			allowEditing:false,
			saveToPhotoGallery:true,
		});
	};

	// アルバムから取得
	var pickupPhoto = function() {
		Ti.API.debug('[func]pickupPhoto:');

		Ti.Media.openPhotoGallery({
			success: function(e) {
				Ti.API.debug('success:');
				articleImage.image = editImage(e.media);
				articleView.show();
			},
			cancel: function(e) {
				Ti.API.debug('cancel:');
				articleImage.image = 'images/photo/today_sakura2.jpg';
				articleImage.image = editImage(articleImage.toBlob());
				articleView.show();
			},
			error: function(e) {
				Ti.API.debug('error:');
			},
			allowEditing: false,
			mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
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
	var displayView = Titanium.UI.createView(style.cameraDisplayView);
	overlayView.add(displayView);
	var frameView = Titanium.UI.createView(style.cameraFrameView);
	displayView.add(frameView);

	var articleView = Titanium.UI.createView(style.cameraArticleView);
	cameraWin.add(articleView);
	articleView.hide();

	var textArea = Ti.UI.createTextArea(style.cameraArticleTextArea);
	articleView.add(textArea);

	var articleImage = Titanium.UI.createImageView(style.cameraArticleImage);
	articleView.add(articleImage);

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
			buttonNames: ['OK','キャンセル'],
			cancel: 1
		});
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
			// OKの場合
			if(alert.index == 0){
				actInd.show();
				tabGroup.add(actInd);

				var nowDate = util.getFormattedNowDateTime();
				var date = util.getDateElement(nowDate);
				var fileNo = date.year + date.month + date.day + date.hour + date.minute + date.second;
				var photoDir  = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + 'photo/');
				if (! photoDir.exists()) {
					photoDir.createDirectory();
				}
				var photoFile  = Ti.Filesystem.getFile(photoDir.nativePath + fileNo + '.jpg');
				photoFile.write(articleImage.toBlob());

				var articleData = {
					id:null, 
					no:fileNo, 
					user:_userData.user, 
					date:nowDate, 
					text:textArea.value, 
					like:"0", 
					comment:"0"};

				model.addArticleList(articleData);
				
				if (cameraWin.prevWin != null) {
					cameraWin.prevWin.fireEvent('refresh');
				}
				cameraWin.close({animated:true});

				setTimeout(function(){
					actInd.hide();
				},2000);
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
	cameraWin.addEventListener('click',function(e){
		Ti.API.debug('[event]cameraWin.click:');
		textArea.blur();
	});

	return cameraWin;
}
