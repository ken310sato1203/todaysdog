// スタンプ投稿

exports.createWindow = function(_type, _userData, _stampDataList){
	Ti.API.debug('[func]winStampPost.createWindow:');
	Ti.API.debug('_type:' + _type);

	// stampRowの取得
	var getStampRow = function(_stampData) {
		Ti.API.debug('[func]getStampRow:');

		var stampRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		stampRow.objectName = "stamp";
		stampRow.stampData = _stampData;
		var stampView = Titanium.UI.createView(style.stampPostStampView);
		stampRow.add(stampView);
		var postImage = Titanium.UI.createImageView(style.stampPostImage);
		postImage.image = 'images/icon/' + _stampData.stamp + '.png';
		stampView.add(postImage);		
		var postLabel = Ti.UI.createLabel(style.stampPostTextLabel);
		postLabel.text = _stampData.textList[0];
		stampView.add(postLabel);
		var minusView = Titanium.UI.createView(style.stampPostMinusView);
		stampView.add(minusView);
		var minusImage = Titanium.UI.createImageView(style.stampPostMinusImage);
		minusView.add(minusImage);

		return stampRow;
	};


	// Viewの取得
	var setPostTableView = function() {
		Ti.API.debug('[func]setPostTableView:');
		var rowList = [];

		// スタンプ
		for (var i=0; i<_stampDataList.length; i++) {			
			rowList.push(getStampRow(_stampDataList[i]));
		}

		// 日付
		var dateRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		dateRow.objectName = "date";
		rowList.push(dateRow);
		var dateView = Titanium.UI.createView(style.stampPostListView);
		dateRow.add(dateView);

		var dateLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		dateLabel.text = '日付';
		dateView.add(dateLabel);
		dateView.add(dateValue);

		// 時間
		var hourRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		hourRow.objectName = "hour";
		rowList.push(hourRow);
		var hourView = Titanium.UI.createView(style.stampPostListView);
		hourRow.add(hourView);

		var hourLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		hourLabel.text = '時間';
		hourView.add(hourLabel);
		hourView.add(hourValue);

		// 終日
		var allRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		allRow.objectName = "all";
		rowList.push(allRow);
		var allView = Titanium.UI.createView(style.stampPostListView);
		allRow.add(allView);

		var allLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		allLabel.text = '終日';
		allView.add(allLabel);
		allView.add(allSwitch);

		postTableView.setData(rowList);

	};

	// 登録済みのスタンプデータを削除する場合
	var removeStampData = function(_stampData) {
		Ti.API.debug('[func]removeStampData:');

		var alertDialog = Titanium.UI.createAlertDialog({
			title: '削除しますか？',
			buttonNames: ['キャンセル','OK'],
			cancel: 1
		});
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
			Ti.API.debug('[event]alertDialog.click:');						
			// OKの場合
			if(alert.index == 1){
				actInd.show();
				tabGroup.add(actInd);
				
				// 登録データを削除する場合
				model.removeCloudStampList(_stampData, function(e) {
					Ti.API.debug('[func]removeCloudStampList.callback:');						
					if (e.success) {
						Ti.API.debug('Success:');
						model.removeLocalStampList(_stampData);
						closePostWin();
					} else {
						util.errorDialog(e);
					}
					actInd.hide();
				});
			}
		});		
	};

	// Windowクローズ時の更新処理
	var closePostWin = function() {
		Ti.API.debug('[func]closePostWin:');
		var diaryData = {
			year: _stampDataList[0].year,
			month: _stampDataList[0].month,
			day: _stampDataList[0].day,
			weekday: null,
			todayFlag: false,
			stampList: null,
			articleData: null,
			timeIndex: _stampDataList[0].hour,
		};

		// 今日の日付
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();

		if (diaryData.year == year && diaryData.month == month && diaryData.day == day) {
			diaryData.todayFlag = true;
		}

		// stampWinを閉じる
		if (postWin.prevWin.objectName == 'stampWin') {
			postWin.prevWin.close({animated:false});
		}

		// todayWinの更新
		var todayWin = win.getTab("todayTab").window;
		todayWin.fireEvent('refresh');
		if (_type == "today") {
			todayWin.addEventListener('refresh', function(){
				postWin.close({animated:false});
		    });
		}

		// diaryWinの更新
		var diaryWin = win.getTab("diaryTab").window;
		diaryWin.fireEvent('refresh', {diaryData:diaryData});
		// timeWinの更新
		var timeWin = diaryWin.nextWin;
		if (timeWin != null) {
			timeWin.fireEvent('refresh', {diaryData:diaryData});
			if (_type == "time") {
				timeWin.addEventListener('refresh', function(){
					postWin.close({animated:false});
			    });
			}
		}

	};
						
