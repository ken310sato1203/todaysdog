// 時間スケジュール

exports.createWindow = function(_timeData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = _timeData.year;
	var month = _timeData.month;
	var day = _timeData.day;

	var timeWin = Ti.UI.createWindow(style.timeWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.timeTitleLabel);	
	monthTitle.text =  year + ' ' + monthName[month] + ' ' + day;
	timeWin.titleControl = monthTitle;

	var timeView = Ti.UI.createTableView(style.timeTableView);

	var timeRow = [];
	var timeRange = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
	// 一番早い時間帯に登録されているデータの時間帯
	var firstHour = null;

	// 時間別に登録
	var stampHour = new Array(timeRange.length);
	for (var i=0; i<stampHour.length; i++) {
		stampHour[i] = {data: []};
	}
	// 当日のデータ
	var stampList = _timeData.stampList;
	for (var i=0; i<stampList.length; i++) {
		stampHour[stampList[i].hour].data.push(stampList[i]);
	}

	for (var i=0; i<timeRange.length; i++) {
		var row = Ti.UI.createTableViewRow(style.timeTableRow);
		var hourView = Ti.UI.createView(style.timeHourView);
		row.add(hourView);

		var timeLabel = Ti.UI.createLabel(style.timeHourLabel);
		timeLabel.text = timeRange[i] + ':00';
		if (timeRange[i] % 3 == 0) {
			timeLabel.color = '#4169E1';
		}
		hourView.add(timeLabel);

		if (_timeData.todayFlag) {
			if (timeRange[i] == nowHour) {
				var todayView = Ti.UI.createView(style.timeTodayView);
				hourView.add(todayView);
			}
		}

		var rowStampList = stampHour[i].data;
		if (rowStampList.length > 0) {
			var stampListView = Ti.UI.createView(style.timeStampListView);
			hourView.add(stampListView);

			for (var j=0; j<rowStampList.length; j++) {
				var stampView = Ti.UI.createView(style.timeStampView);
				stampListView.add(stampView);
				var stampImage = Ti.UI.createImageView(style.timeStampImage);
				stampImage.image = 'images/icon/diary_' + rowStampList[j].stamp + '.png';
				stampView.add(stampImage);
				var stampLabel = Ti.UI.createLabel(style.timeStampLabel);
				stampLabel.text = rowStampList[j].text;
				if (stampLabel.text.length > 32) {
					stampLabel.overFlag = true;
				}
				stampView.add(stampLabel);

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
						timeView.setData(timeView.data);
					}
				});

			}
			if (firstHour == null) {
				firstHour = i;				
			}
		}

		var plusImage = Ti.UI.createImageView(style.timePlusImage);
		hourView.add(plusImage);
		
		timeRow.push(row);
	}
	timeView.setData(timeRow);
	timeWin.add(timeView);

	// windowオープン時
	timeWin.addEventListener('open', function(e) {
		Ti.API.debug('[event]timeWin.open:');
		// timeView作成後にスクロールさせると下の方のインデックスの場合、最下層より下を表示してしまうため、オープン時にスクロールさせる
		if (_timeData.todayFlag) {
			// 今日の場合、今の時間帯にスクロール
			timeView.scrollToIndex(nowHour, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		} else {
			if (firstHour == null) {
				// 登録がない場合、9時にスクロール
				timeView.scrollToIndex(9, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			} else {
				// 登録がある場合、一番早い時間帯に登録されているデータの時間帯にスクロール
				timeView.scrollToIndex(firstHour, {animated:true, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
			}
		}
	});

	// 右スワイプで前の画面に戻る
	timeWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]timeWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(timeWin);
		}
	});

	return timeWin;
}

