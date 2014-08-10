// カレンダー

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winCalendar.createWindow:');

	// 今日の日付の取得
	var now = util.getDateElement(new Date());
	var year = now.year;
	var month = now.month;
	var monthName = util.diary.monthName;
	var weekday = util.diary.weekday;

	var slideEnable = true;

	// 日付の作成
	var getDayView = function(params) {
		Ti.API.debug('[func]getDayView:');
		var dayView = Ti.UI.createView(style.calendarDayView);
		dayView.backgroundColor = params.backgroundColor;
		dayView.year = params.year;
		dayView.month = params.month;
		dayView.day = params.day;
		dayView.currentFlag = params.currentFlag;

		dayView.dayLabel = Ti.UI.createLabel(style.calendarDayLabel);
		dayView.dayLabel.color = params.textColor;
		dayView.dayLabel.text = params.day;
		dayView.add(dayView.dayLabel);

		dayView.dayImage = null;
		dayView.articleData = null;
		var articleImage = null;
		if (params.articleData != null) {
			var nowDate = util.getFormattedDate(new Date(params.year, params.month-1, params.day));
			var fileName = _userData.id + "_" + nowDate;
			// ローカルに投稿写真が保存されてる場合
			if (model.checkLocalImage(util.local.photoPath, fileName)) {
				params.articleData.photo = util.local.photoPath + fileName + '.png';
			}

			var dayImage = Ti.UI.createImageView(style.calendarDayImage);
			dayView.add(dayImage);
			dayImage.image = params.articleData.photo;

			dayView.dayImage = dayImage;
			dayView.articleData = params.articleData;
		}

		if ( params.currentFlag ) {
			// 今日の日付表示
			if ( params.day == now.day ) {
				if (params.year == now.year && params.month == now.month) {
					dayView.borderWidth = '2dp';
					dayView.borderColor = '#87CEFA';
				}
			}
		}

		return dayView;
	};

	// カレンダー表示
	var getCalView = function(_articleList, _year, _month) {
		Ti.API.debug('[func]getCalView:');
		var calView = Ti.UI.createTableView(style.calendarTableView);
		var rowList = [];

		// 当月の日数
		var daysInMonth = 32 - new Date(_year, _month-1, 32).getDate();
		// 当月1日の曜日
		var dayOfWeek = new Date(_year, _month-1, 1).getDay();
		// 前月の日数
		var daysInLastMonth = 32 - new Date(_year, _month-2, 32).getDate();
		// 最終週の翌月の日付数
		var daysInNextMonth = 6 - (new Date(_year, _month-1, daysInMonth).getDay());

		var leap = _year % 4 ? 0 : _year % 100 ? 1 : _year % 400 ? 0 : 1;
		var months = [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// 日別に登録
		var articleDay = new Array(months[_month-1]);
		for (var i=0; i<_articleList.length; i++) {
			var index = util.getDate(_articleList[i].date).getDate() - 1;
			articleDay[index] = _articleList[i];
		}

		// カレンダーヘッダ（曜日）
		var headerRow = Ti.UI.createTableViewRow(style.calendarTableRow);
		headerRow.backgroundColor = 'white';
		rowList.push(headerRow);
		var headerView = Ti.UI.createView(style.calendarHeaderView);
		headerRow.add(headerView);
	
		for (var i=0; i < weekday.length; i++) {
			var headerLabel = Ti.UI.createLabel(style.calendarHeaderLabel);
			headerLabel.text = weekday[i].text;
			headerLabel.color = weekday[i].color;
			headerView.add(headerLabel);
		}

		var bodyRow = Ti.UI.createTableViewRow(style.calendarTableRow);
		rowList.push(bodyRow);
		var bodyView = Ti.UI.createView(style.calendarBodyView);
		bodyRow.add(bodyView);

		// 前月の日付の作成
		// 前月の最初の日付
		var lastMonthFirstDay = daysInLastMonth - dayOfWeek + 1;
		for (var i=0; i < dayOfWeek; i++) {
			bodyView.add(getDayView({
				backgroundColor: '#F5F5F5',
				year : _year,
				month : _month,
				day : lastMonthFirstDay + i,
				currentFlag : false,
				textColor : '#8e959f',
				articleData : null,
			}));
		};
		
		// 当月の日付の作成
		// 当月の記事データ
		for (var i=0; i < daysInMonth; i++) {
			bodyView.add(getDayView({
				backgroundColor: 'white',
				year : _year,
				month : _month,
				day : i + 1,
				currentFlag : true,
				textColor : '#3a4756',
				articleData : articleDay[i],
			}));
		};

		// 翌月の日付の作成
		for (var i=0; i < daysInNextMonth; i++) {
			bodyView.add(getDayView({
				backgroundColor: '#F5F5F5',
				year : _year,
				month : _month,
				day : i + 1,
				currentFlag : false,
				textColor : '#8e959f',
				articleData : null,
			}));
		};

		// 日付をクリックした時
		bodyView.addEventListener('click', function(e) {
			Ti.API.debug('[event]bodyView.click:');

			if (e.source.objectName == "calendarDayView"
				|| e.source.objectName == "calendarDayImage"
				|| e.source.objectName == "calendarDayLabel") {

				var target = null;
				if (e.source.objectName == "calendarDayView") {
					target = e.source;
				} else {
					target = e.source.getParent();
				}

				if (target.dayImage != null) {
					Ti.API.debug('target.year:' + target.year);
					Ti.API.debug('target.month:' + target.month);
					Ti.API.debug('target.day:' + target.day);
	
					target.dayImage.opacity = 0.5;

/*
					var type = "photoList";
					var photoWin = win.createPhotoWindow(type, target.articleData);
					photoWin.prevWin = calendarWin;
					win.openTabWindow(photoWin, {animated:true});
*/
					var photoWin = Ti.UI.createWindow(style.calendarFullPhotoWin);
					var photoView = Ti.UI.createView(style.calendarFullPhotoView);
					photoWin.add(photoView);
					var photoImage = Ti.UI.createImageView(style.calendarFullPhotoImage);
					photoImage.image = target.articleData.photo;
					var photoTextLabel = Ti.UI.createLabel(style.calendarFullPhotoTextLabel);
					photoTextLabel.text = target.articleData.text;
					var photoTimeLabel = Ti.UI.createLabel(style.calendarFullPhotoTimeLabel);
					photoTimeLabel.text = target.articleData.date;
					photoView.add(photoImage);
					photoView.add(photoTextLabel);
					photoView.add(photoTimeLabel);
					photoWin.open({
						modal: true,
					    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
					    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
					});

					// フォト拡大画面にタップで戻る
					photoWin.addEventListener('click',function(e){
						Ti.API.debug('[event]photoWin.click:');
						photoWin.close();				
					});

					target.dayImage.opacity = 1.0;
				}
	
			}
		});

		calView.setData(rowList);
		return calView;
	};

	// 記事取得
	var getArticleList = function(_year, _month) {
		Ti.API.debug('[func]getArticleList:');
		return model.getLocalArticle({
			userId:_userData.id, 
			user:_userData.user, 
			name:_userData.name, 
			icon:_userData.icon, 
			year:_year,
			month:_month
		});
	};

	// スライド用アニメーション
	var slideView = Ti.UI.createAnimation({
		duration : 500,
		left : style.commonSize.screenWidth + 'dp',
	});

	// 前月カレンダーの表示
	var prevCalView = function() {
		Ti.API.debug('[func]prevCalView:');
		if (slideEnable) {
			slideView.left = style.commonSize.screenWidth + 'dp';
			thisDiaryView.animate(slideView);
			if (month == 1) {
				month = 12;
				year--;
			} else {
				month--;
			}
	
			// タイトルの年月
			monthTitle.text = year + '年' + month + '月';
			// カレンダーの表示
			var articleList = getArticleList(year, month);
			thisDiaryView = getCalView(articleList, year, month);
			calendarWin.add(thisDiaryView);
		}
	};

	// 翌月カレンダーの表示
	var nextCalView = function() {
		Ti.API.debug('[func]nextCalView:');
		if (slideEnable) {
			slideView.left = (style.commonSize.screenWidth * -1) + 'dp';
			thisDiaryView.animate(slideView);
			if (month == 12) {
				month = 1;
				year++;
			} else {
				month++;
			}
	
			// タイトルの年月
			monthTitle.text = year + '年' + month + '月';
			// カレンダーの表示
			var articleList = getArticleList(year, month);
			thisDiaryView = getCalView(articleList, year, month);
			calendarWin.add(thisDiaryView);
		}
	};

	// カレンダーの再作成
	var refreshCalView = function(_year, _month, _day) {
		Ti.API.debug('[func]refreshCalView:');
		year = _year;
		month = _month;
		// タイトルの年月
		monthTitle.text = year + '年' + month + '月';
		// ビューの再作成
		calendarWin.remove(thisDiaryView);
		// カレンダーの表示
		var articleList = getArticleList(year, month);
		thisDiaryView = getCalView(articleList, year, month);
		calendarWin.add(thisDiaryView);
	};

// ---------------------------------------------------------------------
	var calendarWin = Ti.UI.createWindow(style.calendarWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.calendarTitleView);
	calendarWin.titleControl = titleView;
	var monthTitle = Ti.UI.createLabel(style.calendarTitleLabel);
	monthTitle.text = year + '年' + month + '月';
	titleView.add(monthTitle);
	var prevImage = Ti.UI.createImageView(style.calendarPrevImage);
	titleView.add(prevImage);
	var nextImage = Ti.UI.createImageView(style.calendarNextImage);
	titleView.add(nextImage);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonCloseButton);
	calendarWin.leftNavButton = backButton;

	var thisDiaryView = null;
	// カレンダーの表示
	var articleList = getArticleList(year, month);
	thisDiaryView = getCalView(articleList, year, month);
	calendarWin.add(thisDiaryView);

