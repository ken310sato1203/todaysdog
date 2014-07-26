// 時間スケジュール

exports.createWindow = function(_userData, _diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 今日の日付
	var now = util.getDateElement(new Date());

//	var year = _diaryData.year;
//	var month = _diaryData.month;
//	var day = _diaryData.day;
//	var weekday = _diaryData.weekday.text;

	var monthName = util.diary.monthName;
	var timeRange = util.diary.timeRange;

	// 多重クリック防止
	var clickEnable = true;

	// StampViewの取得
	var getStampView = function(_rowStamp) {
		Ti.API.debug('[func]getStampView:');

		var targetView = Ti.UI.createView(style.timeStampView);
//		targetView.stampData = _rowStamp;

		var stampLabel = Ti.UI.createLabel(style.timeStampLabel);
		stampLabel.text = _rowStamp.textList[0];
		targetView.add(stampLabel);

		var stampImage = Ti.UI.createImageView(style.timeStampImage);
		stampImage.image = 'images/icon/' + _rowStamp.stamp + '.png';
		targetView.add(stampImage);

		return targetView;
	};

	// Viewの取得
	var getTimeTableRow = function(_stampData) {
		Ti.API.debug('[func]getTimeTableRow:');
		var prevHour = null;
		var row = Ti.UI.createTableViewRow(style.timeTableRow);		
		row.stampData = _stampData;
		var hourView = Ti.UI.createView(style.timeHourView);
		row.add(hourView);
		var timeLabel = Ti.UI.createLabel(style.timeHourLabel);
		if (_stampData.hour == -1) {
			timeLabel.text = '終日';				
		} else {
			if (_stampData.hour != prevHour) {
				timeLabel.text = _stampData.hour + ':00';
				prevHour = _stampData.hour;
			}
		}
		hourView.add(timeLabel);
/*
			if (_diaryData.todayFlag) {
				if (_stampData.hour == now.hour) {
					var todayView = Ti.UI.createView(style.timeTodayView);
					hourView.add(todayView);
				}
			}
*/
		var stampListView = Ti.UI.createView(style.timeStampListView);
		hourView.add(stampListView);
		var stampView = getStampView(_stampData);
		stampListView.add(stampView);	

		var minusImage = Ti.UI.createImageView(style.timeMinusImage);
		hourView.add(minusImage);
		
		return row;
	};

	// Viewの取得
	var getTimeTableView = function(_type) {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.timeTableView);
		var rowList = [];

		if (_type == "time" || (_type == "list" && _diaryData.stampList.length > 0)) {
			for (var i=0; i<_diaryData.stampList.length; i++) {
				rowList.push(getTimeTableRow(_diaryData.stampList[i]));
			}
		}

		targetView.addEventListener('click',function(e){
			Ti.API.debug('[event]targetView.click:');
			// 多重クリック防止
			if (clickEnable) {
				if (e.source.objectName == 'timeStampView') {
					clickEnable = false;
					var type = "time";
					var postWin = win.createStampPostWindow(type, _userData, [e.row.stampData]);
					postWin.addEventListener('open', function(){
						// スライド前にopenイベントが発火するので1秒後にセット
				        setTimeout(function(){
							clickEnable = true;
				        }, 1000);
				    });	

					postWin.prevWin = timeWin;
					win.openTabWindow(postWin, {animated:true});

				} else if (e.source.objectName == 'timeMinusImage') {

					var alertDialog = Titanium.UI.createAlertDialog({
						title: '削除しますか？',
						buttonNames: ['キャンセル','OK'],
						cancel: 1
					});
					alertDialog.show();
			
					alertDialog.addEventListener('click',function(alert){
						// OKの場合
						if(alert.index == 1){
							clickEnable = false;
							actInd.show();
							tabGroup.add(actInd);
							var stampData = e.row.stampData;
							var deleteIndex = e.index;
							
							// 登録データを削除する場合
							model.removeCloudStampList(stampData, function(e) {
								Ti.API.debug('[func]removeCloudStampList.callback:');						
								if (e.success) {
									Ti.API.debug('Success:');
									model.removeLocalStampList(stampData);
									actInd.hide();
									clickEnable = true;
									// diaryWinの更新
									var targetTab = win.getTab("diaryTab");
									var diaryWin = targetTab.window;
									_diaryData.stampList.splice(deleteIndex, 1);
									timeTableView.deleteRow(deleteIndex, {animated:true});
									diaryWin.fireEvent('refresh', {diaryData:_diaryData, timeWinUpdateFlag:false});
								} else {
									actInd.hide();
									clickEnable = true;
									util.errorDialog(e);
								}
							});					
						}
					});
				}
			}
		});

		if (_type == "list" && _diaryData.stampList.length == 0) {
			var noDataRow = Ti.UI.createTableViewRow(style.timeTableRow);		
			rowList.push(noDataRow);
			var noDataView = Ti.UI.createView(style.timeNoDataView);
			noDataRow.add(noDataView);
			var noDataLabel = Ti.UI.createLabel(style.timeNoDataLabel);
			noDataView.add(noDataLabel);
		}
		targetView.setData(rowList);
		return targetView;
	};

	// ビューの更新
	var updateTableView = function(updateData) {
		Ti.API.debug('[func]updateTableView:');
		var type = "list";

		// スタンプデータの取得 登録時は追加分も含む
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: _diaryData.year,
			month: _diaryData.month,
			day: _diaryData.day
		});
		_diaryData.stampList = stampList;

		if(timeTableView == null) {
			timeTableView = getTimeTableView(type);
			timeTableView.visible = true;			
			timeWin.add(timeTableView);
		}

		if (updateData != null) {	
			var insertIndex = stampList.length - 1;
			for (var i=0; i<stampList.length; i++) {
				if (stampList[i].hour > updateData.stampList[0].hour){
					insertIndex = i-1;
					break;
				}
			}
			if(timeTableView.data[0].rows.length == 1 && timeTableView.data[0].rows[0].stampData == null) {
				timeTableView.deleteRow(0, {animated:true});
				timeTableView.appendRow(getTimeTableRow(updateData.stampList[0]), {animated:true});				
			} else {
				timeTableView.insertRowBefore(insertIndex, getTimeTableRow(updateData.stampList[0]), {animated:true});				
			}
			
		}