// ---------------------------------------------------------------------

	var postWin = Ti.UI.createWindow(style.stampPostWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampPostTitleLabel);	
	postWin.titleControl = titleLabel;

	// 戻るボタンの表示
	var backButton = Ti.UI.createButton(style.commonBackButton);
	postWin.leftNavButton = backButton;

	// 投稿ボタンの表示
	var postButton = Ti.UI.createButton(style.stampPostButton);
	postWin.rightNavButton = postButton;

	// 日付
	var dateValue = Ti.UI.createLabel(style.stampPostListValueLabel);
	dateValue.text = util.getFormattedDate(new Date(_stampDataList[0].year, _stampDataList[0].month-1, _stampDataList[0].day));
	// 終日
	var allSwitch = Ti.UI.createSwitch(style.stampPostListValueSwitch);
	// 時間
	var hourValue = Ti.UI.createLabel(style.stampPostListValueLabel);
	if (_stampDataList[0].hour == "-1") {
		hourValue.text = '指定なし';
		hourValue.source = '00:00';
		allSwitch.value = true;
	} else {
		hourValue.text = util.getFormattedHour(_stampDataList[0].hour);
		hourValue.source = hourValue.text;
		allSwitch.value = false;
	}

	// 選択したフィールド名を保管
	var selectedName = null;
	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

	var postScrollView = Ti.UI.createScrollView(style.stampPostScrollView);
	postWin.add(postScrollView);
	var postTableView = Ti.UI.createTableView(style.stampPostTableView);
	postScrollView.add(postTableView);
	setPostTableView();

	// 日付選択
	var datePickerView = Titanium.UI.createView(style.stampPostListPickerView);
	postWin.add(datePickerView);

	var datePicker = Ti.UI.createPicker(style.stampPostListDatePicker);
	datePicker.value = new Date();
	datePickerView.add(datePicker);

	var datePickerToolbar =  Titanium.UI.iOS.createToolbar(style.stampPostListPickerToolbar);
	datePickerView.add(datePickerToolbar);
	var dateCancel = Titanium.UI.createButton(style.stampPostListCancelButton);
	var dateSpacer = Titanium.UI.createButton(style.stampPostListSpacerButton); 
	var dateDone = Titanium.UI.createButton(style.stampPostListDoneButton); 
	datePickerToolbar.setItems([dateCancel,dateSpacer,dateDone]);
	var selectedValue = null;

	dateCancel.addEventListener('click', function(e){
		datePickerView.animate(slideOut);
	});
	dateDone.addEventListener('click', function(e){
		if (selectedValue != null) {
			dateValue.text = util.getFormattedDate(selectedValue);
		}
		datePickerView.animate(slideOut);
	});
	datePicker.addEventListener('change',function(e){
	    selectedValue = e.value;
	});

	// 時間選択
	var hourPickerView = Titanium.UI.createView(style.stampPostListPickerView);
	postWin.add(hourPickerView);

	var hourPicker = Ti.UI.createPicker(style.stampPostListHourPicker);
	hourPickerView.add(hourPicker);

	var selectHour = [
		{title:'00:00',value:'0'},
		{title:'01:00',value:'1'},
		{title:'02:00',value:'2'},
		{title:'03:00',value:'3'},
		{title:'04:00',value:'4'},
		{title:'05:00',value:'5'},
		{title:'06:00',value:'6'},
		{title:'07:00',value:'7'},
		{title:'08:00',value:'8'},
		{title:'09:00',value:'9'},
		{title:'10:00',value:'10'},
		{title:'11:00',value:'11'},
		{title:'12:00',value:'12'},
		{title:'13:00',value:'13'},
		{title:'14:00',value:'14'},
		{title:'15:00',value:'15'},
		{title:'16:00',value:'16'},
		{title:'17:00',value:'17'},
		{title:'18:00',value:'18'},
		{title:'19:00',value:'19'},
		{title:'20:00',value:'20'},
		{title:'21:00',value:'21'},
		{title:'22:00',value:'22'},
		{title:'23:00',value:'23'}];
	var picherRowList = new Array(selectHour.length);

	for (var i=0; i<picherRowList.length; i++) {
		picherRowList[i] = Ti.UI.createPickerRow(selectHour[i]);
	}
	hourPicker.add(picherRowList);

	var hourPickerToolbar =  Titanium.UI.iOS.createToolbar(style.stampPostListPickerToolbar);
	hourPickerView.add(hourPickerToolbar);
	var hourCancel = Titanium.UI.createButton(style.stampPostListCancelButton);
	var hourSpacer = Titanium.UI.createButton(style.stampPostListSpacerButton); 
	var hourDone = Titanium.UI.createButton(style.stampPostListDoneButton); 
	hourPickerToolbar.setItems([hourCancel,hourSpacer,hourDone]);
	var selectedIndex = null;

	hourCancel.addEventListener('click', function(e){
		hourPickerView.animate(slideOut);
	});
	hourDone.addEventListener('click', function(e){
		if (selectedIndex != null) {
			hourValue.text = util.getFormattedHour(selectedIndex);
			hourValue.source = hourValue.text;
			allSwitch.value = false;
		}
		hourPickerView.animate(slideOut);
	});
	hourPicker.addEventListener('change',function(e){
	    selectedIndex = e.rowIndex;
	});

	// 終日選択
	allSwitch.addEventListener('change',function(e){
	   if (e.value) {
	   		hourValue.text = '指定なし';
	   } else {
			hourValue.text = hourValue.source;
	   }
	});

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);
	var actBackView = Titanium.UI.createView(style.commonActivityBackView);

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		postWin.close({animated:true});
	});	

	// 右スワイプで前の画面に戻る
	postWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]postWin.swipe:');
		if (e.direction == 'right') {
			postWin.close({animated:true});
		}
	});

	// フィールドをクリックで入力フィールド・選択ビューを表示
	postTableView.addEventListener('click', function(e){
		Ti.API.debug('[event]postTableView.click:');

		if (e.rowData.objectName != null){
			var targetName = e.rowData.objectName;
			if (targetName == "stamp"){
				// マイナスボタンを押すと削除
				if (e.source.objectName == "minus"){
					if (_stampDataList.length == 1) {
						if (_stampDataList[0].event == null) {
							postWin.close({animated:true});
						} else {
							// 登録済みのスタンプデータを削除する場合
							removeStampData(_stampDataList[0]);
						}

					} else {
						postTableView.deleteRow(e.index);
						_stampDataList.splice(e.index, 1);
					}

				} else {
					var textWin = win.createStampTextWindow(_userData, e.rowData.stampData);
					textWin.prevWin = postWin;
					win.openTabWindow(textWin, {animated:true});
				}
					
			} else if (targetName == "date"){
				datePicker.value = util.getDate(dateValue.text);
				datePickerView.animate(slideIn);

			} else if (targetName == "hour"){
//					if(allSwitch.value == false) {
					hourPicker.setSelectedRow(0, util.getHour(hourValue.source));
					// アニメーションがうまく動かないので時間遅らせて表示
					setTimeout(function() {
						hourPickerView.animate(slideIn);
					}, 100);
//					}

			} else if (targetName == "all"){
				if (allSwitch.value) {
					allSwitch.value = false;
				} else {
					allSwitch.value = true;
				}
			}

			if (selectedName != targetName){
				if (selectedName == "date"){
					datePickerView.animate(slideOut);

				} else if (targetName == "hour"){
					hourPickerView.animate(slideOut);
				}
			}				
			selectedName = targetName;
		}
	});

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');
		postButton.enabled = false;
		postWin.add(actBackView);
		actInd.show();
		tabGroup.add(actInd);
		
		for (var i=0; i<_stampDataList.length; i++) {	
			// フィールドの値をセット
			var date = util.getDate(dateValue.text);
			_stampDataList[i].year = date.getFullYear();
			_stampDataList[i].month = date.getMonth() + 1;
			_stampDataList[i].day = date.getDate();
			if(allSwitch.value == true) {
				_stampDataList[i].hour = -1;
			} else {
				_stampDataList[i].hour = util.getHour(hourValue.text);
			}
		}

		model.addCloudStampList(_stampDataList, function(e) {
			Ti.API.debug('[func]cloudAddStampList.callback:');
			if (e.success) {
				Ti.API.debug('Success:');
				// ローカルに登録
				model.addLocalStampList(e.stampDataList);
				model.addLocalStampHistoryList(_stampDataList);
				closePostWin();
			} else {
				util.errorDialog(e);
			}
			actInd.hide();
			actBackView.hide();
			postButton.enabled = true;
		});
	});

	// 更新用イベント
	postWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]postWin.refresh:');
		// 投稿テキストの更新
		for (var i=0; i<_stampDataList.length; i++) {
			if (_stampDataList[i].stamp == e.stampData.stamp) {
				_stampDataList[i].textList = e.stampData.textList;
				postTableView.updateRow(i,getStampRow(_stampDataList[i]));
				break;
			}
		}
	});

	return postWin;
};