/*	
	// 当月のスタンプデータ取得
	model.getCloudArticleList({
		userId: _userData.id,
		year: year,
		month: month,
		day: null
	}, function(e) {
		if (e.success) {
			Ti.API.debug('[func]getCloudArticleList.callback:');
			// カレンダーの表示
			thisDiaryView = getCalView(e.articleList, year, month);
			calendarWin.add(thisDiaryView);
		} else {
			util.errorDialog(e);
		}
	});
*/

// ---------------------------------------------------------------------
	// 前月ボタンをクリック
	prevImage.addEventListener('click', function(e){
		Ti.API.debug('[event]prevImage.click:');
		prevCalView();
	});
	// 翌月ボタンをクリック
	nextImage.addEventListener('click', function(e){
		Ti.API.debug('[event]nextImage.click:');
		nextCalView();
	});
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		// NavigationWindowを使用しているため、navWinを閉じる。
		calendarWin.nav.close();
	});

	// スライド中はクリックイベントを禁止
	slideView.addEventListener('start',function(e){
		Ti.API.debug('[event]slideView.start:');
		slideEnable = false;
	});
	slideView.addEventListener('complete',function(e){
		Ti.API.debug('[event]slideView.complete:');
		slideEnable = true;
	});

	// 左右スワイプで前月・翌月のカレンダーを表示
	calendarWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]calendarWin.swipe:');
		if (e.direction == 'right') {
			prevCalView();
		} else if (e.direction == 'left') {
			nextCalView();
		}
	});

	// タイトルの年月をクリックした時
	monthTitle.addEventListener('click', function(e) {
		Ti.API.debug('[event]monthTitle.click:');
		// 今日の日付の取得
		now = util.getDateElement(new Date());
		refreshCalView(now.year, now.month, now.day);
/*
		if (year == now.year && month == now.month) {
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(now.day-3 > 0? now.day-3 : 0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		} else {
			refreshCalView(now.year, now.month, now.day);
		}
*/
	});

	// 更新用イベント
	calendarWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]calendarWin.refresh:');
		// ビューの再作成
		if (e.diaryData) {
			refreshCalView(e.diaryData.year, e.diaryData.month, e.diaryData.day);			

		} else {
			// 今日の日付の取得
			now = util.getDateElement(new Date());
			refreshCalView(now.year, now.month, now.day);
		}
	});


	return calendarWin;
};

