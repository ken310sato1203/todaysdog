// カレンダー

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winCalendar.createWindow:');

	// 今日の日付の取得
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = nowYear;
	var month = nowMonth;
	var monthName = util.diary.monthName;
	var weekday = util.diary.weekday;

	var clickEnable = true;

	// 日付の作成
	var getDayView = function(e) {
		Ti.API.debug('[func]getDayView:');
		var dayView = Ti.UI.createView(style.calendarDayView);
		dayView.backgroundColor = e.backgroundColor;
		dayView.year = e.year;
		dayView.month = e.month;
		dayView.day = e.day;
		dayView.currentFlag = e.currentFlag;
		dayView.articleData = e.articleData;

		var articleImage = null;
		
		if (e.articleData != null) {
			dayView.dayImage = Ti.UI.createImageView(style.calendarDayImage);
			dayView.dayImage.image = e.articleData.photo;
			dayView.add(dayView.dayImage);
		}

		dayView.dayLabel = Ti.UI.createLabel(style.calendarDayLabel);
		dayView.dayLabel.color = e.textColor;
		dayView.dayLabel.text = e.day;
		dayView.add(dayView.dayLabel);

		if ( e.currentFlag ) {
			// 今日の日付表示
			if ( e.day == nowDay ) {
				if (e.year == nowYear && e.month == nowMonth) {
//					dayView.backgroundColor = '#87CEFA';
//					dayView.dayLabel.color = 'white';
					var todayView = Ti.UI.createView(style.calendarTodayView);
					dayView.add(todayView);
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
					// view上にあるimage、labelの場合
					Ti.API.debug('e.source.getParent():' + e.source.getParent());
					target = e.source.getParent();
				}

				if (target.dayImage != null) {
					Ti.API.debug('target.year:' + target.year);
					Ti.API.debug('target.month:' + target.month);
					Ti.API.debug('target.day:' + target.day);
	
					target.dayImage.opacity = 0.5;

					var type = "photoList";
					var photoWin = win.createPhotoWindow(type, target.articleData);
					photoWin.prevWin = calendarWin;
					win.openTabWindow(photoWin, {animated:true});
					target.dayImage.opacity = 1.0;
				}
	
			}
		});

		calView.setData(rowList);
		return calView;
	};

	// スライド用アニメーション
	var slideView = Ti.UI.createAnimation({
		duration : 500,
		left : style.commonSize.screenWidth + 'dp',
	});

	// 前月カレンダーの表示
	var prevCalView = function() {
		Ti.API.debug('[func]prevCalView:');
		slideView.left = style.commonSize.screenWidth + 'dp';
		thisDiaryView.animate(slideView);
		if (month == 1) {
			month = 12;
			year--;
		} else {
			month--;
		}

		// タイトルの年月
		monthTitle.text =  year + ' ' + monthName[month-1];
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
	};

	// 翌月カレンダーの表示
	var nextCalView = function() {
		Ti.API.debug('[func]nextCalView:');
		slideView.left = (style.commonSize.screenWidth * -1) + 'dp';
		thisDiaryView.animate(slideView);
		if (month == 12) {
			month = 1;
			year++;
		} else {
			month++;
		}

		// タイトルの年月
		monthTitle.text =  year + ' ' + monthName[month-1];
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
	};


	// カレンダーの再作成
	var refreshCalView = function(_year, _month, _day) {
		Ti.API.debug('[func]refreshCalView:');
		year = _year;
		month = _month;
		// タイトルの年月
		monthTitle.text =  year + ' ' + monthName[month-1];
		// ビューの再作成
		calendarWin.remove(thisDiaryView);

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
	};

// ---------------------------------------------------------------------
	var calendarWin = Ti.UI.createWindow(style.calendarWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.calendarTitleView);
	calendarWin.titleControl = titleView;
	var monthTitle = Ti.UI.createLabel(style.calendarTitleLabel);
	monthTitle.text =  year + ' ' + monthName[month-1];
	titleView.add(monthTitle);
	var prevImage = Ti.UI.createImageView(style.calendarPrevImage);
	titleView.add(prevImage);
	var nextImage = Ti.UI.createImageView(style.calendarNextImage);
	titleView.add(nextImage);

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	calendarWin.leftNavButton = backButton;

	var thisDiaryView = null;

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

// ---------------------------------------------------------------------
	// 前月ボタンをクリック
	prevImage.addEventListener('click', function(e){
		Ti.API.debug('[event]prevImage.click:');
		prevImage.touchEnabled = false;
		prevCalView();
	});
	// 翌月ボタンをクリック
	nextImage.addEventListener('click', function(e){
		Ti.API.debug('[event]nextImage.click:');
		nextImage.touchEnabled = false;
		nextCalView();
	});
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		calendarWin.close({animated:true});
	});

	// スライド中はクリックイベントを禁止
	slideView.addEventListener('start',function(e){
		Ti.API.debug('[event]slideView.start:');
		clickEnable = false;
	});
	slideView.addEventListener('complete',function(e){
		Ti.API.debug('[event]slideView.complete:');
		clickEnable = true;
		prevImage.touchEnabled = true;
		nextImage.touchEnabled = true;
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
		now = new Date();
		nowYear = now.getFullYear();
		nowMonth = now.getMonth() + 1;
		nowDay = now.getDate();

		refreshCalView(nowYear, nowMonth, nowDay);
/*
		if (year == nowYear && month == nowMonth) {
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(nowDay-3 > 0? nowDay-3 : 0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		} else {
			refreshCalView(nowYear, nowMonth, nowDay);
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
			now = new Date();
			nowYear = now.getFullYear();
			nowMonth = now.getMonth() + 1;
			nowDay = now.getDate();
			refreshCalView(nowYear, nowMonth, nowDay);
		}
	});


	return calendarWin;
};

