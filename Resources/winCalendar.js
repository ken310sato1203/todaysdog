// カレンダー

exports.createWindow = function(_articleData){
	Ti.API.debug('[func]winCalendar.createWindow:');

	// 画面横幅
	var screenWidth = 322;

	var userData = model.getUser(_articleData.user);

	// 記事の日付
	var articleDate = util.getDate(_articleData.date);
	var articleYear = articleDate.getFullYear();
	var articleMonth = articleDate.getMonth();
	var articleDay = articleDate.getDate();

	var year = articleYear;
	var month = articleMonth;
	var day = articleDay;

	// 今日の日付
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth();
	var nowDay = now.getDate();

	var calendarWin = Ti.UI.createWindow(style.calendarWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.calendarTitleLabel);	
	monthTitle.text = monthName[month] + ' ' + year;
	calendarWin.titleControl = monthTitle;

	// カレンダーヘッダ（曜日）
	var headerView = Ti.UI.createView(style.calendarHeaderView);
	calendarWin.add(headerView);
	var weekday = [
		{text:'Sun',color:'#CD5C5C'},
		{text:'Mon',color:'#3a4756'},
		{text:'Tue',color:'#3a4756'},
		{text:'Wed',color:'#3a4756'},
		{text:'Thu',color:'#3a4756'},
		{text:'Fri',color:'#3a4756'},
		{text:'Sat',color:'#4169E1'}];

	for (var i=0; i<weekday.length; i++) {
		var headerLabel = Ti.UI.createLabel(style.calendarHeaderLabel);
		headerLabel.text = weekday[i].text;
		headerLabel.color = weekday[i].color;
		headerView.add(headerLabel);
	}

	// 日付の作成
	var getDayView = function(e) {
		Ti.API.debug('[func]getDayView:');
		var dayView = Ti.UI.createView(style.calendarDayView);
		dayView.backgroundColor = e.backgroundColor;
		dayView.year = e.year;
		dayView.month = e.month;
		dayView.day = e.day;
		dayView.current = e.current;

		var articleImage = null;
		
		if (e.article != null) {
			dayView.dayImage = Ti.UI.createImageView(style.calendarDayImage);
			dayView.dayImage.image = 'images/photo/' + e.article.no + '.jpg';
			dayView.add(dayView.dayImage);
		}

		dayView.dayLabel = Ti.UI.createLabel(style.calendarDayLabel);
		dayView.dayLabel.color = e.textColor;
		dayView.dayLabel.text = e.day;
		dayView.add(dayView.dayLabel);

		if ( e.current == 'yes' ) {
			// 今日の日付表示
			if ( e.day == nowDay ) {
				if (e.year == nowYear && e.month == nowMonth) {
					dayView.backgroundColor = '#87CEFA';
					dayView.dayLabel.color = 'white';
				}
			}
			// 記事の日付表示
			if ( e.day == articleDay ) {
				if (e.year == articleYear && e.month == articleMonth) {
					dayView.backgroundColor = '#FF8C00';
					dayView.dayLabel.color = 'white';
				}
			}			
		}

		return dayView;
	};

	// カレンダー表示
	var getCalView = function(_year, _month) {
		Ti.API.debug('[func]getCalView:');
		var calView = Ti.UI.createView(style.calendarCalView);
		// 当月の日数
		var daysInMonth = 32 - new Date(_year, _month, 32).getDate();
		// 当月1日の曜日
		var dayOfWeek = new Date(_year, _month, 1).getDay();
		// 前月の日数
		var daysInLastMonth = 32 - new Date(_year, _month - 1, 32).getDate();
		// 最終週の翌月の日付数
		var daysInNextMonth = 6 - (new Date(_year, _month, daysInMonth).getDay());

		// 前月の日付の作成
		// 前月の最初の日付
		var lastMonthFirstDay = daysInLastMonth - dayOfWeek + 1;
		for (var i=0; i < dayOfWeek; i++) {
			calView.add(getDayView({
				backgroundColor: '#F5F5F5',
				year : _year,
				month : _month,
				day : lastMonthFirstDay + i,
				current : 'no',
				textColor : '#8e959f',
				article : null,
			}));
		};
		
		// 当月の日付の作成
		// 当月の記事データ
		var calendarArticle = model.getCalendarArticle(userData, _year, _month);
		for (var i=0; i < daysInMonth; i++) {
			calView.add(getDayView({
				backgroundColor: 'white',
				year : _year,
				month : _month,
				day : i + 1,
				current : 'yes',
				textColor : '#3a4756',
				article : calendarArticle[i],
			}));
		};

		// 翌月の日付の作成
		for (var i=0; i < daysInNextMonth; i++) {
			calView.add(getDayView({
				backgroundColor: '#F5F5F5',
				year : _year,
				month : _month,
				day : i + 1,
				current : 'no',
				textColor : '#8e959f',
				article : null,
			}));
		};

		// 日付をクリックした時
		calView.addEventListener('click', function(e) {
			Ti.API.debug('[event]calView.click:');

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
					Ti.API.debug('[event]target.year:' + target.year);
					Ti.API.debug('[event]target.month:' + target.month);
					Ti.API.debug('[event]target.day:' + target.day);
	
					target.dayImage.opacity = 0.5;
					var calendarDate = new Date(target.year, target.month, target.day);
					var calendarPhotoWin = win.createCalendarPhotoWindow(userData, calendarDate);
					win.openWindow(calendarWin, calendarPhotoWin);
					target.dayImage.opacity = 1.0;
				}
	
			}
		});

		return calView;
	};

	// 当月のカレンダー
	var thisCalendarView = getCalView(year, month);
	calendarWin.add(thisCalendarView);

	// 翌月のカレンダー
	var nextCalendarView = null;
	if (month == 0) {
		nextCalendarView = getCalView(year + 1, 0);
	} else {
		nextCalendarView = getCalView(year, month + 1);
	}
	nextCalendarView.left = screenWidth + 'dp';
	calendarWin.add(nextCalendarView);

	// 前月のカレンダー
	var prevCalendarView = null;
	if (month == 0) {
		prevCalendarView = getCalView(year - 1, 11);
	} else {
		prevCalendarView = getCalView(year, month - 1);
	}
	prevCalendarView.left = (screenWidth * -1) + 'dp';
	calendarWin.add(prevCalendarView);

	// スライド用アニメーション
	var slideNext = Ti.UI.createAnimation({
		duration : 500,
		left : (screenWidth * -1) + 'dp',
	});
	var slideReset = Ti.UI.createAnimation({
		duration : 500,
		left : '-1dp',
	});
	var slidePrev = Ti.UI.createAnimation({
		duration : 500,
		left : screenWidth + 'dp',
	});

	// 左右スワイプで前月・翌月のカレンダーを表示
	calendarWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]calendarWin.swipe:');
		if (e.direction == 'right') {
			if (month == 0) {
				month = 11;
				year--;
			} else {
				month--;
			}
			thisCalendarView.animate(slidePrev);
			prevCalendarView.animate(slideReset);
			setTimeout(function() {
				thisCalendarView.left = screenWidth + 'dp';
				nextCalendarView = thisCalendarView;
				thisCalendarView = prevCalendarView;
				if (month == 0) {
					prevCalendarView = getCalView(year - 1, 11);
				} else {
					prevCalendarView = getCalView(year, month - 1);
				}
				monthTitle.text = monthName[month] + ' ' + year;
				prevCalendarView.left = (screenWidth * -1) + 'dp';
				calendarWin.add(prevCalendarView);
			}, 500);

		} else if (e.direction == 'left') {
			if (month == 11) {
				month = 0;
				year++;
			} else {
				month++;
			}
			thisCalendarView.animate(slideNext);
			nextCalendarView.animate(slideReset);
			setTimeout(function() {
				thisCalendarView.left = (screenWidth * -1) + 'dp';
				prevCalendarView = thisCalendarView;
				thisCalendarView = nextCalendarView;
				if (month == 11) {
					nextCalendarView = getCalView(year + 1, 0);
				} else {
					nextCalendarView = getCalView(year, month + 1);
				}
				monthTitle.text = monthName[month] + ' ' + year;
				nextCalendarView.left = screenWidth + 'dp';
				calendarWin.add(nextCalendarView);
			}, 500);			
		}
	});

	return calendarWin;
}

