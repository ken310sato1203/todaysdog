// 日記

exports.createWindow = function(_userData){
	Ti.API.debug('[func]winDiary.createWindow:');

	// 今日の日付の取得
	var now = util.getDateElement(new Date());
	var year = now.year;
	var month = now.month;
	var monthName = util.diary.monthName;

	// 多重クリック防止
	var slideEnable = true;
	var clickEnable = true;

	// スタンプの最大表示件数
	var stampListMax = 7;

	// スクロール位置
	var offset = null;

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

		for (var i=0; i<_stampList.length; i++) {
			stampDay[_stampList[i].day-1].data.push(_stampList[i]);
		}


		// 当月の記事データ
//		var articleList = model.getCalendarArticle(_userData, _year, _month);

		var rowData = [];
		for (var i=0; i<months[_month-1]; i++) {
			var dayOfWeek = (new Date(_year, _month-1, i+1, 0, 0, 0)).getDay();
			var diaryData = {
				year: _year,
				month: _month,
				day: i+1,
				weekday: util.diary.weekday[dayOfWeek],
				todayFlag: false,
				stampList: stampDay[i].data,
//				articleData: articleList[i],
				timeIndex: 9,
			};

			if (_year == now.year && _month == now.month && i+1 == now.day) {
				diaryData.todayFlag = true;
				diaryData.timeIndex = now.hour;
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
				if (rowStampList.length > stampListMax) {
					var arrowImage = Ti.UI.createImageView(style.diaryArrowImage);
					stampView.add(arrowImage);					
				}
			}

/*
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
*/
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

			// 多重クリック防止
			if (clickEnable) {
				clickEnable = false;
				var diaryData = null;
				var animatedFlag = true;
				if (e.row) {
					diaryData = e.row.diaryData;
				} else {
					// 初回起動時用initイベントで今日の日を指定
					diaryData = e.source.data[0].rows[now.day-1].diaryData;
					animatedFlag = false;
				}
				
				var timeWin = win.createTimeWindow(_userData, diaryData);
				timeWin.addEventListener('open', function(){
					// スライド前にopenイベントが発火するので1秒後にセット
			        setTimeout(function(){
						clickEnable = true;
			        }, 1000);
			    });

				timeWin.prevWin = diaryWin;
				diaryWin.nextWin = timeWin;
				win.openTabWindow(timeWin, {animated:animatedFlag});
			}
		});

		return calView;
	};

	// スライド用アニメーション
	var slideView = Ti.UI.createAnimation({
		duration : 300,
		left : style.commonSize.screenWidth + 'dp',
	});

	// 前月カレンダーの表示
	var prevCalView = function() {
		Ti.API.debug('[func]prevCalView:');
		// 多重クリック防止
		if (slideEnable) {
			slideView.left = style.commonSize.screenWidth + 'dp';
			thisDiaryView.borderColor = '#dedede';
			thisDiaryView.animate(slideView, function(e){
				if (month == 1) {
					month = 12;
					year--;
				} else {
					month--;
				}
		
				// タイトルの年月
				monthTitle.text = year + '年' + month + '月';
				// 当月データの取得
				var stampList = model.getLocalStampList({
					userId: _userData.id,
					year: year,
					month: month,
					day: null
				});
				// カレンダーの表示
				thisDiaryView = getCalView(stampList, year, month);
				// 前のポジションに移動
				var dayPosi = Math.round(offset / 45);
				thisDiaryView.scrollToIndex(dayPosi, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});	
				diaryWin.add(thisDiaryView);
			});
		}
	};

	// 翌月カレンダーの表示
	var nextCalView = function() {
		Ti.API.debug('[func]nextCalView:');
		// 多重クリック防止
		if (slideEnable) {
			slideView.left = (style.commonSize.screenWidth * -1) + 'dp';
			thisDiaryView.borderColor = '#dedede';
			thisDiaryView.animate(slideView, function(e){
				if (month == 12) {
					month = 1;
					year++;
				} else {
					month++;
				}
		
				// タイトルの年月
				monthTitle.text = year + '年' + month + '月';
				// 当月データの取得
				var stampList = model.getLocalStampList({
					userId: _userData.id,
					year: year,
					month: month,
					day: null
				});
				// カレンダーの表示
				thisDiaryView = getCalView(stampList, year, month);
				// 前のポジションに移動
				var dayPosi = Math.round(offset / 45);
				thisDiaryView.scrollToIndex(dayPosi, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});	
				diaryWin.add(thisDiaryView);
			});
		}
	};


	// カレンダーの再作成
	var updateCalView = function(_year, _month, _day) {
		Ti.API.debug('[func]updateCalView:');
		year = _year;
		month = _month;
		// タイトルの年月
		monthTitle.text = year + '年' + month + '月';
		// ビューの再作成
		if(thisDiaryView) {
			diaryWin.remove(thisDiaryView);
		}

		// 当月のスタンプデータ取得
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: year,
			month: month,
			day: null
		});
		// カレンダーの表示
		thisDiaryView = getCalView(stampList, year, month);
		// 今日の日にスクロール
		thisDiaryView.scrollToIndex(_day-3 > 0 ? _day-3 : 0, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		offset = _day-3 > 0 ? (_day-3) * 45: 0;		
		diaryWin.add(thisDiaryView);
	};

