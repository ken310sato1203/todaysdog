// 日記

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winDiary.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDay = now.getDate();

	var year = nowYear;
	var month = nowMonth;

	var diaryWin = Ti.UI.createWindow(style.diaryWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.diaryTitleLabel);	
	monthTitle.text = year + ' ' + monthName[month-1];
	diaryWin.titleControl = monthTitle;

	// カレンダーデータの取得
	var getCalendarRowData = function(_year, _month) {
		Ti.API.debug('[func]getDiaryRowData:');
		var leap = _year % 4 ? 0 : _year % 100 ? 1 : _year % 400 ? 0 : 1;
		var months = [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var weekday = [
			{text:'SUN',color:'#CD5C5C'},
			{text:'MON',color:'#3a4756'},
			{text:'TUE',color:'#3a4756'},
			{text:'WED',color:'#3a4756'},
			{text:'THU',color:'#3a4756'},
			{text:'FRI',color:'#3a4756'},
			{text:'SAT',color:'#4169E1'}];

		// 日別に登録
		var stampDay = new Array(months[_month-1]);
		for (var i=0; i<stampDay.length; i++) {
			stampDay[i] = {data: []};
		}
		// 当月のスタンプデータ
		var stampList = model.getStampList(_userData, _year, _month);
		for (var i=0; i<stampList.length; i++) {
			stampDay[stampList[i].day-1].data.push(stampList[i]);
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
			};

			if (_year == nowYear && _month == nowMonth && i+1 == nowDay) {
				diaryData.todayFlag = true;
			}

			rowData.push(diaryData);
		}
		return rowData;
	}

	// カレンダービューを取得
	var getCalendarTableViewRow = function(_rowData) {
		Ti.API.debug('[func]getDiaryTableViewRow:');
		var tableViewRow = [];
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
					var stampImage = Ti.UI.createImageView(style.diaryStampImage);
					stampImage.image = 'images/icon/diary_' + rowStampList[j].stamp + '.png';
					stampView.add(stampImage);
				}
			}

			var rowArticleData = _rowData[i].articleData;
			if (rowArticleData != null) {
				var stampPhotoImage = Ti.UI.createImageView(style.diaryPhotoImage);
				stampPhotoImage.image = 'images/icon/diary_camera.png';
				stampPhotoImage.articleData = rowArticleData;
				dayView.add(stampPhotoImage);

				// フォトスタンプをクリックした時
				stampPhotoImage.addEventListener('click', function(e) {
					Ti.API.debug('[event]stampPhotoImage.click:');
					var diaryPhotoWin = win.createCalendarPhotoWindow(_userData, e.source.articleData);
					win.openWindow(diaryWin, diaryPhotoWin);
				});
			}

