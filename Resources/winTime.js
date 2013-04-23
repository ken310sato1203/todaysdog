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

	var timeWin = Ti.UI.createWindow(style.timeWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.timeTitleLabel);	
	monthTitle.text =  year + ' ' + monthName[month] + ' ' + day;
	timeWin.titleControl = monthTitle;

	// リフレッシュ時用格納リスト
	var refreshTarget = [];
	// 一番早い時間帯に登録されているデータの時間帯
	var firstHour = null;

	// Viewの取得
	var getTimeView = function() {

		var targetView = Ti.UI.createTableView(style.timeTableView);
		var timeRow = [];
		var timeRange = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

		// 時間別に登録
		var stampHour = new Array(timeRange.length);
		for (var i=0; i<stampHour.length; i++) {
			stampHour[i] = {data: []};
		}
		// 当日のデータ
		var stampList = _diaryData.stampList;
		for (var i=0; i<stampList.length; i++) {
			stampHour[stampList[i].hour].data.push(stampList[i]);
		}

		// フォローユーザの記事の取得
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
	
			// リフレッシュ時に更新する対象を特定するために格納
			refreshTarget.push({no:_rowStamp.no, stampView:targetView, stampImage:stampImage, stampLabel:stampLabel});
	
			return targetView;
		}
	
	
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
				hour: i,
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
						var postWin = win.createStampPostWindow(_userData, e.source.getParent().stampData);
						postWin.prevWin = timeWin;
						win.openTabWindow(postWin);
						// timWinからstampPostWinへの遷移でイベントが複数回実行（原因不明）されないようにするためのフラグ
						timeWin.openFlag = true;
					}
				}
			});
	
			var timeLabel = Ti.UI.createLabel(style.timeHourLabel);
			timeLabel.text = timeRange[i] + ':00';
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
	
	/*
					if (stampLabel.text.length > 32) {
						stampLabel.overFlag = true;
					}
	*/
	/*
					// stampLabelをクリックでテキストを全表示
					stampLabel.addEventListener('click',function(e){
						Ti.API.debug('[event]stampLabel.click:');
						// テキストが全表示できてない場合
						if (e.source.overFlag) {
							if (e.source.height != Ti.UI.SIZE) {
								e.source.height = Ti.UI.SIZE;
							} else {
								e.source.height = '32dp';
							}
							// サイズを反映するためにリフレッシュ
							targetView.setData(targetView.data);
						}
					});
	*/
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
			
			timeRow.push(row);
		}
		targetView.setData(timeRow);

		return targetView;
	}

	var timeView = getTimeView();
	timeWin.add(timeView);

	// 表示位置にスクロール
	var scrollPosition = function(_view) {
		Ti.API.debug('[func]scrollPosition:');
		// view作成後にスクロールさせると下の方のインデックスの場合、最下層より下を表示してしまうため、オープン時にスクロールさせる
		if (_diaryData.todayFlag) {
			// 今日の場合、今の時間帯にスクロール
			_view.scrollToIndex(nowHour, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		} else {
			if (firstHour == null) {
				// 登録がない場合、9時にスクロール
				_view.scrollToIndex(9, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			} else {
				// 登録がある場合、一番早い時間帯に登録されているデータの時間帯にスクロール
				_view.scrollToIndex(firstHour, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			}
		}		
	}

	// windowオープン時
	timeWin.addEventListener('open', function(e) {
		Ti.API.debug('[event]timeWin.open:');
		var childView = e.source.children[0];
		scrollPosition(childView);
	});

	// 右スワイプで前の画面に戻る
	timeWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]timeWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(timeWin);
		}
	});

	// 更新用イベント
	timeWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]timeWin.refresh:');
		var childView = e.source.children[0];
		timeWin.remove(childView);

		var stampDayList = model.getStampDayList(_userData, _diaryData.year, _diaryData.month, _diaryData.day);
		_diaryData.stampList = stampDayList;

		var timeView = getTimeView();
		timeWin.add(timeView);
		timeView.scrollToIndex(e.stampData.hour, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});

/*
		var childView = e.source.children[0];
		var addFlag = true;
		for (var i=0; i<refreshTarget.length; i++) {
			if (refreshTarget[i].no == e.stampData.no) {
				refreshTarget[i].stampView.stampData = e.stampData;
				refreshTarget[i].stampImage.image = 'images/icon/diary_' + e.stampData.stamp + '.png';
				refreshTarget[i].stampLabel.text = e.stampData.text;
				addFlag = false;
				break;
			}
		}
		if (addFlag) {
			var targetViewList = childView.data[0].rows[e.stampData.hour].children[0].children;
			for (var i=0; i<targetViewList.length; i++) {
				if (targetViewList[i].objectName == "timeStampListView") {
					var stampAddView = getStampView(e.stampData);
					targetViewList[i].add(stampAddView);

					break;
				}
			}
		}
//		timeWin.prevWin.fireEvent('refresh', {stampData:e.stampData});
*/
	});

	// timWinからstampPostWinへの遷移でイベントが複数回実行（原因不明）されないようにするためのフラグ
	timeWin.addEventListener('focus', function(e){
		Ti.API.debug('[event]timeWin.focus:');		
		timeWin.openFlag = false;
	});

	return timeWin;
}