//		timeTableView = getTimeTableView(type);
//		timeTableView.visible = true;
//		var position = _diaryData.timeIndex-1 > 0 ? _diaryData.timeIndex-1 : 0;
//		timeTableView.scrollToIndex(position, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
//		timeWin.add(timeTableView);
		// タイトルの表示
		dayTitle.text =  _diaryData.month + '月' + _diaryData.day + '日(' + _diaryData.weekday.text + ')';

	};

	// StampViewの取得
	var getTimeStampView = function(_stampList) {
		Ti.API.debug('[func]getTimeStampView:');
		// スタンプの表示
		var stampScrollView = Ti.UI.createScrollView(style.timeStampSelectScrollView);
		stampScrollView.top = 74 + (style.commonSize.screenWidth * 3 / 4) - style.commonSize.textBottom;
		// 複数登録スタンプ
		var editView = Ti.UI.createView(style.timeStampEditView);
		stampScrollView.add(editView);
		var editImage = Ti.UI.createImageView(style.timeStampEditImage);
		editView.add(editImage);

		for (var i=0; i<_stampList.length; i++) {
			var stampView = Ti.UI.createView(style.timeStampSelectView);
			stampScrollView.add(stampView);
			var stampImage = Ti.UI.createImageView(style.timeStampSelectImage);
			stampView.add(stampImage);
			stampImage.image = 'images/icon/' + _stampList[i].stamp + '.png';
			stampView.stamp = _stampList[i].stamp;
		}

		// 余白分
		var spaceView = Ti.UI.createView(style.timeSpaceView);
		stampScrollView.add(spaceView);

		// スタンプボタンをクリック
		stampScrollView.addEventListener('click',function(e){
			Ti.API.debug('[event]stampView.click:');
			var target = e.source;
			// 日時の更新
			var nowDate = new Date();
			now = util.getDateElement(nowDate);
			now.weekday = util.diary.weekday[nowDate.getDay()];
			now.today = util.getFormattedDate(nowDate);

			var stampData = {
				no: null,
				event: null,
				user: _userData.id,
				stamp: target.stamp,
				textList: [''],
				year: _diaryData.year,
				month: _diaryData.month,
				day: _diaryData.day,
				hour: now.hour,
				all: null,
				report: null,
				date: null,
			};

			// 多重クリック防止
			target.touchEnabled = false;
			target.opacity = 0.5;
			if (target.objectName == 'timeStampSelectView') {
				var type = "time";
				var postWin = win.createStampPostWindow(type, _userData, [stampData]);
				postWin.prevWin = timeWin;
				win.openTabWindow(postWin, {animated:true});
			
			} else if (target.objectName == 'timeStampEditView') {
				var type = "time";
				var stampWin = win.createStampWindow(type, _userData, stampData);
/*
				stampWin.addEventListener('open', function(){
					// スライド前にopenイベントが発火するので1秒後にセット
			        setTimeout(function(){
						target.touchEnabled = true;
						target.opacity = 1.0;
			        }, 1000);
			    });
*/
				stampWin.prevWin = timeWin;
				win.openTabWindow(stampWin, {animated:true});
			}
			target.touchEnabled = true;
			target.opacity = 1.0;
		});

		return stampScrollView;
	};
	
