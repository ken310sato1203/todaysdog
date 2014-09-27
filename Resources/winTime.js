// 時間スケジュール

exports.createWindow = function(_userData, _diaryData){
	Ti.API.debug('[func]winTime.createWindow:');

	// 今日の日付
	var now = util.getDateElement(new Date());

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

	// timeTableViewの取得
	var getTimeTableView = function(_type) {
		Ti.API.debug('[func]getTimeTableView:');
		var targetView = Ti.UI.createTableView(style.timeTableView);
		var rowList = [];
		var prevHour = null;

		if (_diaryData.stampList.length > 0) {
			if (_type == "time") {
				for (var i=0; i<_diaryData.stampList.length; i++) {
					var row = Ti.UI.createTableViewRow(style.timeTableRow);
					row.stampData = _diaryData.stampList[i];
					var hourView = Ti.UI.createView(style.timeHourView);
					row.add(hourView);
					var timeLabel = Ti.UI.createLabel(style.timeHourLabel);
					if (_diaryData.stampList[i].hour == -1) {
						timeLabel.text = '終日';				
					} else {
						if (_diaryData.stampList[i].hour != prevHour) {
							timeLabel.text = _diaryData.stampList[i].hour + ':00';
							prevHour = _diaryData.stampList[i].hour;
						} else {
							var overLineView = Ti.UI.createView(style.timeOverLineView);
							row.add(overLineView);						
						}
					}
					hourView.add(timeLabel);
			
					if (_diaryData.stampList[i].insertFlag) {
						var todayView = Ti.UI.createView(style.timeInsertView);
						hourView.add(todayView);
						_diaryData.stampList[i].insertFlag = false;
					}
			
					var stampListView = Ti.UI.createView(style.timeStampListView);
					hourView.add(stampListView);
					var stampView = getStampView(_diaryData.stampList[i]);
					stampListView.add(stampView);	
			
					var minusImage = Ti.UI.createImageView(style.timeMinusImage);
					hourView.add(minusImage);
	
					rowList.push(row);
				}

			}

		} else {
			var noDataRow = Ti.UI.createTableViewRow(style.timeTableRow);
			var noDataView = Ti.UI.createView(style.timeNoDataView);
			var noDataLabel = Ti.UI.createLabel(style.timeNoDataLabel);
			noDataView.add(noDataLabel);
			var noDataImage = Ti.UI.createImageView(style.timeNoDataImage);
			noDataView.add(noDataImage);

			// 全体の高さーステータスバー(20)ータイトルバー(44)ーメニュー(74)ー下のタブ(44)
			noDataRow.height = style.commonSize.screenHeight - 182;
			noDataRow.add(noDataView);
			rowList.push(noDataRow);
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
									var diaryWin = win.getTab("diaryTab").window;
									_diaryData.stampList.splice(deleteIndex, 1);
									timeTableView.deleteRow(deleteIndex, {animated:true});
									diaryWin.fireEvent('refresh', {diaryData:_diaryData, timeWinUpdateFlag:false});
									// todayWinの更新
									var todayWin = win.getTab("todayTab").window;
									todayWin.fireEvent('refresh', {diaryData:_diaryData});

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

		targetView.setData(rowList);
		return targetView;
	};

	// ビューの更新
	var updateTableView = function(updateData) {
		Ti.API.debug('[func]updateTableView:');
		var type = "time";
		var position = null;

		// スタンプデータの取得 登録時は追加分も含む
		var stampList = model.getLocalStampList({
			userId: _userData.id,
			year: _diaryData.year,
			month: _diaryData.month,
			day: _diaryData.day
		});

		if (updateData != null) {
			var insertTarget = [];
			var idFlag = false;
			for (var i=0; i<updateData.stampList.length; i++) {
				var target = updateData.stampList[i].event;
				if (updateData.stampList[i].id) {
					target = target + updateData.stampList[i].id;
					idFlag = true;
				}
				insertTarget.push(target);
			}
			for (var i=0; i<stampList.length; i++) {
				var target = stampList[i].event;
				if (idFlag && stampList[i].id) {
					target = target + stampList[i].id;
				}
				if (insertTarget.indexOf(target) != -1) {
					stampList[i].insertFlag = true;
					if(position == null) {
						position = i-2 > 0 ? i-2 : 0;
					}
				}
			}
		}
		_diaryData.stampList = stampList;

		// ビューの再作成
		if(timeTableView) {
			timeWin.remove(timeTableView);
		}
		timeTableView = getTimeTableView(type);
		if(position != null) {
			timeTableView.scrollToIndex(position, {animated:false, position:Titanium.UI.iPhone.TableViewScrollPosition.TOP});
		}
		timeTableView.visible = true;			
		timeWin.add(timeTableView);

		// タイトルの表示
		dayTitle.text =  _diaryData.month + '月' + _diaryData.day + '日(' + _diaryData.weekday.text + ')';

	};

	// StampViewの取得
	var getTimeStampView = function(_stampList) {
		Ti.API.debug('[func]getTimeStampView:');
		// スタンプの表示
		var stampMenuView = Ti.UI.createScrollView(style.timeStampMenuScrollView);
/*
		// 複数登録スタンプ
		var editView = Ti.UI.createView(style.timeStampEditView);
		stampMenuView.add(editView);
		var editImage = Ti.UI.createImageView(style.timeStampEditImage);
		editView.add(editImage);
*/
		for (var i=0; i<_stampList.length; i++) {
			var stampView = Ti.UI.createView(style.timeStampSelectView);
			stampMenuView.add(stampView);
			var stampImage = Ti.UI.createImageView(style.timeStampSelectImage);
			stampView.add(stampImage);
			stampImage.image = 'images/icon/' + _stampList[i].stamp + '.png';
			stampView.stamp = _stampList[i].stamp;
		}

		// 余白分
		var spaceView = Ti.UI.createView(style.timeSpaceView);
		stampMenuView.add(spaceView);

		// スタンプボタンをクリック
		stampMenuView.addEventListener('click',function(e){
			Ti.API.debug('[event]stampMenuView.click:');
			var target = e.source;
			if (target.objectName == 'timeStampSelectView') {
				// 多重クリック防止
				if (clickEnable) {
					clickEnable = false;
					target.opacity = 0.5;
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
					var type = "time";
					var postWin = win.createStampPostWindow(type, _userData, [stampData]);
					postWin.prevWin = timeWin;
					win.openTabWindow(postWin, {animated:true});

					clickEnable = true;
					target.opacity = 1.0;
				}
			}
		});

		return stampMenuView;
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

	// ビューの作成
	var timeTableView = null;
	updateTableView();

/*
	// リストボタンの表示
	var listButton = Titanium.UI.createButton(style.timeListButton);
	if (_diaryData.stampList.length > 0) {
		timeWin.rightNavButton = listButton;
	}
*/
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
	listButton.addEventListener('click',function(e){
		Ti.API.debug('[event]listButton.click:');
		var target = e.source;
		// 多重クリック防止
		if (clickEnable) {
			clickEnable = false;
			target.opacity = 0.5;
			var stampListWin = win.createStampListWindow(_userData, _diaryData);
			stampListWin.prevWin = timeWin;
			// 下から表示させるため、modalでウィンドウを表示。
			// titleControlが表示されなかったので、NavigationWindowを使用。
			var navWin = Ti.UI.iOS.createNavigationWindow({
				modal: true,
			    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
			    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
				window: stampListWin
			});
			stampListWin.nav = navWin;
			navWin.open();
			clickEnable = true;
			target.opacity = 1.0;
		}
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
		updateTableView(e.diaryData);
		
	});

	return timeWin;
};

