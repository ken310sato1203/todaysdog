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

	var stampScrollView = Ti.UI.createScrollView(style.stampScrollView);
	stampWin.add(stampScrollView);
	var stampListView = Ti.UI.createView(style.stampListView);
	stampScrollView.add(stampListView);
	
	var stampSelectList = model.getStampSelectList();
	var selectedIndex = [];
	for (var i=0; i<stampSelectList.length; i++) {
		for (var j=0; j<stampSelectList[i].stampList.length; j++) {
			selectedIndex.push({selected:false, stamp:stampSelectList[i].stampList[j]});
		}
	}	
	var selectedCount = 0;

	// 余白
	var stampView = Ti.UI.createView(style.stampView);
	stampListView.add(stampView);

	var stampIndex = 0;
	var countMax = 7;
	var alertFlag = false;
	
	for (var i=0; i<stampSelectList.length; i++) {
		var stampView = Ti.UI.createView(style.stampView);
		stampView.type = stampSelectList[i].type;
		stampListView.add(stampView);
		var stampText = Ti.UI.createLabel(style.stampTextLabel);
		stampText.text = stampSelectList[i].title;
		stampView.add(stampText);

		for (var j=0; j<stampSelectList[i].stampList.length; j++) {
			var stamp = stampSelectList[i].stampList[j];
			var stampImage = Ti.UI.createImageView(style.stampImage);
			stampImage.index = stampIndex;
			stampIndex++;
			stampImage.image = 'images/icon/diary_' + stamp + '.png';		
			stampView.add(stampImage);
			
			// スタンプをクリック
			stampImage.addEventListener('click',function(e){
				Ti.API.debug('[event]stampImage.click:');
				
				var parentView = e.source.getParent();
				if (parentView.type == "one") {
					var childList = parentView.getChildren();
					var selectedChild = null;
					for (var k=0; k<childList.length; k++) {
						if (childList[k].objectName == "stampImage") {
							if (selectedIndex[childList[k].index].selected) {
								selectedChild = childList[k];
							}
						}
					}
					if (selectedChild == null) {
						if (selectedCount == countMax) {
							alertFlag = true;
						} else {
							e.source.opacity = 1.0;
							selectedIndex[e.source.index].selected = true;
							selectedCount++;
						}
					} else {
						selectedChild.opacity = 0.2;
						selectedIndex[selectedChild.index].selected = false;
						if (selectedChild.index == e.source.index) {
							selectedCount--;
						} else {
							e.source.opacity = 1.0;
							selectedIndex[e.source.index].selected = true;
						}
					}

				} else {
					if (selectedIndex[e.source.index].selected) {
						e.source.opacity = 0.2;
						selectedIndex[e.source.index].selected = false;
						selectedCount--;
					} else {
						if (selectedCount == countMax) {
							alertFlag = true;
						} else {
							e.source.opacity = 1.0;
							selectedIndex[e.source.index].selected = true;
							selectedCount++;
						}
					}
				}

				if (selectedCount > 0) {
					nextButton.enabled = true;
				} else {
					nextButton.enabled = false;
				}

				if (alertFlag) {
					var alertDialog = Titanium.UI.createAlertDialog({
						title: '一度に投稿できるスタンプ数は７個です',
						buttonNames: ['OK'],
					});
					alertDialog.show();
			
					alertDialog.addEventListener('click',function(alert){
						alertFlag = false;
					});
				}

			});
		}
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
		for (var i=0; i<selectedIndex.length; i++) {
			if (selectedIndex[i].selected) {
				var stampData = {
					no: null,
					user: _stampData.user,
					stamp: selectedIndex[i].stamp,
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
	});

	return stampWin;
}

