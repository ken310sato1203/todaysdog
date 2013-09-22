// 日記

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winDiary.createWindow:');

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
	// スタンプの最大表示件数
	var stampListMax = 6;

	// カレンダーデータの取得
	var getCalendarRowData = function(_stampList, _year, _month) {
		Ti.API.debug('[func]getDiaryRowData:');
		var leap = _year % 4 ? 0 : _year % 100 ? 1 : _year % 400 ? 0 : 1;
		var months = [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// 日別に登録
		var stampDay = new Array(months[_month-1]);
		for (var i=0; i<stampDay.length; i++) {
			stampDay[i] = {data: []};
		}
		// 当月のスタンプデータ
//		var stampList = model.getStampList(_userData, _year, _month);

		for (var i=0; i<_stampList.length; i++) {
			stampDay[_stampList[i].day-1].data.push(_stampList[i]);
		}


		// 当月の記事データ
		var articleList = model.getCalendarArticle(_userData, _year, _month);

		var rowData = [];
		for (var i=0; i<months[_month-1]; i++) {
			var dayOfWeek = (new Date(_year, _month-1, i+1, 0, 0, 0)).getDay();
			var diaryData = {
				year: _year,
				month: _month,
				day: i+1,
				weekday: weekday[dayOfWeek],
				todayFlag: false,
				stampList: stampDay[i].data,
				articleData: articleList[i],
				timeIndex: 9,
			};

			if (_year == nowYear && _month == nowMonth && i+1 == nowDay) {
				diaryData.todayFlag = true;
				diaryData.timeIndex = nowHour;
			} else {
				if (stampDay[i].data.length > 0) {
					diaryData.timeIndex = stampDay[i].data[0].hour;
				}
			}

			rowData.push(diaryData);
		}
		return rowData;
	};

	// カレンダービューを取得
	var getCalendarTableView = function(_rowData) {
		Ti.API.debug('[func]getCalendarTableView:');
		var targetView = Ti.UI.createTableView(style.diaryTableView);
		var rowList = [];

		for (var i=0; i<_rowData.length; i++) {
			var row = Ti.UI.createTableViewRow(style.diaryTableRow);
			row.diaryData = _rowData[i];

			var dayView = Ti.UI.createView(style.diaryDayView);
			row.add(dayView);

			var dayLabel = Ti.UI.createLabel(style.diaryDayLabel);
			dayLabel.text = _rowData[i].day;

			var weekdayLabel = Ti.UI.createLabel(style.diaryWeekdayLabel);
			weekdayLabel.text = _rowData[i].weekday.text;
			weekdayLabel.color = _rowData[i].weekday.color;
			dayView.add(dayLabel);
			dayView.add(weekdayLabel);

			if (_rowData[i].todayFlag) {
				var todayView = Ti.UI.createView(style.diaryTodayView);
				dayView.add(todayView);
			}

			var rowStampList = _rowData[i].stampList;
			if (rowStampList.length > 0) {
				var stampView = Ti.UI.createView(style.diaryStampView);
				dayView.add(stampView);

				for (var j=0; j<rowStampList.length; j++) {
					if (j < stampListMax) {
						var stampImage = Ti.UI.createImageView(style.diaryStampImage);
						stampImage.image = 'images/icon/' + rowStampList[j].stamp + '.png';
						stampView.add(stampImage);
					}
				}
			}

			var rowArticleData = _rowData[i].articleData;
			if (rowArticleData != null) {
				var stampPhotoImage = Ti.UI.createImageView(style.diaryPhotoImage);
				stampPhotoImage.articleData = rowArticleData;
				dayView.add(stampPhotoImage);

				// フォトスタンプをクリックした時
				stampPhotoImage.addEventListener('click', function(e) {
					Ti.API.debug('[event]stampPhotoImage.click:');
					var type = "diary";
					var photoWin = win.createPhotoWindow(type, e.source.articleData);
					win.openTabWindow(photoWin, {animated:true});
				});
			}

			rowList.push(row);
		}

		targetView.setData(rowList);
		return targetView;
	};

	// カレンダー表示
	var getCalView = function(_stampList, _year, _month) {
		Ti.API.debug('[func]getCalView:');

		// 当月のカレンダーの表示
		var rowData = getCalendarRowData(_stampList, _year, _month);
		var calView = getCalendarTableView(rowData);

		// 日付行をクリックした時
		calView.addEventListener('click', function(e) {
			Ti.API.debug('[event]calView.click:');
			Ti.API.debug('[event]e.source:', e.source);
			if (clickEnable) {
				if (e.source.objectName != "diaryPhotoImage") {
					var timeWin = win.createTimeWindow(_userData, e.row.diaryData);
					timeWin.prevWin = diaryWin;
					diaryWin.nextWin = timeWin;
					win.openTabWindow(timeWin, {animated:true});
				}
			}
		});

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
//		setTimeout(function() {
			// タイトルの年月
			monthTitle.text =  year + ' ' + monthName[month-1];
			// 当月のスタンプデータ取得
			model.getCloudStampList({
				userId: _userData.id,
				year: year,
				month: month,
				day: null
			}, function(e) {
				if (e.success) {
					Ti.API.debug('[func]getCloudStampList.callback:');
					// カレンダーの表示
					thisDiaryView = getCalView(e.stampList, year, month);
					diaryWin.add(thisDiaryView);
					thisDiaryView.visible = true;
				} else {
					util.errorDialog(e);
				}
			});
//		}, 300);
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
//		setTimeout(function() {
			// タイトルの年月
			monthTitle.text =  year + ' ' + monthName[month-1];
			// 当月のスタンプデータ取得
			model.getCloudStampList({
				userId: _userData.id,
				year: year,
				month: month,
				day: null
			}, function(e) {
				if (e.success) {
					Ti.API.debug('[func]getCloudStampList.callback:');
					// カレンダーの表示
					thisDiaryView = getCalView(e.stampList, year, month);
					diaryWin.add(thisDiaryView);
					thisDiaryView.visible = true;
				} else {
					util.errorDialog(e);
				}
			});
//		}, 300);
	};


	// カレンダーの再作成
	var refreshCalView = function(_year, _month, _day) {
		Ti.API.debug('[func]refreshCalView:');
		year = _year;
		month = _month;
		// タイトルの年月
		monthTitle.text =  year + ' ' + monthName[month-1];
		// ビューの再作成
		diaryWin.remove(thisDiaryView);

		// 当月のスタンプデータ取得
		model.getCloudStampList({
			userId: _userData.id,
			year: year,
			month: month,
			day: null
		}, function(e) {
			if (e.success) {
				Ti.API.debug('[func]getCloudStampList.callback:');
				// カレンダーの表示
				thisDiaryView = getCalView(e.stampList, year, month);
				diaryWin.add(thisDiaryView);
				// 今日の日にスクロール
				thisDiaryView.scrollToIndex(_day-3 > 0? _day-3 : 0, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});	
				thisDiaryView.visible = true;
			} else {
				util.errorDialog(e);
			}
		});
	};

