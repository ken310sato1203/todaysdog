// 日記

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winDiary.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth();
	var nowDay = now.getDate();

	var year = nowYear;
	var month = nowMonth;

	var diaryWin = Ti.UI.createWindow(style.diaryWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.diaryTitleLabel);	
	monthTitle.text = monthName[month] + ' ' + year;
	diaryWin.titleControl = monthTitle;

	// カレンダーデータの取得
	var getCalendarRowData = function(year, month) {
		Ti.API.debug('[func]getDiaryRowData:');
		var leap = year % 4 ? 0 : year % 100 ? 1 : year % 400 ? 0 : 1;
		var months = [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var weekday = [
			{text:'SUN',color:'#CD5C5C'},
			{text:'MON',color:'#3a4756'},
			{text:'TUE',color:'#3a4756'},
			{text:'WED',color:'#3a4756'},
			{text:'THU',color:'#3a4756'},
			{text:'FRI',color:'#3a4756'},
			{text:'SAT',color:'#4169E1'}];

		var rowData = [];
		for (var day = 1; day <= months[month]; day++){
			var dayOfWeek = (new Date(year, month, day, 0, 0, 0)).getDay();
			var row = {
				weekday: weekday[dayOfWeek],
				day: day,
				todayFlag: false,
			};
			if (year == nowYear && month == nowMonth && day == nowDay){
				row.todayFlag = true;
			}
			rowData.push(row);
		}
		return rowData;
	}

	// カレンダービューを取得
	var getCalendarTableViewRow = function(_rowData) {
		Ti.API.debug('[func]getDiaryTableViewRow:');
		var len = _rowData.length;
		var tableViewRow= [];
		for (var i = 0; i < len; i++) {
			var row = Ti.UI.createTableViewRow(style.diaryTableRow);
			tableViewRow.push(row);

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

			if (_rowData[i].day == 4){

				var iconRed = Ti.UI.createImageView({
					width:30,
					height:30,
					left:35,
					top:0,
					image:'/ui/parts/roundRed.png'
				});
				var iconGreen = Ti.UI.createImageView({
					width:30,
					height:30,
					left:70,
					top:0,
					image:'/ui/parts/roundGreen.png'
				});
				dayView.add(iconRed);
				dayView.add(iconGreen);
			}

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

		return calView;
	};

	// 当月のカレンダー
	var thisDiaryView = getCalView(year, month);
	thisDiaryView.scrollToIndex(nowDay - 1, {animated:true});
	diaryWin.add(thisDiaryView);

	// 翌月のカレンダー
	var nextDiaryView = null;
	if (month == 0) {
		nextDiaryView = getCalView(year + 1, 0);
	} else {
		nextDiaryView = getCalView(year, month + 1);
	}
	nextDiaryView.left = style.commonSize.screenWidth + 'dp';
	diaryWin.add(nextDiaryView);

	// 前月のカレンダー
	var prevDiaryView = null;
	if (month == 0) {
		prevDiaryView = getCalView(year - 1, 11);
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
			if (month == 0) {
				month = 11;
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
				if (month == 0) {
					prevDiaryView = getCalView(year - 1, 11);
				} else {
					prevDiaryView = getCalView(year, month - 1);
				}
				monthTitle.text = monthName[month] + ' ' + year;
				prevDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
				diaryWin.add(prevDiaryView);
			}, 500);

		} else if (e.direction == 'left') {
			if (month == 11) {
				month = 0;
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
				if (month == 11) {
					nextDiaryView = getCalView(year + 1, 0);
				} else {
					nextDiaryView = getCalView(year, month + 1);
				}
				monthTitle.text = monthName[month] + ' ' + year;
				nextDiaryView.left = style.commonSize.screenWidth + 'dp';
				diaryWin.add(nextDiaryView);
			}, 500);			
		}
	});

	// タイトルの年月をクリックした時
	monthTitle.addEventListener('click', function(e) {
		Ti.API.debug('[event]monthTitle.click:');

		if (year == nowYear && month == nowMonth) {
			Ti.API.debug('[event]nowYear:' + nowYear);
			Ti.API.debug('[event]nowMonth:' + nowMonth);
			var scrollPosition = 0;
			if (nowDay > 3) {
				scrollPosition = nowDay - 3;
			}
			thisDiaryView.scrollToIndex(scrollPosition, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			
		} else {
			year = nowYear;
			month = nowMonth;
			
			// タイトルの年月
			monthTitle.text = monthName[month] + ' ' + year;
	
			// 当月のカレンダー
			diaryWin.remove(thisDiaryView);
			thisDiaryView = getCalView(year, month, true);
			thisDiaryView.scrollToIndex(nowDay - 3, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			diaryWin.add(thisDiaryView);
	
			// 翌月のカレンダー
			diaryWin.remove(nextDiaryView);
			if (month == 0) {
				nextDiaryView = getCalView(year + 1, 0, false);
			} else {
				nextDiaryView = getCalView(year, month + 1, false);
			}
			nextDiaryView.left = style.commonSize.screenWidth + 'dp';
			diaryWin.add(nextDiaryView);
		
			// 前月のカレンダー
			diaryWin.remove(prevDiaryView);
			if (month == 0) {
				prevDiaryView = getCalView(year - 1, 11, false);
			} else {
				prevDiaryView = getCalView(year, month - 1, false);
			}
			prevDiaryView.left = (style.commonSize.screenWidth * -1) + 'dp';
			diaryWin.add(prevDiaryView);			
		}
	});

	return diaryWin;
}

