// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	var now = null;

// ---------------------------------------------------------------------

	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.todayTimeStampView);
		targetView.stampData = _rowStamp;

		var hourLabel = Ti.UI.createLabel(style.todayTimeHourLabel);
		if (_rowStamp.hour == -1) {
			hourLabel.text =  '終日 ';		
		} else {
			hourLabel.text =  _rowStamp.hour + ':00 ';
		}
//		targetView.add(hourLabel);

		var stampImage = Ti.UI.createImageView(style.todayTimeStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		var stampLabel = Ti.UI.createLabel(style.todayTimeStampLabel);
		stampLabel.text =  _rowStamp.textList[0];
		targetView.add(stampLabel);

		return targetView;
	};

	// Viewの取得
	var getTimeTableView = function(_stampList) {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.todayTimeTableView);
		var rowList = [];

		// 当日のデータ		
		for (var i=0; i<_stampList.length; i++) {
			var row = Ti.UI.createTableViewRow(style.todayTimeTableRow);
			row.diaryData = {
				year: now.year,
				month: now.month,
				day: now.day,
				weekday: now.weekday,
				todayFlag: true,
				stampList: _stampList,
				articleData: null,
				timeIndex: _stampList[i].hour,
			};
			
			var stampView = getStampView(_stampList[i]);
			row.add(stampView);
			rowList.push(row);

			stampView.addEventListener('click',function(e){
				Ti.API.debug('[event]hourView.click:');
				var targetTab = win.getTab("diaryTab");
				// timeWinがオープンしている場合
				if (targetTab.window.nextWin != null) {
					// timeWinをクローズ
					targetTab.window.nextWin.close({animated:false});
				}
				// timeWinを新規オープン
				var timeWin = win.createTimeWindow(_userData, e.row.diaryData);
				timeWin.prevWin = targetTab.window;
				targetTab.window.nextWin = timeWin;
				targetTab.open(timeWin, {animated:false});	
				tabGroup.activeTab = targetTab;
			});
		}

		targetView.setData(rowList);
		return targetView;
	};

	// photoRowの取得
	var getTodayPhotoRow = function(_articleData) {
		Ti.API.debug('[func]getTodayPhotoRow:');

		var photoRow = Ti.UI.createTableViewRow(style.todayTableRow);
		var photoView = Ti.UI.createView(style.todayPhotoView);
		photoRow.add(photoView);

		// 今日の投稿が既にされている場合
		if (_articleData) {
			var fileName = _userData.id + "_" + now.today;
			
//			model.deleteLocalImage(util.local.photoPath, fileName);

			var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
			// ローカルに投稿写真が保存されてる場合
			if (model.checkLocalImage(util.local.photoPath, fileName)) {
				photoImage.image = util.local.photoPath + fileName + '.png';
			} else {
				photoImage.image = _articleData.photo;
/*
				model.loadCloudImage(_articleData.photo, function(e) {
					Ti.API.debug('[func]loadCloudImage.callback:');
					if (e.success) {
						model.saveLocalImage(e.image, util.local.photoPath, fileName);
					} else {
						util.errorDialog(e);
					}
				});
*/
			}
			photoView.add(photoImage);

	
		// 今日の投稿がまだの場合
		} else {
			var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
			photoView.add(cameraImage);
	
			// cameraImageをクリック
			cameraImage.addEventListener('click',function(e){
				Ti.API.debug('[event]cameraImage.click:');
				// 多重クリック防止
				cameraImage.touchEnabled = false;
				cameraImage.opacity = 0.5;
				var dialog = Titanium.UI.createOptionDialog({
					options:['撮影する', 'アルバムから選ぶ', 'キャンセル'],
					cancel:2
//					title:'写真を添付'
				});
				dialog.show();

				dialog.addEventListener('click',function(e) {
					Ti.API.debug('[event]dialog.click:');
					cameraImage.touchEnabled = true;
					switch( e.index ) {
						case 0:
							var cameraWin = win.createCameraWindow('photo_camera', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraImage.opacity = 1.0;
							break;
						case 1:
							var cameraWin = win.createCameraWindow('photo_select', _userData);
							cameraWin.prevWin = todayWin;
							win.openTabWindow(cameraWin, {animated:true});
							cameraImage.opacity = 1.0;
							break;
						case 2:
							cameraImage.opacity = 1.0;
							break;
					}
				});
			});			
		}
		return photoRow;
	};

	// DiaryRowの取得
	var getTodayDiaryRow = function(_stampList) {
		Ti.API.debug('[func]getTodayDiaryRow:');

		var diaryRow = Ti.UI.createTableViewRow(style.todayTableRow);
		var diaryView = Ti.UI.createView(style.todayDiaryView);
		diaryRow.add(diaryView);
		var dayView = Ti.UI.createView(style.todayDayView);
		diaryView.add(dayView);

		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayView.add(dayLabel);
		dayLabel.text = now.month + '/' + now.day;
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayView.add(weekdayLabel);
		weekdayLabel.text = now.weekday.text;
		weekdayLabel.color = now.weekday.color;
		var editImage = Ti.UI.createImageView(style.todayEditImage);
		dayView.add(editImage);
	
		// editImageをクリック
		editImage.addEventListener('click',function(e){
			Ti.API.debug('[event]editImage.click:');
			// 多重クリック防止
			editImage.touchEnabled = false;
			editImage.opacity = 0.5;
			var type = "today";
			var stampWin = win.createStampWindow(type, _userData, null);	
			stampWin.prevWin = todayWin;
			win.openTabWindow(stampWin, {animated:true});
			editImage.touchEnabled = true;
			editImage.opacity = 1.0;
		});

		var timeView = getTimeTableView(_stampList);
		// スタンプの登録が３個より大きい場合、行数分の高さを追加
		if (timeView.data[0]) {
			if (timeView.data[0].rowCount > 3) {
				diaryView.height = (timeView.data[0].rowCount * 40) + 'dp';
			}
		}
		diaryView.add(timeView);

		return diaryRow;
	};

	// ビューの更新
	var updateTableView = function() {
		Ti.API.debug('[func]updateTableView:');

		var rowList = [];
		// 日時の更新
		var nowDate = new Date();
		now = util.getDateElement(nowDate);
		now.weekday = util.diary.weekday[nowDate.getDay()];
		now.today = util.getFormattedDate(nowDate);
		// 今日の記事データ取得
		var articleList = model.getLocalTodayArticle({
			userId:_userData.id, 
			name:_userData.name, 
			icon:_userData.icon, 
			year: now.year,
			month: now.month,
			day: now.day
		});
		var articleData = null;
		if(articleList.length > 0) {
			articleData = articleList[0];
		}
		
		if (articleData && articleData.photo == "") {
			model.getCloudArticlePost({
				userId: _userData.id,
				postId: articleData.id,
			}, function(e) {
				Ti.API.debug('[func]getCloudArticlePost.callback:');
				if (e.success) {
					if (e.photo) {
						model.addLocalArticlePhoto({post:articleData.id, photo:e.photo});
					}
		
				} else {
					util.errorDialog(e);
				}
			});
		}
		
		// 今日の記事データ取得
		rowList.push(getTodayPhotoRow(articleData));
		// 今日のスタンプデータ取得
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: now.year,
			month: now.month,
			day: now.day
		});
		rowList.push(getTodayDiaryRow(stampList));
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

	// カレンダーボタン
	var calendarButton = Titanium.UI.createButton(style.todayCalendarButton);
	todayWin.leftNavButton = calendarButton;

	var todayTableView = Ti.UI.createTableView(style.todayTableView);
	todayTableView.headerPullView = getTableHeader();
	todayWin.add(todayTableView);

	// ビューの更新
	updateTableView();

// ---------------------------------------------------------------------
	// カレンダーボタン
	calendarButton.addEventListener('click', function(e){
		Ti.API.debug('[event]calendarButton.click:');
		var type = "search";
		var calendarWin = win.createCalendarWindow(_userData);
		calendarWin.prevWin = todayWin;
//		win.openTabWindow(calendarWin, {animated:true});
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
	});

	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// ビューの更新
		todayTableView.data = [];
		updateTableView();
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
				// ビューの更新
				todayTableView.data = [];
				updateTableView();
	        }, 2000);
	    }
	});

	return todayWin;
};

