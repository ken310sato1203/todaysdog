// カメラ投稿

exports.createWindow = function(_userData, _photoImage){
	Ti.API.debug('[func]winCameraPost.createWindow:');

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

	var articleScrollView = Titanium.UI.createScrollView(style.cameraPostArticleScrollView);
	cameraPostWin.add(articleScrollView);
	var articleView = Titanium.UI.createView(style.cameraPostArticleView);
	articleScrollView.add(articleView);

	var articleImage = Titanium.UI.createImageView(style.cameraPostArticleImage);
	articleImage.image = _photoImage;
	articleView.add(articleImage);

	var textArea = Ti.UI.createTextArea(style.cameraPostArticleTextArea);
	articleView.add(textArea);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
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
				
				if (cameraPostWin.prevWin != null) {
					cameraPostWin.prevWin.fireEvent('refresh');
					cameraPostWin.prevWin.close();
				}
				cameraPostWin.close({animated:true});

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
	cameraPostWin.addEventListener('click',function(e){
		Ti.API.debug('[event]cameraPostWin.click:');
		textArea.blur();
	});

	return cameraPostWin;
}