// ---------------------------------------------------------------------
	var timeWin = Ti.UI.createWindow(style.timeWin);
	timeWin.diaryData = _diaryData;
	// タイトルの表示
//	var titleView = Ti.UI.createView(style.timeTitleView);	
	var dayTitle = Ti.UI.createLabel(style.timeTitleLabel);
	timeWin.titleControl = dayTitle;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	timeWin.leftNavButton = backButton;
/*
	// リストボタンの表示
	var listButton = Titanium.UI.createButton(style.timeListButton);
	timeWin.rightNavButton = listButton;
	// ボタンのbackgroundImageは後から変更できないのでImageViewの方で変更
	var listImage = Ti.UI.createImageView(style.timeListImage);
	listButton.add(listImage);
*/
	// ビューの作成
	var timeTableView = null;
	updateTableView();

	// スタンプの表示
	var timeStampList = model.getTimeStampList();
	timeWin.add(getTimeStampView(timeStampList));

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		timeWin.close({animated:true});
		timeWin.prevWin.nextWin = null;
	});

/*
	// リストボタンをクリック
	listButton.addEventListener('click', function(e){
		Ti.API.debug('[event]listButton.click:');
		listImage.opacity = 0.5;
		// ビューの再作成
		timeWin.remove(timeTableView);
		var type = null;
		var position = 0;
		if (e.source.listFlag == false) {
			type = "list";
			e.source.listFlag = true;
			listImage.image = 'images/icon/w_arrow_listdown.png';

		} else {
			type = "time";
			e.source.listFlag = false;
			listImage.image = 'images/icon/w_arrow_listup.png';
			position = _diaryData.timeIndex-1 > 0 ? _diaryData.timeIndex-1 : 0;
		}
//		timeWin.rightNavButton = e.source;
		timeTableView = getTimeTableView(type);
		timeTableView.scrollToIndex(position, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		timeTableView.visible = true;
		timeWin.add(timeTableView);
		listImage.opacity = 1.0;
	});
*/

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
			timeWin.prevWin.nextWin = null;
		}
	});

	// 更新用イベント
	timeWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]timeWin.refresh:');
		// 今日の日付の取得
		now = util.getDateElement(new Date());
		// ビューの再作成
//		timeWin.remove(timeTableView);
//		_diaryData = e.diaryData;
		updateTableView(e.diaryData);
		
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