// ---------------------------------------------------------------------
	var diaryWin = Ti.UI.createWindow(style.diaryWin);
	// タイトルの表示
	var monthTitle = Ti.UI.createLabel(style.diaryTitleLabel);
	monthTitle.text =  year + ' ' + monthName[month-1];
	diaryWin.titleControl = monthTitle;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	diaryWin.leftNavButton = backButton;
	// 次へボタンの表示
	var nextButton = Titanium.UI.createButton(style.commonNextButton);
	diaryWin.rightNavButton = nextButton;

	var thisDiaryView = null;
	
	// 当月のスタンプデータ取得
	model.getCloudStampList({
		userId: _userData.id,
		year: year,
		month: month,
		day: null
	}, function(e) {
		if (e.success) {
			Ti.API.debug('[func]getCloudStampList.callback:');
			// カレンダーの表示
			thisDiaryView = getCalView(e.stampList, year, month);
			diaryWin.add(thisDiaryView);
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(nowDay-3>0?nowDay-3:0, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			thisDiaryView.visible = true;
		} else {
			util.errorDialog(e);
		}
	});


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		prevCalView();
	});
	// 次へボタンをクリック
	nextButton.addEventListener('click', function(e){
		Ti.API.debug('[event]nextButton.click:');
		nextCalView();
	});

	// スライド中はクリックイベントを禁止
	slideView.addEventListener('start',function(e){
		Ti.API.debug('[event]slideView.start:');
		clickEnable = false;
	});
	slideView.addEventListener('complete',function(e){
		Ti.API.debug('[event]slideView.complete:');
		clickEnable = true;
	});

	// 左右スワイプで前月・翌月のカレンダーを表示
	diaryWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]diaryWin.swipe:');
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
	diaryWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]diaryWin.refresh:');
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


	return diaryWin;
};

