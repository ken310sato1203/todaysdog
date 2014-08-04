// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	// 日付
	var now = null;
	// 写真がすべて表示されない場合高さを削るため、テキストの表示位置をあげる
	// 写真の高さーステータスバー(20)＋タイトルバー(44)＋カスタムタブ(44)ーメニュー(74)ースタンプ(74)
	var textBottom = (style.commonSize.screenWidth * 3 / 4) - (style.commonSize.screenHeight - 20 - 88 - 148);

// ---------------------------------------------------------------------

	// dayLabelViewの取得
	var getDayLabelView = function() {
		Ti.API.debug('[func]getDayLabelView:');
		// 日付
		var dayLabelView = Ti.UI.createView(style.todayDayLabelView);

		// 日時の更新
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);

		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayLabelView.add(dayLabel);
		dayLabel.text = now.month + '/' + now.day;
//		dayLabel.text = Math.floor(Math.random() * 10);
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayLabelView.add(weekdayLabel);
		weekdayLabel.text = now.weekday.text;
		weekdayLabel.color = now.weekday.color;

		return dayLabelView;
	};


	// menuRowの取得
	var getTodayMenuRow = function() {
		Ti.API.debug('[func]getTodayMenuRow:');

		var menuScrollView = Ti.UI.createScrollView(style.todayMenuScrollView);
		menuScrollView.top = 74 + (style.commonSize.screenWidth * 3 / 4) - textBottom;

		// メニューの表示
//		var menuRow = Titanium.UI.createTableViewRow(style.todayTableRow);
//		menuRow.backgroundColor = '#eeeeee';
		var menuView = Ti.UI.createView(style.todayMenuView);
		menuScrollView.add(menuView);

		// カメラの表示
		var cameraView = Ti.UI.createView(style.todayCameraView);
		todayWin.cameraView = cameraView;
		menuView.add(cameraView);
		var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
		cameraView.add(cameraImage);

		// カメラをクリック
		cameraView.addEventListener('click',function(e){
			Ti.API.debug('[event]cameraView.click:');
			var target = e.source;
			// 多重クリック防止
			target.touchEnabled = false;
			target.opacity = 0.5;

			// 日時の更新
			var nowDate = new Date();
			now = util.getDateElement(nowDate);
			now.weekday = util.diary.weekday[nowDate.getDay()];
			now.today = util.getFormattedDate(nowDate);
	
			// 今日の記事データ取得
			var articleList = model.getLocalTodayArticle({
				userId:_userData.id, 
				user:_userData.user, 
				name:_userData.name, 
				icon:_userData.icon, 
				year: now.year,
				month: now.month,
				day: now.day
			});
			if(articleList.length > 0) {
				var alertDialog = Titanium.UI.createAlertDialog({
					title: '写真の投稿は１日１枚です。\nまた明日。',
					buttonNames: ['OK'],
				});
				alertDialog.show();
				alertDialog.addEventListener('click',function(alert){
					cameraView.touchEnabled = true;
					cameraView.opacity = 1.0;
				});

			} else {
				var dialog = Titanium.UI.createOptionDialog({
					options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
					cancel:2
//						title:'写真を添付'
				});
				dialog.show();
	
				dialog.addEventListener('click',function(e) {
					Ti.API.debug('[event]dialog.click:');
					cameraView.touchEnabled = true;
					switch( e.index ) {
						case 0:
							var cameraWin = win.createCameraWindow('photo_camera', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraView.opacity = 1.0;
							break;
						case 1:
							var cameraWin = win.createCameraWindow('photo_select', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraView.opacity = 1.0;
							break;
						case 2:
							cameraView.opacity = 1.0;
							break;
					}
				});
			}
		});		

		// 日付の表示
		var dayView = Ti.UI.createView(style.todayDayView);
		dayView.add(getDayLabelView());
		menuView.add(dayView);
		todayWin.dayView = dayView;
	
		// カレンダーボタンの表示
		var calendarView = Ti.UI.createView(style.todayCalendarView);
		menuView.add(calendarView);
		var calendarImage = Ti.UI.createImageView(style.todayCalendarImage);
		calendarView.add(calendarImage);
	
		// カレンダーボタンをクリック
		calendarView.addEventListener('click',function(e){
			Ti.API.debug('[event]calendarView.click:');
			var target = e.source;
			// 多重クリック防止
			target.touchEnabled = false;
			target.opacity = 0.5;
			var calendarWin = win.createCalendarWindow(_userData);
			calendarWin.prevWin = todayWin;
			// 下から表示させるため、modalでウィンドウを表示。
			// titleControlが表示されなかったので、NavigationWindowを使用。
			var navWin = Ti.UI.iOS.createNavigationWindow({
				modal: true,
			    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
			    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
				window: calendarWin
			});
			calendarWin.nav = navWin;
			navWin.open();
			target.touchEnabled = true;
			target.opacity = 1.0;
		});

		// 余白分
		var spaceView = Ti.UI.createView(style.todaySpaceView);		
		menuView.add(spaceView);
		
//		return menuRow;
		return menuScrollView;
	};

	// photoViewの取得
	var getTodayPhotoView = function(_articleData) {
		Ti.API.debug('[func]getTodayPhotoView:');
		if (_articleData == null) {
			// 記事の取得
			var articleList = [];
			var countLocalArticleList = model.getCountLocalArticleList(_userData.id);
			if (countLocalArticleList > 0) {
				// ランダム記事データ取得
				articleList = model.getLocalRandomArticle({
					userId: _userData.id, 
					user: _userData.user, 
					name: _userData.name, 
					icon: _userData.icon, 
					limit: 1,
					offset: Math.floor(Math.random() * (countLocalArticleList - 1)) + 1
				});			
			}
			if (articleList.length > 0) {
				_articleData = articleList[0];
			} else {
				_articleData = {
					photo: 'images/photo/A0001.jpg',
					text: 'わんこの写真を投稿してみよう',
					date: ''
				};
			}
		}

		var articleView = Ti.UI.createView(style.todayArticleView);
		var photoView = Ti.UI.createView(style.todayPhotoView);
		articleView.add(photoView);
		var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
		photoView.add(photoImage);

		var fileName = _userData.id + "_" + _articleData.date.substring(0,10);
		// ローカルに投稿写真が保存されてる場合
		if (model.checkLocalImage(util.local.photoPath, fileName)) {
			photoImage.image = util.local.photoPath + fileName + '.png';
		} else {
			if (_articleData.photo == '') {
				// 記事の取得
				model.getCloudArticlePost({
					postId: _articleData.id
				}, function(e) {
					Ti.API.debug('[func]getCloudArticlePost.callback:');
					if (e.success) {
						photoImage.image = e.photo;
						model.updateLocalArticlePhoto({
							postId: _articleData.id,
							photo: e.photo
						});
					} else {
						util.errorDialog(e);
					}
				});
			} else {
				photoImage.image = _articleData.photo;			
			}
		}
		
		var textView = Ti.UI.createView(style.todayPhotoTextView);
		photoImage.textView = textView;

		articleView.add(textView);
		var photoTextLabel = Ti.UI.createLabel(style.todayPhotoTextLabel);
		photoTextLabel.text = _articleData.text;
		var photoTimeLabel = Ti.UI.createLabel(style.todayPhotoTimeLabel);
		photoTimeLabel.text = _articleData.date;
		textView.add(photoTextLabel);
		textView.add(photoTimeLabel);

		// メニューの下部余白部分
		var spaceView = Titanium.UI.createView(style.todayArticleSpaceView);
		articleView.add(spaceView);

		return articleView;
	};

	// ビューの更新
	var updateTableView = function() {
		Ti.API.debug('[func]updateTableView:');
		var rowList = [];
		// 今日のわんこ取得
		var photoRow = Ti.UI.createTableViewRow(style.todayTableRow);
		rowList.push(photoRow);
		photoRow.add(getTodayPhotoView());
		todayWin.photoRow = photoRow;

		todayTableView.setData(rowList);
	};

	// 最上部から下スクロールで最新データを更新する用のヘッダを作成
	var getTableHeader = function() {
		Ti.API.debug('[func]getTableHeader:');

		var tableHeader = Ti.UI.createView(style.commonTableHeader);
		var headerBorder = Ti.UI.createView(style.commonHeaderBorder);
		tableHeader.add(headerBorder);
		var updateArrowImage = Ti.UI.createImageView(style.commonUpdateArrowImage);
		tableHeader.add(updateArrowImage);
		var pullLabel = Ti.UI.createLabel(style.commonPullLabel);
		tableHeader.add(pullLabel);
		var lastUpdatedLabel = Ti.UI.createLabel(style.commonLastUpdatedLabel);
		lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
		tableHeader.add(lastUpdatedLabel);
		var updateIndicator = Ti.UI.createActivityIndicator(style.commonUpdateIndicator);
		tableHeader.add(updateIndicator);

		// 参照用
		tableHeader.updateArrowImage = updateArrowImage;
		tableHeader.pullLabel = pullLabel;
		tableHeader.lastUpdatedLabel = lastUpdatedLabel;
		tableHeader.updateIndicator = updateIndicator;
		
		return tableHeader;
	};

// ---------------------------------------------------------------------
	var todayWin = Ti.UI.createWindow(style.todayWin);
	// タイトルの表示
	var todayTitle = Ti.UI.createLabel(style.todayTitleLabel);	
	todayWin.titleControl = todayTitle;

	var todayTableView = Ti.UI.createTableView(style.todayTableView);
	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);

	// ビューの更新
	updateTableView();

	// メニューの表示
	todayWin.add(getTodayMenuRow());

// ---------------------------------------------------------------------
	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// 日付の更新
		// 子要素を先に削除すると、非同期のためか追加ができないので、非表示にして後で削除
		todayWin.dayView.children[0].hide();
		todayWin.dayView.add(getDayLabelView());
		todayWin.dayView.remove(todayWin.dayView.children[0]);

		// 記事の更新
		if (e.articleData) {
			// 投稿した写真を表示
			// 子要素を先に削除すると、非同期のためか追加ができないので、非表示にして後で削除
			todayWin.photoRow.children[0].hide();
			todayWin.photoRow.add(getTodayPhotoView(e.articleData));			
			todayWin.photoRow.remove(todayWin.photoRow.children[0]);
		}
	});

	// 下スクロールで上部ヘッダがすべて表示するまでひっぱったかどうかのフラグ
	var pulling = false;
	// スクロール終了時に更新をしてよいかどうかのフラグ
	var reloading = false;
	// 表示部分の最上位置からのオフセット
	var offset = 0;

	// ヘッダの表示をもとに戻す
	var resetPullHeader = function(_tableView){
        Ti.API.debug('[func]resetPullHeader:');
	    reloading = false;
	    _tableView.headerPullView.lastUpdatedLabel.text = 'Last Updated: ' + util.getFormattedNowDateTime();
	    _tableView.headerPullView.updateIndicator.hide();
	    _tableView.headerPullView.updateArrowImage.transform=Ti.UI.create2DMatrix();
	    _tableView.headerPullView.updateArrowImage.show();
	    _tableView.headerPullView.pullLabel.text = 'Pull down to refresh...';
	    _tableView.setContentInsets({top:0}, {animated:true});
	};
	 
	// スクロールで発生するイベント
	todayTableView.addEventListener('scroll',function(e){
		// 表示部分の最上位置からのオフセット
	    offset = e.contentOffset.y;
		// 下スクロールで、上部のヘッダが一部表示している場合
	    if (pulling && !reloading && offset > -80 && offset < 0){
	        pulling = false;
	        var unrotate = Ti.UI.create2DMatrix();
	        e.source.headerPullView.updateArrowImage.animate({transform:unrotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Pull down to refresh...';

		// 下スクロールで、上部のヘッダがすべて表示している場合
	    } else if (!pulling && !reloading && offset < -80){
	        pulling = true;
	        var rotate = Ti.UI.create2DMatrix().rotate(180);
	        e.source.headerPullView.updateArrowImage.animate({transform:rotate, duration:180});
	        e.source.headerPullView.pullLabel.text = 'Release to refresh...';
	    }
	});
		
	// スクロールの終了時に発生するイベント
	todayTableView.addEventListener('dragEnd',function(e){
		// 下スクロールで、上部のヘッダがすべて表示されたらを最新データを更新
	    if (pulling && !reloading && offset < -80){
	        pulling = false;
	        reloading = true;
	        e.source.headerPullView.pullLabel.text = 'Updating...';
	        e.source.headerPullView.updateArrowImage.hide();
	        e.source.headerPullView.updateIndicator.show();
	        e.source.setContentInsets({top:80}, {animated:true});
	        setTimeout(function(){
	        	resetPullHeader(e.source);
				// 日付の更新
				// 子要素を先に削除すると、非同期のためか追加ができないので、非表示にして後で削除
				todayWin.dayView.children[0].hide();
				todayWin.dayView.add(getDayLabelView());
				todayWin.dayView.remove(todayWin.dayView.children[0]);
				// 記事の更新
				// 子要素を先に削除すると、非同期のためか追加ができないので、非表示にして後で削除
				todayWin.photoRow.children[0].hide();
				todayWin.photoRow.add(getTodayPhotoView());
				todayWin.photoRow.remove(todayWin.photoRow.children[0]);

	        }, 2000);
	    }
	});

	return todayWin;
};

