// トップ

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winToday.createWindow:');

	var user = model.getLoginId();
	var year = null;
	var month = null;
	var day = null;
	var hour = null;
	var weekday = null;

// ---------------------------------------------------------------------

	// 日時の更新
	var updateTime = function() {
		Ti.API.debug('[func]updateTime:');
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth() + 1;
		day = now.getDate();
//		day = Math.floor(Math.random() * 2) + 1;
		hour = now.getHours();
		weekday = util.diary.weekday[now.getDay()];
	};

	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.todayTimeStampView);
		targetView.stampData = _rowStamp;

		var stampLabel = Ti.UI.createLabel(style.todayTimeStampLabel);
		stampLabel.text = _rowStamp.text;
		targetView.add(stampLabel);

		var stampImage = Ti.UI.createImageView(style.todayTimeStampImage);
		stampImage.image = 'images/icon/diary_' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		return targetView;
	};

	// Viewの取得
	var getTimeTableView = function() {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.todayTimeTableView);
		var rowList = [];

		// 当日のデータ
		var stampList = model.getStampDayList(_userData, year, month, day);			
		
		for (var i=0; i<stampList.length; i++) {
			var row = Ti.UI.createTableViewRow(style.todayTimeTableRow);
			row.diaryData = {
				year: year,
				month: month,
				day: day,
				weekday: weekday,
				todayFlag: null,
				stampList: null,
				articleData: null,
				timeIndex: stampList[i].hour,
			};
			
			var stampView = getStampView(stampList[i]);
			row.add(stampView);
			rowList.push(row);

			stampView.addEventListener('click',function(e){
				Ti.API.debug('[event]hourView.click:');
				var targetTab = win.getTab("diaryTab");
				// timeWinがオープンしている場合
				if (targetTab.window.nextWin != null) {
					// timeWinを更新
					targetTab.window.nextWin.fireEvent('refresh', {diaryData:e.row.diaryData});
	
				} else {
					// timeWinを新規オープン
					var timeWin = win.createTimeWindow(_userData, e.row.diaryData);
					timeWin.prevWin = targetTab.window;
					timeWin.backButtonTitle = 'Month';
					targetTab.open(timeWin, {animated:false});
	
					// diaryWinを更新
					targetTab.window.fireEvent('refresh', {diaryData:e.row.diaryData});
				}
				tabGroup.activeTab = targetTab;
			});

		}

		targetView.setData(rowList);
		return targetView;
	};

	// TableViewのデータ取得
	var getTodayTableRowList = function() {
		Ti.API.debug('[func]getTodayTableRowList:');

		var rowList = [];

		var photoRow = Ti.UI.createTableViewRow(style.todayTableRow);
		rowList.push(photoRow);
		var photoView = Ti.UI.createView(style.todayPhotoView);
		photoRow.add(photoView);

		var calendarDate = new Date(year, month-1, day);
		var articleList = model.getDateArticle(userData, calendarDate);
		// 今日の投稿が既にされている場合
		if (articleList.length > 0) {
			var photoImage = Ti.UI.createImageView(style.todayPhotoImage);
			// simはOKだが実機NG
//			photoImage.image = Ti.Filesystem.resourcesDirectory + 'images/photo/' + articleList[0].no + '.jpg';
			// simもNGだが実機NG
//			photoImage.image = Ti.Filesystem.applicationDataDirectory + 'images/photo/' + articleList[0].no + '.jpg';
			photoImage.image = 'images/photo/today_sakura.jpg';
			photoView.add(photoImage);
	
			// photoImageをクリック
			photoImage.addEventListener('click',function(e){
				Ti.API.debug('[event]photoImage.click:');
	/*
				if (e.source.displayFlag) {
					diaryView.top = '200dp';
					e.source.displayFlag = false;
				} else {
					diaryView.top = photoImage.height + 'dp';
					e.source.displayFlag = true;
				}
	*/
			});

		// 今日の投稿がまだの場合
		} else {
			var cameraImage = Ti.UI.createImageView(style.todayCameraImage);
			photoView.add(cameraImage);
	
			// cameraImageをクリック
			cameraImage.addEventListener('click',function(e){
				Ti.API.debug('[event]cameraImage.click:');
				var cameraWin = win.createCameraWindow(_userData);
				cameraWin.prevWin = todayWin;
				win.openTabWindow(cameraWin);
			});			
		}

		var diaryRow = Ti.UI.createTableViewRow(style.todayTableRow);
		rowList.push(diaryRow);
		var diaryView = Ti.UI.createView(style.todayDiaryView);
		diaryRow.add(diaryView);
		var dayView = Ti.UI.createView(style.todayDayView);
		diaryView.add(dayView);

		var dayLabel = Ti.UI.createLabel(style.todayDayLabel);
		dayView.add(dayLabel);
		dayLabel.text = month + '/' + day;
		var weekdayLabel = Ti.UI.createLabel(style.todayWeekdayLabel);
		dayView.add(weekdayLabel);
		weekdayLabel.text = weekday.text;
		weekdayLabel.color = weekday.color;
		var editImage = Ti.UI.createImageView(style.todayEditImage);
		dayView.add(editImage);
	
		// editImageをクリック
		editImage.addEventListener('click',function(e){
			Ti.API.debug('[event]editImage.click:');
			var stampWin = win.createStampWindow(_userData, null);	
			stampWin.prevWin = todayWin;
			win.openTabWindow(stampWin);
		});

		var timeView = getTimeTableView();
		diaryView.add(timeView);

		return rowList;
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

	// ビューの更新
	var updateTableView = function() {
		Ti.API.debug('[func]updateTableView:');
		updateTime();
		todayTableView.setData(getTodayTableRowList());
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


// ---------------------------------------------------------------------
	// 更新用イベント
	todayWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]todayWin.refresh:');
		// ビューの更新
		updateTableView();
	});

/*
	// タブバーの表示／非表示
	var start = null;
	var end = null;
	 
	todayWin.addEventListener('touchstart', function(e) {
		Ti.API.info('[event]todayWin.touchstart');
		start = e.y;
	});
	 
	todayWin.addEventListener('touchmove', function(e) {
		Ti.API.info('[event]todayWin.touchmove');
		end = e.y;
		if(start) {
			if(start < end) {
				tabGroup.animate({bottom: '0dp', duration : 500});
			} else {
				tabGroup.animate({bottom: '-50dp', duration : 500});
			}
			start = null;
		}
	});
*/

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
				updateTableView();
	        }, 2000);
	    }
	});

	return todayWin;
}

