// スタンプ投稿

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStampPost.createWindow:');

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	var postWin = Ti.UI.createWindow(style.stampPostWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampPostTitleLabel);	
	postWin.titleControl = titleLabel;

	// 投稿ボタンの表示
	var postButton = Titanium.UI.createButton(style.stampPostButton);
	postWin.rightNavButton = postButton;
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
				if (_stampData.no == null) {
					model.addStampList(_stampData);
				} else {
					model.updateStampList(_stampData);					
				}
				postWin.prevWin.fireEvent('refresh', {stampData:_stampData});
				postWin.close();
				
				setTimeout(function(){
					actInd.hide();
				},2000);
			}
		});
	});

	var postView = Titanium.UI.createView(style.stampPostView);
	postWin.add(postView);

	var postImage = Titanium.UI.createImageView(style.stampPostImage);
	postImage.image = 'images/icon/diary_' + _stampData.stamp + '.png';
	postView.add(postImage);

	var postLabel = Ti.UI.createLabel(style.stampPostTextLabel);
	postLabel.text = _stampData.text;
	postView.add(postLabel);

	// 投稿テキストを編集
	postView.addEventListener('click', function(e){
		Ti.API.debug('[event]postView.click:');
		var textWin = win.createStampTextWindow(_userData, _stampData);		
		textWin.prevWin = postWin;
		win.openTabWindow(textWin);
	});

	// 更新用イベント
	postWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]postWin.refresh:');
		// 投稿テキストの更新
		_stampData.text = e.stampText;
		postLabel.text = e.stampText;
	});

	return postWin;
}
