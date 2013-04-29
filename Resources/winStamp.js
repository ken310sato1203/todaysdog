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

// ---------------------------------------------------------------------
	var stampWin = Ti.UI.createWindow(style.stampWin);
	// タイトルの表示
	var monthTitle = Ti.UI.createLabel(style.stampTitleLabel);	
	stampWin.titleControl = monthTitle;

	// 次へボタンの表示
	var nextButton = Titanium.UI.createButton(style.stampNextButton);
	nextButton.enabled = false;
	stampWin.rightNavButton = nextButton;

	var stampListView = Ti.UI.createView(style.stampListView);
	stampWin.add(stampListView);
	var stampView = Ti.UI.createView(style.stampView);
	stampListView.add(stampView);
	
	var stampSelectList = model.getStampSelectList();
	var selectedIndex = new Array(stampSelectList.length);
	var selectedCount = 0;

	for (var i=0; i<stampSelectList.length; i++) {
		var stampImage = Ti.UI.createImageView(style.stampImage);
		stampImage.index = i;
		stampImage.image = 'images/icon/diary_' + stampSelectList[i] + '.png';		
		stampView.add(stampImage);

		// スタンプをクリック
		stampImage.addEventListener('click',function(e){
			Ti.API.debug('[event]stampImage.click:');
			if (selectedIndex[e.source.index]) {
				e.source.opacity = 0.2;
				selectedIndex[e.source.index] = false;
				selectedCount--;
			} else {
				e.source.opacity = 1.0;
				selectedIndex[e.source.index] = true;
				selectedCount++;
			}
			if (selectedCount > 0) {
				nextButton.enabled = true;
			} else {
				nextButton.enabled = false;
			}
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
		var stampDataList = [];
		for (var i=0; i<stampSelectList.length; i++) {
			if (selectedIndex[i]) {
				var stampData = {
					no: null,
					user: _stampData.user,
					stamp: stampSelectList[i],
					text: null,
					year: _stampData.year,
					month: _stampData.month,
					day: _stampData.day,
					hour: _stampData.hour,
					all: null,
					report: null,
					date: null,
				};
				stampDataList.push(stampData);
			}
		}

		var postWin = win.createStampPostWindow(_userData, stampDataList);	
		postWin.prevWin = stampWin;
		win.openTabWindow(postWin);
	});

	// 更新用イベント
	stampWin.addEventListener('refresh', function(e){
		Ti.API.debug('[event]stampWin.refresh:');
		stampWin.prevWin.fireEvent('refresh', {stampData:e.stampData});
		Ti.API.debug('[***]stampWin.close:');
		stampWin.close();
	});

	return stampWin;
}

