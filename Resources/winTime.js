// 時間スケジュール

exports.createWindow = function(_userData, _diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = _diaryData.year;
	var month = _diaryData.month;
	var day = _diaryData.day;

	var monthName = util.diary.monthName;
	var timeRange = util.diary.timeRange;

	// 多重クリック防止
	var clickEnable = true;

	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.timeStampView);
		targetView.stampData = _rowStamp;

		var stampLabel = Ti.UI.createLabel(style.timeStampLabel);
		stampLabel.text = _rowStamp.textList[0];
		targetView.add(stampLabel);

		var stampImage = Ti.UI.createImageView(style.timeStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		return targetView;
	};

	// Viewの取得
	var getTimeTableView = function(_type) {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.timeTableView);
		var rowList = [];

		// 時間別に登録
		var stampHour = new Array(timeRange.length);
		for (var i=0; i<stampHour.length; i++) {
			stampHour[i] = {data: []};
		}
		for (var i=0; i<_diaryData.stampList.length; i++) {
			stampHour[_diaryData.stampList[i].hour + 1].data.push(_diaryData.stampList[i]);
		}	

		for (var i=0; i<timeRange.length; i++) {
			var row = Ti.UI.createTableViewRow(style.timeTableRow);		
			row.stampData = {
				no: null,
				event: null,
				user: _userData.id,
				stamp: null,
				textList: null,
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
				// 多重クリック防止
				if (clickEnable) {
					if (e.source.objectName == 'timeStampView') {
						clickEnable = false;
						var type = "time";
						var postWin = win.createStampPostWindow(type, _userData, [e.source.stampData]);
						postWin.addEventListener('open', function(){
							// スライド前にopenイベントが発火するので1秒後にセット
					        setTimeout(function(){
								clickEnable = true;
					        }, 1000);
					    });

						postWin.prevWin = timeWin;
						win.openTabWindow(postWin, {animated:true});
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
	
			var rowStampList = stampHour[i].data;

			if (_diaryData.todayFlag) {
				if (timeRange[i] == nowHour) {
					var todayView = Ti.UI.createView(style.timeTodayView);
					if (rowStampList.length > 1) {
						// heigth100%指定だと実機でサイズが最大になるため、最小サイズで登録数によって拡張
						// 上間下余白6dp+スタンプ32dp
						todayView.height = (rowStampList.length * 38 + 6) + 'dp';
					}
					hourView.add(todayView);
				}
			}
	
			var stampListView = Ti.UI.createView(style.timeStampListView);
			hourView.add(stampListView);
	
			if (rowStampList.length > 0) {
				for (var j=0; j<rowStampList.length; j++) {
					var stampView = getStampView(rowStampList[j]);
					stampListView.add(stampView);	
				}
			}
	
			var plusImage = Ti.UI.createImageView(style.timePlusImage);
			hourView.add(plusImage);
	
			plusImage.addEventListener('click',function(e){
				Ti.API.debug('[event]plusImage.click:');
				if (clickEnable) {
					clickEnable = false;
					var type = "time";
					var stampWin = win.createStampWindow(type, _userData, e.row.stampData);
					stampWin.addEventListener('open', function(){
						// スライド前にopenイベントが発火するので1秒後にセット
				        setTimeout(function(){
							clickEnable = true;
				        }, 1000);
				    });

					stampWin.prevWin = timeWin;
					win.openTabWindow(stampWin, {animated:true});
				}
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
		_view.scrollToIndex(_diaryData.timeIndex + 1, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
	};

	// ビューの更新
	var updateTableView = function() {
		Ti.API.debug('[func]updateTableView:');
		var type = "time";
		if (_diaryData.stampList == null) {
			// スタンプデータの取得
			var stampList = model.getLocalStampList({
				userId: _userData.id,
				year: year,
				month: month,
				day: day
			});
			_diaryData.stampList = stampList;
			timeTableView = getTimeTableView(type);
			timeTableView.visible = true;
			scrollPosition(timeTableView);
			timeWin.add(timeTableView);
			// タイトルの表示
//			monthTitle.text =  monthName[_diaryData.month - 1] + ' ' + _diaryData.day;
			monthTitle.text =  month + '月' + day + '日';			

/*
			model.getCloudStampList({
				userId: _userData.id,
				year: year,
				month: month,
				day: day
			}, function(e) {
				if (e.success) {
					Ti.API.debug('[func]getCloudStampList.callback:');
					_diaryData.stampList = e.stampList;
					timeTableView = getTimeTableView(type);
					timeTableView.visible = true;
					scrollPosition(timeTableView);
					timeWin.add(timeTableView);
					// タイトルの表示
					monthTitle.text =  monthName[_diaryData.month - 1] + ' ' + _diaryData.day;	
		
				} else {
					util.errorDialog(e);
				}
			});
*/	
		} else {
			timeTableView = getTimeTableView(type);
			timeTableView.visible = true;
			scrollPosition(timeTableView);
			timeWin.add(timeTableView);		
			// タイトルの表示
//			monthTitle.text =   monthName[_diaryData.month - 1] + ' ' + _diaryData.day;	
			monthTitle.text =  month + '月' + day + '日';
		}

	};


// ---------------------------------------------------------------------
	var timeWin = Ti.UI.createWindow(style.timeWin);
	// タイトルの表示
//	var titleView = Ti.UI.createView(style.timeTitleView);	
	var monthTitle = Ti.UI.createLabel(style.timeTitleLabel);
	timeWin.titleControl = monthTitle;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	timeWin.leftNavButton = backButton;

	// リストボタンの表示
	var listButton = Titanium.UI.createButton(style.timeListButton);

	timeWin.rightNavButton = listButton;
	// ボタンのbackgroundImageは後から変更できないのでImageViewの方で変更
	var listImage = Ti.UI.createImageView(style.timeListImage);
	listButton.add(listImage);

	// ビューの作成
	var timeTableView = null;
	updateTableView();


// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		timeWin.close({animated:true});
	});

	// リストボタンをクリック
	listButton.addEventListener('click', function(e){
		Ti.API.debug('[event]listButton.click:');
		listImage.opacity = 0.5;
		// ビューの再作成
		timeWin.remove(timeTableView);
		var type = null;
		if (e.source.listFlag == false) {
			type = "list";
			e.source.listFlag = true;
			listImage.image = "images/icon/w_arrow_listdown.png";

		} else {
			type = "time";
			e.source.listFlag = false;
			listImage.image = "images/icon/w_arrow_listup.png";
		}
//		timeWin.rightNavButton = e.source;
		timeTableView = getTimeTableView(type);
		scrollPosition(timeTableView);
		timeTableView.visible = true;
		timeWin.add(timeTableView);
		listImage.opacity = 1.0;
	});

/*
	// windowクローズ時
	timeWin.addEventListener('close', function(e) {
		Ti.API.debug('[event]timeWin.close:');
		timeWin.prevWin.nextWin = null;
	});
*/
	// 右スワイプで前の画面に戻る
	timeWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]timeWin.swipe:');
		if (e.direction == 'right') {
			timeWin.close({animated:true});
		}
	});

	// 更新用イベント
	timeWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]timeWin.refresh:');
		// ビューの再作成
		timeWin.remove(timeTableView);
		_diaryData = e.diaryData;
		updateTableView();

		// 初期化後に呼び出し元の画面を閉じる
		if (e.closeWin) {
			e.closeWin.close({animated:false});
		}
	});

/*
	// timWinからstampPostWinへの遷移でイベントが複数回実行（原因不明）されないようにするためのフラグ
	timeWin.addEventListener('focus', function(e){
		Ti.API.debug('[event]timeWin.focus:');		
		timeWin.openFlag = false;
	});
*/
	return timeWin;
};

