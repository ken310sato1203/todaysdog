// スタンプ

exports.createWindow = function(_type, _userData, _stampData){
	Ti.API.debug('[func]winStamp.createWindow:');

	// 今日の日付
	var now = new Date();
	var nowDay = now.getDate();
	var nowHour = now.getHours();

	var year = _stampData.year;
	var month = _stampData.month;
	var day = _stampData.day;
	var hour = _stampData.hour;

	var stampWin = Ti.UI.createWindow(style.stampWin);
	// タイトルの表示
	var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var monthTitle = Ti.UI.createLabel(style.stampTitleLabel);	
	monthTitle.text =  year + ' ' + monthName[month] + ' ' + day;
	stampWin.titleControl = monthTitle;

	var stampListView = Ti.UI.createView(style.stampListView);
	stampWin.add(stampListView);
	var stampView = Ti.UI.createView(style.stampView);
	stampListView.add(stampView);
	
	var stampList = [
		'edit','dog','restaurant','home','sun','water','star','favorite','time',
		'edit','dog','restaurant','home','sun','water','star','favorite','time',
		'edit','dog','restaurant','home','sun','water','star','favorite','time',
		'edit','dog','restaurant','home','sun','water','star','favorite','time',
		'edit','dog','restaurant','home','sun','water'
		];
	for (var i=0; i<stampList.length; i++) {
		var stampImage = Ti.UI.createImageView(style.stampImage);
		stampImage.image = 'images/icon/diary_' + stampList[i] + '.png';
		if (i == 0) {
			stampImage.opacity = 1.0;
		}
		stampView.add(stampImage);

		// スタンプをクリック
		stampImage.addEventListener('click',function(e){
			Ti.API.debug('[event]stampImage.click:');
			if (e.source.opacity == 1.0) {
				e.source.opacity = 0.2;
			} else {
				e.source.opacity = 1.0;
			}
		});
	}

	// 右スワイプで前の画面に戻る
	stampWin.addEventListener('swipe',function(e){
		Ti.API.debug('[event]stampWin.swipe:');
		if (e.direction == 'right') {
			tabGroup.activeTab.close(stampWin);
		}
	});

	return stampWin;
}