// ---------------------------------------------------------------------
	var diaryWin = Ti.UI.createWindow(style.diaryWin);
	// タイトルの表示
	var titleView = Ti.UI.createView(style.diaryTitleView);
	diaryWin.titleControl = titleView;
	var prevImage = Ti.UI.createImageView(style.diaryPrevImage);
	titleView.add(prevImage);
	var monthTitle = Ti.UI.createLabel(style.diaryTitleLabel);
	titleView.add(monthTitle);
	var nextImage = Ti.UI.createImageView(style.diaryNextImage);
	titleView.add(nextImage);

	var thisDiaryView = null;

	updateCalView(now.year, now.month, now.day);

// ---------------------------------------------------------------------
	// 前月ボタンをクリック
	prevImage.addEventListener('click', function(e){
		Ti.API.debug('[event]prevImage.click:');
		e.source.opacity = 0.5;
		prevCalView();
		e.source.opacity = 1.0;
	});
	// 翌月ボタンをクリック
	nextImage.addEventListener('click', function(e){
		Ti.API.debug('[event]nextImage.click:');
		e.source.opacity = 0.5;
		nextCalView();
		e.source.opacity = 1.0;
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
		e.source.opacity = 0.5;
		// 今日の日付の取得
		now = util.getDateElement(new Date());
		if(now.year == year && now.month == month) {
			// 今日の日にスクロール
			thisDiaryView.scrollToIndex(now.day-3 > 0 ? now.day-3 : 0, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			offset = now.day-3 > 0 ? (now.day-3) * 45: 0;
		} else {
			// カレンダー更新
			updateCalView(now.year, now.month, now.day);
		}
		e.source.opacity = 1.0;
	});

	diaryWin.addEventListener('scroll',function(e) {
		// ポジションを取得
		offset = e.contentOffset.y;
	});

	// 更新用イベント
	diaryWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]diaryWin.refresh:');
		// 今日の日付の取得
		now = util.getDateElement(new Date());
		var diaryData = null;

		if (e.diaryData) {
			diaryData = e.diaryData;
		} else {
			var dayOfWeek = (new Date(now.year, now.month - 1, now.day, 0, 0, 0)).getDay();
			diaryData = {
				year: now.year,
				month: now.month,
				day: now.day,
				weekday: util.diary.weekday[dayOfWeek],
				todayFlag: true,
				stampList: null,
				articleData: null,
				timeIndex: now.hour,
			};
		}

		// timeWinの更新
		if (e.timeWinUpdateFlag == true) {
			if (diaryWin.nextWin == null) {
/*
				// timeWinを新規オープン
				var timeWin = win.createTimeWindow(_userData, diaryData);
				timeWin.prevWin = diaryWin;
				diaryWin.nextWin = timeWin;
				win.getTab("diaryTab").open(timeWin, {animated:false});
*/	
			} else {
				var currentDate = {
					year: diaryWin.nextWin.diaryData.year, 
					month: diaryWin.nextWin.diaryData.month, 
					day: diaryWin.nextWin.diaryData.day, 
				};
				var targetDate = null;
				if (e.diaryData) {
					targetDate = {
						year: e.diaryData.year, 
						month: e.diaryData.month, 
						day: e.diaryData.day, 
					};
				} else {
					targetDate = {
						year: now.year, 
						month: now.month, 
						day: now.day, 
					};
				}
								
				if (currentDate.year != targetDate.year || currentDate.month != targetDate.month || currentDate.day != targetDate.day) {
					var oldWin = diaryWin.nextWin;
					// timeWinを新規オープン
					var timeWin = win.createTimeWindow(_userData, diaryData);
					timeWin.prevWin = diaryWin;
					diaryWin.nextWin = timeWin;
					win.getTab("diaryTab").open(timeWin, {animated:false});
					oldWin.close({animated:false});
	
				} else {
					if (e.diaryData) {
						diaryWin.nextWin.fireEvent('refresh', {diaryData:diaryData});
					}
				}
			}
		}

		// timeWinの更新後に、diaryWinを更新
		updateCalView(diaryData.year, diaryData.month, diaryData.day);

		// 更新処理の後でタブの切り替え
		if (e.activeTab) {
			tabGroup.activeTab = e.activeTab;
		}
	});

	return diaryWin;
};

