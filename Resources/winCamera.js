// カメラ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winCamera.createWindow:');

	var articleData = {
		no:"A0023", 
		user:"sakura", 
		date:"2013-02-09 10:26:05", 
		text:"★明けましておめでとうございます。今年もよい年になりますように。ハッピーニューイヤー！", 
		like:"0", 
		comment:"0"};

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

	var articleView = Titanium.UI.createView(style.cameraArticleView);
	cameraWin.add(articleView);
	articleView.hide();

	var articleImage = Titanium.UI.createImageView(style.cameraArticleImage);
	articleView.add(articleImage);

	var articleTextArea = Ti.UI.createTextArea(style.cameraArticleTextArea);
	articleView.add(articleTextArea);

	Ti.Media.openPhotoGallery({
		success: function(e) {
			Ti.API.debug('sucess:');
			articleImage.image = e.media;
			articleView.show();
		 },
		cancel: function(e) {
			Ti.API.debug('cancel:');
			articleImage.image = 'images/photo/today_sakura.jpg';
			articleView.show();
		 },
		error: function(e) {
			Ti.API.debug('error:');
		 },
		allowEditing: false,
		mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
	});


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		cameraWin.close({animated:true});
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
				// 処理を書く
				
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
	articleTextArea.addEventListener('focus',function(e){
		if (e.source.value == e.source.hintText) {
			e.source.value = "";
			e.source.color = "black";
		}
	});
	// 入力ボックスにフォーカスが外れる
	articleTextArea.addEventListener('blur',function(e){
		if (e.source.value == "") {
			e.source.value = e.source.hintText;
			e.source.color = "gray";
		}
	});

	// 画面クリックでコメントフィールドのフォーカスを外す
	cameraWin.addEventListener('click',function(e){
		Ti.API.debug('[event]cameraWin.click:');
		articleTextArea.blur();
	});

	return cameraWin;
}
