// スタンプ

exports.createWindow = function(_userData, _stampData){
	Ti.API.debug('[func]winStamp.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = _stampData.year;
	var month = _stampData.month;
	var day = _stampData.day;
	var hour = _stampData.hour;

	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// ---------------------------------------------------------------------
	var stampWin = Ti.UI.createWindow(style.stampWin);
	// タイトルの表示
	var monthTitle = Ti.UI.createLabel(style.stampTitleLabel);	
	monthTitle.text =  year + ' ' + monthName[month] + ' ' + day;
	stampWin.titleControl = monthTitle;

	// 次へボタンの表示
	var nextButton = Titanium.UI.createButton(style.stampNextButton);
	stampWin.rightNavButton = nextButton;

	var stampListView = Ti.UI.createView(style.stampListView);
	stampWin.add(stampListView);
	var stampView = Ti.UI.createView(style.stampView);
	stampListView.add(stampView);
	
	var selectedStamp = null;
	var stampSelectList = model.getStampSelectList();

	for (var i=0; i<stampSelectList.length; i++) {
		var stampImage = Ti.UI.createImageView(style.stampImage);
		stampImage.stamp = stampSelectList[i];
		stampImage.image = 'images/icon/diary_' + stampSelectList[i] + '.png';
		
		if (i == 0) {
			stampImage.opacity = 1.0;
			selectedStamp = stampImage;
		}
		stampView.add(stampImage);

		// スタンプをクリック
		stampImage.addEventListener('click',function(e){
			Ti.API.debug('[event]stampImage.click:');
			selectedStamp.opacity = 0.2;
			e.source.opacity = 1.0;
			selectedStamp = e.source;
		});
	}

// ---------------------------------------------------------------------
	// 右スワイプで前の画面に戻る
	stampWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]stampWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(stampWin);
		}
	});

	// 次へボタンをクリック
	nextButton.addEventListener('click', function(e){
		Ti.API.debug('[event]nextButton.click:');
		_stampData.stamp = selectedStamp.stamp;
		var postWin = win.createStampPostWindow(_userData, _stampData);	
		postWin.prevWin = stampWin;
		win.openTabWindow(postWin);
	});

	// 更新用イベント
	stampWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]stampWin.refresh:');
		stampWin.prevWin.fireEvent('refresh', {stampData:e.stampData});
		stampWin.close();
	});

	return stampWin;
}

