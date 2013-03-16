// うちのわんこ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winMydog.createWindow:');

	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// 表示するフォトを取得
	var articleData = null;

	var mydogWin = Ti.UI.createWindow(style.mydogWin);
	titleLabel = Ti.UI.createLabel(style.mydogTitleLabel);	
	mydogWin.titleControl = titleLabel;

	// カレンダーボタン
	var calendarButton = Titanium.UI.createButton(style.mydogCalendarButton);
	mydogWin.leftNavButton = calendarButton;

	// カレンダーボタン
	calendarButton.addEventListener('click', function(e){
		Ti.API.debug('[event]calendarButton.click:');
		if (articleData != null) {
			var calendarWin = win.createCalendarWindow(articleData);
			win.openWindow(mydogWin, calendarWin);			
		}
	});

	var mydogTableView = Ti.UI.createTableView(style.mydogTableView);
	mydogWin.add(mydogTableView);

	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var tableHeader = Ti.UI.createView(style.photoListTableHeader);
	var headerBorder = Ti.UI.createView(style.photoListHeaderBorder);
	tableHeader.add(headerBorder);
	var updateArrowImage = Ti.UI.createImageView(style.photoListUpdateArrowImage);
	tableHeader.add(updateArrowImage);
	var pullLabel = Ti.UI.createLabel(style.photoListPullLabel);
	tableHeader.add(pullLabel);
	var lastUpdatedLabel = Ti.UI.createLabel(style.photoListLastUpdatedLabel);
	lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	tableHeader.add(lastUpdatedLabel);
	var updateIndicator = Ti.UI.createActivityIndicator(style.photoListUpdateIndicator);
	tableHeader.add(updateIndicator);
	mydogTableView.headerPullView = tableHeader;		

	Ti.API.debug('[func]updateArticle:');	
	var articleView = Ti.UI.createView(style.mydogArticleView);
	var articleTableRow = Ti.UI.createTableViewRow(style.mydogArticleTableRow);
	articleTableRow.add(articleView);
	mydogTableView.appendRow(articleTableRow);
	var photoImage = Ti.UI.createImageView(style.mydogPhotoImage);
	var textLabel = Ti.UI.createLabel(style.mydogTextLabel);
	articleView.add(photoImage);
	articleView.add(textLabel);

	// 記事の更新
	var updateArticle = function() {
		articleData = model.getRandomArticle(_userData);
		photoImage.image = 'images/photo/' + articleData.no + '.jpg';
		// カスタムプロパティに記事データを格納
		photoImage.articleData = articleData;
		textLabel.text = articleData.date.substring(0,10) + '\n' + articleData.text;			
	}
	// 初回読み込み時に、記事を更新
	updateArticle();


	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    updateIndicator.hide();
	    updateArrowImage.transform=Ti.UI.create2DMatrix();
	    updateArrowImage.show();
	    pullLabel.text = 'Pull down to refresh...';
	    mydogTableView.setContentInsets({top:0}, {animated:true});
	}
	 
	// スクロールで発生するイベント
	mydogTableView.addEventListener('scroll',function(e){
//        	Ti.API.debug('[event]scroll:');
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        updateArrowImage.animate({transform:unrotate, duration:180});
	        pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        updateArrowImage.animate({transform:rotate, duration:180});
	        pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	mydogTableView.addEventListener('dragEnd',function(e){
//	        Ti.API.debug('[event]dragEnd:');
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        pullLabel.text = 'Updating...';
	        updateArrowImage.hide();
	        updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader();
	        	updateArticle();
	        }, 2000);
	    }
	});
	
	// フォトにタップでフォト拡大画面を表示
	photoImage.addEventListener('click',function(e){
		Ti.API.debug('[event]photoImage.click:');
		var photoFullWin = Titanium.UI.createWindow(style.photoPhotoFullWin);
		var photoFullImage = Ti.UI.createImageView(style.photoPhotoFullImage);
		photoFullImage.image = 'images/photo/' + e.source.articleData.no + '.jpg';
		photoFullWin.add(photoFullImage);

		photoFullWin.open({
			modal: true,
		    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		    navBarHidden: true
		});

		// フォト拡大が面にタップで戻る
		photoFullImage.addEventListener('click',function(e){
			Ti.API.debug('[event]photoFullImage.click:');
			photoFullWin.close();				
		});
	});

	return mydogWin;
}