//			var plusImage = Ti.UI.createImageView(style.diaryPlusImage);
//			dayView.add(plusImage);

			tableViewRow.push(row);
		}
		return tableViewRow;
	}

	// カレンダー表示
	var getCalView = function(_year, _month) {
		Ti.API.debug('[func]getCalView:');

		var calView = Ti.UI.createTableView(style.diaryTableView);

		// 当月のカレンダーの表示
		var rowData = getCalendarRowData(_year, _month);
		var calendarRow = getCalendarTableViewRow(rowData);
		calView.setData(calendarRow);

		// 日付行をクリックした時
		calView.addEventListener('click', function(e) {
			Ti.API.debug('[event]calView.click:');
			Ti.API.debug('[event]e.source:', e.source);
			if (e.source.objectName != "diaryPhotoImage") {
				var timeWin = win.createTimeWindow(_userData, e.row.diaryData);
				win.openWindow(diaryWin, timeWin);
			}
		});

		return calView;
	};

	// 当月のカレンダー
	var thisDiaryView = getCalView(year, month);
	diaryWin.add(thisDiaryView);
	// 今日の日にスクロール
	thisDiaryView.scrollToIndex(nowDay-3>0?nowDay-3:0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});

	// 翌月のカレンダー
	var nextDiaryView = null;
	if (month == 12) {
		nextDiaryView = getCalView(year + 1, 1);
	} else {
		nextDiaryView = getCalView(year, month + 1);
	}
	nextDiaryView.left = style.commonSize.screenWidth + 'dp';
	diaryWin.add(nextDiaryView);

	// 前月のカレンダー
	var prevDiaryView = null;
	if (month == 1) {
		prevDiaryView = getCalView(year - 1, 12);
	} else {
		prevDiaryView = getCalView(year, month - 1);
	}
	prevDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
	diaryWin.add(prevDiaryView);


	// スライド用アニメーション
	var slideNext = Ti.UI.createAnimation({
		duration : 500,
		left : (style.commonSize.screenWidth * -1) + 'dp',
	});
	var slideReset = Ti.UI.createAnimation({
		duration : 500,
		left : '-1dp',
	});
	var slidePrev = Ti.UI.createAnimation({
		duration : 500,
		left : style.commonSize.screenWidth + 'dp',
	});

	// 左右スワイプで前月・翌月のカレンダーを表示
	diaryWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]diaryWin.swipe:');
		if (e.direction == 'right') {
			if (month == 1) {
				month = 12;
				year--;
			} else {
				month--;
			}
			thisDiaryView.animate(slidePrev);
			prevDiaryView.animate(slideReset);
			setTimeout(function() {
				diaryWin.remove(nextDiaryView);
				thisDiaryView.left = style.commonSize.screenWidth + 'dp';
				nextDiaryView = thisDiaryView;
				thisDiaryView = prevDiaryView;
				if (month == 1) {
					prevDiaryView = getCalView(year - 1, 12);
				} else {
					prevDiaryView = getCalView(year, month - 1);
				}
				monthTitle.text = monthName[month-1] + ' ' + year;
				prevDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
				diaryWin.add(prevDiaryView);
			}, 500);

		} else if (e.direction == 'left') {
			if (month == 12) {
				month = 1;
				year++;
			} else {
				month++;
			}
			thisDiaryView.animate(slideNext);
			nextDiaryView.animate(slideReset);
			setTimeout(function() {
				diaryWin.remove(prevDiaryView);
				thisDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
				prevDiaryView = thisDiaryView;
				thisDiaryView = nextDiaryView;
				if (month == 12) {
					nextDiaryView = getCalView(year + 1, 1);
				} else {
					nextDiaryView = getCalView(year, month + 1);
				}
				monthTitle.text = monthName[month-1] + ' ' + year;
				nextDiaryView.left = style.commonSize.screenWidth + 'dp';
				diaryWin.add(nextDiaryView);
			}, 500);			
		}
	});

	// タイトルの年月をクリックした時
	monthTitle.addEventListener('click', function(e) {
		Ti.API.debug('[event]monthTitle.click:');

		if (year == nowYear && month == nowMonth) {
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(nowDay-3>0?nowDay-3:0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			
		} else {
			year = nowYear;
			month = nowMonth;
			
			// タイトルの年月
			monthTitle.text = monthName[month-1] + ' ' + year;
	
			// 当月のカレンダー
			diaryWin.remove(thisDiaryView);
			thisDiaryView = getCalView(year, month, true);
			diaryWin.add(thisDiaryView);
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(nowDay-3>0?nowDay-3:0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
	
			// 翌月のカレンダー
			diaryWin.remove(nextDiaryView);
			if (month == 1) {
				nextDiaryView = getCalView(year + 1, 1, false);
			} else {
				nextDiaryView = getCalView(year, month + 1, false);
			}
			nextDiaryView.left = style.commonSize.screenWidth + 'dp';
			diaryWin.add(nextDiaryView);
		
			// 前月のカレンダー
			diaryWin.remove(prevDiaryView);
			if (month == 1) {
				prevDiaryView = getCalView(year - 1, 12, false);
			} else {
				prevDiaryView = getCalView(year, month - 1, false);
			}
			prevDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
			diaryWin.add(prevDiaryView);			
		}
	});

	return diaryWin;
}
