// 時間スケジュール

exports.createWindow = function(_userData, _diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = _diaryData.year;
	var month = _diaryData.month;
	var day = _diaryData.day;

	var monthName = util.diary.monthName;
	var timeRange = util.diary.timeRange;

	// 一番早い時間帯に登録されているデータの時間帯
	var firstHour = null;

	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.timeStampView);
		targetView.stampData = _rowStamp;

		var stampLabel = Ti.UI.createLabel(style.timeStampLabel);
		stampLabel.text = _rowStamp.text;
		targetView.add(stampLabel);

		var stampImage = Ti.UI.createImageView(style.timeStampImage);
		stampImage.image = 'images/icon/diary_' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		return targetView;
	}

	// Viewの取得
	var getTimeView = function(_type) {
		Ti.API.debug('[func]getTimeView:');
		var targetView = Ti.UI.createTableView(style.timeTableView);
		var rowList = [];

		// 時間別に登録
		var stampHour = new Array(timeRange.length);
		for (var i=0; i<stampHour.length; i++) {
			stampHour[i] = {data: []};
		}
		// 当日のデータ
		var stampList = _diaryData.stampList;
		if (stampList == null) {
			stampList = model.getStampDayList(_userData, _diaryData.year, _diaryData.month, _diaryData.day);			
		}
		for (var i=0; i<stampList.length; i++) {
			stampHour[stampList[i].hour + 1].data.push(stampList[i]);
		}	
		// 表示位置のリセット	
		firstHour = null;

		for (var i=0; i<timeRange.length; i++) {
			var row = Ti.UI.createTableViewRow(style.timeTableRow);		
			row.stampData = {
				no: null,
				user: _userData.user,
				stamp: null,
				text: null,
				year: year,
				month: month,
				day: day,
				hour: i-1,
				all: null,
				report: null,
				date: null,
			};
			
			var hourView = Ti.UI.createView(style.timeHourView);
			row.add(hourView);
	
			hourView.addEventListener('click',function(e){
				Ti.API.debug('[event]hourView.click:');
				if (timeWin.openFlag == false) {
					if (e.source.objectName == "timeStampImage" || e.source.objectName == "timeStampLabel") {
						var postWin = win.createStampPostWindow(_userData, [e.source.getParent().stampData]);
						postWin.prevWin = timeWin;
						win.openTabWindow(postWin);
						// timWinからの遷移でイベントが複数回実行（原因不明）されないようにするためのフラグ
						timeWin.openFlag = true;
					}
				}
			});
	
			var timeLabel = Ti.UI.createLabel(style.timeHourLabel);
			if (i == 0) {
				timeLabel.text = '終日';				
			} else {
				timeLabel.text = timeRange[i] + ':00';				
			}
			if (timeRange[i] % 3 == 0) {
				timeLabel.color = '#4169E1';
			}
			hourView.add(timeLabel);
	
			if (_diaryData.todayFlag) {
				if (timeRange[i] == nowHour) {
					var todayView = Ti.UI.createView(style.timeTodayView);
					hourView.add(todayView);
				}
			}
	
			var stampListView = Ti.UI.createView(style.timeStampListView);
			hourView.add(stampListView);
	
			var rowStampList = stampHour[i].data;
			if (rowStampList.length > 0) {
				for (var j=0; j<rowStampList.length; j++) {
					var stampView = getStampView(rowStampList[j]);
					stampListView.add(stampView);	
				}
				if (firstHour == null) {
					firstHour = i;				
				}
			}
	
			var plusImage = Ti.UI.createImageView(style.timePlusImage);
			hourView.add(plusImage);
	
			plusImage.addEventListener('click',function(e){
				Ti.API.debug('[event]plusImage.click:');
				var stampWin = win.createStampWindow(_userData, e.row.stampData);
				stampWin.prevWin = timeWin;
				win.openTabWindow(stampWin);
			});
			
			if (_type == "time" || (_type == "list" && rowStampList.length > 0)) {
				rowList.push(row);
			}
		}

		targetView.setData(rowList);
		return targetView;
	};

	// 表示位置にスクロール
	var scrollPosition = function(_view) {
		Ti.API.debug('[func]scrollPosition:');
		// view作成後にスクロールさせると下の方のインデックスの場合、最下層より下を表示してしまうため、オープン時にスクロールさせる
		if (_diaryData.todayFlag) {
			// 今日の場合、今の時間帯にスクロール
			_view.scrollToIndex(nowHour + 1, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		} else {
			_view.scrollToIndex(_diaryData.timeIndex + 1, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
/*			
			if (firstHour == null) {
				// 登録がない場合、9時にスクロール
				_view.scrollToIndex(10, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			} else {
				// 登録がある場合、一番早い時間帯に登録されているデータの時間帯にスクロール
				_view.scrollToIndex(firstHour, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			}
*/
		}		
	};

// ---------------------------------------------------------------------
	var timeWin = Ti.UI.createWindow(style.timeWin);
	// タイトルの表示
//	var titleView = Ti.UI.createView(style.timeTitleView);	
	var monthTitle = Ti.UI.createLabel(style.timeTitleLabel);
	var weekday = util.diary.weekday[new Date(year, month-1, day).getDay()];
	monthTitle.text =  month + '/' + day + ' ' + weekday.text;

//	titleView.add(monthTitle);
//	timeWin.leftNavButton = titleView;
	// 日別・時間別表示切り替えボタン
//	var tabbedBar = Titanium.UI.iOS.createTabbedBar(style.timeTitleTabbedBar);
	timeWin.titleControl = monthTitle;
	timeWin.barImage = 'images/icon/titleback.png';

	// リストボタンの表示
	var listButton = Titanium.UI.createButton(style.timeListButton);
	timeWin.rightNavButton = listButton;

	// ビューの作成
	var type = "time";
	var timeView = getTimeView(type);
	timeWin.add(timeView);

// ---------------------------------------------------------------------
	// リストボタンをクリック
	listButton.addEventListener('click', function(e){
		Ti.API.debug('[event]listButton.click:');
		// ビューの再作成
		timeWin.remove(timeView);
		var type = null;
		if (e.source.listFlag == false) {
			type = "list";
			e.source.listFlag = true;
			e.source.title = "時間別";
		} else {
			type = "time";
			e.source.listFlag = false;
			e.source.title = "リスト";
		}
		timeView = getTimeView(type);
		scrollPosition(timeView);
		timeWin.add(timeView);
	});

	// windowオープン時
	timeWin.addEventListener('open', function(e) {
		Ti.API.debug('[event]timeWin.open:');
		scrollPosition(timeView);
	});

	// windowクローズ時
	timeWin.addEventListener('close', function(e) {
		Ti.API.debug('[event]timeWin.close:');
		timeWin.prevWin.nextWin = null;
	});

	// 右スワイプで前の画面に戻る
	timeWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]timeWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(timeWin);
			timeWin.close();
		}
	});

	// 更新用イベント
	timeWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]timeWin.refresh:');
		// ビューの再作成
		timeWin.remove(timeView);
		var type = "time";
		_diaryData = e.diaryData;
		timeView = getTimeView(type);
		timeWin.add(timeView);
		timeView.scrollToIndex(e.diaryData.timeIndex + 1, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});

		// タイトルの表示
		monthTitle.text =  e.diaryData.year + ' ' + monthName[e.diaryData.month - 1] + ' ' + e.diaryData.day;

		if (timeWin.prevWin != null) {
			timeWin.prevWin.fireEvent('refresh', {diaryData:e.diaryData});
		}
	});

	// timWinからstampPostWinへの遷移でイベントが複数回実行（原因不明）されないようにするためのフラグ
	timeWin.addEventListener('focus', function(e){
		Ti.API.debug('[event]timeWin.focus:');		
		timeWin.openFlag = false;
	});

	return timeWin;
}

