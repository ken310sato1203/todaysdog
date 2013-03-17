// うちのわんこ

exports.createWindow = function(_userData, _calendarDate){
	Ti.API.debug('[func]winMydog.createWindow:');

	// スライド用サイズ
	var screenWidth = 322;
	var viewWidth = 224;

	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// 指定日の記事リストの取得
	var articleList = model.getDateArticle(userData, _calendarDate);
	var index = 0;
	var thisArticleView = null;
	var prevArticleView = null;
	var nextArticleView = null;

	var mydogWin = Ti.UI.createWindow(style.mydogWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.mydogTitleLabel);	
	mydogWin.titleControl = titleLabel;

	if (_calendarDate == null) {	
		if (articleList.length > 0) {
			// カレンダーボタンの表示
			var calendarButton = Titanium.UI.createButton(style.mydogCalendarButton);
			mydogWin.leftNavButton = calendarButton;
		
			// カレンダーボタンをクリック
			calendarButton.addEventListener('click', function(e){
				Ti.API.debug('[event]calendarButton.click:');
				var calendarWin = win.createCalendarWindow(articleList[0]);
				win.openWindow(mydogWin, calendarWin);
			});
		}

	} else {
		// タイトルの表示
		var year = _calendarDate.getFullYear();
		var month = _calendarDate.getMonth() + 1;
		var day = _calendarDate.getDate();
		titleLabel.text = year + '年' + month + '月' + day + '日';
	}

	var articleTableView = Ti.UI.createTableView(style.mydogTableView);
	var articleTableRow = null;

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
	articleTableView.headerPullView = tableHeader;		


	// 記事の表示
	var getArticleView = function(_articleData) {
        Ti.API.debug('[func]getArticleView:');

		var articleView = Ti.UI.createView(style.mydogArticleView);
		var photoImage = Ti.UI.createImageView(style.mydogPhotoImage);
		var textLabel = Ti.UI.createLabel(style.mydogTextLabel);
		articleView.add(photoImage);
		articleView.add(textLabel);
	
		photoImage.image = 'images/photo/' + _articleData.no + '.jpg';
		// カスタムプロパティに記事データを格納
		photoImage.articleData = _articleData;
		textLabel.text = _articleData.date.substring(0,10) + '\n' + _articleData.text;			
		
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
		
		return articleView;
	}

	// 記事の更新
	var updateArticle = function() {
		Ti.API.debug('[func]updateArticle:');
		if (articleList.length > index) {
			articleTableRow = Ti.UI.createTableViewRow(style.mydogArticleTableRow);
			articleTableView.appendRow(articleTableRow);

			// 当日の記事
			thisArticleView = getArticleView(articleList[index]);
			articleTableRow.add(thisArticleView);
			
			// 翌日の記事
			if(articleList.length > index + 1) {
				Ti.API.debug('nextArticleView:');
				nextArticleView = getArticleView(articleList[index+1]);
				nextArticleView.left = (screenWidth + (screenWidth - viewWidth) / 2) + 'dp';
				articleTableRow.add(nextArticleView);
			}
		
			// 前日の記事
			if(index > 0) {
				Ti.API.debug('prevArticleView:');
				prevArticleView = getArticleView(articleList[index-1]);
				prevArticleView.left = ((viewWidth + (screenWidth - viewWidth) / 2)  * -1) + 'dp';
				articleTableRow.add(prevArticleView);
			}
		}
	}
	// 初回読み込み時に、記事を更新
	updateArticle();
	mydogWin.add(articleTableView);

	// スライド用アニメーション
	var slideNext = Ti.UI.createAnimation({
		duration : 500,
		left : (screenWidth * -1) + 'dp',
	});
	var slideReset = Ti.UI.createAnimation({
		duration : 500,
		left : ((screenWidth - viewWidth) / 2) + 'dp',
	});
	var slidePrev = Ti.UI.createAnimation({
		duration : 500,
		left : screenWidth + 'dp',
	});

	// 左右スワイプで他の記事を表示
	mydogWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]mydogWin.swipe:');
		if (e.direction == 'right') {
			if(index > 0) {
				index--;
				thisArticleView.animate(slidePrev);
				prevArticleView.animate(slideReset);
				setTimeout(function() {
					thisArticleView.left = screenWidth + 'dp';
					nextArticleView = thisArticleView;
					thisArticleView = prevArticleView;
					if(index > 0) {
						prevArticleView = getArticleView(articleList[index-1]);
						prevArticleView.left = (screenWidth * -1) + 'dp';
						articleTableRow.add(prevArticleView);
					}
				}, 500);
			}

		} else if (e.direction == 'left') {
			if(articleList.length > index + 1) {
				index++;
				thisArticleView.animate(slideNext);
				nextArticleView.animate(slideReset);
				setTimeout(function() {
					thisArticleView.left = (screenWidth * -1) + 'dp';
					prevArticleView = thisArticleView;
					thisArticleView = nextArticleView;
					if (articleList.length > index + 1) {
						nextArticleView = getArticleView(articleList[index+1]);
						nextArticleView.left = screenWidth + 'dp';
						articleTableRow.add(nextArticleView);						
					}
				}, 500);
			}
		}
	});

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    updateIndicator.hide();
	    updateArrowImage.transform=Ti.UI.create2DMatrix();
	    updateArrowImage.show();
	    pullLabel.text = 'Pull down to refresh...';
	    articleTableView.setContentInsets({top:0}, {animated:true});
	}
	 
	// スクロールで発生するイベント
	articleTableView.addEventListener('scroll',function(e){
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
	articleTableView.addEventListener('dragEnd',function(e){
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
				// 指定日の記事リストの取得
				articleList = model.getDateArticle(userData, _calendarDate);
				index = 0;
		    	articleTableView.data = [];
				updateArticle();
				mydogWin.add(articleTableView);
	        }, 2000);
	    }
	});

	return mydogWin;
}
