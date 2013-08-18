// スタンプ投稿

exports.createWindow = function(_userData, _stampDataList){
	Ti.API.debug('[func]winStampPost.createWindow:');

	// Viewの取得
	var getPostView = function() {
		var targetView = Ti.UI.createTableView(style.stampPostTableView);
		var rowList = [];

		// スタンプ
		for (var i=0; i<_stampDataList.length; i++) {	
			var stampRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
			stampRow.objectName = "stamp";
			stampRow.stampData = _stampDataList[i];
			rowList.push(stampRow);
			var stampView = Titanium.UI.createView(style.stampPostStampView);
			stampRow.add(stampView);
	
			var postImage = Titanium.UI.createImageView(style.stampPostImage);
			postImage.image = 'images/icon/' + _stampDataList[i].stamp + '.png';
			stampView.add(postImage);		
			var postLabel = Ti.UI.createLabel(style.stampPostTextLabel);
			postLabel.text = _stampDataList[i].text;
			stampView.add(postLabel);
		}

		// 日付
		var dateRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		dateRow.objectName = "date";
		rowList.push(dateRow);
		var dateView = Titanium.UI.createView(style.stampPostListView);
		dateRow.add(dateView);

		var dateLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		dateLabel.text = '日付';
		dateField.value = dateValue;
		dateField.enabled = false;
		dateView.add(dateLabel);
		dateView.add(dateField);

		// 時間
		var hourRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		hourRow.objectName = "hour";
		rowList.push(hourRow);
		var hourView = Titanium.UI.createView(style.stampPostListView);
		hourRow.add(hourView);

		var hourLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		hourLabel.text = '時間';
		hourField.value = hourValue;
		hourField.enabled = false;
		hourView.add(hourLabel);
		hourView.add(hourField);

		// 終日
		var allRow = Ti.UI.createTableViewRow(style.stampPostTableRow);
		allRow.objectName = "all";
		rowList.push(allRow);
		var allView = Titanium.UI.createView(style.stampPostListView);
		allRow.add(allView);

		var allLabel = Ti.UI.createLabel(style.stampPostListItemLabel);
		allLabel.text = '終日';
		allSwitch.value = allValue;
		allView.add(allLabel);
		allView.add(allSwitch);

		targetView.setData(rowList);

		// フィールドをクリックで入力フィールド・選択ビューを表示
		targetView.addEventListener('click', function(e){
			Ti.API.debug('[event]postView.click:');
	
			if (e.rowData.objectName != null){
				var targetName = e.rowData.objectName;
				if (targetName == "stamp"){
					var textWin = win.createStampTextWindow(_userData, e.rowData.stampData);
					textWin.prevWin = postWin;
					win.openTabWindow(textWin, {animated:true});
	
				} else if (targetName == "date"){
					datePicker.value = util.getDate(dateField.value);
					datePickerView.animate(slideIn);
	
				} else if (targetName == "hour"){
					if(allSwitch.value == false) {
						hourPicker.setSelectedRow(0, util.getHour(hourField.value));
						// アニメーションがうまく動かないので時間遅らせて表示
						setTimeout(function() {
							hourPickerView.animate(slideIn);
						}, 100);
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

		return targetView;
	};

// ---------------------------------------------------------------------

	var postWin = Ti.UI.createWindow(style.stampPostWin);
	// タイトルの表示
	var titleLabel = Ti.UI.createLabel(style.stampPostTitleLabel);	
	postWin.titleControl = titleLabel;

	// 戻るボタンの表示
	var backButton = Titanium.UI.createButton(style.commonBackButton);
	postWin.leftNavButton = backButton;

	// 投稿ボタンの表示
	var postButton = Titanium.UI.createButton(style.commonPlusButton);
	postWin.rightNavButton = postButton;

	// 日付
	var dateField = Ti.UI.createTextField(style.stampPostListValueField);
	var dateValue = util.getFormattedDate(new Date(_stampDataList[0].year, _stampDataList[0].month-1, _stampDataList[0].day));
	// 時間
	var hourField = Ti.UI.createTextField(style.stampPostListValueField);
	var hourValue = null;
	if (_stampDataList[0].hour == "-1") {
		hourValue = "-";
	} else {
		hourValue = util.getFormattedHour(_stampDataList[0].hour);
	}
	// 終日
	var allSwitch = Ti.UI.createSwitch(style.stampPostListValueSwitch);
	var allValue = false;

	// 選択したフィールド名を保管
	var selectedName = null;
	// 選択ビュー表示用アニメーション
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-259});

	var postView = getPostView();
	postWin.add(postView);

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
			dateValue = util.getFormattedDate(selectedValue);
			dateField.value = dateValue;
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
			hourValue = util.getFormattedHour(selectedIndex);
			hourField.value = hourValue;
		}
		hourPickerView.animate(slideOut);
	});
	hourPicker.addEventListener('change',function(e){
	    selectedIndex = e.rowIndex;
	});

	// 終日選択
	allSwitch.addEventListener('change',function(e){
	   if (e.value == true) {
	   		hourField.value = "-";
	   } else {
			hourField.value = hourValue;
	   }
	});

// ---------------------------------------------------------------------
	// 戻るボタンをクリック
	backButton.addEventListener('click', function(e){
		Ti.API.debug('[event]backButton.click:');
		postWin.close({animated:true});
	});	

	// ロード用画面
	var actInd = Ti.UI.createActivityIndicator(style.commonActivityIndicator);

	// 投稿ボタンをクリック
	postButton.addEventListener('click', function(e){
		Ti.API.debug('[event]postButton.click:');

		var alertDialog = Titanium.UI.createAlertDialog({
			title: '投稿しますか？',
			buttonNames: ['OK','キャンセル'],
			cancel: 1
		});
		alertDialog.show();

		alertDialog.addEventListener('click',function(alert){
			Ti.API.debug('[event]alertDialog.click:');						
			// OKの場合
			if(alert.index == 0){
				actInd.show();
				tabGroup.add(actInd);
				
				for (var i=0; i<_stampDataList.length; i++) {	
					// フィールドの値をセット
					var date = util.getDate(dateField.value);
					_stampDataList[i].year = date.getFullYear();
					_stampDataList[i].month = date.getMonth() + 1;
					_stampDataList[i].day = date.getDate();
					if(allSwitch.value == true) {
						_stampDataList[i].hour = -1;
					} else {
						_stampDataList[i].hour = util.getHour(hourField.value);
					}

					if (_stampDataList[i].no == null) {
						model.addStampList(_stampDataList[i]);
					} else {
						model.updateStampList(_stampDataList[i]);
					}
				}

				model.addCloudStampList(_stampDataList, function(e) {
					Ti.API.debug('[func]cloudAddStampList.callback:');						
					if (e.success) {
						Ti.API.debug('Success:');
						if (postWin.prevWin != null) {
							postWin.prevWin.fireEvent('refresh', {stampDataList:_stampDataList});
						}
						// 複数の画面を同時にアニメーションさせるとエラーになるのでアニメーションさせない
						postWin.close({animated:false});
		
					} else {
						util.errorDialog();
					}

					setTimeout(function(){
						actInd.hide();
					},2000);
				});
			}
		});
	});

	// 更新用イベント
	postWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]postWin.refresh:');
		// 投稿テキストの更新
		for (var i=0; i<_stampDataList.length; i++) {
			if (_stampDataList[i].stamp == e.stampData.stamp) {
				_stampDataList[i].text = e.stampData.text;
			}
		}
		// ビューの再作成
		postWin.remove(postView);
		postWin.remove(datePickerView);
		postWin.remove(hourPickerView);
		postView = getPostView();
		postWin.add(postView);
		postWin.add(datePickerView);
		postWin.add(hourPickerView);
	});

	return postWin;
};
